

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventCreationCharges = new Schema(
  {
   eventCreationCharges:{type:Number,required:true},
  },{timestamps: true});

  module.exports = new mongoose.model("EventPaymentDetail", EventPaymentDetail);
