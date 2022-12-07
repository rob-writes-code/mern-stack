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
router.get('/me', protect, getMe) // protected route

// By having "protect" function from authMiddleware as 2nd argument
// this route can only be accessed with the correct token.

module.exports = router;