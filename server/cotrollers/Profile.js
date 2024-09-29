const { ProfilePicUpdate } = require("../Mail/Template/ProfilePicUpdate");
const Profile = require("../models/Profile");
const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const { uploadImageToCloudinary } = require("../utils/ImageUploader");
// +++++++++++++++Profle update ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.updateProfile = async (req, res) => {
    try {
        // Get data from request body
        const { dateOfBirth = "", about = "", contactNumber = "", gender = "" } = req.body;

        // Get user id from request body
        const id = req.user.id;

        // Validate required fields
        if (!contactNumber || !gender||!id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find user details
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        userDetails.contactNumber=contactNumber
        await userDetails.save()
        // Find profile details
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Update profile details
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        // Return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails
        });

    } catch (error) {
        console.error("Error updating profile: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// ++++++++++++++Delete Account++++++++++++++++++++++++++++++++++++

exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const id = req.body.id||req.user.id
        // find user
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        // delete the profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })
        // delete the User
        await User.findByIdAndDelete({ _id: id })
          //  // return response
        return res.status(200).json({
            success: true,
            message: "Account delete successfully"
        })
    } catch (error) {
        console.error("Error delete Account: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error,can't deleted the account"
        });
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const allUserDetails = await User.findById({_id:id}).populate("additionalDetails").exec()
        return res.status(200).json({
            success: true,
            message: "User Details fetch Successfully",
            allUserDetails
        })
    } catch (error) {
        console.error("Error getAllUserdatail: ", error);
        return res.status(500).json({
            success: false,
            message: "User not found"
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        // Fetch account and image URL from request
        const imageUrl = req.files.displayPicture; // Assuming imageUrl is sent in the body
        const id = req.user.id;

        // Validate inputs
        if (!imageUrl || !id) {
            return res.status(400).json({
                success: false,
                message: "Please upload the image or all fields are required."
            });
        }

        // Fetch user details
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Upload image to Cloudinary (assuming uploadImageToCloudinary is an async function)
        const finalImageUrl = await uploadImageToCloudinary(imageUrl, process.env.FOLDER_NAME,
            1000,
            1000);

        // Update user details with the new image URL
        userDetails.image = finalImageUrl.secure_url;
        await userDetails.save();
        await mailSender(userDetails.email,"Update Successfully",ProfilePicUpdate())
        res.send({
            success: true,
            message: `Image Updated successfully`,
            userDetails
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Can't upload image right now, try again later.",
            error:error.message
        });
    }
};
