

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventPaymentDetail = new Schema(
  {
   total:{type:Number,required:true},
   commission:{type:Number,required:true},
   tax:{type:Number,},
   payAble:{type:Number},

  },{timestamps: true});

  module.exports = new mongoose.model("EventPaymentDetail", EventPaymentDetail);
