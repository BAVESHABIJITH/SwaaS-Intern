import React from 'react';
import Layout from '../components/Layout/Layout';
import type { SidebarMenuItem } from '../components/Layout/SideBar';
// import { Box, Typography, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
//import SettingsIcon from '@mui/icons-material/Settings';
//import InfoIcon from '@mui/icons-material/Info';
//import DashboardIcon from '@mui/icons-material/Dashboard';
import {Outlet,  useNavigate } from 'react-router-dom';
import WorkIcon from "@mui/icons-material/Work"
import ChatIcon from '@mui/icons-material/Chat';

import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {useAuth} from "../hooks/useAuth"
const LayoutExample: React.FC = () => {
    const Navigate=useNavigate()
    // Define menu items for sidebar
    const {isAuthenticated, user} = useAuth();
    const menuItems: SidebarMenuItem[] = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            onClick: () => Navigate('/')
        },
        {
            text: 'Jobs',
            icon: <WorkIcon/>,
            onClick: () => Navigate('/jobs')
        },
    ];
    if (isAuthenticated && user) {
            menuItems.push({
                text: "Dashboard",
                icon: <DashboardIcon/>,
                onClick: () => Navigate('/UserDashboard'),
                path: "/UserDashboard"
            },
            {
                text: "Profile",
                icon: <PersonIcon/>,
                onClick: () => Navigate('/UserProfile'),
                path: "/UserProfile"
            },
            {
                text: "Chat",
                icon: <ChatIcon/>,
                onClick: () => Navigate('/UserDashboard'),
                path: "/UserDashboard"
            },
        )
        }
        if(user?.role==="JOBSEEKER"){
            menuItems.push({
                text: "My Applications",
                icon: <ChatIcon/>,
                onClick: () => Navigate('/myApplications'),
                path: "/UserDashboard"
            },
            {
                text: "My Resume",
                icon: <ChatIcon/>,
                onClick: () => Navigate('/myResumes'),
                path: "/myResumes"
            }
        )
        }
        if(user?.role==="RECRUITER"){
            menuItems.push({
                text: "My Jobs",
                icon: <ChatIcon/>,
                onClick: () => Navigate('/myJobs'),
                path: "/myJobs"
            }
        )
        }
    return (
        <Layout title="Job Seek" menuItems={menuItems}>
            
            <Outlet/>
        </Layout>
        
    );
};

export default LayoutExample;