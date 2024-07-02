const SubSection = require("../models/SubSection")
const Section = require("../models/Section")
const {uploadImageToCloudinary} = require('../utils/ImageUploader')
exports.createSubSection = async (req, res) => {
    try {
        // Fetch data from request ki body
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;
        // Validation
        if (!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        // Upload to cloudinary
        const videoDeatils = await  uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        // Create subsection according to the schema
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: videoDeatils.secure_url
        })
        // upadte section with the help of subsection id
        const updateSection = await Section.findByIdAndUpdate({ _id: sectionId }, {
            $push:
            {
                SubSection: SubSectionDetails._id
            }
        }, { new: true })
        // TDOD:populate 
        return res.status(200).json({
            success: true,
            message: "subsection created successfully",
            updateSection
        })
    } catch (error) {
        console.log("error occure from", error);
        return res.status(400).json({
            success: false,
            message: "Error occure while creating the subsection",
            error:error.message
        })
    }
}



// TODO:
// Update subsection
// Delete subsection