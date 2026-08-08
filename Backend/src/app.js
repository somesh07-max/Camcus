const express = require("express");
const Scholar = require("./Models/post.js");
const app = express();
const PORT  = 3000;
const posts = require("./Routes/posts.js");
const Scholarship = require("./Routes/scholarship.js");
const cookieParser = require("cookie-parser")
const user = require("./Routes/user.js")
const session = require("session")


app.use(express.json());
app.use(cookieParser());
app.use("/Camcus",posts);
app.use("/api/auth",user);


const errorHandler = require("./middlewares/errorhandler.middleware.js");
app.use(errorHandler);


app.get("/",(req,res)=>{
    res.send("hello");
})

module.exports = app;