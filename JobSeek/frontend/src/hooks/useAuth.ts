import { useCallback } from "react";
import {useAppDispatch,useAppSelector} from './useAuthSlice';
import {setUser,setLoading,setError,logoutSuccess} from '../store/slices/authSlice';
import { authService } from "../services/authServices";
import { setTokens,clearTokens,getAccessToken } from "../services/api";
import type { LoginCredentials,RegisterData } from "../types/modules/auth.types";
import toast from 'react-hot-toast';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const{user,isLoading,isAuthenticated,error} = useAppSelector((state) => state.auth);

    const login = useCallback(
        async(credentials:LoginCredentials) => {
            try{
                dispatch(setLoading(true));
                const response = await authService.login(credentials);

                if(response.success && response.user) {
                    setTokens(response.accessToken || '',response.refeshToken || '');
                    dispatch(setUser(response.user || null));
                    toast.success("Successfully Logged in!");
                    return true;
                }
                return false;
            }catch(err:any) {
                const message = err.response?.data?.message || 'Login failed';
                dispatch(setError(message));
                return false; 
            }finally{
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );

    const register = useCallback(
        async(data:RegisterData) => {
            try{
                dispatch(setLoading(true));
                const response = await authService.register(data);

                 if(response.success && response.user) {
                    setTokens(response.accessToken || '',response.refeshToken || '');
                    dispatch(setUser(response.user || null));
                    toast.success("Registration Successfull!");
                    return true;
                }
                return false;
            }catch(err:any) {
                const message = err.response?.data?.message || 'Registration failed';
                dispatch(setError(message));
                return false; 
            }finally{
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );
    const logout = useCallback(() =>{
         clearTokens();
        authService.logout();
        dispatch(logoutSuccess());
        toast.success('Logged Out Successfully');
    },[dispatch]);

    const checkAuth = useCallback(async() => {
        const token = getAccessToken();
        if(!token){
            dispatch(setLoading(false));
            return;
        }
        try {
            const response = await authService.getCurrentUser();
            if(response.success && response.user){
                dispatch(setUser(response.user));
            }else{
                dispatch(setError('Failed To Aunthenticate user'));
                clearTokens();
            }
        }catch(err:any){
            console.error('Auth Check Error: ',err);
            clearTokens();
            dispatch(setError(err.message || 'Authentication failed'));
        }finally{
            dispatch(setLoading(false));
        }
    },[dispatch]);
    return {
        user,
        isLoading,
        isAuthenticated,
        error,
        login,
        register,
        logout,
        checkAuth,
    };
};