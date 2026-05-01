import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Grid, Card, CardContent, Chip, Button, CircularProgress, Alert} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://136.185.14.8:8556/api/jobs';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  createdAt: string | any;
}
import { useAuth } from "../../hooks/useAuth"; 
const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isDark = theme.palette.mode === 'dark';

  // const { userMail } = useAuth();
const {isAuthenticated} = useAuth();
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

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
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const search = searchQuery.toLowerCase();
    const location = locationFilter.toLowerCase();
    const company = companyFilter.toLowerCase();

    const matchesSearch = !search ||
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      (Array.isArray(job.skills) ? job.skills : typeof job.skills === 'string' ? (job.skills as string).split(',').map(s => s.trim()).filter(Boolean) : []).some((sk) => sk.toLowerCase().includes(search));

    const matchesLocation = !location || job.location.toLowerCase().includes(location);
    const matchesCompany = !company || job.company.toLowerCase().includes(company);

    return matchesSearch && matchesLocation && matchesCompany;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setCompanyFilter('');
  };

  const renderSkills = (rawSkills: string | string[] = []) => {
    const skills = Array.isArray(rawSkills) ? rawSkills : typeof rawSkills === 'string' ? rawSkills.split(',').map(s => s.trim()).filter(Boolean) : [];
    const maxVisible = 6;
    const remaining = skills.length - maxVisible;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1.5 }}>
        {remaining > 0 && (
          <Chip
            label={`+${remaining} more`}
            size="small"
            sx={{
              fontSize: '0.78rem',
              bgcolor: isDark ? '#2a2a3e' : '#f0f0f0',
              color: isDark ? '#bbb' : '#777',
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: isDark ? theme.palette.background.default : '#f5f7fa' }}>
      {/* Header */}
      <Box sx={{ px: 5, pt: 5, pb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: isDark ? '#90caf9' : '#1a237e',
          }}
        >
          Find Your Dream Job
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: isDark ? '#aaa' : '#666' }}
        >
          Discover opportunities that match your skills and career goals
        </Typography>
      </Box>

      {/* Search / Filter Card */}
      <Card
        sx={{
          mx: 5,
          mb: 2,
          borderRadius: 3,
          bgcolor: isDark ? theme.palette.background.paper : undefined,
          border: isDark ? '1px solid #333' : undefined,
        }}
      > 
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Search"
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
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Company"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Button variant="outlined" size="small" sx={{ mt: 2 }} onClick={clearFilters}>
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      {/* Results count */}
      <Typography
        variant="body2"
        sx={{ px: 5, pt: 1.5, color: isDark ? '#999' : '#777' }}
      >
        Showing 1 - {filteredJobs.length} of {jobs.length} jobs
      </Typography>

      {/* Loading */}
      {loading && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && !loading && (
        <Box sx={{ px: 5 }}>
          <Alert
            severity="warning"
            action={
              <Button size="small" onClick={fetchJobs}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Job Cards */}
      {!loading && (
        <Grid container spacing={2.5} sx={{ px: 5, py: 2 }}>
          {filteredJobs.map((job) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={job.id}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: isDark ? theme.palette.background.paper : '#fff',
                  border: isDark ? '1px solid #333' : undefined,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDark
                      ? '0 8px 24px rgba(255, 255, 255, 0.08)'
                      : '0 8px 24px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography
                    fontWeight={700}
                    sx={{ color: isDark ? '#e0e0e0' : 'inherit' }}
                  >
                    {job.title}
                  </Typography>
                  <Typography
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {job.company}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: isDark ? '#777' : '#999' }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AttachMoneyIcon sx={{ fontSize: 16, color: isDark ? '#777' : '#999' }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.salary}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      my: 1.5,
                      color: isDark ? '#bbb' : '#555',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {job.description}
                  </Typography>

                  {renderSkills(job.skills)}

                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? '#888' : '#999' }}
                  >
                    Posted {
                                new Date(job.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")
                            }
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto', pt: 1.5, alignItems: 'center' }}>
                    <Button
                      onClick={() => navigate(`/jobs/${job.id}/details`)}
                      size="small"
                      sx={{
                        textTransform: 'none'
                      }}
                    >
                      View Details
                    </Button>
                    {!isAuthenticated?<Button
                      onClick={() => navigate('/auth/login')}
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 1.5,
                        px: 2.5,
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      Login to Apply
                    </Button>: null }
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Jobs;