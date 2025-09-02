import React from 'react';
import { useEarthquakes } from '../context/EarthquakeContext';
import './Header.css';

const Header: React.FC = () => {
  const { refreshData, loading } = useEarthquakes();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          🌍 Earthquake Visualizer
        </h1>
        <p className="subtitle">
          Real-time earthquake activity around the world
        </p>
        <button 
          className="refresh-button"
          onClick={refreshData}
          disabled={loading}
        >
          {loading ? '🔄 Loading...' : '🔄 Refresh Data'}
        </button>
      </div>
    </header>
  );
};

export default Header;
