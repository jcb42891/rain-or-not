'use client';

import { useGeolocation } from "@/hooks/useGeolocation";

export default function Home() {
  const { latitude, longitude, error, loading } = useGeolocation();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">
          Is it raining?
        </h1>
        
        {/* Weather display placeholder */}
        <div className="weather-display p-12 rounded-lg bg-slate-100 dark:bg-slate-800">
          {loading ? (
            <p className="text-2xl">Getting your location...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-2xl">Your location:</p>
              <p className="font-mono">Latitude: {latitude}</p>
              <p className="font-mono">Longitude: {longitude}</p>
            </div>
          )}
        </div>

        {/* Location info placeholder */}
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {loading ? "Detecting location..." : error ? "Location error" : "Location detected!"}
        </p>
      </div>

      {/* Audio player placeholder */}
      <div className="fixed bottom-4">
        <p className="text-sm text-slate-500">🎵 Background music controls will go here</p>
      </div>
    </main>
  );
}
