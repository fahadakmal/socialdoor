

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventCreationCharges = new Schema(
  {
   eventCreationEntity:{type:String,required:true},
   eventCreationValue:{type:Number,required:true},
   eventCreationValueType:{type:String,default:'Percentage'},
   status:{type:Boolean,default:true}
  },{timestamps: true});

  module.exports = new mongoose.model("EventCreationCharges", EventCreationCharges);
