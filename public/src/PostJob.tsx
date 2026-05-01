import React, { useState } from 'react';

const PostJob: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Job posted:', {
            jobTitle,
            companyName,
            location,
            salaryRange,
            jobDescription,
            skills,
        });
        // Add your job posting logic here
    };

    const handleAddSkill = () => {
        if (currentSkill.trim()) {
            setSkills([...skills, currentSkill.trim()]);
            setCurrentSkill('');
        }
    };

    const handleRemoveSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        console.log('Job posting cancelled');
        // Add your cancel logic here
    };

    return (
        <div>
            <div>
                <h1>Post New Job</h1>
                <p>Create a new job posting to attract qualified candidates</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Job Title *"
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Company Name *"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Salary Range"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Required Skills</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Add Skill"
                            value={currentSkill}
                            onChange={(e) => setCurrentSkill(e.target.value)}
                        />
                        <button type="button" onClick={handleAddSkill}>
                            Add
                        </button>
                    </div>
                    {skills.length > 0 && (
                        <ul>
                            {skills.map((skill, index) => (
                                <li key={index}>
                                    {skill}{' '}
                                    <button type="button" onClick={() => handleRemoveSkill(index)}>
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <textarea
                        placeholder="Job Description *"
                        required
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={6}
                    />
                </div>

                <div>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit">Post Job</button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
