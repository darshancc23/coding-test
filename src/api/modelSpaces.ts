import axios, { AxiosResponse } from 'axios';

// Axios instance with default headers and base URL
const axiosInstance = axios.create({
  baseURL: 'https://frontend-assignment-api.misc.simplismart.ai/model-spaces',
  headers: {
    'accept': 'application/json',
  },
});

// 1. GET request to fetch all model spaces
export const fetchModelSpaces = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get('/');
    return response;
  } catch (error) {
    throw error;
  }
};

// 2. GET request to fetch a specific model space by ID
export const fetchModelSpaceById = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 3. POST request to predict based on a specific model space by ID
export const predictModelSpaceById = async (
  id: string,
  data: Record<string, unknown>
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/${id}/predict`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
