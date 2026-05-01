import React from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import UserProfile from "./UserProfile";

const UseParams: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <nav>
                    <Link to="/user/bavesh">Bavesh</Link> | {' '}
                    <Link to="/user/abijith">Abijith</Link>
                </nav>
                <Route path="/user/:username" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}
export default UseParams;