// CustomNumberFilter.js
import React, { useEffect, useState } from 'react';

const CustomNumberFilter = (props) => {
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        props.filterChangedCallback();
    }, [filterValue]);

    const onFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    return (
        <div>
            <input
                type="number"
                value={filterValue}
                onChange={onFilterChange}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default CustomNumberFilter;
