import React from 'react';
import Link from 'next/link';
import { ModelSpace } from '@/types/modelSpaces.dto';

interface Props {
    modelSpace: ModelSpace;
}

const Card: React.FC<Props> = ({ modelSpace }) => {

    return (
        <Link key={modelSpace.id} href={`/${modelSpace.id}`}>
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                <img
                    src={modelSpace.avatar}
                    alt={modelSpace.name}
                    className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">{modelSpace.name}</h2>
                </div>
            </div>
        </Link>
    );
};

export default Card;
