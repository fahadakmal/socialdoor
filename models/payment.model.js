const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Payment = new Schema(
  {
      user:{type:Scheme.Types.ObjectId,ref:'User'},
      host:{type:Schema.Types.ObjectId,ref:'User'},
      type:{type:Number,},
      amount:{type:Number,},
      paymentCreatedId:{type:String,},
      paymentStatus:{type:Boolean,default:false}
  },{timestamps: true});

  module.exports = new mongoose.model("Payment", Payment);