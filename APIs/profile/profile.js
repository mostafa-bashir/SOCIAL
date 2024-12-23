const express = require('express');
const router = express.Router();

const getProfileController = require('../../controllers/profile/profileController');

router
    .get('/', getProfileController);

module.exports = router;