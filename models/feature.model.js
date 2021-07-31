
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Feature= new Schema(
  {
   featureType:{type:Boolean,required:true},
   featureTill:{type:Date,required:true},
   payment:{type:Schema.Types.ObjectId,ref:'Payment'},
   packageName:{type:String,default:null,}
  },{timestamps: true});

  module.exports = new mongoose.model("Feature", Feature);