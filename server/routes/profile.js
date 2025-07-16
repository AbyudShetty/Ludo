const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user profile data
router.get('/profile', async (req, res) => {
    const userId = req.session.userId; // Assuming you are using sessions for authentication
    if (!userId) {
        return res.status(401).json({ message: 'Please log in to view your profile' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            username: user.username,
            wins: user.wins,
            gamesPlayed: user.gamesPlayed,
            gameHistory: user.gameHistory // Assuming you have a gameHistory field in your User model
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;