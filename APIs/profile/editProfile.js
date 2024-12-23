const express = require('express');
const router = express.Router();

const multer = require('../../services/multer');
const upload = multer('public/pp');

const {getEditProfileController, postEditProfileController} = require('../../controllers/profile/editProfileController');

router
    .get('/edit', getEditProfileController)
    .post('/edit', upload.single('profilePicture'), postEditProfileController);

module.exports = router;