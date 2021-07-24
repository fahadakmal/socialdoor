const userRouter = require("../routes/user.routes/index");
const adminRouter = require("../routes/admin.routes/index");

const path = require("path");
module.exports = (app) => {
  // put your routes here as shown in below example
    app.use("/api/user", userRouter);
    app.use("/api/admin", adminRouter);

};
