const express = require('express');
const router = express.Router();

const multer = require('../../services/multer');
const upload = multer('public/posts');

const {getCreateController, postCreateController} = require('../../controllers/feed/createController');

router
    .get('/', getCreateController)
    .post('/',upload.any('postImage'), postCreateController);

module.exports = router;

