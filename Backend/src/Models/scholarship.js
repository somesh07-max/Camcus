const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const scholarSchema = new Schema(
{
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },

    organization:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        required:true,
        trim:true,
        minlength:10
    },
    eligibility:{
        type:String,
        required:true,
    },

    images:[
        {
            url:String,
            filename:String
        }
    ],

    amount:{
        type:Number,
        required:true,
        min:0,

    },

    applicationLink: {
        type: String,
        required: true
    },

    deadline: {
        type: Date,
        required: true
    },

    documentsRequired: [{
        type: String
    }],

    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
    }

},
{
    timestamps:true
});

module.exports = new mongoose.model("Scholarship",scholarSchema)