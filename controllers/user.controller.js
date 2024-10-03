const { hashedPassword, comparePassword } = require("../helpers/auth.helper");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name) {
            return res.status(400).send({
                message: "Name is required",
                success: false,
            });
        }
        if (!email) {
            return res.status(400).send({
                message: "Email is required",  // corrected
                success: false,
            });
        }
        if (!password || password.length < 8) {
            return res.status(400).send({
                message: "Password is required and must be at least 8 characters",
                success: false,
            });
        }

        // Existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({  // changed to 409 Conflict
                message: "Email is already registered",
                success: false
            });
        }

        // Hash password
        const hashPassword = await hashedPassword(password);

        // Save user
        const user = await userModel({ name, email, password: hashPassword }).save();
        
        // Hide password
        user.password = undefined;

        return res.status(201).send({
            message: "User created successfully",
            success: true,
            user  // Optionally include user info in the response
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error",
            success: false,
            error: err.message,  // Include error message for debugging
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email) {
            return res.status(400).send({
                message: "Email is required",
                success: false,
            });
        }
        if (!password) {
            return res.status(400).send({
                message: "Password is required",
                success: false,
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                message: "User not found",
                success: false,
            });
        }

        // Match password
        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(401).send({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        // Hide password
        user.password = undefined;

        return res.status(200).send({
            message: "User logged in",
            success: true,
            user,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error logging in",
            success: false,
            error: err.message,  // Include error message for debugging
        });
    }
};

module.exports = { registerController, loginController };
