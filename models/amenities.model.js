const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const amenitiesSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    icon: {
        type: String,
      },
      description: { type:String},
      status:{type:Boolean,default:true}
},{timestamps: true});

module.exports=new mongoose.model('Amenity',amenitiesSchema);