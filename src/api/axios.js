import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure this points to your config.ts

const API = axios.create({
    baseURL: API_BASE_URL, // This switches between localhost and Vercel automatically
});

// AUTO-TOKEN ATTACHMENT
// This sends your JWT token with every request so you stay logged in
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;