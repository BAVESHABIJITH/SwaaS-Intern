import React from 'react';

interface Column {
    key: string;
    header: string;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    renderRow: (item: any, index: number) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, renderRow }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => renderRow(item, index))}
            </tbody>
        </table>
    );
};

export default DataTable;
