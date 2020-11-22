const bodyParser = require("body-parser");
const cors = require("cors");
const setup_middleware = require("../middlewares/setup.middleware");
module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(setup_middleware);
};
