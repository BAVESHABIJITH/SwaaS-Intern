import { CircularProgress, LinearProgress } from '@mui/material';
import React from 'react';

// Interface defines the props for Progress component
interface ProgressProps {
    type?: 'circular' | 'linear'; // Optional: type of progress indicator (default is 'circular')
    value?: number; // Optional: progress value (0-100) for determinate progress
    variant?: 'determinate' | 'indeterminate'; // Optional: determinate (shows value) or indeterminate (loading)
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'; // Optional: color
    size?: number; // Optional: size for circular progress (only applies to circular)
}

// Progress component for showing loading or progress status
const Progress: React.FC<ProgressProps> = ({
    type = 'circular',
    value,
    variant = 'indeterminate',
    color = 'primary',
    size = 40
}) => {
    if (type === 'circular') {
        return (
            <CircularProgress
                variant={variant}
                value={value}
                color={color}
                size={size}
            />
        );
    }

    return (
        <LinearProgress
            variant={variant}
            value={value}
            color={color}
        />
    );
};

export default Progress;
