import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginLogic from "./LoginLogic";
import Home from "./Home";

const Navigate: React.FC = () => {
    let isLoggedIn = true;
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/home" element={<Home />} />
                ) : (
                    <Route path="/" element={<Navigate />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}
export default Navigate;