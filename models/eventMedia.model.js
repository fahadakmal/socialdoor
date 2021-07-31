

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EventMedia=new Schema({
    media: {
        data: Buffer,
        contentType: String,
      },
      status:{type:Boolean,default:true}
},{timestamps: true});

module.exports=new mongoose.model('EventMedia',EventMedia);