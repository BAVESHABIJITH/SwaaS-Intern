import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth';
import {Box, CircularProgress} from '@mui/material';
interface ProtectedRoutesProps{
    children: React.ReactNode;
    requiredRoles?: ('USER' | 'RECRUITER' | 'ADMIN')[]
}
export const ProtectedRoute: React.FC<ProtectedRoutesProps> =({children, requiredRoles = []})=>{
    const {isAuthenticated, isLoading, user} = useAuth();
    if(isLoading){
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', height:'100vh'}}>
                <CircularProgress/>
             </Box>
        )
    }
    if(!isAuthenticated && !user){
        return <Navigate to="/login"/>
    }
     if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role as any)){
        return <Navigate to="/dashboard"/>
    }
    return <>{children}</>;
}
