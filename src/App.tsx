import React from 'react';
import './App.css';
import EarthquakeMap from './components/EarthquakeMap';
import Header from './components/Header';
import EarthquakeList from './components/EarthquakeList';
import StatisticsDashboard from './components/StatisticsDashboard';
import SearchAndFilter from './components/SearchAndFilter';
import { EarthquakeProvider } from './context/EarthquakeContext';

function App() {
  return (
    <div className="App">
      <EarthquakeProvider>
        <Header />
        <div className="main-content">
          <StatisticsDashboard />
          <SearchAndFilter />
          <div className="map-list-container">
            <EarthquakeMap />
            <EarthquakeList />
          </div>
        </div>
      </EarthquakeProvider>
    </div>
  );
}

export default App;
