import React from 'react';

interface Props {
    label: string,
    value: number | string | null,
    defaultValue: number | string | null,
    onChange: (name: string, value: string | number | null) => void
}

const NumberInput: React.FC<Props> = ({ label, defaultValue, value, onChange }) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (inputValue === '') {
            onChange(label, null);
        } else {
            const parsedValue = parseFloat(inputValue);
            onChange(label, isNaN(parsedValue) ? null : parsedValue);
        }
    };

    return (
        <input
            id={label}
            name={label}
            type="number"
            value={value !== undefined && value !== null ? value : defaultValue !== undefined && defaultValue !== null ? defaultValue : ''}
            onChange={handleOnChange}
            className="w-full border px-3 py-2 rounded-lg"
        />
    )
};

export default NumberInput;
