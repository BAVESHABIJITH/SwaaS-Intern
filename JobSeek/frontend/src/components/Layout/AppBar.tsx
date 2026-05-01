import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Link
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
// Props interface
interface AppBarProps {
  title?: string;
  onMenuClick?: () => void;
  showMenuIcon?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({
  title = "My App",
  onMenuClick,
  showMenuIcon = true,
}) => {
  const {isAuthenticated, user, logout} = useAuth();
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const initial = user?.name?.[0] || "U";
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <MuiAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Mobile Menu Icon */}
        {showMenuIcon && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Title */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Right side */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          
          {/* Theme Toggle */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* NOT Logged In */}
          {!isAuthenticated && (
            <>
              <Link
                color="inherit"
                variant="button"
                component={RouterLink}
                to="/auth/login"
                underline="none"
              >
                Login
              </Link>

              <Link
                color="inherit"
                variant="button"
                component={RouterLink}
                to="/register"
                underline="none"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged In */}
          {isAuthenticated && (
            <>
              <Tooltip title="Account settings">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar>
                   {initial}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/Userprofile")}>
                  <PersonIcon/>Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                 <LogoutIcon/> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
