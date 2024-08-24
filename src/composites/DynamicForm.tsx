import React, { useState } from 'react';
import Textfield from '@/components/Textfield';
import NumberInput from '@/components/NumberInput';
import { ModelSpaceInput } from '@/types/modelSpaces.dto';

type Props = {
    disabled: boolean;
    inputs: ModelSpaceInput[];
    onSubmit: (formData: { [key: string]: any }) => void;
}

const DynamicForm = ({ disabled, inputs, onSubmit }: Props) => {
    const [formData, setFormData] = useState<{ [key: string]: any }>(() => {
        return inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.default !== null ? input.default : ''}), {})
    });

    const handleChange = (name: string, value: string | number) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
                <div className="mb-4" key={input.name}>
                    <label htmlFor={input.name} className="block text-gray-700 font-semibold mb-1">
                        {input.name} {input.required && <span className="text-red-500">*</span>}
                    </label>
                    <p className="text-gray-500 text-sm mb-2">{input.description}</p>
                    {input.type === 'text' && (
                        <Textfield
                            label={input.name}
                            value={formData[input.name]}
                            defaultValue={input.default}
                            onChange={handleChange}
                        />
                    )}
                    {input.type === 'number' && (
                        <NumberInput
                            label={input.name}
                            value={formData[input.name]}
                            defaultValue={input.default}
                            onChange={handleChange}
                        />
                    )}
                    {input.type === 'audio' && (
                        <Textfield
                            label={input.name}
                            value={formData[input.name]}
                            defaultValue={input.default}
                            onChange={handleChange}
                        />
                    )}
                    {input.type === 'image' && (
                        <Textfield
                            label={input.name}
                            value={formData[input.name]}
                            defaultValue={input.default}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
                disabled={disabled}
            >
                {disabled ? 'Predicting...' : 'Predict'}
            </button>
        </form>
    );
}

export default DynamicForm;
