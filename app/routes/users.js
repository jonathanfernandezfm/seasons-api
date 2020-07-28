// Modules
const express = require('express');
const router = express.Router();

// Controller
const userController = require('../api/controllers/users');

// Routes
router.post('/register', userController.create);
router.post('/auth', userController.authenticate);
module.exports = router;