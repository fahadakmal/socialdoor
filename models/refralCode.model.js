const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RefralCode = new Schema(
  {
      event:{type:Schema.Types.ObjectId,ref:'EventModel'},
      user:{type:Schema.Types.ObjectId,ref:'User'},
      refralCode:{type:String,required:true},
      refralLimit:{type:Number,default:5}
  },{timestamps: true});

  module.exports = new mongoose.model("RefralCode", RefralCode);

