const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    whatYouWillLearn:
    {
        type: String
    },
    courseContent:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }],
    ratingAndReviews: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }, 
    price: {
        type: Number
    },
    tag:
    {
        type: [String],
        required: true
    },
    thumbnail: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    instruction: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["Draft", "Published"]
    }
})

module.exports = mongoose.model("Course", courseSchema);