import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button = ({ type, className, onClick, children }: ButtonProps) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >{children}</button>
    );
};

export default Button;
