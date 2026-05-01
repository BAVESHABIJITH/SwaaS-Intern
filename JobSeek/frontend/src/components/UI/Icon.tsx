import React from 'react';

// Interface defines the props for Icon component
interface IconProps {
    icon: React.ReactNode; // Required: the icon component to display
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error'; // Optional: icon color
    fontSize?: 'small' | 'medium' | 'large'; // Optional: icon size
}

// Icon component wrapper for displaying MUI icons
const Icon: React.FC<IconProps> = ({
    icon,
    color = 'inherit',
    fontSize = 'medium'
}) => {
    // Clone the icon element and add props
    return React.cloneElement(icon as React.ReactElement<any>, {
        color,
        fontSize
    });
};

export default Icon;
