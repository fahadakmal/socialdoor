const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CancellationPolicy = new Schema(
  {
   title:{type:String,required:true},
   description:{type:String,required:true},
   icon:{type:String},
   value:{type:Number,required:true},
   type:{type:Number,default:"FixedAmount"},
   status:{type:Boolean,default:true}
  },{timestamps: true});

  module.exports = new mongoose.model("CancellationPolicy", CancellationPolicy);