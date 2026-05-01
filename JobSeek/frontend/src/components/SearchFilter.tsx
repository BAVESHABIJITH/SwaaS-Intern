import React from 'react';
import Input from './Input';
import Select from './Select';

interface SearchFilterProps {
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchPlaceholder?: string;
    showFilter?: boolean;
    filterValue?: string;
    onFilterChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    filterLabel?: string;
    filterOptions?: { value: string; label: string }[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    searchValue,
    onSearchChange,
    searchPlaceholder = '🔍 Search...',
    showFilter = false,
    filterValue = '',
    onFilterChange,
    filterLabel = 'Filter',
    filterOptions = [],
}) => {
    return (
        <div>
            <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
            />
            {showFilter && onFilterChange && (
                <div>
                    <label>{filterLabel}</label>
                    <Select
                        value={filterValue}
                        onChange={onFilterChange}
                        options={filterOptions}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
