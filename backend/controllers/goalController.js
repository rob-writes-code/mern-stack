// Simple middleware for handling exceptions inside of async express routes 
// and passing them to your express error handlers.
const asyncHandler = require('express-async-handler');

const Goal = require('../models/Goal');
const User = require('../models/User');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals)
});

// @desc    Create goal
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter a goal') // uses Express built-in error handler
    };

    const user = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(user)
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    };

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    } 

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json(updatedGoal)
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    };

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    } 

    await Goal.findByIdAndDelete(id)

    res.status(200).json({ id: id })
});


module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}