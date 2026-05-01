import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {User} from '../../types/modules/auth.types'

interface AuthState{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<User>)=>{
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.isLoading = action.payload;
        },
        setError:(state,action:PayloadAction<string | null>)=>{
            state.error = action.payload;
            state.isLoading = false;
        },
        logoutSuccess: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        }
    
        }
    }
);

export const {setUser,setLoading,setError,logoutSuccess} = authSlice.actions;
export default authSlice.reducer;