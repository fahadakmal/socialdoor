const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
var multer = require("multer");
const path = require("path");
const { nextTick } = require("process");
const config = require("../config/keys.config");
const bucketName = config.AWS.AWS_BUCKET_NAME;
const region = config.AWS.AWS_BUCKET_REGION;
const accessKeyId = config.AWS.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS.AWS_SECRET_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload a file to s3

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//download a file from s3

function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

const fileFilter = (req, file, cb) => {
  console.log("file.mimetype is ", file.mimetype);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/avi" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/quicktime"
  ) {
    cb(null, true);
  } else {
    cb({ status: false, message: "Only Images or Videos" });
  }
};

//below strategy is used to upload to s3

exports.uploadStrategy = multer({
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
});

exports.deleteMedia = async (mediaKey,callBackFunc) => {
  let deleteParams = { Bucket: bucketName, Key: mediaKey };
  let data = {};
  await s3.deleteObject(deleteParams, function (err, data) {
    console.log(err,'err');
    console.log(data,'data');
    if (err) {
      console.log(err, err.stack);
      data = { status: false, message: err };
    }
    // an error occurred
    else {
      data = { status: true, message: 'Successfulyy deleted'};
    }
    callBackFunc(data);

  });
};
