import React, { useState } from 'react';
import { useEarthquakes } from '../context/EarthquakeContext';
import './SearchAndFilter.css';

const SearchAndFilter: React.FC = () => {
  const { locationFilter, setLocationFilter, notifications, setNotifications } = useEarthquakes();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setLocationFilter(searchTerm);
  };

  const clearFilters = () => {
    setLocationFilter('');
    setSearchTerm('');
  };

  return (
    <div className="search-filter-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by location, country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="search-btn">
          🔍 Search
        </button>
        <button onClick={clearFilters} className="clear-btn">
          🗑️ Clear
        </button>
      </div>
      
      <div className="filter-section">
        <label className="notification-toggle">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <span className="toggle-label">🔔 Enable Notifications</span>
        </label>
      </div>
    </div>
  );
};

export default SearchAndFilter;
