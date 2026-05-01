import React, { useState } from "react"
import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email === "admin@library.com") {
      const user = { name: "Librarian", role: "librarian", email };
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("storage"));
      navigate("/librarian");
      return;
    }
    
    const dummyId = email === "arjun@gmail.com" ? 2 : 1;
    const user = { 
      id: dummyId, 
      name: email.split('@')[0], 
      role: "member", 
      email 
    };
    
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("storage"));
    navigate("/member");
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login to City Library
        </Typography>
        
        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              fullWidth
              sx={{ mt: 1 }}
            >
              Sign In
            </Button>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                <strong>Member Emails:</strong><br/>
                baveshabijith@gmail.com<br/>
                arjun@gmail.com
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                <strong>Librarian:</strong> admin@library.com
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
