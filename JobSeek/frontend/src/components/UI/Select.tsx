import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';

// Interface for select options
interface SelectOption {
    value: string;
    label: string;
}

// Interface defines the props for Select component
interface SelectProps {
    label?: string; // Optional: label text shown above select
    options: SelectOption[]; // Required: array of options to choose from
    value?: string; // Optional: selected value
    onChange?: (event: any) => void; // Optional: function called when selection changes
    disabled?: boolean; // Optional: whether select is disabled
}

// Select component for dropdown selection
const Select: React.FC<SelectProps> = ({
    label,
    options,
    value = '',
    onChange,
    disabled = false
}) => {
    return (
        <FormControl fullWidth disabled={disabled}>
            {label && <InputLabel>{label}</InputLabel>}
            <MuiSelect
                value={value}
                onChange={onChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
