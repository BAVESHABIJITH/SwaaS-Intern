import React, {useEffect, useState}from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../context/AuthContext";
import { Box, Typography,Container, Card, Grid, Link, Button, Stack, CardContent } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  postedDate: string;
}
export const UserDashboard: React.FC = ()=>{

    const mail = localStorage.getItem('email');
    let userName = mail ? mail.split("@")[0] : "User";
    
    const API_URL = 'http://136.185.14.8:8556/api/jobs';
    const [jobs, setJobs] = useState<Job[]>([]);
    const navigate = useNavigate();
    const fetchJobs = async () => {
        try {
    
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log(data, "data");
          setJobs(data.data.jobs);
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : 'Failed to fetch jobs';
        }
      };
    
      useEffect(() => {
        fetchJobs();
      }, []);
    return (
        <Box>
            <Container sx={{m:3}}>
                <Typography fontWeight={'bold'} variant='h4' margin={1}>Good morning, {userName.toUpperCase()}! 👋</Typography> 
                <Typography margin={1}>Welcome to your dashboard. Here's what's happening with your job search.</Typography>
            </Container>
            <Card sx={{p:3, m:3, borderRadius:5}}>
                <Typography variant='h5' margin={2}>Quick Actions</Typography>
                <Grid container spacing={3} sx={{display: 'flex',flexDirection: 'row' , justifyContent:'space-around'}} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                    <Card  sx={{minWidth: 220,minHeight: 100, display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p:2,borderRadius:5 }}>
                        <WorkIcon color='primary' fontSize='large'/>
                        <br />
                        <Typography fontSize='large'>Browse Jobs</Typography>
                    </Card>
                     <Card  sx={{minWidth: 220,minHeight: 100, display: 'flex',   flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p:2, borderRadius:5}}>
                        <AssignmentIcon color='primary' fontSize='large'/>
                        <br />
                        <Typography fontSize='large'>My Applications</Typography>
                    </Card>
                     <Card  sx={{minWidth: 220,minHeight: 100, display: 'flex',   flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p:2, borderRadius:5}}>
                        <DescriptionIcon color='primary' fontSize='large'/>
                        <br />
                        <Typography fontSize='large'>My Resume</Typography>
                    </Card>
                     <Card  sx={{minWidth: 220,minHeight: 100, display: 'flex',   flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p:2, borderRadius:5}}>
                        <AddIcon color='primary' fontSize='large'/>
                        <br />
                        <Typography fontSize='large'>Create Resume</Typography>
                    </Card>
                </Grid>
            </Card>
            <Grid container spacing={3} sx={{m:3, display: 'flex',flexDirection: 'row' , justifyContent:'space-between'}}>
                <Card sx={{minWidth:365, alignItems:"start", p:3, borderRadius:5}}>
                    <Typography sx={{m:1}}><DescriptionIcon color='primary'/> My Applications</Typography>
                    <Typography sx={{m:1}} variant="h5">0</Typography>
                    <Typography sx={{m:1}}>Resumes created</Typography>
                    <Link
                        component="button"
                        variant="body2"
                        underline='none'
                        sx={{m:1}}
                        >
                        Manage
                    </Link>
                </Card>
                <Card sx={{minWidth:365, alignItems:"start", p:3, borderRadius:5}}>
                    <Typography sx={{m:1}}><AssignmentIcon color='primary'/> My Resumes</Typography>
                    <Typography sx={{m:1}} variant="h5">0</Typography>
                    <Typography sx={{m:1}}>Total applications submitted</Typography>
                    <Link
                        component="button"
                        variant="body2"
                        underline='none'
                        sx={{m:1}}
                        >
                        View All
                    </Link>
                </Card>
                <Card sx={{minWidth:365, alignItems:"start", p:3, borderRadius:5}}>
                    <Typography sx={{m:1}}><TrendingUpIcon color='primary'/>Success Rate</Typography>
                    <Typography sx={{m:1}} variant="h5">0%</Typography>
                    <Typography sx={{m:1}}>Application success rate</Typography>
                </Card>
            </Grid>
            <Grid sx={{m:3, borderRadius:5 , display: 'flex',flexDirection: 'row' , justifyContent:'space-between'}}>
                <Card sx={{p:3, minWidth: 564}}>
                    <Typography variant='h5' sx={{m:1}}>
                    Recent Applications
                    </Typography>
                    <Typography sx={{m:1}}>No applications yet</Typography>
                    <Typography sx={{m:1}}>Start applying to jobs to see them here</Typography>
                    <Button sx={{m:1}} variant="outlined" color="primary" fullWidth>View All Applications</Button>
                </Card>
                <Card sx={{p:3, minWidth: 564}}>
                    <Typography variant='h5' sx={{m:1}}>
                    Latest Job Opportunities
                    </Typography>
                        <Stack spacing={2} sx={{m:2}}>
                    {jobs.map((job) => (
                        <Card
                        key={job.id}
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            "&:hover": {
                            boxShadow: 6,
                            },
                        }}
                        onClick={()=> navigate(`/jobs/${job.id}/details`)}
                        >
                        <CardContent>
                            <Typography variant="h6" fontWeight={600}>
                            {job.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                            {job.company} • {job.location}
                            </Typography>
                        </CardContent>
                        </Card>
                    ))}
                    </Stack>
                    <Button variant='outlined' onClick={()=>{navigate('/jobs')}}  fullWidth>Browse All Jobs</Button>
                </Card>
            </Grid>
        </Box>
    );
}
