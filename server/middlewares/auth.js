const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User")

// auth
exports.auth = async (req, res, next) => {
    try {
        // Extract Token
        const token = req.cookies.token || req.body.token || req.header("authorization").replace("Bearer", "");
        // if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing"
            });
        }
        // verify the token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)//decode conatin payload
            console.log(decode);
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while validating the token"
        })
    }
}

// ++++++++++++++++++++++++++++isStudent+++++++++++++++++++++++++++++++++++++++++++


exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for student only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot verified please try again"
        });
    }
}

// +++++++++++++++++=IsInstructor+++++++++++++++++++++++++++++++

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot verified please try again"
        });
    }
}

// ++++++++++++++++++isAdmin++++++++++++++++++


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot verified please try again"
        });
    }
}