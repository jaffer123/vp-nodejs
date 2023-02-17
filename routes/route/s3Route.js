const express = require('express');
const router = express.Router();
const S3Controller = require('../../controllers/s3Controller')

router.post('/', S3Controller.uploadS3);
router.post('/view', S3Controller.viewS3);

module.exports = router;
