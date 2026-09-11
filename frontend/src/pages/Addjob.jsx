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

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        salary: formData.salary === "" ? undefined : Number(formData.salary),
      }),
    });

    const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        console.log("Create job failed:", data.message);
        return;
      }

      navigate("/jobs");
    } catch (error) {
      console.log("Create job request failed:", error.message);
    }
  };

    return (
  <div className="form-container">
    <h1>Add Job</h1>

    <form className="job-form" onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company"
        required
        value={formData.company}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        required
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
        required
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