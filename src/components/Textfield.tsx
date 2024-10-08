import React from 'react';

interface Props {
    label: string,
    value: string | number | null,
    defaultValue: string | number | null,
    onChange: (name: string, value: string | number | null) => void
}

const Textfield: React.FC<Props> = ({ label, defaultValue, value, onChange }) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(label, e.target.value);
    };

    return (
        <input
            id={label}
            name={label}
            type="text"
            value={value !== undefined && value !== null ? value : defaultValue !== undefined && defaultValue !== null ? defaultValue : ''}
            onChange={handleOnChange}
            className="w-full border px-3 py-2 rounded-lg"
        />
    )
};

export default Textfield;
