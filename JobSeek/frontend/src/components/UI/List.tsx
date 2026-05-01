import { List as MuiList, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import React from 'react';

// Interface for list items
export interface ListItemData {
    text: string;
    icon?: React.ReactNode;
    secondary?: string;
}

// Interface defines the props for List component
interface ListProps {
    items: ListItemData[]; // Required: array of items to display
    dense?: boolean; // Optional: compact spacing
}

// List component for displaying a list of items
const List: React.FC<ListProps> = ({
    items,
    dense = false
}) => {
    return (
        <MuiList dense={dense}>
            {items.map((item, index) => (
                <ListItem key={index}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText
                        primary={item.text}
                        secondary={item.secondary}
                    />
                </ListItem>
            ))}
        </MuiList>
    );
};

export default List;
