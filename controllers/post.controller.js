const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");

// create post
const createPostController = async (req, res) => {
    try {
        const { title, desc } = req.body;
        if (!title || !desc) {
            return res.status(400).send({
                message: "Please fill all the fields",
                status: false,
            });
        }

        const post = await PostModel({
            title: title,
            desc: desc,
            Postedby: req.auth._id,
        }).save();
        res.status(200).send({
            message: "Post created successfully",
            success: true,
            status: true,
            post: post
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error posting",
            success: false,
            error: err,
        });
    }
};

// delete post
const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({
            message: "Post deleted successfully",
            success: true,
            status: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error deleting post",
            success: false,
            error: err,
        });
    }
};

// update post
const updatePostController = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const post = await PostModel.findById(req.params.id);
        if (!title || !desc) {
            return res.status(400).send({
                message: "Please fill in all fields",
                success: false,
            });
        }
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                title: title || post?.title,
                desc: desc || post?.desc,
            },
            { new: true }
        );
        res.status(200).send({
            message: "Post updated successfully",
            success: true,
            updatedPost,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error updating post",
            success: false,
        });
    }
};

const getAllPostsController = async (req, res)=>{
    try{
        const posts= await PostModel.find().populate("Postedby", "_id name").sort({createdAt: -1});
        res.status(200).send({
            success:true,
            message:"All Posts",
            posts,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Error in Get All POST API",
            error,
          });
    }
};

const getUserPostsController=async (req,res) =>{
    try{
        const userPosts= await postModel.find({Postedby: req.auth._id});
        res.status(200).send({
            success:true,
            message:"User Posts",
            userPosts
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Error in User POST API",
            error,
          });
    }
    
};

module.exports = { createPostController, deletePostController, updatePostController, getAllPostsController,getUserPostsController };
