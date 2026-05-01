import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import RegistrationPage from './components/RegistrationForm'
import HomePage from './components/HomePage'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
