
const S3=require('aws-sdk/clients/s3');
const fs=require('fs');
var multer = require('multer')
var multerS3 = require('multer-s3')
const config=require('../config/keys.config');
const bucketName=config.AWS.AWS_BUCKET_NAME
const region=config.AWS.AWS_BUCKET_REGION
const accessKeyId=config.AWS.AWS_ACCESS_KEY
const secretAccessKey=config.AWS.AWS_SECRET_KEY
const s3=new S3(
    {
        region,
        accessKeyId,
        secretAccessKey
    }
);



//upload a file to s3

 function uploadFile(file){
    const fileStream=fs.createReadStream(file.path);
    const uploadParams={
        Bucket:bucketName,
        Body:fileStream,
        Key:file.filename,
    }
 return   s3.upload(uploadParams).promise();
}


exports.uploadFile=uploadFile;


//download a file from s3


function getFileStream(fileKey)
{
    const downloadParams={
        Bucket:bucketName,
        Key:fileKey,
    }
 
 return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream=getFileStream;

const uploadFunc = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
  })
})

exports.uploadFunc=uploadFunc;

