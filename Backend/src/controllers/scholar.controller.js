const Scholar = require("../Models/scholarship");

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




