function JobCard({ job, onDelete }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h2>{job.company}</h2>
          <p>{job.role}</p>
        </div>

        <span className="job-status">{job.status}</span>
      </div>

      <div className="job-details">
        <p><strong>Post:</strong> {job.post || "N/A"}</p>
        <p><strong>Location:</strong> {job.location || "N/A"}</p>
        <p><strong>Working Hours:</strong> {job.workingHours || "N/A"}</p>
        <p><strong>Salary:</strong> {job.salary ?? "N/A"}</p>
      </div>

      <div className="job-actions">
        <button onClick={() => window.location.href = `/edit-job/${job._id}`}>
          Edit
        </button>

        <button onClick={() => onDelete(job._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;