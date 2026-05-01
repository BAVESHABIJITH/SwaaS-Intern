import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Toolbar } from '@mui/material';
import React from 'react';

// Interface for sidebar menu items
export interface SidebarMenuItem {
    text: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    path?: string;
}
// Interface defines the props for Sidebar component
interface SidebarProps {
    open: boolean; // Required: whether sidebar is open
    onClose: () => void; // Required: function to close sidebar
    menuItems: SidebarMenuItem[]; // Required: array of menu items
    variant?: 'permanent' | 'persistent' | 'temporary'; // Optional: drawer variant
    width?: number; // Optional: width of sidebar (default 240)
}

// Sidebar component for navigation menu
const Sidebar: React.FC<SidebarProps> = ({
    open,
    onClose,
    menuItems,
    variant = 'temporary',
    width = 240
}) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            variant={variant}
            sx={{
                width: width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                },
            }}
            ModalProps={{
                keepMounted: true, // Better mobile performance
            }}
        >
            <Toolbar /> {/* Spacer for AppBar */}
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => {
                                item.onClick?.();
                                if (variant === 'temporary') {
                                    onClose();
                                }
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        </Drawer>
    );
};

export default Sidebar;