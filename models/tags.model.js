const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Tag = new Schema({
    tag_name: String,
 },{timestamps: { createdAt: 'created_at' } },)
 


 module.exports = new mongoose.model('Tag', Tag);
 