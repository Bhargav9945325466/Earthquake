import React from 'react';
import { useEarthquakes } from '../context/EarthquakeContext';
import './StatisticsDashboard.css';

const StatisticsDashboard: React.FC = () => {
  const { stats, timeRange, setTimeRange } = useEarthquakes();

  const timeRangeLabels = {
    hour: 'Last Hour',
    day: 'Last 24 Hours',
    week: 'Last 7 Days',
    month: 'Last 30 Days'
  };

  const getMagnitudeColor = (magnitude: string): string => {
    if (magnitude === '6.0+') return '#ff0000';
    if (magnitude === '4.5-5.9') return '#ff6600';
    if (magnitude === '3.0-4.4') return '#ffcc00';
    return '#00cc00';
  };

  const exportData = () => {
    const csvContent = `data:text/csv;charset=utf-8,${stats.byMagnitude ? 
      Object.entries(stats.byMagnitude).map(([mag, count]) => `${mag},${count}`).join('\n') : ''}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `earthquake_stats_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="statistics-dashboard">
      <div className="dashboard-header">
        <h3>📊 Statistics Dashboard</h3>
        <div className="dashboard-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="time-range-select"
          >
            <option value="hour">Last Hour</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          <button onClick={exportData} className="export-btn">
            📥 Export
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">🌍</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Earthquakes</div>
          </div>
        </div>

        <div className="stat-card average">
          <div className="stat-icon">📏</div>
          <div className="stat-content">
            <div className="stat-value">{stats.averageMagnitude.toFixed(1)}</div>
            <div className="stat-label">Average Magnitude</div>
          </div>
        </div>

        <div className="stat-card recent">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-value">{stats.recent}</div>
            <div className="stat-label">Last Hour</div>
          </div>
        </div>

        <div className="stat-card strongest">
          <div className="stat-icon">💥</div>
          <div className="stat-content">
            <div className="stat-value">
              {stats.strongest ? stats.strongest.properties.mag.toFixed(1) : 'N/A'}
            </div>
            <div className="stat-label">Strongest</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h4>Magnitude Distribution</h4>
          <div className="magnitude-chart">
            {Object.entries(stats.byMagnitude).map(([magnitude, count]) => (
              <div key={magnitude} className="magnitude-bar">
                <div className="bar-label">{magnitude}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{ 
                      backgroundColor: getMagnitudeColor(magnitude),
                      width: `${(count / Math.max(...Object.values(stats.byMagnitude))) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="bar-count">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h4>Top Regions</h4>
          <div className="regions-list">
            {Object.entries(stats.byRegion)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([region, count]) => (
                <div key={region} className="region-item">
                  <span className="region-name">{region}</span>
                  <span className="region-count">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {stats.strongest && (
        <div className="strongest-earthquake">
          <h4>💥 Strongest Earthquake</h4>
          <div className="strongest-details">
            <div className="strongest-magnitude">
              {stats.strongest.properties.mag.toFixed(1)}
            </div>
            <div className="strongest-info">
              <div className="strongest-title">{stats.strongest.properties.title}</div>
              <div className="strongest-location">{stats.strongest.properties.place}</div>
              <div className="strongest-time">
                {new Date(stats.strongest.properties.time).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsDashboard;
