const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Prefrence = new Schema(
  {
   prefrenceKey:{type:String,required:true},
   PrefrenceValue:{type:String,required:true},
   prefrenceImage:{type:String,},
   status:{type:Boolean,default:true}

  },{timestamps: true});

  module.exports = new mongoose.model("Prefrence", Prefrence);