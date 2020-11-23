const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  gallery: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  profile: {
    data: Buffer,
    contentType: String,
  },
  cover: {
    data: Buffer,
    contentType: String,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  volume:{
      type:Number,
      required:true,
  },
  phone:{
      type:Number,
      required:true,
  },
  email:{
      type:email,
      required:true,
  },
  price:{
      type:Number,
      required:true,
  },
  date:{
      type:Date,
      required:true
  },
  duration:{
      type:String,
      required:true,
  },
  refCode:{
      type:String,
      required:true,
  },
  amenities:[
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Amenities"
      },
      
  ],
  rules:[],
  prefrences:{
      type:Number,
      required:true,
      default:0
  },
  canPloicy:{},
  tags:[{type:mongoose.Schema.Types.ObjectId,ref:"categorySchema"}],
  story:{},
  featured:{type:Boolean,default:0},
  featuredTill:{type:Date,required:true},
  status:{type:Boolean,default:0},
  joined:[{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]

  
});

module.exports = new mongoose.model("eventSchema", eventSchema);
