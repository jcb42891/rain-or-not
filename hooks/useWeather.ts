'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  isRaining: boolean;
  condition: string;
  location: string;
  loading: boolean;
  error: string | null;
}

export function useWeather(
  latitude: number | null, 
  longitude: number | null,
  zipCode?: string
) {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    isRaining: false,
    condition: '',
    location: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Only fetch if we have location data or zip code
        if (!latitude && !longitude && !zipCode) {
          setWeatherData(prev => ({
            ...prev,
            loading: false,
            error: 'No location data available',
          }));
          return;
        }

        const response = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude,
            longitude,
            zipCode
          }),
        });

        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        
        // Check if the condition contains rain-related terms
        const rainConditions = [
          'rain',
          'drizzle',
          'shower',
          'sleet',
          'mist',
        ];
        
        const isRaining = rainConditions.some(condition => 
          data.current.condition.text.toLowerCase().includes(condition)
        );

        setWeatherData({
          isRaining,
          condition: data.current.condition.text,
          location: `${data.location.name}, ${data.location.country}`,
          loading: false,
          error: null,
        });
      } catch (error) {
        setWeatherData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch weather data',
        }));
      }
    };

    fetchWeather();
  }, [latitude, longitude, zipCode]);

  return weatherData;
} 