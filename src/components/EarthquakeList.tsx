import React, { useState, useMemo } from 'react';
import { useEarthquakes, Earthquake } from '../context/EarthquakeContext';
import './EarthquakeList.css';

const EarthquakeList: React.FC = () => {
  const { earthquakes, selectedEarthquake, setSelectedEarthquake, locationFilter } = useEarthquakes();
  const [sortBy, setSortBy] = useState<'time' | 'magnitude'>('time');
  const [filterMagnitude, setFilterMagnitude] = useState<number>(0);

  const filteredAndSortedEarthquakes = useMemo(() => {
    let filtered = earthquakes.filter(eq => eq.properties.mag >= filterMagnitude);
    
    // Apply location filter if set
    if (locationFilter) {
      filtered = filtered.filter(eq => 
        eq.properties.place.toLowerCase().includes(locationFilter.toLowerCase()) ||
        eq.properties.title.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (sortBy === 'time') {
        return b.properties.time - a.properties.time;
      } else {
        return b.properties.mag - a.properties.mag;
      }
    });
    
    return filtered;
  }, [earthquakes, sortBy, filterMagnitude, locationFilter]);

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    } else {
      return `${diffMinutes}m ago`;
    }
  };

  const getMagnitudeColor = (magnitude: number): string => {
    if (magnitude >= 6.0) return '#ff0000';
    if (magnitude >= 4.5) return '#ff6600';
    if (magnitude >= 3.0) return '#ffcc00';
    return '#00cc00';
  };

  const handleEarthquakeClick = (earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
  };

  return (
    <div className="earthquake-list">
      <div className="list-header">
        <h3>📋 Earthquake List</h3>
        <div className="list-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'time' | 'magnitude')}
            className="sort-select"
          >
            <option value="time">Sort by Time</option>
            <option value="magnitude">Sort by Magnitude</option>
          </select>
          <select 
            value={filterMagnitude} 
            onChange={(e) => setFilterMagnitude(Number(e.target.value))}
            className="filter-select"
          >
            <option value={0}>All Magnitudes</option>
            <option value={3.0}>3.0+</option>
            <option value={4.5}>4.5+</option>
            <option value={6.0}>6.0+</option>
          </select>
        </div>
      </div>
      
      <div className="earthquake-count">
        Showing {filteredAndSortedEarthquakes.length} of {earthquakes.length} earthquakes
        {locationFilter && <span className="filter-indicator"> • Filtered by: {locationFilter}</span>}
      </div>
      
      <div className="earthquakes-container">
        {filteredAndSortedEarthquakes.length === 0 ? (
          <div className="no-earthquakes">
            <div className="no-earthquakes-icon">🔍</div>
            <div className="no-earthquakes-text">
              No earthquakes found with the current filters.
              {locationFilter && <div>Try adjusting your search terms.</div>}
            </div>
          </div>
        ) : (
          filteredAndSortedEarthquakes.map((earthquake) => {
            const isSelected = selectedEarthquake?.id === earthquake.id;
            
            return (
              <div
                key={earthquake.id}
                className={`earthquake-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleEarthquakeClick(earthquake)}
              >
                <div className="earthquake-magnitude">
                  <span 
                    className="magnitude-value"
                    style={{ backgroundColor: getMagnitudeColor(earthquake.properties.mag) }}
                  >
                    {earthquake.properties.mag.toFixed(1)}
                  </span>
                </div>
                <div className="earthquake-details">
                  <div className="earthquake-title">{earthquake.properties.title}</div>
                  <div className="earthquake-location">{earthquake.properties.place}</div>
                  <div className="earthquake-time">{formatTime(earthquake.properties.time)}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EarthquakeList;
