const express = require("express");
const router = express.Router();


const PostController = require("../controllers/post.controller.js");

// Authentication middleware
const { authorize } = require("../middlewares/authorize.Middleware.js");
const  authenticate = require("../middlewares/authenticate.middleware.js")


// Get all posts / search / filter / pagination
router.get("/", PostController.getPost);


// Landing page - latest posts
router.get("/feed", PostController.landingPage);


// Create a new post
router.post("/",authenticate,PostController.create);


// Get posts by category
router.get("/category/:category", PostController.filter);


// Get a single post
router.get("/:id", PostController.show);


// Edit a post
router.put("/:id", authenticate ,authorize,PostController.Edit);


// Delete a post
router.delete("/:id",authenticate, authorize,PostController.Delete);

//Lika  post 
router.put("/:id",authenticate,PostController.likePost);


module.exports = router;