import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  Typography,
  TextField,
  Link,
  OutlinedInput,
  Button,
  InputAdornment,
  InputLabel,
  IconButton
} from '@mui/material';
import { useAuth } from "../../hooks/useAuth.ts";
import {
  GradStyleTypography,
  GoogleLoginButton,
  GradBackground,
  AuthCard
} from "../../style/modules/login.style.tsx";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  // const { setUserMail, setUsertype } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const success = await login(formData);
    if (success) {
      navigate('/');
    }
};

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <GradBackground>
      <AuthCard>
        <Box textAlign="center" mb={3}>
          <GradStyleTypography variant="h3">
            JobSeek
          </GradStyleTypography>

          <Typography fontWeight="light">
            Your Gateway to Career Success
          </Typography>

          <Typography variant="h5" mt={2}>
            Welcome Back
          </Typography>

          <Typography fontWeight="light">
            Sign in to your account to continue
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              
            />
          </FormControl>

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
          >
            Login
          </Button>
        </Box>

        <Typography textAlign="center" my={2}>
          OR
        </Typography>

        <GoogleLoginButton
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Continue With Google
        </GoogleLoginButton>

        <Box textAlign="center" mt={3}>
          <Typography>
            Don't have an account?{" "}
            <Link
              component="button"
              underline="none"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </AuthCard>
    </GradBackground>
  );
};

export default Login;


