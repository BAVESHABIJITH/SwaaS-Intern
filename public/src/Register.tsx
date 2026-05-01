import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('Job Seeker');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register submitted:', { fullName, email, accountType, password, confirmPassword });
        // Add your registration logic here
    };

    const handleGoogleRegister = () => {
        console.log('Continue with Google clicked');
        // Add your Google registration logic here
    };

    return (
        <div>
            <div>
                <h1>JobSeek</h1>
                <p>Your Gateway to Career Success</p>
                <h2>Create Account</h2>
                <p>Join JobSeek and start your career journey today.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Account Type</label>
                    <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        required
                    >
                        <option value="Job Seeker">Job Seeker</option>
                        <option value="Recruiter">Recruiter</option>
                    </select>
                </div>

                <div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password *"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                <div>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password *"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                <div>
                    <button type="submit">Create Account</button>
                </div>
            </form>

            <p>OR</p>

            <button type="button" onClick={handleGoogleRegister}>
                G Continue with Google
            </button>

            <div>
                <p>
                    Already have an account? <Link to="/">Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
