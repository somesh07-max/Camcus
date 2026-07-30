const Post = require("../Models/post.js")

async function landingPage(req,res){
    let posts = await Post.find({}).sort({createdAt:-1});
    res.status(200).json({
        success:true,
        posts
    })
}

async function create(req,res){
    let {
        title,
        description,
        category,
        image,
    } = req.body;

    const author = req.user.id;
    const post = await Post.create({
        title,
        description,
        category,
        author,
        image,
    })

    res.status(201).json({
        success:true,
        message:"new post created",
        post,
    })
}


async function show(req,res){
    const {id}= req.params;
    const post = await findById({id});
    if(!post){
        return res.status(404).json({
            success:true,
            message:"Post not found",
        })
    }

    res.status(200).json({
        success:true,
        post,
    })

}

async function PostDetail(req,res){
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id} = req.params;
    const post = await findOne({id});
    if(!post){
        return res.status(404).json({
            success:false,
            message:"Post not found",
        })
    }

    res.status(200).json({
        success:true,
        post,
    })
}

async function Edit(req,res){
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
            message:"post not found"
        })
    }

    res.status(200).json({
        success:true,
        post,
    })

}

async function Delete(req,res){
    const {id} = req.params;
    const  post = await Post.findByIdAndDelete(id);

    if(!post){
        return res.status(404).json({
            success:false,
            message:"post not found",
        })
    }

    res.status(200).json({
        success:true,
         message: "Post deleted successfully",
    })
    
}

async function filter(req, res) {
    const { category } = req.params;

    const posts = await Post.find({ category });

    if (posts.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No posts found for this category"
        });
    }

    return res.status(200).json({
        success: true,
        posts
    });
}

async function getPost(req,res){
    const {search,category,page=1,limit=10,sort} = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

  
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
            }
        ];
    }


    const query = Post.find({filter});
    if (sort === "latest") {
        query = query.sort({ createdAt: -1 });
    } else if (sort === "oldest") {
        query = query.sort({ createdAt: 1 });
    }

    const pageNo = Number(page);
    const limitNo = Number(limit);

    query = query.skip((pageNo -1)*limitNo).limit(limitNo)
     const posts = await query;

     res.status(200).json({
        success:true,
        count:post.length,
        posts
     })


}





