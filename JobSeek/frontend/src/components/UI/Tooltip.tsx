import { Tooltip as MuiTooltip } from '@mui/material';
import React from 'react';

// Interface defines the props for Tooltip component
interface TooltipProps {
    title: string; // Required: tooltip text to show on hover
    children: React.ReactElement; // Required: element that triggers the tooltip
    placement?: 'top' | 'bottom' | 'left' | 'right'; // Optional: where tooltip appears
    arrow?: boolean; // Optional: show arrow pointing to element
}

// Tooltip component for showing helpful text on hover
const Tooltip: React.FC<TooltipProps> = ({
    title,
    children,
    placement = 'top',
    arrow = false
}) => {
    return (
        <MuiTooltip
            title={title}
            placement={placement}
            arrow={arrow}
        >
            <span style={{ display: 'inline-block' }}>
                {children}
            </span>
        </MuiTooltip>
    );
};

export default Tooltip;
