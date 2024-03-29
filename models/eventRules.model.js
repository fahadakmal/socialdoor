const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Rule = new Schema(
  {
   title:{type:String,required:true},
   description:{type:String,required:true},
   ruleImage:{type:String,default:null},
   status:{type:Boolean,default:true}

  },{timestamps: true});

  module.exports = new mongoose.model("Rule", Rule);