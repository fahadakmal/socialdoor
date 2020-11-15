const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const commentSchema=new Schema(
    {
        title:{
            type:String,
            required:true,
        }
    }
)

module.exports = new mongoose.model('Comment', commentSchema);