import React, { useState } from 'react';
import {Box,Typography,Paper,Grid,Button,TextField,Chip,} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';

const PostJob: React.FC = () => {
    const navigate = useNavigate();
    const { createJob } = useJobs();
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const formData = {
        title: jobTitle,
        company: companyName,
        location: location,
        salary: salaryRange,
        description: jobDescription,
        skills: skills,
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createJob(formData);
        navigate('/myJobs');
    };

    const handleAddSkill = () => {
        if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()]);
            setCurrentSkill('');
        }
    };

    const handleRemoveSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ maxWidth: 750, mx: 'auto', py: 2, px: { xs: 2, md: 3 } }}>
            {/* Back link */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/myJobs')}
                sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#3b82f6',
                    mb: 2,
                    '&:hover': { bgcolor: 'rgba(59,130,246,0.06)' },
                }}
            >
                Back to My Jobs
            </Button>

            {/* Header */}
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                Post New Job
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Create a new job posting to attract qualified candidates
            </Typography>

            {/* Form Card */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2.5}>
                        {/* Row 1: Job Title + Company Name */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Job Title"
                                required
                                fullWidth
                                size="small"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Company Name"
                                required
                                fullWidth
                                size="small"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </Grid>

                        {/* Row 2: Location + Salary Range */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Location"
                                fullWidth
                                size="small"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Salary Range"
                                fullWidth
                                size="small"
                                value={salaryRange}
                                onChange={(e) => setSalaryRange(e.target.value)}
                            />
                        </Grid>

                        {/* Row 3: Required Skills + Job Description */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                                Required Skills
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <TextField
                                    label="Add Skill"
                                    size="small"
                                    fullWidth
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSkill();
                                        }
                                    }}
                                />
                                <Button
                                    variant="text"
                                    onClick={handleAddSkill}
                                    sx={{ textTransform: 'none', color: 'text.secondary', minWidth: 'auto' }}
                                >
                                    Add
                                </Button>
                            </Box>
                            {skills.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {skills.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            label={skill}
                                            size="small"
                                            onDelete={() => handleRemoveSkill(index)}
                                            deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
                                            sx={{ fontWeight: 500 }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Job Description"
                                required
                                fullWidth
                                multiline
                                rows={5}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </Grid>

                        {/* Actions */}
                        <Grid size={12}>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/dashboard/my-jobs')}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        borderColor: 'divider',
                                        color: '#3b82f6',
                                        px: 3,
                                        '&:hover': { borderColor: '#3b82f6' },
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        bgcolor: '#3b5998',
                                        px: 3,
                                        '&:hover': { bgcolor: '#2d4373' },
                                    }}
                                >
                                    Post Job
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default PostJob;