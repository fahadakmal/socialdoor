const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    category_name: {type:String,required:true},
    parentId:{type:String,default:null},
    status:{type:Boolean,default:true}
 },{timestamps: true})
 

 module.exports = new mongoose.model('EventCategory', CategorySchema);

 