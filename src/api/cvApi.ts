import axios from 'axios';
import type {CVRequest} from '../types/cv.ts';

const api = axios.create({
    baseURL: import.meta.env.VITE_CV_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const downloadPdf = async (data: CVRequest): Promise<Blob> => {
    const response = await api.post('/download/pdf', data, {responseType: 'blob'});
    return response.data;
};

export const downloadWord = async (data: CVRequest): Promise<Blob> => {
    const response = await api.post('/download/word', data, {responseType: 'blob'});
    return response.data;
};

export const cvApi = {
    downloadPdf,
    downloadWord,
};
