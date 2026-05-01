import React from 'react';

interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
    name?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, required = false, name }) => {
    return (
        <select value={value} onChange={onChange} required={required} name={name}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
