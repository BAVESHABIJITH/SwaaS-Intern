import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
    return (
        <>
            <nav>
                <ul>
                    {/* normal routes */}
                    <p>normal routes </p>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <br />

                    <li><Link to="/createresume">Create Resume(User-access)</Link></li>
                    <li><Link to="/applications">Applications(User-access)</Link></li>
                    <br />
                    <p>nested and dynamic rountes  Recuriter Page</p>
                    {/* nested rountes  Recuriter Page*/}
                    <li><Link to="/recruiter/jobs">My Jobs (Recruiter-access)</Link></li>
                  </ul>
            </nav>
        </>
    )
}
export default Navbar