import Job from "../models/job.js";

const createJob = async (req, res) => {
  try {
    const { company, role, status, location, workingHours, post, salary } = req.body;

    const job = await Job.create({
      company,
      role,
      status,
      location,
      workingHours,
      post,
      salary,
      user: req.user
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message
    });
  }
};
const getJobs = async(req, res)=>{
  try{
    const jobs = await Job.find({ user: req.user }) ;
    res.status(200).json(jobs);
} catch(error){
  res.status(500).json({
    message: "failed to fetch jobs",
    error: error.message 
  });
}
};


const getJob = async (req, res) => {
  try {
  
    const job = await Job.findOne({
  _id: req.params.id,
  user: req.user
});

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message
    });
  }
};

 const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export { createJob,
  getJobs, getJob, updateJob, deleteJob 
 };