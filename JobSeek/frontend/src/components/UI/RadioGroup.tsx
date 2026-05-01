import { RadioGroup as MuiRadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import React from 'react';

// Interface for radio options
interface RadioOption {
    value: string;
    label: string;
}

// Interface defines the props for RadioGroup component
interface RadioGroupProps {
    label?: string; // Optional: label for the radio group
    options: RadioOption[]; // Required: array of radio options
    value?: string; // Optional: selected value
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional: function called when selection changes
    disabled?: boolean; // Optional: whether radio group is disabled
}

// RadioGroup component for selecting one option from multiple choices
const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    options,
    value,
    onChange,
    disabled = false
}) => {
    return (
        <FormControl disabled={disabled}>
            {label && <FormLabel>{label}</FormLabel>}
            <MuiRadioGroup value={value} onChange={onChange}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </MuiRadioGroup>
        </FormControl>
    );
};

export default RadioGroup;
