import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">
          Is it raining?
        </h1>
        
        {/* Weather display placeholder */}
        <div className="weather-display p-12 rounded-lg bg-slate-100 dark:bg-slate-800">
          <p className="text-2xl">
            Loading weather data...
          </p>
        </div>

        {/* Location info placeholder */}
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Weather for: Loading location...
        </p>
      </div>

      {/* Audio player placeholder */}
      <div className="fixed bottom-4">
        <p className="text-sm text-slate-500">🎵 Background music controls will go here</p>
      </div>
    </main>
  );
}
