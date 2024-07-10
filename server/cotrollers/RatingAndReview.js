const Course = require("../models/Course")
const User = require("../models/User")
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");
const  mailSender =require("../utils/mailSender")
const {feedbackMail} =require("../Mail/Template/Feedback")
const Feedback=require("../models/Feedback")
exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        // fetch data from req ki body
        const { rating, review, courseId } = req.body
        // check user enrolled or not new method of searching
        const courseDetails = await Course.findOne({ _id: courseId, studentsEnrolled: { $eleMatch: { $req: userId } } })
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled for this course"
            })
        }
        //check user is already review or not
        const alreadyReview = await RatingAndReview.findOne({ user: userId, course: courseId })
        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: "Course Already Review"
            })
        }
        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId
        })
        // update the rating review into the course
        const updateCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    RatingAndReview: ratingReview._id
                }
            },
            {
                new: true
            }
        )
        // return respnse 
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            ratingReview
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}




// +++++++++++++++get Average Rating++++++++++++++++++++++++++++++++++++++++++++++

exports.getAverageRating = async (req, res) => {
    try {
        // get course ID
        const courseId = req.body.courseId
        // calculate the average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])
        // return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Successfully fetch",
                averageRating: result[0].averageRating
            })
        }
        // if their is no any rating till now
        return res.status(200).json({
            success: true,
            message: "Average rating is 0,No rating given till Now",
            averageRating: 0
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: true,
            message: "server error"
        })
    }
}


// Get All rating++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.getAllRatingReview = async (req, res) => {
    try {
        const allRev = await RatingAndReview.find({}).populate({
            path: "User",
            select: "firstName lastName,email,image"
        }).populate({
            path: "Course",
            select: "courseName"
        }).exec();
        return res.status(200).json({
            success: true,
            message: "All review fetcg successfully",
            allRev
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "something went wrong while finding the review"
        })
    }
}

exports.getFeedback=async(req,res)=>{
    try {
        const {firstname,lastname,email,phoneNo,message}=req.body
        if(!firstname||!lastname||!email||!message||!phoneNo)
        {
            return res.status(400).json({
                success:false,
                message:"All Field are required"
            })
        }
        console.log(req.body);
        const feed=await Feedback.create({
            firstname,
            lastname,
            email,
            phoneNo,
            message
        })
        await mailSender(email,"Thank you for giving your valuable feedback",feedbackMail(firstname))
        return res.status(200).json({
            success:true,
            message:"Feedback submitted", 
            data:feed
        })
    } catch (error) {
        console.log("errro from feedBack field",error);
        return res.status(500).json({
            success:false,
            message:"internal Sever error"
        })
        
    }
}