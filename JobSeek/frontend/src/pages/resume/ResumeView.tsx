import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getResumeById } from "../../hooks/useResume";
import type {ResumeData} from "../../hooks/useResume"
import { Typography,Box, Paper, Stack, Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const ResumeView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const createdDate = new Date(resume?.createdAt);

  const formattedCreatedDate = createdDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const updtaedDate = new Date(resume?.updatedAt);
  console.log(resume);
  const formattedupdatedAt = updtaedDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  
  useEffect(() => {
    const fetchResume = async () => {
      const data = await getResumeById(id!);
      setResume(data.resume);
    };
    fetchResume();
  }, [id]);
  return (
    <Box sx={{m:2}}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>
        <Typography variant="h4">{resume?.title}</Typography>
      </Stack>
      <Box sx={{m:2}}>
        <Paper sx={{p:2, mb:2}}>
          <Typography variant="h5">Personal Information</Typography>
          <Box sx={{mt:2}}>
            <Typography>Full Name: {resume?.content?.PersonalInformation?.fullName}</Typography>
            <Typography>Email: {resume?.content?.PersonalInformation?.email}</Typography>
            <Typography>Phone: {resume?.content?.PersonalInformation?.phone}</Typography>
            <Typography>Location: {resume?.content?.PersonalInformation?.location}</Typography>
            <Typography>Professional Summary: {resume?.content?.PersonalInformation?.professionalSummary}</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5">Education</Typography>

          {resume?.content?.education?.map((edu, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>Degree: {edu.degree}</Typography>
              <Typography>Institution: {edu.institution}</Typography>
              <Typography>Year: {edu.year}</Typography>
              <Typography>Grade: {edu.grade}</Typography>
            </Box>
          ))}
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5">Work Experience</Typography>

          {resume?.content?.experience?.map((exp, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>Job Title: {exp.jobTitle}</Typography>
              <Typography>Company: {exp.company}</Typography>
              <Typography>Duration: {exp.duration}</Typography>
              <Typography>Desctription: {exp.description}</Typography>
            </Box>
          ))}
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5">Skills</Typography>
          {resume?.content?.skills?.map((skill, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>Skill: {skill.skill}</Typography>
              <Typography>Proficiency: {skill.proficiency}</Typography>
            </Box>
          ))}
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5">Projects</Typography>
          {resume?.content?.projects?.map((pros, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>Job Title: {pros.projectTitle}</Typography>
              <Typography>Tech Stack Used: {pros.techStack}</Typography>
              <Typography>Description: {pros.description}</Typography>
              <Typography>link: {pros.links}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
      <Box sx={{m:2}}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography>
          Resume Created At: {formattedCreatedDate}
        </Typography>
          <Typography>
          Resume Updated At: {formattedupdatedAt}
        </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
export default ResumeView;