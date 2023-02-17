const express = require('express');
const router = express.Router();
const media = require('./route/mediaRoute');
const s3 = require('./route/s3Route');
router.use("/media",media);
router.use("/s3",s3); 
module.exports = router;
