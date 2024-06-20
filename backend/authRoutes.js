const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user');

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post('/register', async (req, res)=>{
    const {username, password} = req.body;
    try{
        const user = new User({username, password});
        await user.save();
        res.status(201).json({manage: 'User registered successfully'});
    }   catch (error) {
        res.status(500).json({error: 'Error registering user'});
    }
});

router.post('/login', async (req, res) => {
    const{username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, secret, {expiresIn: '1h'});
        res.json({token});
    } catch (error) {
        res.status(500).json({error: 'Error logging in'});
    }
});

module.exports = router;