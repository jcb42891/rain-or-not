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
        // Determine query parameter based on available data
        const query = zipCode ? zipCode : (latitude && longitude) ? `${latitude},${longitude}` : null;
        
        if (!query) {
          setWeatherData(prev => ({
            ...prev,
            loading: false,
            error: 'No location data available',
          }));
          return;
        }

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${query}`
        );

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