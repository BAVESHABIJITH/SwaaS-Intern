const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const updateProfile = async (req,res)=>{
    try {
        const user = await prisma.user.update({where:{id:req.user.id},
            select:{id:true,name:true,email:true},
            data: {
                name:req.body.name,
                email:req.body.email,
            }
        }
        );
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const createResume = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const { title, content } = req.body;
    const resume = await prisma.resume.create({
      data: {
        title,
        content,
        userId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const getMyResumes = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id }
    });
    res.status(200).json({
      success: true,
      message: "Resumes fetched successfully",
      resumes
    });

  } catch (error) {
    console.error("getMyResumes error", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const deleteResume = async (req, res) => {
  try{
    const resume= await prisma.resume.delete({where:{ id: Number(req.params.id) }});
    res.status(200).json({
      success:true,
      message:"Resume deleted successfully",
      resume
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    }
  )}
}
const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { title, content } = req.body;

    const resume = await prisma.resume.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        content
      }
    });

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const getResumeById = async (req,res)=>{
  try{
    const resume = await prisma.resume.findUnique({where:{id:Number(req.params.id)}});
    res.status(200).json({
      success:true,
      message:"Resume fetched successfully",
      resume
    })
  }
  catch(err){
    throw err;
  }
}


module.exports = {updateProfile, createResume, getMyResumes, deleteResume,updateResume,getResumeById};