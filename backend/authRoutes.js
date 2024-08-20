const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user'); 

const router = express.Router();
const secret = process.env.JWT_SECRET;

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Create a new user and save it to the database
        const user = new User({ username, password });
        await user.save();

        // Respond with success message if registration is successful
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        // Respond with an error message if something goes wrong
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            // Respond with error if user doesn't exist
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            // Respond with error if password is incorrect
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a token that expires in 1 hour
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        // Respond with the generated token
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        // Respond with an error message if something goes wrong
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
