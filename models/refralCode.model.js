const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RefralCode = new Schema(
  {
      eventId:{type:Schema.Types.ObjectId,ref:'EventModel'},
      userId:{type:Schema.Types.ObjectId,ref:'User'},
      refralCodeString:{type:String,required:true},
      refralLimit:{type:Number,default:5}
  },{timestamps: true});


  module.exports = new mongoose.model("RefralCodes", RefralCode);

