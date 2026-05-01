import React, { useState,useEffect } from 'react';

interface Job {
    id: number;
    title: string;
    salary: string;
    company: string;
    location: string;
    status: 'OPEN' | 'CLOSED';
    applications: number;
    posted: string;
}

const Jobs: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs,setJobs]=useState<Job[]>([]);
    useEffect(()=>{
        try{
                const fetchdata=async()=>{
                const url="http://136.185.14.8:8556/api/jobs";
                const response=await fetch(url);
                const data=await response.json();
                setJobs(data.data.jobs);
                console.log(data.data.jobs);
            }
            
            fetchdata();
            
        }
        catch(error){
            console.log(error);
        }
        
    },[])
    const totalJobs = jobs.length;
    const openJobs = jobs.filter((job) => job.status === 'OPEN').length;
    const closedJobs = jobs.filter((job) => job.status === 'CLOSED').length;
    const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);

    // Filter jobs based on search query
    const filteredJobs = jobs.filter((job) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower)
        );
    });

    const handlePostNewJob = () => {
        console.log('Post new job clicked');
    };

    const handleView = (id: number) => {
        console.log('View job:', id);
    };

    const handleEdit = (id: number) => {
        console.log('Edit job:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Delete job:', id);
    };

    return (
        <div>
            <div>
                <h1>My Jobs</h1>
                <p>Manage your job postings and applications</p>
                <button type="button" onClick={handlePostNewJob}>
                    + Post New Job
                </button>
            </div>

            {/* Stats Section */}
            <div>
                <div>
                    <h3>📋 Total Jobs</h3>
                    <p>{totalJobs}</p>
                    <p>All job postings</p>
                </div>
                <div>
                    <h3>📈 Open Jobs</h3>
                    <p>{openJobs}</p>
                    <p>Currently hiring</p>
                </div>
                <div>
                    <h3>👥 Applications</h3>
                    <p>{totalApplications}</p>
                    <p>Total received</p>
                </div>
                <div>
                    <h3>🔒 Closed Jobs</h3>
                    <p>{closedJobs}</p>
                    <p>No longer hiring</p>
                </div>
            </div>

            {/* Search Filter Section */}
            <div>
                <input
                    type="text"
                    placeholder="🔍 Search jobs by title, company, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Data Table Section */}
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Applications</th>
                        <th>Posted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map((job) => (
                        <tr key={job.id}>
                            <td>
                                <div>{job.title}</div>
                                <div>{job.salary}</div>
                            </td>
                            <td>{job.company}</td>
                            <td>{job.location}</td>
                            <td>
                                <span>{job.status}</span>
                            </td>
                            <td>{job.applications}</td>
                            <td>{job.posted}</td>
                            <td>
                                <button type="button" onClick={() => handleView(job.id)}>
                                    👁️
                                </button>
                                <button type="button" onClick={() => handleEdit(job.id)}>
                                    ✏️
                                </button>
                                <button type="button" onClick={() => handleDelete(job.id)}>
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Jobs;
