import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

// Interface defines the props for DatePicker component
interface DatePickerProps {
    label?: string; // Optional: label text shown above date picker
    value?: Dayjs | null; // Optional: selected date value
    onChange?: (value: Dayjs | null) => void; // Optional: function called when date changes
    disabled?: boolean; // Optional: whether date picker is disabled
}

// DatePicker component for selecting dates
const DatePicker: React.FC<DatePickerProps> = ({
    label,
    value,
    onChange,
    disabled = false
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
                label={label}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
