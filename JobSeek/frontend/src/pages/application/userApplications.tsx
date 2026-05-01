import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Divider
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";
export default function UserApplications() {
    const navigate = useNavigate();
    
  return (
    <Box sx={{ p: 4 }}>

      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        My Applications
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Track your job applications and their status
      </Typography>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mb: 4
        }}
      >

        {/* Card 1 */}
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <AssignmentIcon color="primary" />
            <Typography variant="h6">Total Applications</Typography>
            <Typography variant="h3">0</Typography>
            <Typography color="text.secondary">
              All applications submitted
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <AccessTimeIcon sx={{ color: "#f97316" }} />
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h3">0</Typography>
            <Typography color="text.secondary">
              Awaiting response
            </Typography>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <CheckCircleIcon sx={{ color: "#22c55e" }} />
            <Typography variant="h6">Accepted</Typography>
            <Typography variant="h3">0</Typography>
            <Typography color="text.secondary">
              Successful applications
            </Typography>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <TrendingUpIcon sx={{ color: "#0ea5e9" }} />
            <Typography variant="h6">Success Rate</Typography>
            <Typography variant="h3">0%</Typography>
            <Typography color="text.secondary">
              Application success rate
            </Typography>
          </CardContent>
        </Card>

      </Box>

      {/* Search + Filter */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap"
            }}
          >

            <TextField
              fullWidth
              placeholder="Search by job title or company..."
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />

            <Select defaultValue="all" sx={{ width: 200 }}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
            </Select>

          </Box>

        </CardContent>
      </Card>

      {/* Table Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2
            }}
          >
            <Typography fontWeight="bold">Job Details</Typography>
            <Typography fontWeight="bold">Company</Typography>
            <Typography fontWeight="bold">Applied Date</Typography>
            <Typography fontWeight="bold">Status</Typography>
            <Typography fontWeight="bold">Actions</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Typography textAlign="center" color="text.secondary">
            No applications yet. Start applying to jobs to see them here!
          </Typography>

        </CardContent>
      </Card>

      {/* Empty State */}
      <Card>
        <CardContent sx={{ textAlign: "center", py: 8 }}>

          <WorkIcon sx={{ fontSize: 60, color: "gray" }} />

          <Typography variant="h5" sx={{ mt: 2 }}>
            No Applications Yet
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Start your job search journey by exploring available positions
            and applying to jobs that match your skills.
          </Typography>

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            size="large"
            onClick={() => navigate("/jobs")}
          >
            Browse Jobs
          </Button>

        </CardContent>
      </Card>

    </Box>
  );
}