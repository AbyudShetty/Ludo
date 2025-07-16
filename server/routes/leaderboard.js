const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch leaderboard data
router.get('/leaderboard', async (req, res) => {
    const { sortBy } = req.query;
    try {
        let users;
        if (sortBy === 'wins') {
            users = await User.find().sort({ wins: -1 }).limit(10);
        } else if (sortBy === 'winRate') {
            users = await User.find().sort({ winRate: -1 }).limit(10);
        } else {
            return res.status(400).json({ message: 'Invalid sortBy parameter' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;