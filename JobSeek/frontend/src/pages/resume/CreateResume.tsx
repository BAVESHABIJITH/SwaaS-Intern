import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import type { ResumeData } from "../../hooks/useResume";
import { useState, useEffect } from "react";
import {useCreateResume} from '../../hooks/useResume';
import { useParams } from "react-router-dom";
import { getResumeById , updateResumeByID} from "../../hooks/useResume";
export default function CreateResume() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const { createResume } = useCreateResume();
  const { updatedResume } = updateResumeByID();
  useEffect(() => {
    if (!id) return;  

    const fetchResume = async () => {
      const data = await getResumeById(id);
      setResume(data.resume);
    };

    fetchResume();
  }, [id]);

  useEffect(() => {
    if(resume){
      setFormData({
        title: resume.title,
        content: resume.content
      });
    }
  }, [resume]);
  const [formData, setFormData] = useState<ResumeData>({
    title: "",
    content:{
      PersonalInformation: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      professionalSummary: ""
    },
    education: [
      {
        degree: "",
        institution: "",
        year: "",
        grade: ""
      }
    ],
    experience: [
      {
        jobTitle: "",
        company: "",
        duration: "",
        description: ""
      }
    ],
    skills: [
      {
        skill: "",
        proficiency: ""
      }
    ],
    projects: [
      {
        projectTitle: "",
        techStack: "",
        links: "",
        description: ""
      }
    ]
    }
  });
const addEducation = () => {
  setFormData(prev => ({
    ...prev,
    content: {
      ...prev.content,
      education: [
        ...prev.content.education,
        { degree: "", institution: "", year: "", grade: ""}
      ]
    }
  }));
};

const addExperience = () => {
  setFormData(prev => ({
    ...prev,
    content: {
      ...prev.content,
      experience: [
        ...prev.content.experience,
        { jobTitle: "", company: "", duration: "", description: "" }
      ]
    }
  }));
};

const addSkill = () => {
  setFormData(prev => ({
    ...prev,
    content: {
      ...prev.content,
      skills: [
        ...prev.content.skills,
        { skill: "", proficiency: "" }
      ]
    }
  }));
};

const addProject = () => {
  setFormData(prev => ({
    ...prev,
    content: {
      ...prev.content,
      projects: [
        ...prev.content.projects,
        { projectTitle: "", techStack: "", links: "", description: "" }
      ]
    }
  }));
};

const handleTitleChange = (value: string) => {
  setFormData(prev => ({
    ...prev,
    title: value
  }));
};

const handlePersonalChange = (field: string, value: string) => {
  setFormData(prev => ({
    ...prev,
    content: {
      ...prev.content,
      PersonalInformation: {
        ...prev.content.PersonalInformation,
        [field]: value
      }
    }
  }));
};

const handleEducationChange = (index: number, field: string, value: string) => {
  setFormData(prev => {
    const updated = [...prev.content.education];
    updated[index] = { ...updated[index], [field]: value };

    return {
      ...prev,
      content: {
        ...prev.content,
        education: updated
      }
    };
  });
};

const handleExperienceChange = (index: number, field: string, value: string) => {
  setFormData(prev => {
    const updated = [...prev.content.experience];
    updated[index] = { ...updated[index], [field]: value };

    return {
      ...prev,
      content: {
        ...prev.content,
        experience: updated
      }
    };
  });
};

const handleSkillChange = (index: number, field: string, value: string) => {
  setFormData(prev => {
    const updated = [...prev.content.skills];
    updated[index] = { ...updated[index], [field]: value };

    return {
      ...prev,
      content: {
        ...prev.content,
        skills: updated
      }
    };
  });
};

