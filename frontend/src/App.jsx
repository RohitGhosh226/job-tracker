import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Jobs from "./pages/Jobs"
import AddJob from "./pages/Addjob"
import Navbar from "./components/Navbar"
import Register from "./pages/register";
import Login from "./pages/login";
import EditJob from "./pages/EditJob";


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/edit-job/:id" element={<EditJob />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App