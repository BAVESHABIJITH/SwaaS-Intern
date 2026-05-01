// import './App.css'
// import LoginPage from './LoginPage'
// import RegistrationPage from './RegistrationPage'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

// interface User{
//   name: string;
//   age: number;
// }
const App : React.FC = () => {
  // const [user, setUser] = useState<User | null>(null);
  return (
    // <div>
    //   <button onClick={()=>setUser({name: "Bavesh", age: 21})}>Set User</button>
    //   {user && <p>Name: {user.name}, Age: {user.age}</p>}
    // </div>
    // <BtnInc/>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/registration" element={<RegistrationPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