const handleProjectChange = (index: number, field: string, value: string) => {
  setFormData(prev => {
    const updated = [...prev.content.projects];
    updated[index] = { ...updated[index], [field]: value };

    return {
      ...prev,
      content: {
        ...prev.content,
        projects: updated
      }
    };
  });
};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    {!id ? createResume(formData) : updatedResume(formData, id)}
  };
  return (
    <Box p={5} component="form" onSubmit={handleSubmit}>


      <Stack direction="row" alignItems="center" spacing={2}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>
        <Typography variant="h4">{!id ? "Create Resume" : "Edit Resume"}</Typography>
      </Stack>

      <Card sx={{ width: 350, mt: 4 }}>
        <CardContent>
          <Typography fontWeight={600}>Resume Title</Typography>
          <TextField
            fullWidth
            defaultValue={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title"
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Personal Information</Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <TextField
              fullWidth
              placeholder="Full Name"
              value={formData.content.PersonalInformation.fullName}
              onChange={(e) =>
                handlePersonalChange("fullName", e.target.value)
              }
            />

            <TextField
              fullWidth
              placeholder="Email"
              value={formData.content.PersonalInformation.email}
              onChange={(e) =>
                handlePersonalChange("email", e.target.value)
              }
            />

            <TextField
              fullWidth
              placeholder="Phone"
              value={formData.content.PersonalInformation.phone}
              onChange={(e) =>
                handlePersonalChange("phone", e.target.value)
              }
            />

            <TextField
              fullWidth
              placeholder="Location"
              value={formData.content.PersonalInformation.location}
              onChange={(e) =>
                handlePersonalChange("location", e.target.value)
              }
            />
          </Stack>

          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Professional Summary"
            value={formData.content.PersonalInformation.professionalSummary}
            onChange={(e) =>
              handlePersonalChange("professionalSummary", e.target.value)
            }
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      <Box mt={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Education</Typography>
          <Button startIcon={<AddIcon />} onClick={addEducation}>
            Add Education
          </Button>
        </Stack>

        {formData.content.education.map((edu, index) => (
          <Card sx={{ mt: 2 }} key={index}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleEducationChange(index, "year", e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Grade"
                  value={edu.grade}
                  onChange={(e) =>
                    handleEducationChange(index, "grade", e.target.value)
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box mt={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Work Experience</Typography>
          <Button startIcon={<AddIcon />} onClick={addExperience}>
            Add Experience
          </Button>
        </Stack>

        {formData.content.experience.map((exp, index) => (
          <Card sx={{ mt: 2 }} key={index}>
            <CardContent>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    handleExperienceChange(index,"jobTitle",e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index,"company",e.target.value)
                  }
                />
              </Stack>

              <TextField
                fullWidth
                placeholder="Duration"
                sx={{ mt: 2 }}
                value={exp.duration}
                onChange={(e) =>
                  handleExperienceChange(index,"duration",e.target.value)
                }
              />

              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Description"
                sx={{ mt: 2 }}
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index,"description",e.target.value)
                }
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box mt={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Skills</Typography>
          <Button startIcon={<AddIcon />} onClick={addSkill}>
            Add Skill
          </Button>
        </Stack>

        {formData.content.skills.map((skill, index) => (
          <Card sx={{ mt: 2, width: 400 }} key={index}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Skill"
                  value={skill.skill}
                  onChange={(e) =>
                    handleSkillChange(index,"skill",e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Proficiency"
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleSkillChange(index,"proficiency",e.target.value)
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box mt={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Projects</Typography>
          <Button startIcon={<AddIcon />} onClick={addProject}>
            Add Project
          </Button>
        </Stack>

        {formData.content.projects.map((project, index) => (
          <Card sx={{ mt: 2 }} key={index}>
            <CardContent>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Project Title"
                  value={project.projectTitle}
                  onChange={(e) =>
                    handleProjectChange(index,"projectTitle",e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Tech Stack"
                  value={project.techStack}
                  onChange={(e) =>
                    handleProjectChange(index,"techStack",e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  placeholder="Links"
                  value={project.links}
                  onChange={(e) =>
                    handleProjectChange(index,"links",e.target.value)
                  }
                />
              </Stack>

              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="Description"
                sx={{ mt: 2 }}
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index,"description",e.target.value)
                }
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Stack direction="row" spacing={2} mt={5}>
        <Button variant="outlined">Cancel</Button>
        <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
          {!id ? "Create Resume" : "Edit Resume"}
        </Button>
      </Stack>

    </Box>
  );
}