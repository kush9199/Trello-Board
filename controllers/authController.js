const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");
const { ROLE } = require("../utils/constants");

// -------------------------
// User Signup
// -------------------------
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await userModel.findOne({
            username
        });

        if (userExists) {
            return res.status(411).json({
                message: "User with this username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            role: ROLE.USER
        });

        res.json({
            id: newUser._id,
            message: "You have signed up successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// -------------------------
// Admin Signup
// -------------------------
const adminSignup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await userModel.findOne({
            username
        });

        if (userExists) {
            return res.status(411).json({
                message: "User with this username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            role: ROLE.ADMIN
        });

        res.json({
            id: newUser._id,
            message: "Admin created successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// -------------------------
// Signin
// -------------------------
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({
            username
        });

        if (!user) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            "attlasiationsupersecret123123password"
        );

        res.json({
            token,
            role: user.role
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    signup,
    adminSignup,
    signin
};