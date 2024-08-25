import React from 'react';

interface Props {
    label: string;
    onChange: (name: string, file: string) => void;
}

const ImageInput: React.FC<Props> = ({ label, onChange }) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        onChange(label, 'Image File');
    };

    return (
        <div>
            <input
                id={label}
                name={label}
                type="file"
                accept="image/*"
                onChange={handleOnChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
            />
        </div>
    );
};

export default ImageInput;
