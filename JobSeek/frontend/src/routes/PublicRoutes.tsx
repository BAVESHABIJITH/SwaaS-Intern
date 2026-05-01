import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from '../hooks/useAuth';
import {Box, CircularProgress} from '@mui/material';

export const PublicRoutes =()=>{
   const {isAuthenticated, isLoading, user} = useAuth();
   if(isLoading){
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', height:'100vh'}}>
            <CircularProgress/>
        </Box>
    )
   }
   if(!isAuthenticated && !user){
    return <Outlet/>
   }
   return <Navigate to="/dashboard"/>
}
