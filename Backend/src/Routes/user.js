const express = require("express");
const  router = express.Router();
const User = require("../Models/user.js");
const auth = require("../controllers/auth.controller.js");


router.post("/register",auth.Register);
router.get("/login",auth.login);


module.exports = router;