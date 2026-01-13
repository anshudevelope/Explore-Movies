const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

exports.register = async (req, res) => {
    let user;

    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "name, email & password required"
            });
        }

        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid email format",
        //     });
        // }

        // if (!passwordRegex.test(password)) {
        //     return res.status(400).json({
        //         success: false,
        //         message:
        //             "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
        //     });
        // }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Register Error:", error);

        if (user && user._id) {
            await User.findByIdAndDelete(user._id);
        }

        return res.status(500).json({
            success: false,
            message: "Registration failed. Please try again."
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.json({ success: false, message: "email & password required" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        return res.json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};
