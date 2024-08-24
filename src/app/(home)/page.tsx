"use client";

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { fetchModelSpaces } from '@/api/modelSpaces';
import { ModelSpace } from '@/types/modelSpaces.dto';

const HomePage = () => {
    const [modelSpaces, setModelSpaces] = useState<ModelSpace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse = await fetchModelSpaces();
                setModelSpaces(response.data.data);
            } catch (err) {
                setError('Failed to load model spaces');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-10 flex-grow">
                <h1 className="text-3xl font-bold mb-6">Model Spaces</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {modelSpaces.map((space) => (
                        <Link key={space.id} href={`/${space.id}`}>
                            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                                <img
                                    src={space.avatar}
                                    alt={space.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="mt-4">
                                    <h2 className="text-xl font-semibold">{space.name}</h2>
                                    <p className="text-gray-700 mt-2">{space.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
