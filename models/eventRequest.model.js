const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventRequest = new Schema(
  {
      event:{type:Scheme.Types.ObjectId,ref:'EventModel'},
      host:{type:Schema.Types.ObjectId,ref:'User'},
      user:{type:Schema.Types.ObjectId,ref:'User'},
      payment:{type:Schema.Types.ObjectId,ref:'Payment'},
      status:{type:Number,default:0},
  },{timestamps: true});

  module.exports = new mongoose.model("EventRequest", EventRequest);

