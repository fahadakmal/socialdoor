// models
const USER = require("../models/user/user.model");
// const ADMIN = require("../models/admin.model");
const config = require("./../config/keys.config");
module.exports = (req, res, next) => {
  const models = {
    user_model: USER,
    // admin_model: ADMIN,
  };
  


  
  req["models"] = models;
  req["config"] = config;
  next();
};
