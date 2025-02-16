import { useState, useEffect } from 'react';

export function useMinimumLoadingTime(isActuallyLoading: boolean, minimumLoadingTimeMs: number = 500) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isActuallyLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minimumLoadingTimeMs);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isActuallyLoading, minimumLoadingTimeMs]);

  return isLoading;
} 