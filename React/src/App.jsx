import { useState, } from 'react'
import { RoleContext } from "./context/RoleContext";
import { NotificationContext } from "./context/NotificationContext";
import ControlPanel from "./components/ControlPanel";
import './App.css'
import ToDo from "./components/ToDo";
function App() {
  // const role = "admin"; // try "user"
  
  const [msg,setMsg] = useState("");
  const [type,setType]=useState("");
  const [isVisible,setIsVisible] = useState(false);
  
  const handleSubmit = () => {
    setMsg(document.getElementById("msg").value);
    setType(document.getElementById("type").value);
    setIsVisible(true);
  };
  return (
    // <RoleContext.Provider value={role}>
    //   <ControlPanel />
    // </RoleContext.Provider>
    <>
    {/* <input type="text" id="msg"/>
    <input type="text" id="type"/>
    <button onClick={handleSubmit}>Submit</button>
    <NotificationContext.Provider value={{msg, type, isVisible}}>
      <ControlPanel />
    </NotificationContext.Provider> */}
    <ToDo/>
    </>
  );
}

export default App
