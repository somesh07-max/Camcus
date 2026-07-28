const mongoose = require("mongoose");
const User = require("./user")
const Schema = mongoose.Schema;

const commentSchema = new Schema(
{
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
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
        ref:"User",
        required:true,
        index:true,
    },

image:{
    type:[
        {
            url:String,
            filename:String
        }
    ],
    default:[]
},

likes: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
]
,

    comments:[commentSchema],

},
{
    timestamps:true
});

module.exports = new mongoose.model("Post",postSchema)