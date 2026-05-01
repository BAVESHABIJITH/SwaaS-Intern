import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import React from 'react';

// Interface defines the props for Switch component
interface SwitchProps {
    label?: string; // Optional: label text next to switch
    checked?: boolean; // Optional: whether switch is on/off
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional: function called when switch toggles
    disabled?: boolean; // Optional: whether switch is disabled
}

// Switch component for toggle on/off
const Switch: React.FC<SwitchProps> = ({
    label,
    checked = false,
    onChange,
    disabled = false
}) => {
    if (label) {
        return (
            <FormControlLabel
                control={
                    <MuiSwitch
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
        <MuiSwitch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default Switch;
