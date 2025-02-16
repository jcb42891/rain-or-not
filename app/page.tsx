'use client';

import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeather } from "@/hooks/useWeather";
import { useState } from "react";
import { Accordion } from "@/components/Accordion";

export default function Home() {
  const [zipCode, setZipCode] = useState<string>('');
  const [activeZipCode, setActiveZipCode] = useState<string>('');
  
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
  const { isRaining, condition, location, error: weatherError, loading: weatherLoading } = 
    useWeather(latitude, longitude, activeZipCode);

  const loading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveZipCode(zipCode);
  };

  const handleUseMyLocation = () => {
    setZipCode('');
    setActiveZipCode('');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold">
          Is it raining?
        </h1>
        
        {/* Weather display */}
        <div className="weather-display p-12 rounded-lg bg-slate-100 dark:bg-slate-800">
          {loading ? (
            <p className="text-2xl">Checking the weather...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              <p className="text-6xl font-bold">
                {isRaining ? 'YES!' : 'Nope'}
              </p>
              <p className="text-xl">
                Current conditions: {condition}
              </p>
            </div>
          )}
        </div>

        {/* Location info */}
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {loading ? (
            "Getting weather data..."
          ) : error ? (
            "Error loading weather"
          ) : (
            `Weather for: ${location}`
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
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                         bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                         transition-colors"
              >
                Check Weather
              </button>
            </div>
            {activeZipCode && (
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="text-sm text-blue-500 hover:underline"
              >
                Use my location instead
              </button>
            )}
          </form>
        </Accordion>
      </div>

      {/* Audio player placeholder */}
      <div className="fixed bottom-4">
        <p className="text-sm text-slate-500">🎵 Background music controls will go here</p>
      </div>
    </main>
  );
}
