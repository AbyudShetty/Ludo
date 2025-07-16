const express = require('express');
const router = express.Router();

// Temporary in-memory storage for game sessions
const gameSessions = {};

// Create a new game session
router.post('/create-session', (req, res) => {
    const sessionId = Date.now().toString();
    gameSessions[sessionId] = { players: [], state: {} };
    res.status(201).json({ sessionId });
});

// Join a game session
router.post('/join-session', (req, res) => {
    const { sessionId, playerId } = req.body;
    if (gameSessions[sessionId]) {
        if (gameSessions[sessionId].players.length < 4) {
            gameSessions[sessionId].players.push(playerId);
            res.status(200).json({ message: 'Joined session successfully' });
        } else {
            res.status(403).json({ message: 'Session is full' });
        }
    } else {
        res.status(404).json({ message: 'Session not found' });
    }
});

// Update game state
router.post('/update-state', (req, res) => {
    const { sessionId, state } = req.body;
    if (gameSessions[sessionId]) {
        gameSessions[sessionId].state = state;
        res.status(200).json({ message: 'Game state updated' });
    } else {
        res.status(404).json({ message: 'Session not found' });
    }
});

// Fetch game state
router.get('/get-state', (req, res) => {
    const { sessionId } = req.query;
    if (gameSessions[sessionId]) {
        res.status(200).json(gameSessions[sessionId].state);
    } else {
        res.status(404).json({ message: 'Session not found' });
    }
});

module.exports = router;