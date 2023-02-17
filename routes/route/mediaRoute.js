const express = require('express');
const router = express.Router();
const MediaController = require('../../controllers/mediaController')

router.post('/', MediaController.saveMedia)
router.get('/all', MediaController.getMediaAll)
router.get('/:id', MediaController.getMedia)
router.put('/', MediaController.updateMedia)
router.delete('/:id', MediaController.deleteMedia)


module.exports = router;
