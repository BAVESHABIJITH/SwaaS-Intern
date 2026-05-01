import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api: AxiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken: string, refreshToken?: string): void => {
    localStorage.setItem('accessToken',accessToken);
    if(refreshToken){
        localStorage.setItem('refreshToken',refreshToken);
    }
};

export const clearTokens = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response:AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && originalRequest && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();
            if(!refreshToken){
                clearTokens();
                window.location.href = '/auth/login';
                toast.error('Session expired. Please login again.');
                return Promise.reject(error);
            }
            
            try{
                    const {data} = await axios.post(`${API_BASE_URL}/api/auth/refresh`,{refreshToken});
                    const newAccessToken = data.accessToken;
                    setTokens(newAccessToken,data.refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }catch(refreshError){
                    clearTokens();
                    window.location.href = '/auth/login';
                    toast.error('Session expired. Please login again.');
                    return Promise.reject(refreshError);
                }
            }
            else if(error.response?.data.message){
                toast.error(error.response.data.message);
            }
            else if(error.message){
                toast.error(error.message);
            }
            return Promise.reject(error);
    }
);

export default api;