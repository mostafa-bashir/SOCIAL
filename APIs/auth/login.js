const express = require('express');
const router = express.Router();

const {getLoginController, postLoginController} = require('../../controllers/auth/loginController');

router.get('/', getLoginController);
router.post('/', postLoginController);

module.exports = router;
