const Scholar = require("../Models/scholarship.js")
async function main(req, res) {
    try {
        const scholarPosts = await Scholar.find({})
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            scholarPosts
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


async function create(req, res) {
    try {

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

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



async function show(req, res) {

    try {

        const { id } = req.params;

        const post = await Scholar.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Scholarship not found"
            });
        }

        return res.status(200).json({
            success: true,
            post
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



async function Edit(req, res) {

    try {

        const { id } = req.params;

        const post = await Scholar.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Scholarship does not exist"
            });
        }

        return res.status(200).json({
            success: true,
            post
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



async function Delete(req, res) {

    try {

        const { id } = req.params;

        const post = await Scholar.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Scholarship does not exist"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Scholarship deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


// Search + pagination + sorting
async function Scholarship(req, res) {

    try {

        const {
            search,
            page = 1,
            limit = 10,
            sort
        } = req.query;

        let filter = {};

        if (search) {

            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    organization: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        let query = Scholar.find(filter);

        // Sorting
        if (sort === "latest") {
            query = query.sort({ createdAt: -1 });
        } 
        else if (sort === "oldest") {
            query = query.sort({ createdAt: 1 });
        }

        // Pagination
        const pageNo = Number(page);
        const limitNo = Number(limit);

        query = query
            .skip((pageNo - 1) * limitNo)
            .limit(limitNo);

        const posts = await query;

        return res.status(200).json({
            success: true,
            count: posts.length,
            page: pageNo,
            limit: limitNo,
            posts
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


module.exports = {
    main,
    create,
    show,
    Edit,
    Delete,
    Scholarship
};




