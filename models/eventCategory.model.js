const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: String,
    subCategories:[{ type: mongoose.Schema.Types.ObjectId, ref: "subCategorySchema" }],
    status:{type:Boolean,default:true}
 },{timestamps: true})
 
 const subCategorySchema = new Schema({
    category_name: String,
    status:{type:Boolean,default:true}
 },{timestamps: true})

 module.exports = new mongoose.model('EventCategory', CategorySchema);
 