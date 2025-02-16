export default function WeatherStructuredData({ 
  location, 
  temperature, 
  condition 
}: {
  location: string;
  temperature: number;
  condition: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WeatherForecast',
    'temperature': {
      '@type': 'QuantitativeValue',
      'value': temperature,
      'unitCode': 'CEL'
    },
    'description': condition,
    'location': {
      '@type': 'Place',
      'name': location
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 