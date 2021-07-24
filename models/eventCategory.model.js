const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: String,
    subCategories:[{ type: mongoose.Schema.Types.ObjectId, ref: "subCategorySchema" }],
 })
 
 const subCategorySchema = new Schema({
    category_name: String
 })

 module.exports = new mongoose.model('EventCategory', CategorySchema);
 