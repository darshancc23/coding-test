"use client";

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import SearchBar from '@/components/SearchBar';
import Loader from '@/components/Loader';
import Card from '@/composites/Card';
import { fetchModelSpaces } from '@/api/modelSpaces';
import { ModelSpace } from '@/types/modelSpaces.dto';

const HomePage = () => {
    const [modelSpaces, setModelSpaces] = useState<ModelSpace[]>([]);
    const [filteredModelSpaces, setFilteredModelSpaces] = useState<ModelSpace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse = await fetchModelSpaces();
                setModelSpaces(response.data.data);
                setFilteredModelSpaces(response.data.data);
            } catch (err) {
                setError('Something went wrong while fetching the Model Spaces. Please try reloading the page. If the issue persists, try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (query: string) => {
        if (query.trim() === '') {
            setFilteredModelSpaces(modelSpaces);
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = modelSpaces.filter(space =>
                space.name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredModelSpaces(filtered);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
                <p>{error}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => window.location.reload()}
                >
                    Reload
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-10 flex-grow">
                <h1 className="text-3xl font-bold mb-2">Model Spaces</h1>
                <p className="text-gray-700">
                    Model Spaces are dedicated pages for GenAI models where a user can provide inputs
                    and visualize outputs
                </p>
                <p className="mb-12 text-gray-700">
                    Below are some available Model Spaces that you can explore
                </p>
                <div className="mb-8 md:w-1/2 lg:w-1/2">
                    <SearchBar placeholder={'Search model space by name'} onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredModelSpaces.map((space) => (
                        <Card modelSpace={space}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
