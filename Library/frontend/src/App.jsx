import { BrowserRouter, Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material"
import { useState, useEffect } from "react"
import AppRouter from "./routes/AppRouter"
import "./index.css"

function Navigation() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          The City Library
        </Typography>
        
        {!user ? (
          <Button color="inherit" component={Link} to="/login">
            LOGIN
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              Welcome, <strong>{user.name}</strong>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              LOGOUT
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <AppRouter />
        </Container>
      </Box>
    </BrowserRouter>
  )
}
