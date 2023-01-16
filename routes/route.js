const express = require('express');
const router = express.Router();
const reviewRoute = require('./route/reviewRoute');

router.use('/review', reviewRoute);
module.exports = router;
