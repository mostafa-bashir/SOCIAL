const express = require('express');
const router = express.Router()

const multer = require('../../services/multer');
const upload = multer('public/pp');

const {getSignupController, postSignupController} = require('../../controllers/auth/signupController');

router.get('/', getSignupController);
router.post('/',upload.single('profilePicture'), postSignupController);


module.exports = router;