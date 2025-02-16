'use client';

import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
  const { isRaining, condition, location, error: weatherError, loading: weatherLoading } = useWeather(latitude, longitude);

  const loading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8">
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
      </div>

      {/* Audio player placeholder */}
      <div className="fixed bottom-4">
        <p className="text-sm text-slate-500">🎵 Background music controls will go here</p>
      </div>
    </main>
  );
}
