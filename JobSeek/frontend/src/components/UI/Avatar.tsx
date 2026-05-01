import { Avatar as MuiAvatar } from '@mui/material';
import React from 'react';

// Interface defines the props for Avatar component
interface AvatarProps {
    src?: string; // Optional: image URL for avatar
    alt?: string; // Optional: alt text for image
    children?: React.ReactNode; // Optional: text/icon to show if no image (like initials)
    variant?: 'circular' | 'rounded' | 'square'; // Optional: shape of avatar
    size?: 'small' | 'medium' | 'large'; // Optional: size of avatar
}

// Avatar component for displaying user profile pictures or initials
const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    children,
    variant = 'circular',
    size = 'medium'
}) => {
    // Map size to pixel dimensions
    const sizeMap = {
        small: { width: 32, height: 32 },
        medium: { width: 40, height: 40 },
        large: { width: 56, height: 56 }
    };

    return (
        <MuiAvatar
            src={src}
            alt={alt}
            variant={variant}
            sx={sizeMap[size]}
        >
            {children}
        </MuiAvatar>
    );
};

export default Avatar;
