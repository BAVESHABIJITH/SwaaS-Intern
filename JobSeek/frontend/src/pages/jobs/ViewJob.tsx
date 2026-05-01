import React, { useEffect } from 'react';
import { Box, Typography, Paper, Button, Chip, Divider, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const ViewJob: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchJobById, selectedJob: job, loading } = useJobs();
    console.log(job)
        useEffect(() => {
        if (id) {
            fetchJobById(Number(id));
        }
        }, [id, fetchJobById]);

            if (loading) {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress />
                    </Box>
                );
            }
        
    if (!job) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">Job not found</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/my-jobs')}>
                    Back to My Jobs
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/myJobs')} variant="contained" color='info'>
                    Back To My Jobs
                </Button>
                <Button startIcon={<EditIcon />} onClick={() => navigate(`/editJob/${job.id}`)} variant="contained" color='warning'>
                    Edit Job
                </Button>
            </Box>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        {job.title}
                    </Typography>

                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {job.company} • {job.location}
                    </Typography>

                    <Chip
                        label={job.status}
                        color={job.status === 'ACTIVE' ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                        Salary Range
                    </Typography>
                    <Typography variant="body1">
                        {job.salary}
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                        Required Skills
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {job.skills?.map((skill, index) => (
                            <Chip key={index} label={skill} variant="outlined" />
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                        Job Description
                    </Typography>

                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {job.description}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default ViewJob;