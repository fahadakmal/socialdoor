// models
const USER = require("../models/user.model");
const Tag=require("../models/tags.model");
const EventCategory=require("../models/eventCategory.model")
// const ADMIN = require("../models/admin.model");
const config = require("./../config/keys.config");
module.exports = (req, res, next) => {
  const models = {
    user_model: USER,
    tag_model:Tag,
    event_category_model:EventCategory,
    // admin_model: ADMIN,
  };
  


  
  req["models"] = models;
  req["config"] = config;
  next();
};
