import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { latitude, longitude, zipCode } = body;

    // Determine query parameter
    const query = zipCode ? zipCode : (latitude && longitude) ? `${latitude},${longitude}` : null;
    
    if (!query) {
      return NextResponse.json(
        { error: 'No location data provided' },
        { status: 400 }
      );
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}`;
    console.log('Fetching weather:', { url, query });

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.log('Weather API error:', { 
        status: response.status, 
        error: errorData 
      });
      return NextResponse.json(
        { error: 'Weather data fetch failed', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 