// models
const Address=require('../models/addres.model');
const Amenity=require('../models/amenities.model');
const CancellationPolicy=require('../models/cancelationPolicy.model');
const Event=require('../models/event.model');
const EventCategory=require("../models/eventCategory.model");
const EventCreation=require('../models/eventCreation.model');
const EventPaymentDetail=require('../models/eventPaymentDetail.model');
const EventPrefrence=require('../models/eventPrefrence.model');
const EventMedia=require('../models/eventMedia.model');
const EventRequest=require('../models/eventRequest.model');
const EventReview=require('../models/eventReviews.model');
const EventRule=require('../models/eventRules.model');
const EventStory=require('../models/eventStories.model');
const Feature=require('../models/feature.model');
const Keys=require('../models/keys.model');
const Payment=require('../models/payment.model');
const RefralCode=require('../models/refralCode.model');
const RefralUsed=require('../models/refralUsed.model');
const Tag=require("../models/tags.model");
const USER = require("../models/user.model");

 

// const ADMIN = require("../models/admin.model");
const config = require("./../config/keys.config");

module.exports = (req, res, next) => {
  const models = {
    user_model: USER,
    tag_model:Tag,
    event_category_model:EventCategory,
    addressModel:Address,
    amenityModel:Amenity,
    cancellationPolicyModel:CancellationPolicy,
    eventModel:Event,
    eventCreationModel:EventCreation,
    eventPaymentDetail:EventPaymentDetail,
    eventPrefrenceModel:EventPrefrence,
    eventMediaModel:EventMedia,
    eventRequestModel:EventRequest,
    eventReviewModel:EventReview,
    eventRuleModel:EventRule,
    eventStoryModel:EventStory,
    featureModel:Feature,
    keysModel:Keys,
    paymentModel:Payment,
    refralCodeModel:RefralCode,
    refralUsedModel:RefralUsed,
  };
  


  
  req["models"] = models;
  req["config"] = config;

  next();
};
