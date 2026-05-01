import { Button as MuiButton } from '@mui/material';
import React from 'react';

// Interface defines the props (properties) that our Button component accepts
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset'; // Optional: type of button (default is 'button')
    variant?: 'text' | 'contained' | 'outlined'; // Optional: visual style of button (default is 'contained')
    onClick?: () => void; // Optional: function to call when button is clicked
    children: React.ReactNode; // Required: content inside the button (text, icons, etc.)
    disabled?: boolean; // Optional: whether the button is disabled (default is false)
}

// Button component using React.FC (Function Component) with ButtonProps
const Button: React.FC<ButtonProps> = ({
    type = 'button',
    variant = 'contained',
    onClick,
    children,
    disabled = false
}) => {
    return (
        <MuiButton
            type={type}
            variant={variant}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
