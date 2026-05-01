import React from 'react';

interface StatsCardProps {
    icon: string;
    title: string;
    value: string | number;
    description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, description }) => {
    return (
        <div>
            <h3>{icon} {title}</h3>
            <p>{value}</p>
            <p>{description}</p>
        </div>
    );
};

export default StatsCard;
