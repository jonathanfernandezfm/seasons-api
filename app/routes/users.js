// Modules
const express = require('express');
const router = express.Router();
const router1 = express.Router();

// Controller
const userController = require('../api/controllers/users');

// Routes
router.post('/register', userController.create);
router.post('/auth', userController.authenticate);
router1.post('/changeLanguage', userController.changeLanguage);


module.exports = {router, router1};