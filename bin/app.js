const express = require("express");
const config = require("./../config/keys.config");

const app = express();

// applying middleware
require("./../setup/middleware.setup")(app)

// DB Connection
require("./../DB.connection")(config.DB.DB1);

// init middleware
// require("./../setup/general.setup")(app);

// init passport
// require("./../setup/passport.setup")(app, passport)

// init routes
require("./../setup/router.setup")(app);


module.exports = app;