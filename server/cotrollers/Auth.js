const User = require("../models/User")
const OTP = require("../models/Otp")
const otpGenerate = require("otp-generator")
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
const { findOneAndUpdate } = require("../models/Category")
const mailSender = require("../utils/mailSender")
const {accountLogin}=require("../Mail/Template/AccountLogin")
require("dotenv").config()
// const cookie=require("cookie-parser")


// ++++++++++++++++++++++++++++++++++++++++++++++++=Send Otp Function++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.sendotp = async (req, res) => {
    try {
        // fetch email from reqki body
        const { email } = req.body;

        // check EMail is already Registered or not
        const checkUserPresent = await User.findOne({ email });

        //    If already Exixst then ,return a resoinse///////////////////
        if (checkUserPresent) {
            return res.status(200).json({
                success: false,
                message: "User Already Exist"
            })
        }

        // Otp generate
        let otp = otpGenerate.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log(otp);

        // if Otp unique na ho aur db me exits krti ho toh agian n again otp regenerate krna hoga
        let result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerate.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: otp })
        }

        // Agar unique otp mil gyi toh db me store karenge
        const payLoad = { email, otp }

        const otpBody = await OTP.create(payLoad)
        // after creating the payload to the model schema on that time mailsender middleware is called and otp sent to your email address
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "Otp Generate Successfully",
            otp
        })


    } catch (error) {
        console.log("Error genrated from Auth File", error);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}


// +++++++++++++++++++++++++++++++++++++Sign Up Authentication+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.signup = async (req, res) => {
    try {
        // Saare information body se nikal lo
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        // Validate kalro sare body values ko
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        //Dono password match kar lo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both password must be same, Please try again"
            })
        }
        // checj User already exixstr or not
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
        // find most recent password store for the user in Database 
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        // validate otp
        if (recentOtp.length == 0) {
            // otp not found
            return res.status(400).json({
                success: false,
                message: " OTP not found"
            })
        } else if (otp != recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }
        // Passwrod hash
        const hashedPassword = await bcrypt.hash(password, 10)
        // Additiional Details for profile
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            // creating automatic image or we can say dafault imge api
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        return res.status(200).json({
            success: true,
            message: "User id registered successfully",
            user,
        })

    } catch (error) {
        console.log("Error from signUp", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later",
            error:error.message
        })
    }

}



// ++++++++++++++++++++++++++Login Setup FLow++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check empty toh nai hai koi filed
        if (!email || !password) {
            return res.send(400).json({
                success: false,
                message: "All field required"
            })
        }
        // User exist or not 
        const user = await User.findOne({ email }).populate("additionalDetails")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not registered please signup first"
            })
        }
        // generate JWT, after passeword matching
        if (await bcrypt.compare(password, user.password)) {
            const payLoad = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "2h" });
            user.token = token;
            user.password = undefined;
            // Create ccokie and send resposne
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),//represent the three days ,
                httpOnly: true
            }
            await mailSender(user.email,"Login Activity",accountLogin(user.firstName))
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successsfully"
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }
    } catch (error) {
        console.log("error from login methos", error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// ++++++++++++++++++++++++++++++++++++++=Change password +++++++++++++++++++++++++++++++++++++++++++++++++++

// HW 


// data fetch
// valodation
// get userdetail from db using token
// if no entry envalid tiken
// token time check
// hash password
// password update
// return response

// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Adjust the path as per your project structure

exports.changePassword = async (req, res) => {
    try {
        // Fetch Data
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.user._id; // Assuming user ID is available in req.user

        // Validate the input
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords must be the same, please try again"
            });
        }

        // Get user detail for verification
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the old password matches
        const checkPassword = await bcrypt.compare(oldPassword, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password does not match"
            });
        }

        // Hash the new password
        const finalPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = finalPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while changing the password",
            error: error.message
        });
    }
}
