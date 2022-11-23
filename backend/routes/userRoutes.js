const express = require('express');
const router = express.Router();

// HTTP methods organised into a controller file
const { 
    loginUser,
    registerUser,
    getMe 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')

const { set } = require('mongoose'); // ???

// CRUD routes
router.post('/login', loginUser)
router.post('/', registerUser)
router.get('/me', protect, getMe)

module.exports = router;