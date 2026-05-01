import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GradStyleTypography,
  GradBackground,
  AuthCard
} from "../../style/modules/login.style.tsx";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
  Box,
  Typography,
  FormControl,
  TextField,
  OutlinedInput,
  InputAdornment,
  Button,
  IconButton
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useAuth } from "../../hooks/useAuth.ts";
const Register: React.FC = () => {

  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      role: event.target.value
    }));
  };

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Clicked");
   
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    }
    const success = await register(dataToSend);

    if (success) {
      navigate('/');
    }
  };

  return (
    <GradBackground>
      <AuthCard >

        <Box textAlign="center" mb={3}>
          <GradStyleTypography variant="h3">
            JobSeek
          </GradStyleTypography>

          <Typography fontWeight="light">
            Your Gateway to Career Success
          </Typography>

          <Typography variant="h5" mt={2}>
            Create Account
          </Typography>

          <Typography fontWeight="light">
            Join JobSeek and start your career journey today.
          </Typography>
        </Box>

        <Box>

          {/* Name */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          {/* Email */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          {/* Account Type */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="account-type-label">
              Account Type
            </InputLabel>

            <Select
              labelId="account-type-label"
              label="Account Type"
              value={formData.role}
              onChange={handleSelectChange}
            >
              <MenuItem value="JOBSEEKER">Job Seeker</MenuItem>
              <MenuItem value="RECRUITER">Recruiter</MenuItem>
            </Select>
          </FormControl>

          {/* Password */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Password</InputLabel>

            <OutlinedInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              required
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Confirm Password */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Confirm Password</InputLabel>

            <OutlinedInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? 'text' : 'password'}
              required
              label="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
            onClick={handleSubmit}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

        </Box>

      </AuthCard>
    </GradBackground>
  );
};

export default Register;