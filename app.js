const express = require("express");
const Scholar = require("./Models/post.js");
const app = express();
const PORT  = 3000;
const posts = require("./Routes/posts.js");
const Scholarship = require("./Routes/scholarship.js");
const session = require("session")


app.use(express.json());
app.use("/Camcus",posts);

const mongoose = require("mongoose");

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/Camcus');

}
main().then((res)=>{

    console.log("connections successful");
}).catch(err => console.log(err));


const sessionOptions = {
    secret:"mysupersectret",
    resave:false , 
saveUninitialized:true,
cookie:{
    expires:Date.now()+7*24*60*60*10000,
    maxAge:7*24*60*60*10000,
    httpOnly:true,
}};

app.use(session(sessionOptions));
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("hello");
})