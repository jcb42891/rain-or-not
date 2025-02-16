'use client';

import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  // Add method to clear location data
  const clearLocation = () => {
    setLatitude(null);
    setLongitude(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { 
    latitude, 
    longitude, 
    error, 
    loading, 
    clearLocation,
    getLocation  // Expose the getLocation function
  };
} 