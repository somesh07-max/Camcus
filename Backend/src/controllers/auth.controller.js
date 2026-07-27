const User = require("../Models/user.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const config = require("../config/config.js")


async function Register(req,res){

        const {
    name,
    email,
    password,
    program,
    year,
    semester,
    branch,
    socialLinks,
    description
} = req.body;


const tempUser = await User.findOne({email});
if(tempUser){
    return res.status(404).json({
        success:false,
        message:"user already exist"

    })
}

const hashedPassword = crypto
.createHash("sha256")
.update(password)
.digest("hex");

const user = await User.create({
    name,
    email,
    password:hashedPassword,
    program,
    year,
    semester,
    branch,
    socialLinks,
    description
})



const accessToken = jwt.sign(
{
    id:user._id
},
config.JWT_SECRET,
{
    expiresIn:"15m"
});



const refreshToken = jwt.sign(
{
    id:user._id
},
config.JWT_SECRET,
{
    expiresIn:"7d"
});


res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:7*24*60*60*1000
});


res.status(201).json(({
    success:true,
    message:"User saved successfully",
    accessToken,
    user
}))



}


async function login(req,res){
const { email, password } = req.body;

const tempUser = await User.findOne({ email });
    if(!tempUser){
     return   res.status(404).json({
            success:false,
            message:"User do not exist"
        })
    }

const hashedPassword = crypto
.createHash("sha256")
.update(password)
.digest("hex");

if(hashedPassword!=tempUser.password){
 return   res.status(401).json({
        success:false,
        message:"wrong password"
    })
}


const accessToken = jwt.sign({
    id:tempUser._id
},config.JWT_SECRET,{
    expiresIn:"15m",
})

const refreshToken = jwt.sign({
    id:tempUser._id
},config.JWT_SECRET,{
    expiresIn:"7d"
})

res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:7*24*60*60*1000
    
})

const user = {
    id: tempUser._id,
    username: tempUser.username,
};

res.status(200).json({
    success:true,
    message:"User get authorized",
    accessToken,
    user,

})

    
}







async function refreshToken(req,res){
    const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(404).json({
                success: false,
                message: "Refresh token missing"
            });
        }
    
        const decoded = jwt.verify(
            refreshToken,
            config.JWT_SECRET
        );

        if(!decoded){
        return  res.status(404).json({
                success:false,
                message:"User not authorized",
            })
        }

        const accessToken = jwt.sign(
        {
            id:decoded.id,
        },
        config.JWT_SECRET,
        {
            expiresIn:"15m"
        });

        const newRefreshToken = jwt.sign(
            {
                id:decoded.id
            },
            config.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success:true,
            message:"user get authorized",
            accessToken,


        })


}


async function authenticate(req,res,next){
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token missing"
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

    if(!user){
     return   res.status(404).json({
            success:false,
            message:"user not found",
        })
    }

    req.user = user;
    next();
}



module.exports = {
    Register,
    login,
    refreshToken,
    authenticate,
};