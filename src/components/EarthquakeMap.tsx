import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import { useEarthquakes, Earthquake } from '../context/EarthquakeContext';
import './EarthquakeMap.css';

const EarthquakeMap: React.FC = () => {
  const { earthquakes, loading, error, setSelectedEarthquake, locationFilter } = useEarthquakes();

  const filteredEarthquakes = useMemo(() => {
    if (!locationFilter) return earthquakes;
    
    return earthquakes.filter(eq => 
      eq.properties.place.toLowerCase().includes(locationFilter.toLowerCase()) ||
      eq.properties.title.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }, [earthquakes, locationFilter]);

  const getMagnitudeColor = (magnitude: number): string => {
    if (magnitude >= 6.0) return '#ff0000'; // Red for major earthquakes
    if (magnitude >= 4.5) return '#ff6600'; // Orange for moderate earthquakes
    if (magnitude >= 3.0) return '#ffcc00'; // Yellow for light earthquakes
    return '#00cc00'; // Green for minor earthquakes
  };

  const getMagnitudeSize = (magnitude: number): number => {
    return Math.max(5, Math.min(20, magnitude * 3));
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  const handleMarkerClick = (earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
  };

  if (loading) {
    return (
      <div className="map-container loading">
        <div className="loading-spinner">🔄 Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-container error">
        <div className="error-message">❌ Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h3>🌍 Earthquake Map</h3>
        <div className="map-stats">
          Showing {filteredEarthquakes.length} of {earthquakes.length} earthquakes
          {locationFilter && <span className="filter-indicator"> • Filtered by: {locationFilter}</span>}
        </div>
      </div>
      
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="earthquake-map"
        key="map-container"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredEarthquakes.map((earthquake) => {
          const [longitude, latitude] = earthquake.geometry.coordinates;
          const magnitude = earthquake.properties.mag;
          
          return (
            <CircleMarker
              key={earthquake.id}
              center={[latitude, longitude]}
              radius={getMagnitudeSize(magnitude)}
              fillColor={getMagnitudeColor(magnitude)}
              color={getMagnitudeColor(magnitude)}
              weight={2}
              opacity={0.8}
              fillOpacity={0.6}
              eventHandlers={{
                click: () => handleMarkerClick(earthquake),
              }}
            >
              <Popup>
                <div className="earthquake-popup">
                  <h3>{earthquake.properties.title}</h3>
                  <p><strong>Magnitude:</strong> {magnitude}</p>
                  <p><strong>Location:</strong> {earthquake.properties.place}</p>
                  <p><strong>Time:</strong> {formatTime(earthquake.properties.time)}</p>
                  <p><strong>Depth:</strong> {earthquake.geometry.coordinates[2]} km</p>
                  <a 
                    href={earthquake.properties.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="usgs-link"
                  >
                    View on USGS
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;
