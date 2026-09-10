import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function AddJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    location: "",
    workingHours: "",
    post: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    navigate("/jobs");
  };

    return (
  <div className="form-container">
    <h1>Add Job</h1>

    <form className="job-form" onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />

      <input
        name="post"
        placeholder="Post"
        value={formData.post}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
        <option value="Withdrawn">Withdrawn</option>
      </select>

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <input
        name="workingHours"
        placeholder="Working Hours"
        value={formData.workingHours}
        onChange={handleChange}
      />

      <input
        name="salary"
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />

      <button type="submit">Add Job</button>
    </form>
  </div>
);
}

export default AddJob;