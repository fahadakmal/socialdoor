const express = require("express");
const config = require("./../config/keys.config");
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') ;
const passport = require('passport');


  
var fs = require('fs'); 
var path = require('path'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
// applying middleware
require("../setup/middleware.setup")(app);

// DB Connection
require("./../DB.connection")(config.DB.DB1);

// init middleware
// require("./../setup/general.setup")(app);

// init passport
require("./../setup/passport.setup")(app, passport)

// init routes

  


require("./../setup/router.setup")(app);


module.exports = app;