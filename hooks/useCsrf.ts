import { useState, useEffect } from 'react';

export function useCsrf() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
        }
        const data = await response.json();
        setCsrfToken(data.token);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch CSRF token');
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { csrfToken, loading, error };
} 