const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema  = new Schema({
name:{
        type:String,
        required:true,
        trim:true,
},

program: {
    type: String,
    enum: ["B.Tech", "MCA", "MBA", "M.Tech"],
    required: true
},

year: {
    type: Number,
    required: true,
    min:1,
    max:4,
},

semester :{
    type:Number,
    required:true,
    min:1,
    max:8
},

branch:{
    type:String,
    required:true,
    enum:[
        "CSE",
        "IT",
        "ECE",
        "EE",
        "ME",
        "CE",
        "Mining",
        "Biomedical"
    ]
},

email:{
    type:String,
    required:true,

},

socialLinks: {
    github: {
        type: String,
        trim: true
    },

    linkedin: {
        type: String,
        trim: true
    },

    portfolio: {
        type: String,
        trim: true
    },

    leetcode:{
        type:String,
        trim:true
    }

},


description:{
 type:String,
 trim:true,
},

password:{
    type:String,
    required:true
}
},{
    timestamps:true
})

module.exports = mongoose.model("User",UserSchema);