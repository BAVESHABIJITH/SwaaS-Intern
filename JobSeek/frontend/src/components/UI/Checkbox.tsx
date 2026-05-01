import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import React from 'react';

// Interface defines the props for Checkbox component
interface CheckboxProps {
    label?: string; // Optional: label text next to checkbox
    checked?: boolean; // Optional: whether checkbox is checked
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional: function called when checkbox changes
    disabled?: boolean; // Optional: whether checkbox is disabled
}

// Checkbox component for yes/no selections
const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked = false,
    onChange,
    disabled = false
}) => {
    if (label) {
        return (
            <FormControlLabel
                control={
                    <MuiCheckbox
                        checked={checked}
                        onChange={onChange}
                        disabled={disabled}
                    />
                }
                label={label}
            />
        );
    }

    return (
        <MuiCheckbox
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default Checkbox;
