import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },
    post: {
  type: String
},

    status: {
        type: String,
        required: true,
        enum: ["Applied", "Interview", "Rejected", "Offer", "Withdrawn"]
    },

    location: {
        type: String,
        required: true
    },

    workingHours: {
        type: String
    },

    salary: {
        type: Number
    },

    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract"]
    },

    appliedDate: {
        type: Date,
        default: Date.now
    },

    notes: {
        type: String
    },

     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
}});

const Job = mongoose.model("Job", jobSchema);

export default Job;