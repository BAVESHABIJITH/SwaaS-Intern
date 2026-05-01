import React from "react";

import { useNavigate } from "react-router-dom";

const LoginLogic: React.FC = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/home");
    }
    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default LoginLogic;