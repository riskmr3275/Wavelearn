const Course = require("../models/Course")
const Tag = require("../models/Category")
const User = require("../models/User")

const { uploadImageToCloudinary } = require("../utils/ImageUploader")
const { path } = require("express/lib/application")
const { append } = require("express/lib/response")

// create the course handler function+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.createCourse = async (req, res) => {
    try {
        // fetch the data and handle it
        const { courseName, courseDescription, whatYouWillLearn, price, tag,category } = req.body;
        const thumbnail = req.files.thumbnailImage;
        // Validate the course
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag||!category) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId)
        console.log("Intructor Details:", instructorDetails);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instrutor Detail are not found"
            })
        }

        // check for given tag are valid or not
        const categoryDetails = await Tag.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag Details are not found"
            })
        }

        // Upload the thumnail to the cloud for the future access
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        // create the entry for the new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            category:category
        })
        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate({ _id: instructorDetails._id }, {
            $push: {
                courses: newCourse._id
            },
        }, { new: true })
        
        await Tag.findByIdAndUpdate(
            { _id: tagDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        // Update tag ka schema in HW khud se banana hai
        // return response

        return res.status(200).json({
            success: true,
            message: "Course created successfully",

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message
        })
    }
}


// ++++++++++++++=getAllCourse Handler function=========++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.getAllCourses = async (req, res) => {
    try {
        // HW:- Change the below statement incremetally
        // const allCourses = await Course.find({}, {
        //     courseName: true,
        //     price: true,
        //     thumbnail: true,
        //     instructor: true,
        //     ratingAndReviews: true,
        //     studentsEnrolled: true,
        // })
        const allCourses=await Course.find({}).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: "All courses fetch successfully",
            data: allCourses
        })
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course details",
            error: error.message
        })
    }
}
// +++++++++++++++++++++++++ getCOurse Detail++++++++++++++++++++++++++++++++++++

exports.getCourseDetails = async (req, res) => {
    try {
        // get id jo ham frontend se bhej denge
        const { courseId } = req.body
        // find the course details
        const courseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "SubSection"
                }
            }).exec();
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Could not find the course"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course Detail fetch successfully",
            data: courseDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Server error",
            error:error.message
        })
    }
}