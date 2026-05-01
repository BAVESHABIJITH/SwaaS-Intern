import { Box, Typography, Button, TextField, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import {getResumes} from '../../hooks/useResume';
import { useEffect, useState } from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteResume, getResumeById, updateResumeByID} from '../../hooks/useResume'
export default function Resume() {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);

    const {updatedResume} = updateResumeByID();
    useEffect(() => {
      const fetchResumes = async () => {
        const data = await getResumes();
        setResumes(data.resumes);
      };
      fetchResumes();
    }, []);
  return (
    <Box p={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight={600}>
            My Resumes
          </Typography>
          <Typography color="text.secondary" >
            Create and manage your professional resumes
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />}
        onClick={() => navigate("/createResume")}
        >
          Create Resume
        </Button>
      </Stack>

      <Box mt={4} width={350}>
        <TextField
          fullWidth
          placeholder="Search resumes by title..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
      </Box>
      {resumes.length === 0 ? <>
        <Stack alignItems="center" justifyContent="center" height={400}>
        <DescriptionIcon sx={{ fontSize: 70, color: "text.secondary" }} />

        <Typography mt={2} variant="h6">
          No resumes yet
        </Typography>

        <Typography color="text.secondary">
          Create your first resume to get started with your job applications.
        </Typography>

        <Button sx={{ mt: 3 }} variant="contained" startIcon={<AddIcon />}
        onClick={() => navigate("/createResume")}>
          Create Your First Resume
        </Button>
      </Stack>
      </>
      : 
      <>
        <Box mt={4} display="flex" gap={3} flexWrap="wrap">
          {resumes.map((resume: any) => (
            <Card key={resume.id} sx={{ width: 260, p: 2 }}>
              
              <Box
                sx={{
                  height: 180,
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <DescriptionIcon sx={{ fontSize: 40 }} />
              </Box>

              <CardContent sx={{ p: 0, mt: 2 }}>
                <Typography fontWeight={600}>
                  {resume.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Updated {new Date(resume.updatedAt).toDateString()}
                </Typography>

                <Stack direction="row" spacing={1} mt={2}>
                  <IconButton color="primary"
                  onClick={() => {updatedResume(resume.id,resume) 
                  navigate(`/updateResume/${resume.id}`)}}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="primary"
                  onClick={() => {getResumeById(resume.id) 
                  navigate(`/getResumeById/${resume.id}`)}}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton color="error"
                  onClick={() => deleteResume(resume.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </>
      }
    </Box>
  );
}