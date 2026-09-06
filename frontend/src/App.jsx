import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications"element={<MyApplications />}/>
        <Route path="/post-job"element={<PostJob />}/>
        <Route path="/my-jobs"element={<MyJobs />}/>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;