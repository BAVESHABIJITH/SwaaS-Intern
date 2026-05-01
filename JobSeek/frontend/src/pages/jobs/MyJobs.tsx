import React, { useState, useEffect } from 'react';
import {
Box,
Typography,
Paper,
Button,
TextField,
InputAdornment,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Chip,
IconButton
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

import { useJobs } from '../../hooks/useJobs';

const MyJobs: React.FC = () => {
const navigate = useNavigate();
const [searchParams] = useSearchParams();

const { jobs, fetchJobs, removeJob, loading } = useJobs();

const [search, setSearch] = useState(searchParams.get('search') || '');

useEffect(() => {
fetchJobs();
}, []);

const handleDelete = async (id: number) => {
  await removeJob(id);
};
const totalJobs = jobs.length;
const activeJobs = jobs.filter((j) => j.status === 'ACTIVE').length;
const closedJobs = jobs.filter((j) => j.status === 'CLOSED').length;

const filteredJobs = jobs.filter(
(job) =>
job.title?.toLowerCase().includes(search.toLowerCase()) ||
job.company?.toLowerCase().includes(search.toLowerCase()) ||
job.location?.toLowerCase().includes(search.toLowerCase())
);

if (loading) {
return (
<Box sx={{ p: 4 }}> <Typography>Loading jobs...</Typography> </Box>
);
}

return (
<Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
  {/* Header */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        My Jobs
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Manage your job postings
      </Typography>
    </Box>

    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={() => navigate('/createJob')}
    >
      Post New Job
    </Button>
  </Box>

  {/* Statistics */}
  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>

    <Paper sx={{ flex: '1 1 220px', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WorkIcon color="primary" />
        <Typography>Total Jobs</Typography>
      </Box>
      <Typography variant="h4">{totalJobs}</Typography>
    </Paper>

    <Paper sx={{ flex: '1 1 220px', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon sx={{ color: '#27ae60' }} />
        <Typography>Active Jobs</Typography>
      </Box>
      <Typography variant="h4">{activeJobs}</Typography>
    </Paper>

    <Paper sx={{ flex: '1 1 220px', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BlockIcon sx={{ color: '#c0392b' }} />
        <Typography>Closed Jobs</Typography>
      </Box>
      <Typography variant="h4">{closedJobs}</Typography>
    </Paper>

  </Box>

  {/* Search */}
  <Paper sx={{ mb: 3 }}>
    <TextField
      fullWidth
      placeholder="Search jobs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: search && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setSearch('')}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </Paper>

  {/* Jobs Table */}
  <Paper>
    <TableContainer>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {filteredJobs.map((job) => (
            <TableRow key={job.id}>

              <TableCell>
                <Typography fontWeight={600}>{job.title}</Typography>
              </TableCell>

              <TableCell>{job.company}</TableCell>

              <TableCell>{job.location}</TableCell>

              <TableCell>
                <Chip
                  label={job.status}
                  size="small"
                  color={job.status === 'ACTIVE' ? 'success' : 'error'}
                />
              </TableCell>

              <TableCell align="center">

                <IconButton
                  onClick={() =>
                    navigate(`/getJobById/${job.id}`)
                  }
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={() =>
                    navigate(`/editJob/${job.id}`)
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(job.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

              </TableCell>

            </TableRow>
          ))}

          {filteredJobs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No jobs found
              </TableCell>
            </TableRow>
          )}

        </TableBody>

      </Table>
    </TableContainer>
  </Paper>

</Box>

);
};

export default MyJobs;
