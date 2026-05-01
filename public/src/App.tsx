// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import PostJob from './PostJob'
import CreateResume from './CreateResume'
import Jobs from './Jobs'
import Application from './Application'
function App() {
  let user1="User1@xyz.com";
  let password1="123456";
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/create-resume" element={<CreateResume />} />
      <Route path="/application" element={<Application />} />
    </Routes> 
    </BrowserRouter>
     
    </>
  )
}

export default App
