const express = require("express");
const app = express();
const PORT  = 3000;

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})

app.get("/Camcus",(req,res)=>{
    res.send("<h1>Welcome to Camcus</h1>");
})