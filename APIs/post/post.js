const express = require('express');
const router = express.Router();

const multer = require('../../services/multer');
const upload = multer('public/pp');

const {getPostController, postPostController, deletePostController, deleteCommentController} = require('../../controllers/post/postController');
const {getEditPostController, postEditPostController} = require('../../controllers/post/editPostController');
const {getEditCommentController, postEditCommentController} = require('../../controllers/post/editCommentController');

router
    .get('/:id', getPostController)
    .post('/:id', postPostController)
    .get('/:id/delete', deletePostController)
    .get('/:id/edit', getEditPostController)
    .post('/:id/edit', upload.any('postImage'),postEditPostController)
    .get('/comment/:id/delete', deleteCommentController)
    .get('/comment/:id/edit', getEditCommentController)
    .post('/comment/:id/edit', postEditCommentController);

module.exports = router;