const express = require("express");
const config = require("./../config/keys.config");
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') 
  
var fs = require('fs'); 
var path = require('path'); 
const app = express();
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
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