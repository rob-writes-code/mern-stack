const express = require('express');
const router = express.Router();

// HTTP methods organised into a controller file
const { 
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal 
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

// CRUD routes
router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;