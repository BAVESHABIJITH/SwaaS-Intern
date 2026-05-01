import { Chip as MuiChip } from '@mui/material';
import React from 'react';

// Interface defines the props for Chip component
interface ChipProps {
    label: string; // Required: text to display on chip
    variant?: 'filled' | 'outlined'; // Optional: visual style of chip
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; // Optional: color of chip
    onDelete?: () => void; // Optional: function called when delete icon is clicked
    onClick?: () => void; // Optional: function called when chip is clicked
    disabled?: boolean; // Optional: whether chip is disabled
    size?: 'small' | 'medium'; // Optional: size of chip
}

// Chip component for displaying tags, labels, or compact information
const Chip: React.FC<ChipProps> = ({
    label,
    variant = 'filled',
    color = 'default',
    onDelete,
    onClick,
    disabled = false,
    size = 'medium'
}) => {
    return (
        <MuiChip
            label={label}
            variant={variant}
            color={color}
            onDelete={onDelete}
            onClick={onClick}
            disabled={disabled}
            size={size}
        />
    );
};

export default Chip;
