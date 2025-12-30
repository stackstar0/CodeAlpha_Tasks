const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'supersecretkey_dev'; // In production, use environment variable

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, isAdmin: user.isAdmin },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};
