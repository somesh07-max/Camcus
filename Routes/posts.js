const express = require("express");
const post = require("../Models/post.js")
const router = express.Router();


router.get("/",async (req,res)=>{
    let list = await post.find({});

    res.json(list);
})

module.exports = router;