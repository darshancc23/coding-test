"use client";

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import DynamicForm from '@/composites/DynamicForm';
import Output from '@/components/Output';
import { fetchModelSpaceById, predictModelSpaceById } from '@/api/modelSpaces';
import { ModelSpaceDetails } from '@/types/modelSpaces.dto';

const ModelSpaceDetailPage = () => {
    const { id } = useParams();
    const [modelSpace, setModelSpace] = useState<ModelSpaceDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingForm, setLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response: AxiosResponse = await fetchModelSpaceById(id as string);
                    setModelSpace(response.data.data);
                } catch (err) {
                    setError('Failed to load model space');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    const handleSubmit = async (formData: { [key: string]: any }) => {
        setLoadingForm(true);
        setErrorForm(null);

        try {
            const response = await predictModelSpaceById(id as string, formData);
            setResult(response.data.data);
        } catch (err) {
            setErrorForm('Failed to make prediction');
        } finally {
            setLoadingForm(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }

    if (!modelSpace) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                <div className="mb-8">
                    <img src={modelSpace.avatar} alt={modelSpace.name} className="w-full h-64 object-cover rounded-lg" />
                    <h1 className="text-4xl font-bold mt-4">{modelSpace.name}</h1>
                    <p className="text-gray-700 mt-2">{modelSpace.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4">Input Section</h2>
                        <DynamicForm
                            disabled={loadingForm}
                            inputs={modelSpace.inputs}
                            onSubmit={handleSubmit}
                        />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4">Output Section</h2>
                        <Output outputData={result}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelSpaceDetailPage;
