const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const check = await User.findOne({ email });
        if (check) throw new Error('User Already Exists');
        const user = new User({ name, email, password });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) throw new Error('Invalid password');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
