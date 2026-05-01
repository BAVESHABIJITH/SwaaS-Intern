import React, { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "./AppBar";
import Sidebar from "../Layout/SideBar";
import type { SidebarMenuItem } from "../Layout/SideBar";

// Interface defines the props for Layout component
interface LayoutProps {
  children: React.ReactNode; // Required: content to display in main area
  title?: string; // Optional: app bar title
  menuItems?: SidebarMenuItem[]; // Optional: sidebar menu items
  sidebarWidth?: number; // Optional: width of sidebar (default 240)
}

// Layout component wrapping AppBar and Sidebar with responsive behavior
const Layout: React.FC<LayoutProps> = ({
  children,
  title = "MUI Learning Project",
  menuItems = [],
  sidebarWidth = 240,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        title={title}
        onMenuClick={handleDrawerToggle}
        showMenuIcon={isMobile && menuItems.length > 0}
      />

      {/* Sidebar - Permanent on desktop, temporary on mobile */}
      {menuItems.length > 0 && (
        <>
          {/* Mobile Drawer */}
          {isMobile && (
            <Sidebar
              open={mobileOpen}
              onClose={handleDrawerToggle}
              menuItems={menuItems}
              variant="temporary"
              width={sidebarWidth}
            />
          )}

          {/* Desktop Drawer - Always visible */}
          {!isMobile && (
            <Sidebar
              open={true}
              onClose={() => {}}
              menuItems={menuItems}
              variant="permanent"
              width={sidebarWidth}
            />
          )}
        </>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
