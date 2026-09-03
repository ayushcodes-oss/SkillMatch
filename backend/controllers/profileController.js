const Profile = require("../models/Profile");

const createProfile = async (req,res) =>{
  try{
    const profile = await Profile.create({
      user:req.user.id,
      ...req.body
    });
    res.status(201).json({
      message:"Profile Created Successfully",
      Profile
    });
  } catch(error){
    res.status(500).json({
      message:"Server Error",
      error : error.message
    });
  }
};


const getProfile = async (req,res) =>{
  try{
    const profile = await Profile.findOne({
      user:req.user.id
    });
    if(!Profile){
      return res.status(404).json({
        message:"Profile not found"
      });
    }
    res.status(200).json(profile);
  } catch(error){
    res.status(500).json({
      message:"Server Error",
      error : error.message
    });
  }
};



const updateProfile = async (req,res) =>{
  try{
    const profile = await Profile.findOneAndUpdate({
      user:req.user.id},
      req.body,
      {new : true}
    );
    if(!Profile){
      return res.status(404).json({
        message:"Profile not found"
      });
    }
    res.status(200).json({
      message:"Profile updated Successfully",
      Profile
    });
  } catch(error){
    res.status(500).json({
      message:"Server Error",
      error : error.message
    });
  }
};



const deleteProfile = async (req,res) =>{
  try{
    const profile = await Profile.findOneAndDelete({
      user:req.user.id
    });
    if(!Profile){
      return res.status(404).json({
        message:"Profile not found"
      });
    }
    res.status(200).json({
      message:"Profile deleted Successfully"
    });
  } catch(error){
    res.status(500).json({
      message:"Server Error",
      error : error.message
    });
  }
};


module.exports = {
  createProfile,getProfile,updateProfile,deleteProfile
};

