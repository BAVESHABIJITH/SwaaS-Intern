import { Alert as MuiAlert } from '@mui/material';
import React from 'react';

// Interface defines the props for Alert component
interface AlertProps {
    severity?: 'error' | 'warning' | 'info' | 'success'; // Optional: type of alert (default is 'info')
    children: React.ReactNode; // Required: alert message content
    variant?: 'filled' | 'outlined' | 'standard'; // Optional: visual style
    onClose?: () => void; // Optional: function called when close button is clicked
}

// Alert component for displaying important messages
const Alert: React.FC<AlertProps> = ({
    severity = 'info',
    children,
    variant = 'standard',
    onClose
}) => {
    return (
        <MuiAlert
            severity={severity}
            variant={variant}
            onClose={onClose}
        >
            {children}
        </MuiAlert>
    );
};

export default Alert;
