export type ModelSpace = {
    id: string;
    avatar: string;
    name: string;
    description: string;
}

export type ModelSpaceDetails = {
    id: string;
    avatar: string;
    name: string;
    description: string;
    inputs: ModelSpaceInput[];
}

export type ModelSpaceInput = {
    name: string;
    description: string;
    type: string;
    required: boolean;
    default: null | number;
}
