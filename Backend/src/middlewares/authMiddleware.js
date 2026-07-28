const jwt = require("jsonwebtoken");
const config = require("../config/config.js");


async function authorize(req,res,next){
   const token = req.headers.authorization?.split(" ")[1];
   const decode = jwt.verify(token,config.JWT_SECRET);
   const {id}= req.params;
   const post = await findById({id});
   if(decoded.id!=post.author.id){
    return res.status(403).json({
        success:false,
        message:"user not authorized",
    })
   }

   next();

}