const mongoose = require("mongoose")
const { type } = require("os")
const Profile = require("../models/Profile")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber:
    {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    realPassword: {
        type: String
    },
    // The "accountType" field in your Mongoose schema is a string that can only have one of three values: "Admin," "Student," or "Instructor."
    // This is enforced using the enum property in the schema definition.
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],//The enum property restricts a field to a predefined set of values.
        required: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    token: {
        type: String,
        expires: 5 * 60 * 60 //5 hours in seconds
    },
    resetPasswordExpires: {
        type: Date
    },
    image: {
        type: String,
        required: true
    },
    courseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    },

})

module.exports = mongoose.model("User", userSchema);