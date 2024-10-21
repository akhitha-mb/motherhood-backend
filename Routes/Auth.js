const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register',(req,res)=>{
    res.send("dhsjf");
})

router.post('/registerq', async (req, res) => {
    const { name, dob, selectedDoctor, deliveryDate, diseases } = req.body;

    try {
        // Validate input
        if (!name || !dob || !selectedDoctor || !deliveryDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists (assuming username is unique)
        const existingUser  = await User.findOne({ name }); // Assuming 'name' is unique
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Hash the password (if you are using a password field)
        // const hashedPassword = await bcrypt.hash(password, 10); // Uncomment if using a password

        // Create a new user
        const newUser  = new User({
            name,
            dob,
            selectedDoctor,
            deliveryDate,
            diseases, // Store the selected diseases
            // password: hashedPassword // Uncomment if using a password field
        });

        // Save the user to the database
        await newUser.save();

        // Optionally, create and assign a token (if you want to log in the user immediately)
        const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token }); // Respond with the token
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;