const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ludoFinal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'LUDO', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/game'));
app.use('/api', require('./routes/leaderboard'));
app.use('/api', require('./routes/profile'));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/landing.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/game.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/leaderboard.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/signup.html'));
});

app.get('/gameprofile', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/gameprofile.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});