async function Error(err,req,res,next){
    console.log(err);

    const statuscode = err.statuscode || 500;

    res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server Error"

    })
}

module.exports = Error;