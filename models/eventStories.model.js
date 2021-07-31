
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventStory = new Schema(
  {
   storymedia:{type:String,required:true},
   event:{type:Scheme.Types.ObjectId,ref:'EventModel'},
   user:{type:Schema.Types.ObjectId,ref:'User'},
},  { timestamps: true });

  module.exports = new mongoose.model("EventStory", EventStory);