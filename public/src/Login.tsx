import React, { useState } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import { Link } from 'react-router-dom';
const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login submitted:', { email, password });
        // Add your login logic here
    };

    const handleGoogleLogin = () => {
        console.log('Continue with Google clicked');
        // Add your Google login logic here
    };
    let user1="user1@xyz.com";
    let password1="123456";
    return (
        <div>
            <div>
                <h1>JobSeek</h1>
                <p>Your Gateway to Career Success</p>
                <h2>Welcome Back</h2>
                <p>Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <Input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password *"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Button>
                </div>

                <div>
                    {email==user1 && password==password1 ? 
                    <Link to="/jobs"><Button type="submit">Sign In</Button></Link> : 
                    <Link to="/"><Button type="submit">Sign In</Button></Link>}
                </div>
            </form>

            <p>OR</p>

            <Button type="button" onClick={handleGoogleLogin}>
                G Continue with Google
            </Button>

            <div>
                <p>
                    Don't have an account? <Link to="/register">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
