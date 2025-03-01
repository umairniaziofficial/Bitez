import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../model/User";
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(400).json({ error: errorMessage });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            username,
        });
        if (!user) {
            throw new Error('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign({
            username
        }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(400).json({ error: errorMessage });
    }
});

export default router;