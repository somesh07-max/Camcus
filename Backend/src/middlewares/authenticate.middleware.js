const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = authenticate;