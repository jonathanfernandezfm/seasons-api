// Modules
const express = require('express');
const router = express.Router();

// Controller
const followController = require('../api/controllers/follows');

// Routes
router.post('/', followController.addFollow);
router.get('/', followController.listFollows)
router.delete('/:serie', followController.removeFollow)
router.put('/:serie', followController.updateFollow)
router.get('/:serie', followController.getFollow);

module.exports = router;