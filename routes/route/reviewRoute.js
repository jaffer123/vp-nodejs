const express = require('express');
const router = express.Router();
const reviewController = require("../../controllers/reviewController");

router.get('/',reviewController.getDetails);
router.post('/',reviewController.create);
router.get('/create',reviewController.createReview);
router.post('/save',reviewController.saveReview);
router.get('/details',reviewController.detailPages);

module.exports = router;