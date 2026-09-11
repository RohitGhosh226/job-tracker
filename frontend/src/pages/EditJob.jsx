import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../api/api";

function EditJob() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getJob = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch job");
        }

        setFormData({
          company: data.company ?? "",
          role: data.role ?? "",
          status: data.status ?? "Applied",
          location: data.location ?? "",
          workingHours: data.workingHours ?? "",
          post: data.post ?? "",
          salary: data.salary ?? "",
        });

        setLoading(false);
      } catch (error) {
        console.log("Fetch job error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          salary: Number(formData.salary),
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update job");
      }

      navigate("/jobs");
    } catch (error) {
      console.log("Update error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading job...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
  <div className="form-container">
    <h1>Edit Job</h1>

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
          name="post"
          placeholder="Post"
          value={formData.post}
          onChange={handleChange}
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;
