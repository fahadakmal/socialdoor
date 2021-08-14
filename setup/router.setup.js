const userRouter = require("../routes/user.routes/index");
const adminRouter = require("../routes/admin.routes/index");
const {getFileStream}=require('../helper/imageS3.helper');


const path = require("path");
module.exports = (app) => {
  // put your routes here as shown in below example
    app.use("/api/user", userRouter);
    app.use("/api/admin", adminRouter);
    app.get("/media/:key", (req,res) => {
      const  imageKey=req.params.key;
      const readStream=getFileStream(imageKey);
      readStream.pipe(res);
    });
    app.get("/", (req, res) =>
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./../templates/index.html"))
  );

};
