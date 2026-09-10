import { useEffect, useState } from "react";
import API_URL from "../api/api";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const getJobs = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setJobs(data);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setJobs((currentJobs) =>
        currentJobs.filter((job) => job._id !== id)
      );
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.company.toLowerCase().includes(searchText) ||
      job.role.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>All Jobs</h1>

      <input
        type="text"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>

      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Jobs;