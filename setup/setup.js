const user_router = require("../routes/user");
const path = require("path");
module.exports = (app) => {
  app.use("/api/user", user_router);

  app.get("/", (req, res) =>
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./../templates/index.html"))
  );
};
