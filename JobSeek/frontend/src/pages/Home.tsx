import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  HeroCard,
  SearchCard,
  StyledBox,
  StatsCard,
  JobCard,
  CTABox,
  PrimaryButton,
  OutlineButton
} from '../style/modules/home.style';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useAuth } from "../hooks/useAuth"; 
const API_URL = 'http://136.185.14.8:8556/api/jobs';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[] | any;
  postedDate: string;
}

const Home: React.FC = () => {
  const {isAuthenticated, user} = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setFeaturedJobs(data.data.jobs.slice(0, 6));
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Box>
      <HeroCard>
        <Box maxWidth={520}>
          <Typography variant="h3" gutterBottom>
            FIND YOUR DREAM JOB TODAY
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </Typography>
          <Box display="flex" gap={2}>
            <PrimaryButton variant="contained" onClick={() => navigate('/login')}>
              Get Started
            </PrimaryButton>
            <OutlineButton variant="outlined" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </OutlineButton>
          </Box>
        </Box>

        <SearchCard elevation={12}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Quick Job Search
          </Typography>
          <TextField
            fullWidth
            placeholder="Search jobs, companies, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <PrimaryButton fullWidth variant="contained" sx={{ mt: 2 }}>
            Search Jobs
          </PrimaryButton>
        </SearchCard>
      </HeroCard>

      <Box py={6} px={{ xs: 3, md: 6 }}>
        <StyledBox>
          <StatsCard>
            <CardContent>
              <WorkIcon fontSize="large" color="primary" />
              <Typography variant="h4" fontWeight="bold">
                1000+
              </Typography>
              <Typography color="text.secondary">
                Active Job Listings
              </Typography>
            </CardContent>
          </StatsCard>

          <StatsCard>
            <CardContent>
              <PeopleIcon fontSize="large" color="primary" />
              <Typography variant="h4" fontWeight="bold">
                500+
              </Typography>
              <Typography color="text.secondary">
                Registered Companies
              </Typography>
            </CardContent>
          </StatsCard>

          <StatsCard>
            <CardContent>
              <TrendingUpIcon fontSize="large" color="primary" />
              <Typography variant="h4" fontWeight="bold">
                95%
              </Typography>
              <Typography color="text.secondary">
                Success Rate
              </Typography>
            </CardContent>
          </StatsCard>
        </StyledBox>

        <Box py={6}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight="bold">
              Featured Jobs
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Discover top opportunities waiting for you
            </Typography>
          </Box>

          {loading ? (
            <Box textAlign="center" py={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
             <Box sx={{ width: '100%' }}>
  <Grid container spacing={3}>
    {featuredJobs.map((job) => (
      <Grid key={job.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
        <JobCard
          variant="outlined"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {job.title}
            </Typography>

            <Typography color="primary" fontWeight={600}>
              {job.company}
            </Typography>

            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
              <LocationOnIcon fontSize="small" color="error" />
              <Typography variant="body2">
                {job.location}
              </Typography>
            </Box>

            <Typography variant="body2" mt={1}>
              💰 {job.salary}
            </Typography>

            <Typography
              variant="body2"
              mt={1}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {job.description}
            </Typography>

            <Box mt={1.5} display="flex" flexWrap="wrap" gap={0.5}>
              {(Array.isArray(job.skills)
                ? job.skills
                : typeof job.skills === 'string'
                ? job.skills.split(',').map(s => s.trim())
                : []
              ).map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>

            <Box mt="auto" textAlign="center" pt={2}>
              <OutlineButton
                size="small"
                onClick={() => navigate(`/jobs/${job.id}/details`)}
              >
                View Details
              </OutlineButton>
            </Box>
          </CardContent>
        </JobCard>
      </Grid>
    ))}
  </Grid>
</Box>

            </>
          )}
        </Box>
      </Box>

      <Box px={{ xs: 3, md: 6 }} py={5}>
        <CTABox>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography mb={3}>
            Join thousands of job seekers and employers who trust JobSeek
          </Typography>

          {!isAuthenticated?
            <Box display="flex" justifyContent="center" gap={2}>
            <PrimaryButton variant="contained" onClick={() => navigate('/login')}>
              Sign Up Now
            </PrimaryButton>
            <OutlineButton variant="outlined" onClick={() => navigate('/login')}>
              Sign In
            </OutlineButton>
          </Box>
          :
          <Box display="flex" justifyContent="center" gap={2}>
            <PrimaryButton variant="contained" onClick={() => navigate('/UserDashboard')}>
              Go to Dashboard
            </PrimaryButton>
          </Box>
          }
          
        </CTABox>
      </Box>
    </Box>
  );
};

export default Home;
