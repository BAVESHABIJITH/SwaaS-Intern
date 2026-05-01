import React, { useState } from 'react';

interface Application {
    id: number;
    jobTitle: string;
    location: string;
    company: string;
    appliedDate: string;
    status: 'APPLIED' | 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const Application: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [applications,setApplication] = useState<Application[]>([
        {
            id: 1,
            jobTitle: 'test',
            location: 'test',
            company: 'test',
            appliedDate: 'Jan 08, 2026',
            status: 'APPLIED',
        },
        {
            id: 2,
            jobTitle: 'Software developer',
            location: 'Remote',
            company: 'Hifi',
            appliedDate: 'Jan 08, 2026',
            status: 'APPLIED',
        },
    ]);

    const totalApplications = applications.length;
    const pendingApplications = applications.filter((app) => app.status === 'PENDING').length;
    const acceptedApplications = applications.filter((app) => app.status === 'ACCEPTED').length;
    const successRate = totalApplications > 0
        ? Math.round((acceptedApplications / totalApplications) * 100)
        : 0;

    const statusOptions = [
        { value: 'All Status', label: 'All Status' },
        { value: 'APPLIED', label: 'Applied' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'ACCEPTED', label: 'Accepted' },
        { value: 'REJECTED', label: 'Rejected' },
    ];

    // Filter applications based on search query and status filter
    const filteredApplications = applications.filter((app) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            app.jobTitle.toLowerCase().includes(searchLower) ||
            app.company.toLowerCase().includes(searchLower);

        const matchesStatus = statusFilter === 'All Status' || app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleView = (id: number) => {
        console.log('View application:', id);
    };

    return (
        <div>
            <div>
                <h1>My Applications</h1>
                <p>Track your job applications and their status</p>
            </div>

            {/* Stats Section */}
            <div>
                <div>
                    <h3>📋 Total Applications</h3>
                    <p>{totalApplications}</p>
                    <p>All applications submitted</p>
                </div>
                <div>
                    <h3>⏳ Pending</h3>
                    <p>{pendingApplications}</p>
                    <p>Awaiting response</p>
                </div>
                <div>
                    <h3>✅ Accepted</h3>
                    <p>{acceptedApplications}</p>
                    <p>Successful applications</p>
                </div>
                <div>
                    <h3>📈 Success Rate</h3>
                    <p>{successRate}%</p>
                    <p>Application success rate</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div>
                <input
                    type="text"
                    placeholder="🔍 Search by job title or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div>
                    <label>Status Filter</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Data Table Section */}
            <table>
                <thead>
                    <tr>
                        <th>Job Details</th>
                        <th>Company</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map((app) => (
                        <tr key={app.id}>
                            <td>
                                <div>{app.jobTitle}</div>
                                <div>📍 {app.location}</div>
                            </td>
                            <td>🏢 {app.company}</td>
                            <td>📅 {app.appliedDate}</td>
                            <td>
                                <span>{app.status}</span>
                            </td>
                            <td>
                                <button type="button" onClick={() => handleView(app.id)}>
                                    👁️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Application;
