EventReviews

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventReview= new Schema(
  {
   comment:{type:String,},
   rating:{type:number,required:true},
  },{timestamps: true});

  module.exports = new mongoose.model("EventReview", EventReview);