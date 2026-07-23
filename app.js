const express = require("express");
const Scholar = require("./Models/post.js");
const app = express();
const PORT  = 3000;
const posts = require("./Routes/posts.js");
const Scholarship = require("./Routes/scholarship.js")


app.use(express.json());
app.use("/Camcus",posts);


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("hello");
})