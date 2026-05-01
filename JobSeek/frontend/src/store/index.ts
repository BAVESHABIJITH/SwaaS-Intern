import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slices/authSlice';
import jobReducer from '../store/slices/jobSlice';
export const store = configureStore({
    reducer:{
        auth:authReducer,
        jobs:jobReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
