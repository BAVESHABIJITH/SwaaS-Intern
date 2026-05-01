const prisma = require("../config/prisma");
const createJob = async (req, res) => {
  try {
    const {  title, description, company, location, salary, skills, status} = req.body;
    if (!title || !description || !company) {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing"
        });
    }
    const job = await prisma.job.create({
      data: {
        title,description,company,location,salary,skills,status,recruiterId: req.user.id
      }
    });
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const getMyJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { recruiterId: req.user.id}
    });
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs
    });

  } catch (error) { throw error;}
}
const getJobById = async (req, res) => {
  try{
    const job = await prisma.job.findUnique({where:{id:Number(req.params.id)}});
    res.status(200).json({
      success:true,
      message:"Job fetched successfully",
      job
    })
  }
  catch(err){
    throw err;
  }
}
const editJob = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, company, location, salary, skills, status } = req.body;

    const existingJob = await prisma.job.findUnique({
      where: { id: Number(id) }
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }
    if (existingJob.recruiterId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this job"
      });
    }
    const updatedJob = await prisma.job.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        company,
        location,
        salary,
        skills,
        status
      }
    });
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
module.exports = {createJob, getMyJobs, getJobById,editJob };