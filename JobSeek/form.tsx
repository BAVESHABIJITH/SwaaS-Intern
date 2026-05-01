import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";

const Form: React.FC = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    skills: [] as string[],
    experience: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (e: any) => {
    const { value, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter(skill => skill !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 400 }}>

      <Typography variant="h5">Job Application Form</Typography>

      <TextField
        label="Full Name"
        name="fullName"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Phone"
        name="phone"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <FormControl margin="normal">
        <FormLabel>Gender</FormLabel>
        <RadioGroup name="gender" onChange={handleChange}>
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      <FormGroup>
        <FormLabel>Skills</FormLabel>

        <FormControlLabel
          control={<Checkbox value="React" onChange={handleSkillChange} />}
          label="React"
        />

        <FormControlLabel
          control={<Checkbox value="Node" onChange={handleSkillChange} />}
          label="Node"
        />

        <FormControlLabel
          control={<Checkbox value="MySQL" onChange={handleSkillChange} />}
          label="MySQL"
        />

      </FormGroup>

      <FormControl fullWidth margin="normal">
        <InputLabel>Experience</InputLabel>
        <Select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        >
          <MenuItem value="Fresher">Fresher</MenuItem>
          <MenuItem value="1-3 Years">1-3 Years</MenuItem>
          <MenuItem value="3+ Years">3+ Years</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" type="submit">
        Submit
      </Button>

    </Box>
  );
};

export default Form;