import { TextField } from '@mui/material';
import React from 'react';

// Interface defines the props (properties) that our InputField component accepts
interface InputFieldProps {
    label?: string; // Optional: label text shown above the input
    type?: 'text' | 'password' | 'email' | 'number'; // Optional: type of input (default is 'text')
    variant?: 'outlined' | 'filled' | 'standard'; // Optional: visual style of input (default is 'outlined')
    value?: string; // Optional: controlled value of the input
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional: function called when input changes
    placeholder?: string; // Optional: placeholder text shown when input is empty
    disabled?: boolean; // Optional: whether the input is disabled (default is false)
    required?: boolean; // Optional: whether the input is required (default is false)
    error?: boolean; // Optional: whether to show error state (default is false)
    helperText?: string; // Optional: helper text shown below the input
}

// InputField component using React.FC (Function Component) with InputFieldProps
const InputField: React.FC<InputFieldProps> = ({
    label,
    type = 'text',
    variant = 'outlined',
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    error = false,
    helperText
}) => {
    return (
        <TextField
            label={label}
            type={type}
            variant={variant}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            error={error}
            helperText={helperText}
            fullWidth
        />
    );
};

export default InputField;
