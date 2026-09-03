const recruiterDashboard = (req,res) =>{
  res.status(200).json({
    message:"welcome to recruiter dashboard",
    user:req.user
  });
}

module.exports = {recruiterDashboard};