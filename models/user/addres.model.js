const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const address = new Schema({
    type: { type: String, required: true },
    home: { type: String, required: true },
    street: { type: String, required: true },
    floor: { type: String },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    coordinates: { type: String },
  });


  module.exports=new mongoose.model('Address',address);