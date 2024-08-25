import React, { useState, useEffect } from 'react';
import Textfield from '@/components/Textfield';
import NumberInput from '@/components/NumberInput';
import AudioInput from '@/components/AudioInput';
import ImageInput from '@/components/ImageInput';
import Tooltip from '@/components/Tooltip';
import { ModelSpaceInput } from '@/types/modelSpaces.dto';

type Props = {
    disabled: boolean;
    inputs: ModelSpaceInput[];
    onSubmit: (formData: { [key: string]: string | number | null }) => void;
}

const DynamicForm = ({ disabled, inputs, onSubmit }: Props) => {
    const [formData, setFormData] = useState<{ [key: string]: string | number | null }>(() => {
        return inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.default !== null ? input.default : '' }), {})
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = inputs.every(input =>
            !input.required || (formData[input.name] !== '' && formData[input.name] !== null)
        );
        setIsFormValid(isValid);
    }, [formData, inputs]);

    const handleChange = (name: string, value: string | number | null) => {
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
                    <div className="flex items-center">
                        <label htmlFor={input.name} className="block text-gray-700 font-semibold flex-grow">
                            {input.name} {input.required && <span className="text-red-500">*</span>}
                        </label>
                        {input.description && (
                            <Tooltip text={input.description} />
                        )}
                    </div>
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
                        <AudioInput
                            label={input.name}
                            onChange={handleChange}
                        />
                    )}
                    {input.type === 'image' && (
                        <ImageInput
                            label={input.name}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <div className="w-full flex justify-end">
                <button
                    disabled={disabled || !isFormValid}
                    type="submit"
                    className={`text-white ${!isFormValid ? 'bg-gray-700' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
                >
                    {disabled && (
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    )}
                    {disabled ? 'PREDICTING...' : 'PREDICT'}
                </button>
            </div>
        </form>
    );
}

export default DynamicForm;
