import React, { useState } from 'react';

const Filter = ( {data, onDataFiltered } ) => {
  const [filterText, setFilteredText] = useState('');

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilteredText(searchText);
    const filteredData = data.filter(item => 
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.location.toLowerCase().includes(searchText.toLowerCase()) ||
      item.date.toLowerCase().includes(searchText.toLowerCase()) 
    );
    onDataFiltered(filteredData);
  };

  return (
    <div className="filter">
      <h1>Filter</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Filter data..."
        value={filterText}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter;