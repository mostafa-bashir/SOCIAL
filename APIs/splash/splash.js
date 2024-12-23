const express = require('express');
const router = express.Router();

const splashController = require('../../controllers/splash/splashController')

router.get('/', splashController);

module.exports = router;