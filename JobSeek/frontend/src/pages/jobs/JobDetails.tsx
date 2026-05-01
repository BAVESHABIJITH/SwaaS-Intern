import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://136.185.14.8:8556/api/jobs";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  createdAt: string;
  status?: string;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB").replace(/\//g, "-");

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isDark = theme.palette.mode === "dark";

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        const found = data.data.jobs.find((j: Job) => j.id === Number(id));
        found ? setJob(found) : setError("Job not found");
      } catch (err) {
        setError("Unable to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading)
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress />
      </Box>
    );

  if (error || !job)
    return (
      <Box px={5} py={5}>
        <Alert
          severity="error"
          action={<Button onClick={() => navigate('/jobs')}>Go Back</Button>}
        >
          {error}
        </Alert>
      </Box>
    );

  const skills =
    typeof job.skills === "string"
      ? job.skills.split(",").map((s) => s.trim())
      : job.skills || [];
  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, textTransform: "none", fontWeight: 600 }}
      >
        Back to Jobs
      </Button>

      {/* MAIN JOB CARD */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {job.title}
          </Typography>

          <Typography
            variant="h6"
            color="primary"
            fontWeight={600}
            gutterBottom
          >
            {job.company}
          </Typography>

          {/* META INFO */}
          <Stack direction="row" spacing={3} flexWrap="wrap" mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon color="error" fontSize="small" />
              <Typography>{job.location}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AttachMoneyIcon color="success" fontSize="small" />
              <Typography>{job.salary}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Posted {formatDate(job.createdAt)}
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* DESCRIPTION */}
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Job Description
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, whiteSpace: "pre-line" }}
          >
            {job.description}
          </Typography>

          {skills.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Required Skills
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={1}>
                {skills.map((skill) => (
                  <Chip key={skill} label={skill} variant="outlined" />
                ))}
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* DETAILS CARD */}
      <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Job Details
          </Typography>

          {[
            { icon: <BusinessIcon />, label: "Company", value: job.company },
            { icon: <LocationOnIcon />, label: "Location", value: job.location },
            { icon: <AttachMoneyIcon />, label: "Salary", value: job.salary },
            {
              icon: <CalendarTodayIcon />,
              label: "Posted",
              value: formatDate(job.createdAt),
            },
            {
              icon: <WorkOutlineIcon />,
              label: "Status",
              value: job.status ?? "Active",
            },
          ].map((item) => (
            <Stack
              key={item.label}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              {item.icon}
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography fontWeight={500}>{item.value}</Typography>
              </Box>
            </Stack>
          ))}
        </CardContent>
      </Card>

      {/* ACTION CARD */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Actions
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Apply Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Contact Recruiter
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDetails;