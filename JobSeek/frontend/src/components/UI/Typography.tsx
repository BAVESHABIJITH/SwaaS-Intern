import { Typography as MuiTypography } from '@mui/material';
import React from 'react';

// Interface defines the props for Typography component
interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption'; // Optional: text style variant
    children: React.ReactNode; // Required: text content to display
    color?: string; // Optional: text color
    align?: 'left' | 'center' | 'right' | 'justify'; // Optional: text alignment
    gutterBottom?: boolean; // Optional: adds margin bottom
}

// Typography component for displaying text with different styles
const Typography: React.FC<TypographyProps> = ({
    variant = 'body1',
    children,
    color,
    align,
    gutterBottom = false
}) => {
    return (
        <MuiTypography
            variant={variant}
            color={color}
            align={align}
            gutterBottom={gutterBottom}
        >
            {children}
        </MuiTypography>
    );
};

export default Typography;
