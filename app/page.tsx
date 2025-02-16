'use client';

import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeather } from "@/hooks/useWeather";
import { useState, useEffect } from "react";
import { Accordion } from "@/components/Accordion";

export default function Home() {
  const [zipCode, setZipCode] = useState<string>('');
  const [activeZipCode, setActiveZipCode] = useState<string>('');
  
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
  const { isRaining, condition, location, error: weatherError, loading: weatherLoading } = 
    useWeather(latitude, longitude, activeZipCode);

  const loading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  // Add weather theme handling
  const weatherTheme = isRaining ? 'rainy' : 'sunny';

  // Add effect to update document theme
  useEffect(() => {
    document.documentElement.dataset.weather = weatherTheme;
  }, [weatherTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveZipCode(zipCode);
  };

  const handleUseMyLocation = () => {
    setZipCode('');
    setActiveZipCode('');
  };

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-8"
      data-weather={weatherTheme}
    >
      <div className="text-center space-y-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold">
          Is it raining?
        </h1>
        
        {/* Weather display */}
        <div className="weather-display p-12 rounded-lg bg-card shadow-lg">
          {loading ? (
            <p className="text-2xl">Checking the weather...</p>
          ) : error ? (
            <p className="text-accent">{error}</p>
          ) : (
            <div className="space-y-4">
              <p className="text-6xl font-bold">
                {isRaining ? 'YES!' : 'Nope'}
              </p>
              <p className="text-xl text-muted">
                Current conditions: {condition}
              </p>
            </div>
          )}
        </div>

        {/* Location info */}
        <p className="text-sm text-muted">
          {loading ? (
            "Getting weather data..."
          ) : error ? (
            "Error loading weather"
          ) : (
            `${location}`
          )}
        </p>

        {/* Location Input Accordion */}
        <Accordion title="I want to see if it's raining somewhere else">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code..."
                className="px-4 py-2 rounded-lg bg-card border-card-border
                         focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="btn-primary px-4 py-2 rounded-lg font-medium"
              >
                Is It Raining?
              </button>
            </div>
            {activeZipCode && (
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="text-sm text-accent hover:underline"
              >
                Use my location instead
              </button>
            )}
          </form>
        </Accordion>
      </div>

      {/* Audio player placeholder */}
      <div className="fixed bottom-4">
        <p className="text-sm text-muted">🎵 Background music controls will go here</p>
      </div>
    </main>
  );
}
