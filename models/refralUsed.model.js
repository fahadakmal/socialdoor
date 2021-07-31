
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RefralUsed = new Schema(
  {
      event:{type:Scheme.Types.ObjectId,ref:'EventModel'},
      refralOwner:{type:Schema.Types.ObjectId,ref:'User'},
      refralUsers:[{type:Schema.Types.ObjectId,ref:'User'}],
      refralCode:{type:String,required:true},
      refralUsed:{type:Number,}
  },{timestamps: true});

  module.exports = new mongoose.model("RefralUsed", RefralUsed);

