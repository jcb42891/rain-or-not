'use client';

import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeather } from "@/hooks/useWeather";
import { useState, useEffect } from "react";
import { Accordion } from "@/components/Accordion";
import Image from "next/image";
import { AudioPlayer } from '@/components/AudioPlayer';
import { getRandomQuote } from "@/utils/quotes";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useMinimumLoadingTime } from "@/hooks/useMinimumLoadingTime";

export default function Home() {
  const [zipCode, setZipCode] = useState<string>('');
  const [activeZipCode, setActiveZipCode] = useState<string>('');
  
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
  const { isRaining, condition, location, error: weatherError, loading: weatherLoading } = 
    useWeather(latitude, longitude, activeZipCode);

  const actualLoading = locationLoading || weatherLoading;
  const loading = useMinimumLoadingTime(actualLoading);
  const error = locationError || weatherError;

  // Add weather theme handling with loading state
  const weatherTheme = loading ? 'loading' : isRaining ? 'rainy' : 'sunny';

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

  // Helper function to get user-friendly error message
  const getErrorMessage = () => {
    if (locationError) {
      return (
        <div className="space-y-2">
          <p className="text-accent">Unable to get your location</p>
          <p className="text-sm">
            Please enable location access in your browser settings or use the input below to enter a location manually
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="text-sm text-accent hover:underline mt-2"
          >
            Enter location manually →
          </button>
        </div>
      );
    }
    if (weatherError) {
      return (
        <div className="space-y-2">
          <p className="text-accent">Unable to get weather data</p>
          <p className="text-sm">Please try again in a moment</p>
        </div>
      );
    }
    return null;
  };

  // State for accordion
  const [isOpen, setIsOpen] = useState(false);

  const [randomQuote, setRandomQuote] = useState(getRandomQuote(isRaining));

  // Update quote when weather changes
  useEffect(() => {
    setRandomQuote(getRandomQuote(isRaining));
  }, [isRaining]);

  return (
    <main 
      className="min-h-screen flex flex-col items-center p-4 sm:p-8"
      data-weather={weatherTheme}
    >
      {/* Audio player at top */}
      <div className="w-fit">
        <AudioPlayer isRaining={isRaining} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 sm:space-y-8 w-full max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Is it raining?
          </h1>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Weather display with image */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {/* Weather character image */}
                <div className="relative w-48 h-48 sm:w-80 sm:h-80">
                  <Image
                    src={isRaining ? "/rain-cloud.png" : "/sun.png"}
                    alt={isRaining ? "Rain cloud character" : "Sun character"}
                    width={320}
                    height={320}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Weather display - circular */}
                <div className="weather-display aspect-square w-48 sm:w-64 rounded-full bg-card shadow-lg 
                              flex flex-col items-center justify-center p-4 sm:p-8">
                  {error ? (
                    getErrorMessage()
                  ) : (
                    <div className="space-y-2 sm:space-y-4 text-center">
                      <p className="text-4xl sm:text-6xl font-bold">
                        {isRaining ? 'YES!' : 'Nope'}
                      </p>
                      <p className="text-base sm:text-xl text-muted">
                        Current conditions: {condition}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Weather Quote */}
              {!error && (
                <div className="max-w-md mx-auto">
                  <blockquote className="italic text-muted bg-white/20 border border-card-border 
                                      rounded-lg p-6 shadow-sm backdrop-blur-sm">
                    <p className="text-lg">&ldquo;{randomQuote.text}&rdquo;</p>
                    <footer className="mt-2 text-sm">— {randomQuote.author}</footer>
                  </blockquote>
                </div>
              )}

              {/* Location info */}
              <p className="text-sm text-muted flex items-center justify-center gap-2">
                <span role="img" aria-label="globe">🌍</span>
                {error ? "Please enter a location" : `${location}`}
              </p>

              {/* Location Input Accordion */}
              <div className="mb-16">
                <Accordion 
                  title="I want to see if it's raining somewhere else" 
                  titleClassName="text-base sm:text-lg font-medium"
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter zip code..."
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-card border-card-border
                                 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        type="submit"
                        className="btn-primary w-full sm:w-auto px-4 py-2 rounded-lg font-medium"
                      >
                        Is It Raining?
                      </button>
                    </div>
                    {activeZipCode && (
                      <button
                        type="button"
                        onClick={handleUseMyLocation}
                        className="text-sm text-accent hover:underline mt-2"
                      >
                        Use my location instead
                      </button>
                    )}
                  </form>
                </Accordion>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
