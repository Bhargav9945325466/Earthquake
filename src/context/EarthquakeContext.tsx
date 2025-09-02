import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    title: string;
    url: string;
  };
  geometry: {
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
}

export type TimeRange = 'hour' | 'day' | 'week' | 'month';

export interface EarthquakeStats {
  total: number;
  byMagnitude: { [key: string]: number };
  averageMagnitude: number;
  strongest: Earthquake | null;
  recent: number;
  byRegion: { [key: string]: number };
}

interface EarthquakeContextType {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
  selectedEarthquake: Earthquake | null;
  setSelectedEarthquake: (earthquake: Earthquake | null) => void;
  refreshData: () => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  stats: EarthquakeStats;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
}

const EarthquakeContext = createContext<EarthquakeContextType | undefined>(undefined);

export const useEarthquakes = () => {
  const context = useContext(EarthquakeContext);
  if (context === undefined) {
    throw new Error('useEarthquakes must be used within an EarthquakeProvider');
  }
  return context;
};

interface EarthquakeProviderProps {
  children: ReactNode;
}

export const EarthquakeProvider: React.FC<EarthquakeProviderProps> = ({ children }) => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [notifications, setNotifications] = useState<boolean>(false);

  const getApiUrl = (range: TimeRange): string => {
    const endpoints = {
      hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
      day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
      week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
      month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    };
    return endpoints[range];
  };

  const calculateStats = (data: Earthquake[]): EarthquakeStats => {
    if (data.length === 0) {
      return {
        total: 0,
        byMagnitude: {},
        averageMagnitude: 0,
        strongest: null,
        recent: 0,
        byRegion: {}
      };
    }

    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    
    const byMagnitude: { [key: string]: number } = {};
    const byRegion: { [key: string]: number } = {};
    let totalMagnitude = 0;
    let strongest: Earthquake | null = null;
    let recent = 0;

    data.forEach(eq => {
      // Magnitude grouping
      const magGroup = eq.properties.mag >= 6 ? '6.0+' : 
                      eq.properties.mag >= 4.5 ? '4.5-5.9' :
                      eq.properties.mag >= 3.0 ? '3.0-4.4' : '0-2.9';
      
      byMagnitude[magGroup] = (byMagnitude[magGroup] || 0) + 1;
      
      // Region grouping (extract country from place)
      const place = eq.properties.place;
      const region = place.includes(',') ? place.split(',').pop()?.trim() || 'Unknown' : place;
      byRegion[region] = (byRegion[region] || 0) + 1;
      
      // Total magnitude for average
      totalMagnitude += eq.properties.mag;
      
      // Strongest earthquake
      if (!strongest || eq.properties.mag > strongest.properties.mag) {
        strongest = eq;
      }
      
      // Recent earthquakes (last hour)
      if (eq.properties.time > oneHourAgo) {
        recent++;
      }
    });

    return {
      total: data.length,
      byMagnitude,
      averageMagnitude: totalMagnitude / data.length,
      strongest,
      recent,
      byRegion
    };
  };

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(getApiUrl(timeRange));
      
      if (!response.ok) {
        throw new Error('Failed to fetch earthquake data');
      }
      
      const data = await response.json();
      setEarthquakes(data.features || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchEarthquakes();
  };

  useEffect(() => {
    fetchEarthquakes();
  }, [timeRange]);

  const stats = calculateStats(earthquakes);

  const value: EarthquakeContextType = {
    earthquakes,
    loading,
    error,
    selectedEarthquake,
    setSelectedEarthquake,
    refreshData,
    timeRange,
    setTimeRange,
    locationFilter,
    setLocationFilter,
    stats,
    notifications,
    setNotifications,
  };

  return (
    <EarthquakeContext.Provider value={value}>
      {children}
    </EarthquakeContext.Provider>
  );
};
