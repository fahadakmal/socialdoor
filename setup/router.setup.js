const router = require("../routes/user.routes/index");
const path = require("path");
module.exports = (app) => {
  // put your routes here as shown in below example
    app.use("/api", router);
};
