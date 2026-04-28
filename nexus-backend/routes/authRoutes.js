

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route for Registration
router.post('/register', registerUser);

// Route for Login
router.post('/login', loginUser);



const { protect } = require('../middleware/authMiddleware');

// This route is PROTECTED - only logged-in users can reach it
router.get('/me', protect, async (req, res) => {
    try {
        const User = require('../models/User');
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;