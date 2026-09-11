import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/jobs`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

if (response.status === 401) {
  localStorage.removeItem("token");
  navigate("/login");
  return;
}

const data = await response.json();
setJobs(data);}
    getJobs();
  }, [navigate]);

  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interview = jobs.filter((job) => job.status === "Interview").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;
  const offer = jobs.filter((job) => job.status === "Offer").length;

  return (
    <div className="dashboard">
      <h1>Job Tracker Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p>{jobs.length}</p>
        </div>

        <div className="stat-card">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <p>{interview}</p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>

        <div className="stat-card">
          <h3>Offers</h3>
          <p>{offer}</p>
        </div>
      </div>

      <h2>Recent Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.slice(-5).reverse().map((job) => (
          <div className="recent-job" key={job._id}>
            <strong>{job.company}</strong>
            <span>{job.role}</span>
            <span>{job.post || "N/A"}</span>
            <span>{job.status}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;