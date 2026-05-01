import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'text' | 'outlined' | 'contained';
    onClick?: () => void;
    children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ 
    type = 'button',
     onClick, children }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
