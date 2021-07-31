const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const amenitiesSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    icon: {
        data: Buffer,
        contentType: String,
      },
      description: { type:String},
},{timestamps: true});

module.exports=new mongoose.model('Amenity',amenitiesSchema);