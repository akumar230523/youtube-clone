import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

// User sign up.
export const signup = async (req, res) => {
    const { username, email, password, avatarURL } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken. Please try different name." });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        await User.create({ userId: username, username, email, password: hashedPassword, avatarURL });
        return res.status(201).json({ message: "Signed up successfully." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Please try again." });
    }
};

// User sign in.
export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "2d" });
        return res.status(200).json({ message: "Signed in successfully.", token, user });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Please try again." });
    }
};
