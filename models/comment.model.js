const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const commentSchema=new Schema(
    {
        comment:{
            type:String,
            required:true,
        },

    },{timestamps: true}
)

module.exports = new mongoose.model('Comment', commentSchema);