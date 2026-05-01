import React, { useEffect, useState } from "react";
import {
Box,
Typography,
Paper,
TextField,
Button,
MenuItem,
CircularProgress
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../../services/api";
import toast from "react-hot-toast";

interface EditJobInput {
title: string;
company: string;
location: string;
salary: string;
description: string;
skills: string[];
status: "ACTIVE" | "CLOSED";
}

const EditJob: React.FC = () => {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();
const { editJob } = useJobs();

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

const [formData, setFormData] = useState<EditJobInput>({
title: "",
company: "",
location: "",
salary: "",
description: "",
skills: [],
status: "ACTIVE"
});

useEffect(() => {
const fetchJob = async () => {
try {
const res = await api.get(`/jobs/getJobById/${id}`);

    if (res.data.success) {
      const job = res.data.job;
      console.log(job)
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
        skills: job.skills || [],
        status: job.status || "ACTIVE"
      });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    toast.error("Failed to load job details");
  } finally {
    setLoading(false);
  }
};

if (id) fetchJob();


}, [id]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;


setFormData((prev) => ({
  ...prev,
  [name]: value
}));


};

const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const skillsArray = e.target.value
.split(",")
.map((skill) => skill.trim())
.filter((skill) => skill.length > 0);

setFormData((prev) => ({
  ...prev,
  skills: skillsArray
}));


};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

if (!id) return;

try {
  setSaving(true);

  await editJob(Number(id), formData as any);

  toast.success("Job updated successfully");

  navigate("/myJobs");
} catch (error) {
  console.error(error);
  toast.error("Failed to update job");
} finally {
  setSaving(false);
}

};

if (loading) {
return (
<Box sx={{ display: "flex", justifyContent: "center", py: 10 }}> <CircularProgress /> </Box>
);
}

return (
<Box sx={{ p: 4 }}>
<Box sx={{ mb: 4 }}>
<Button
startIcon={<ArrowBackIcon />}
onClick={() => navigate("/myJobs")}
variant="contained"
color="info"
>
Back to My Jobs </Button> </Box>

  <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
      Edit Job Posting
    </Typography>

    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Salary Range"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </Box>

        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="CLOSED">CLOSED</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Skills (comma separated)"
          value={formData.skills.join(", ")}
          onChange={handleSkillsChange}
          placeholder="React, Node.js, TypeScript"
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Job Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          startIcon={
            saving ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
          disabled={saving}
          sx={{ px: 4, py: 1, alignSelf: "flex-start" }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>

      </Box>
    </form>
  </Paper>
</Box>

);
};

export default EditJob;
