import { Skeleton as MuiSkeleton } from '@mui/material';
import React from 'react';

// Interface defines the props for Skeleton component
interface SkeletonProps {
    variant?: 'text' | 'rectangular' | 'circular'; // Optional: shape of skeleton (default is 'text')
    width?: number | string; // Optional: width of skeleton
    height?: number | string; // Optional: height of skeleton
    animation?: 'pulse' | 'wave' | false; // Optional: animation type (default is 'pulse')
}

// Skeleton component for showing loading placeholders
const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'text',
    width,
    height,
    animation = 'pulse'
}) => {
    return (
        <MuiSkeleton
            variant={variant}
            width={width}
            height={height}
            animation={animation}
        />
    );
};

export default Skeleton;
