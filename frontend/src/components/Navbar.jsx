import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Job Tracker</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/add-job">Add Job</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;