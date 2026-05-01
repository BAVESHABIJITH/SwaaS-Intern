import React, { useState } from 'react';
import Button from '../../components/Button';
import StatsCard from '../../components/StatsCard';
import SearchFilter from '../../components/SearchFilter';
import DataTable from '../../components/DataTable';

interface Application {
    id: number;
    jobTitle: string;
    location: string;
    company: string;
    appliedDate: string;
    status: 'APPLIED' | 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const Applications: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [applications] = useState<Application[]>([
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

    const columns = [
        { key: 'jobDetails', header: 'Job Details' },
        { key: 'company', header: 'Company' },
        { key: 'appliedDate', header: 'Applied Date' },
        { key: 'status', header: 'Status' },
        { key: 'actions', header: 'Actions' },
    ];

    const renderRow = (app: Application) => (
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
                <Button type="button" onClick={() => handleView(app.id)}>
                    👁️
                </Button>
            </td>
        </tr>
    );

    return (
        <div>
            <div>
                <h1>My Applications</h1>
                <p>Track your job applications and their status</p>
            </div>

            <div>
                <StatsCard
                    icon="📋"
                    title="Total Applications"
                    value={totalApplications}
                    description="All applications submitted"
                />
                <StatsCard
                    icon="⏳"
                    title="Pending"
                    value={pendingApplications}
                    description="Awaiting response"
                />
                <StatsCard
                    icon="✅"
                    title="Accepted"
                    value={acceptedApplications}
                    description="Successful applications"
                />
                <StatsCard
                    icon="📈"
                    title="Success Rate"
                    value={`${successRate}%`}
                    description="Application success rate"
                />
            </div>

            <SearchFilter
                searchValue={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                searchPlaceholder="🔍 Search by job title or company..."
                showFilter={true}
                filterValue={statusFilter}
                onFilterChange={(e) => setStatusFilter(e.target.value)}
                filterLabel="Status Filter"
                filterOptions={statusOptions}
            />

            <DataTable columns={columns} data={filteredApplications} renderRow={renderRow} />
        </div>
    );
};

export default Applications;
