const express = require("express");
const  router = express.router();
const User = require("../Models/user.js");
const passport = require("passport");


router.post("/signup", async (req, res) => {
    try {
        const User  = new User(req.body);
        await User.save();
        res.status(201).json({
            message: "Account created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});
