const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User")

// auth
exports.auth =   (req, res, next) => {
    try {
        // Extract Token
        const token = req.cookies.token || req.body.token || req.header("authorization")?.replace("Bearer ", "");
        // if token is missing
        console.log("token is in auth::",token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing"
            });
        }
        // verify the token
        console.log("Going to do decode");
        try {
            const decode =   jwt.verify(token, process.env.JWT_SECRET)//decode conatin payload
            console.log(decode);
            req.user = decode
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
                error:error.message
            });
        }
        
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
                success: false,
                message: "This is protected route for student only"
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
                success: false,
                message: "This is protected route for Instructor only"
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
                success: false,
                message: "This is protected route for Admin only"
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



// Middleware in Node.js is a function that processes requests and responses in the middle
//  of the request-response cycle. It can modify the request and response objects, end the
//   request-response cycle, or call the next middleware function in the stack. Middleware
//   functions are essential for tasks such as handling authentication, logging, parsing request bodies, and more.