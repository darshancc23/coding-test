"use client";

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import DynamicForm from '@/composites/DynamicForm';
import Output from '@/composites/Output';
import Loader from '@/components/Loader';
import { fetchModelSpaceById, predictModelSpaceById } from '@/api/modelSpaces';
import { ModelSpaceDetails } from '@/types/modelSpaces.dto';

const ModelSpaceDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();

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

    const handleSubmit = async (formData: { [key: string]: string | number | null }) => {
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

    const handleGoHome = () => {
        router.push('/');
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-red-500">
                <p>
                    There was an issue fetching this model's details
                </p>
                <p className="mb-6">
                    If the issue persists, try again in a while
                </p>
                <button
                    onClick={handleGoHome}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    if (!modelSpace) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                <div className="flex items-start space-x-4 mb-8">
                    <img
                        src={modelSpace.avatar}
                        alt={modelSpace.name}
                        className="w-24 h-24 object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{modelSpace.name}</h1>
                        <p className="text-gray-700 mt-2">{modelSpace.description}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <DynamicForm
                            disabled={loadingForm}
                            inputs={modelSpace.inputs}
                            onSubmit={handleSubmit}
                        />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-1xl font-semibold mb-4">OUTPUT</h2>
                        <Output outputData={result} isLoading={loadingForm} error={errorForm} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelSpaceDetailPage;
