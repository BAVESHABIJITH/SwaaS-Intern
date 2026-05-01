import { Routes, Route } from "react-router-dom";
import React from "react";

import Jobs from "../pages/jobs/Jobs";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { UserDashboard } from "../pages/dashboard/UserDashboard";
import JobDetails from "../pages/jobs/JobDetails";
import UserProfile from "../pages/profile/userProfile";
import UserApplications from "../pages/application/userApplications";
import Resume from "../pages/resume/Resume";
import CreateResume from "../pages/resume/CreateResume";
import { PublicRoutes } from "./PublicRoutes";
import ResumeView from "../pages/resume/ResumeView";
import MyJobs from "../pages/jobs/MyJobs";
import PostJob from "../pages/jobs/PostJob";
import ViewJob from "../pages/jobs/ViewJob";
import EditJob from "../pages/jobs/EditJobPage";
const IndexRouter: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="UserDashboard" element={<UserDashboard />} />
        <Route path="jobs/:id/details" element={<JobDetails />} />
        <Route path="UserProfile" element={<UserProfile />} />
        <Route path="myApplications" element={<UserApplications />} />
        <Route path="myResumes" element={<Resume />} />
        <Route path="updateResume/:id" element={<CreateResume />} />
        <Route path="createResume" element={<CreateResume />} />
        <Route path="getResumeById/:id" element={<ResumeView />} />
        <Route path="myJobs" element={<MyJobs />} />
        <Route path="createJob" element={<PostJob />} />
        <Route path="getJobById/:id" element={<ViewJob />} />
        <Route path="editJob/:id" element={<EditJob />} />

      </Route>

      <Route element={<PublicRoutes />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

    </Routes>
  );
};

export default IndexRouter;