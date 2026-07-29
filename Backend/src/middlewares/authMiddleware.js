const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const Post = require("../models/Post");

async function authorize(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (!post.author.equals(decoded.id)) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

module.exports = authorize;