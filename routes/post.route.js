const express=require('express');
const { deletePostController,
    createPostController, 
    updatePostController, 
    getAllPostsController,
    getUserPostsController
} = require('../controllers/post.controller');

const router= express.Router();

//routes
router.post('/create-post', createPostController);
router.delete('/delete-post', deletePostController);
router.put('/update-post', updatePostController);
router.get('/get-all-posts', getAllPostsController);
router.get('/get-user-posts', getUserPostsController);
module.exports= router;