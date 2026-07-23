const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
{
    author:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },

    comment:{
        type:String,
        required:true,
        trim:true
    }

},
{
    timestamps:true
});

const postSchema = new Schema(
{
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },

    description:{
        type:String,
        required:true,
        trim:true,
        minlength:10
    },

    category:{
        type:String,
        enum:[
            "general",
            "placement",
            "hackathon",
            "event",
            "exam-prep",
            "college-news"
        ],
        required:true,
        index:true
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },

    images:[
        {
            url:String,
            filename:String
        }
    ],

    likes:{
        type:Number,
        default:0,
        min:0
    },

    comments:[commentSchema]

},
{
    timestamps:true
});

module.exports = new mongoose.model("Post",postSchema)