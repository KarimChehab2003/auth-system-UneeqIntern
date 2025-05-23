const express = require('express');
const { auth } = require('../config/firebase');
const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} = require('firebase/auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);

        res.json({
            message: 'User registered successfully',
            user: {
                uid: user.uid,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log(user);

        res.json({
            message: 'Login successful',
            user: {
                uid: user.uid,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({
            message: 'Login failed',
            error: error.message
        });
    }
});

module.exports = router; 