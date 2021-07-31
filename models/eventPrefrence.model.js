const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Prefrence = new Schema(
  {
   prefrenceKey:{type:String,required:true},
   PrefrenceValue:{type:String,required:true},
   prefrenceImage:{type:String,}
  },{timestamps: true});

  module.exports = new mongoose.model("Prefrence", Prefrence);