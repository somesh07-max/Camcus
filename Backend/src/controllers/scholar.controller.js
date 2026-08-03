const Scholar = require("../Models/scholarship");
const { findById } = require("../Models/user.js");

async function main(req, res) {
    const scholarPosts = await Scholar.find({})
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        scholarPosts
    });
}

async function create(req, res) {
    const {
        title,
        organization,
        description,
        eligibility,
        amount,
        applicationLink,
        deadline,
        documentsRequired,
        images
    } = req.body;

    const scholarPost = await Scholar.create({
        title,
        organization,
        description,
        eligibility,
        amount,
        applicationLink,
        deadline,
        documentsRequired,
        images,
        postedBy: req.user.id
    });

    return res.status(201).json({
        success: true,
        message: "Scholarship created successfully",
        scholarPost
    });
}

async function show(req,res){
    const { id} = req.params;
    const post = await Scholar.findById(id);
    if(!post){
        return res.status(404).json({
            success:false,
            message:"Scholarship not found"
        })
    }

    res.status(200).json({
        success:true,
        post
    })
}

async function EditGet(req,res){
    const {id} = req.params;

    const post  = await findById(id);
    if(!post){
        return res.status(404).json({
            success:false,
            message:"Scholar does not exist"
        })
    }
    res.staus(200).json({
        success:true,
        post
    })

}

async function EditPost(req,res){
    const {id} = req.params;
    let post = await Post.findByIdAndUpdate(
        id,
        req.body,
        { new: true ,
            runValidatiors:true,
        }
    );
    if(!post){
        return res.status(404).json({
            success:false,
            message:"Post does not exist"
        }
    
    )
    }

    res.status(200).json({
        success:true,
        post,
    })

}





