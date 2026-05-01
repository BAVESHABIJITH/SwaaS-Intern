import React from 'react';

interface TextAreaProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    rows?: number;
    name?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    placeholder,
    value,
    onChange,
    required = false,
    rows = 3,
    name,
}) => {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            name={name}
        />
    );
};

export default TextArea;
