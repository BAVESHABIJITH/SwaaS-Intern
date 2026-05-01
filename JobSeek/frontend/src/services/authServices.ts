import api from './api';
import type {AuthResponse,LoginCredentials,RegisterData} from '../types/modules/auth.types';

export const authService = {
    register:async(data:RegisterData):Promise<AuthResponse>=>{
        const response = await api.post<AuthResponse>('/auth/register',data);
        return response.data;
    },
    login:async(credentials:LoginCredentials):Promise<AuthResponse>=>{
        const response = await api.post<AuthResponse>('/auth/login',credentials);
        return response.data;
    },
    getCurrentUser:async():Promise<AuthResponse>=>{
        const response = await api.get<AuthResponse>('/auth/me');
        return response.data;
    },
    logout: ()=>{

    }
};