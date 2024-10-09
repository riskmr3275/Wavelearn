const { passwordSuccess } = require("../Mail/Template/passwordSuccessfull")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto=require("crypto")

// resetPassworToken
exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        // check exitence of user
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Your Email is not registered"
            })
        }
        // generate token
        const token = crypto.randomUUID();
        const updateDetails = await User.findByIdAndUpdate({ _id:user._id }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true })

        // Frontnd ka url genrate kara
        const url = `http://localhost:3000/update-password/${token}`
        // Sending the url via mail to the user
        await mailSender(email, "Reset passwrod link", `Passwrd reset Link:${url}`)

        return res.status(200).json({
            success: true,
            message: "Email Sent successfully,please check email",
            token:token
        })

    } catch (error) {
        console.log("error form the reset password", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reset the password",
            error:error.message
        })
    }
}


exports.resetPassword = async (req, res) => {
    // data fetch
    // valodation
    // get userdetail from db using token
    // if no entry envalid tiken
    // token time check
    // hash password
    // password update
    // return response
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // valodation
        if (password != confirmPassword) {
            return res.json({
                success: false,
                message: "Both Password must be same"
            })
        }
        // get userdetail from db using token
        const userDetails = await User.findOne({ token: token })
        // if no entry envalid tiken
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid"
            })
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired, please generate it again"
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // password update
        const user=await User.findOne({token:token})
        await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true })
        // return response
        await mailSender(user.email,"Your Password is reset",passwordSuccess(user.firstName,user.email))
        return res.status(200).json({
            success: true,
            message: "Password reset Successfully"
        })
    } catch (error) {
        console.log("Error occure from resetPassword token", error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while  reseting the password",
            error:error.message
        })
    }


}