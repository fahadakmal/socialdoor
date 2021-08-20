
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const RefralUsed = new Schema(
  {
      eventId:{type:Schema.Types.ObjectId,ref:'EventModel'},
      refrerId:{type:Schema.Types.ObjectId,ref:'User'},
      refralUsers:[{type:Schema.Types.ObjectId,ref:'User'}],
      refralCode:{type:String,required:true},
      refralUsedCount:{type:Number,},
  },{timestamps: true});

  module.exports = new mongoose.model("RefralUsed", RefralUsed);

