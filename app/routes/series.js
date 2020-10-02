// Modules
const express = require('express');
const router = express.Router();

// Controller
const seriesController = require('../api/controllers/series');

// Routes
router.get('/search', seriesController.search)
router.get('/:id', seriesController.getById);

module.exports = router;