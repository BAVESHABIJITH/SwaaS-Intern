import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

// Interface defines the props for AutocompleteField component
interface AutocompleteFieldProps {
    label?: string; // Optional: label text shown above the autocomplete
    options: string[]; // Required: array of options to choose from
    value?: string | null; // Optional: selected value
    onChange?: (event: React.SyntheticEvent, value: string | null) => void; // Optional: function called when selection changes
    placeholder?: string; // Optional: placeholder text
    disabled?: boolean; // Optional: whether the autocomplete is disabled
}

// AutocompleteField component for selecting from a list of options
const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder,
    disabled = false
}) => {
    return (
        <Autocomplete
            options={options}
            value={value}
            onChange={onChange}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                />
            )}
            fullWidth
        />
    );
};

export default AutocompleteField;
