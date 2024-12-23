const express = require('express');
const router = express.Router();

const feedController = require('../../controllers/feed/feedController');

router.get('/', feedController);
module.exports = router;
