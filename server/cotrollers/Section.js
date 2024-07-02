const Course = require("../models/Course")
const Section = require("../models/Section")

exports.createSection = async (req, res) => {
    try {
        // Fetch the section name and course id
        const { sectionName, courseId } = req.body;
        // Validate the input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        // create section
        const newSection = await Section.create({ sectionName })
        // update the course with secctoin object id
        const updateCourseDeatils = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id
            }
        }, { new: true })

        // HW: use populate to replace section/sub-sections both in the updateCourseDetails
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updateCourseDeatils
        })
    } catch (error) {
        console.log("Errro occure from the section creted module", error);
        return res.status(400).json({
            success: false,
            message: "something went wrong while creating the section",
            error:error.message
        })
    }
}

// ++++++++++++++++++++++++++Update the section+++++++++++++++++++++++++++++++++++++

exports.updateSection=async (req,res)=>{
    try {
        // Fetch the section name and course id
        const { sectionName, sectionId } = req.body;
        // Validate the input
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        // Update data
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })
    } catch (error) {
        console.log("Errro occure from the section updated module", error);
        return res.status(400).json({
            success: false,
            message: "something went wrong Unable to update section",
            error:error.message
        })
    }
}


// +++++++++++++++++++==Delete Section


exports.deleteSection=async(req,res)=>{
    try {
        // fetch data from params
        const {sectionId}=req.params;
        // delete the section
        // TODO: do we need to delete the entry from the course schema
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"Sectin deleted successfully"
        })

    } catch (error) {
        console.log("Errro occure from the section deleted module", error);
        return res.status(400).json({
            success: false,
            message: "something went wrong Unable to delete section",
            error:error.message
        })
    }
}