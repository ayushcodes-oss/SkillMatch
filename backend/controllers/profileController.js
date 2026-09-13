const Profile = require("../models/Profile");


// ==================== CREATE PROFILE ====================

const createProfile = async (req, res) => {
    try {

        const existingProfile = await Profile.findOne({
            user: req.user.id
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "Profile already exists"
            });
        }

        const profile = await Profile.create({
            user: req.user.id,
            ...req.body
        });

        res.status(201).json({
            message: "Profile created successfully",
            profile
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== GET PROFILE ====================

const getProfile = async (req, res) => {
    try {

        const profile = await Profile.findOne({
            user: req.user.id
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json(profile);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== UPDATE PROFILE ====================

const updateProfile = async (req, res) => {
    try {

        const profile = await Profile.findOneAndUpdate(
            {
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== DELETE PROFILE ====================

const deleteProfile = async (req, res) => {
    try {

        const profile = await Profile.findOneAndDelete({
            user: req.user.id
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            message: "Profile deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
};