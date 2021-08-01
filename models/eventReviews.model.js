
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventReview= new Schema(
  {
   comment:{type:String,},
   rating:{type:Number,required:true},
   status:{type:Boolean,default:true}

  },{timestamps: true});

  module.exports = new mongoose.model("EventReview", EventReview);