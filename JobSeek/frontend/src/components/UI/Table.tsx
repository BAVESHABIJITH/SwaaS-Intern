import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React from 'react';

// Interface for table data
export interface TableColumn {
    id: string;
    label: string;
}

export interface TableRowData {
    [key: string]: string | number;
}

// Interface defines the props for Table component
interface TableProps {
    columns: TableColumn[]; // Required: array of column definitions
    rows: TableRowData[]; // Required: array of row data
    size?: 'small' | 'medium'; // Optional: table size
}

// Table component for displaying tabular data
const Table: React.FC<TableProps> = ({
    columns,
    rows,
    size = 'medium'
}) => {
    return (
        <TableContainer component={Paper}>
            <MuiTable size={size}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{row[column.id]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
