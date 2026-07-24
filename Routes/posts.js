const express = require("express");
const Post = require("../Models/post.js");
const { findByIdAndDelete } = require("../Models/user.js");
const router = express.Router();


router.get("/",async (req,res)=>{
    let list = await post.find({});
    res.json(list);
});

router.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            message:"we have created a new post",
            post
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});


router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        let post = await Post.findById(id);
        if(!post){
          return   res.status(404).json({
                success:false,
                message:"Post Not found",
            })
        }

        res.json(post);

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
})

router.put("/:id", async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.json(updatedPost);
});


router.delete("/:id",async(req,res)=>{
    try{
        let {id}=req.params;
        let deletePost = await Post.findById(id);
        if(!deletePost){
         return   res.status(404).json({
                success:false,
                message:"Post not found",
            })
        }
        await Post.findByIdAndDelete(id);

        res.status(201).json({
            success:true,
            message:"post successfully delted",
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
})



module.exports = router;