import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { NotificationContext } from "../context/NotificationContext";

function ControlPanel() {
  // const role = useContext(RoleContext);
  const notification = useContext(NotificationContext);
  
  return (
    <>
      {notification.isVisible && (
       notification.type==="success"? <p style={{backgroundColor:"green"}}>{notification.msg}</p> : null
      )}
      {notification.isVisible && (
       notification.type==="error"? <p style={{backgroundColor:"red"}}>{notification.msg}</p> : null
      )}
      {notification.isVisible && (
       notification.type==="info"? <p style={{backgroundColor:"blue"}}>{notification.msg}</p> : null
      )}
    </>
  );
}

export default ControlPanel;
