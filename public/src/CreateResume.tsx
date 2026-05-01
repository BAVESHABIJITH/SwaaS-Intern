import React, { useState } from 'react';

interface Education {
    degree: string;
    institution: string;
    year: string;
    grade: string;
}

interface Experience {
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
}

interface Skill {
    name: string;
    proficiency: string;
}

interface Project {
    title: string;
    techStack: string;
    description: string;
    links: string;
}

const CreateResume: React.FC = () => {
    const [resumeTitle, setResumeTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [professionalSummary, setProfessionalSummary] = useState('');

    const [educations, setEducations] = useState<Education[]>([
        { degree: '', institution: '', year: '', grade: '' },
    ]);

    const [experiences, setExperiences] = useState<Experience[]>([
        { jobTitle: '', company: '', duration: '', description: '' },
    ]);

    const [skills, setSkills] = useState<Skill[]>([{ name: '', proficiency: '' }]);

    const [projects, setProjects] = useState<Project[]>([
        { title: '', techStack: '', description: '', links: '' },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Resume created:', {
            resumeTitle,
            fullName,
            email,
            phone,
            location,
            professionalSummary,
            educations,
            experiences,
            skills,
            projects,
        });
    };

    const handleCancel = () => {
        console.log('Resume creation cancelled');
    };

    const addEducation = () => {
        setEducations([...educations, { degree: '', institution: '', year: '', grade: '' }]);
    };

    const removeEducation = (index: number) => {
        setEducations(educations.filter((_, i) => i !== index));
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const updated = [...educations];
        updated[index][field] = value;
        setEducations(updated);
    };

    const addExperience = () => {
        setExperiences([
            ...experiences,
            { jobTitle: '', company: '', duration: '', description: '' },
        ]);
    };

    const removeExperience = (index: number) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    const updateExperience = (index: number, field: keyof Experience, value: string) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);
    };

    const addSkill = () => {
        setSkills([...skills, { name: '', proficiency: '' }]);
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const updateSkill = (index: number, field: keyof Skill, value: string) => {
        const updated = [...skills];
        updated[index][field] = value;
        setSkills(updated);
    };

    const addProject = () => {
        setProjects([...projects, { title: '', techStack: '', description: '', links: '' }]);
    };

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const updateProject = (index: number, field: keyof Project, value: string) => {
        const updated = [...projects];
        updated[index][field] = value;
        setProjects(updated);
    };

    return (
        <div>
            <h1>Create Resume</h1>

            <form onSubmit={handleSubmit}>
                {/* Resume Title */}
                <div>
                    <h2>Resume Title</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                    />
                </div>

                {/* Personal Information */}
                <div>
                    <h2>Personal Information</h2>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <textarea
                        placeholder="Professional Summary"
                        value={professionalSummary}
                        onChange={(e) => setProfessionalSummary(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Education */}
                <div>
                    <h2>Education</h2>
                    <button type="button" onClick={addEducation}>
                        + Add Education
                    </button>
                    {educations.map((edu, index) => (
                        <div key={index}>
                            <h3>Education {index + 1}</h3>
                            <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Grade/GPA"
                                value={edu.grade}
                                onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                            />
                            {educations.length > 1 && (
                                <button type="button" onClick={() => removeEducation(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Work Experience */}
                <div>
                    <h2>Work Experience</h2>
                    <button type="button" onClick={addExperience}>
                        + Add Experience
                    </button>
                    {experiences.map((exp, index) => (
                        <div key={index}>
                            <h3>Experience {index + 1}</h3>
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={exp.jobTitle}
                                onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Duration"
                                value={exp.duration}
                                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={exp.description}
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                rows={3}
                            />
                            {experiences.length > 1 && (
                                <button type="button" onClick={() => removeExperience(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div>
                    <h2>Skills</h2>
                    <button type="button" onClick={addSkill}>
                        + Add Skill
                    </button>
                    {skills.map((skill, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Skill"
                                value={skill.name}
                                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Proficiency"
                                value={skill.proficiency}
                                onChange={(e) => updateSkill(index, 'proficiency', e.target.value)}
                            />
                            {skills.length > 1 && (
                                <button type="button" onClick={() => removeSkill(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Projects */}
                <div>
                    <h2>Projects</h2>
                    <button type="button" onClick={addProject}>
                        + Add Project
                    </button>
                    {projects.map((project, index) => (
                        <div key={index}>
                            <h3>Project {index + 1}</h3>
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={(e) => updateProject(index, 'title', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Tech Stack"
                                value={project.techStack}
                                onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={project.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                rows={3}
                            />
                            <input
                                type="text"
                                placeholder="Links"
                                value={project.links}
                                onChange={(e) => updateProject(index, 'links', e.target.value)}
                            />
                            {projects.length > 1 && (
                                <button type="button" onClick={() => removeProject(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit">Create Resume</button>
                </div>
            </form>
        </div>
    );
};

export default CreateResume;
