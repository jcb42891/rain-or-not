'use client';

import { useAudio } from '@/hooks/useAudio';

interface AudioPlayerProps {
  isRaining: boolean;
}

export function AudioPlayer({ isRaining }: AudioPlayerProps) {
  const { isPlaying, volume, togglePlay, setVolume } = useAudio(
    '/sounds/rain.mp3',  // Add your rain sound file
    '/sounds/sunny.mp3', // Add your sunny sound file
    isRaining
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-card 
                    px-3 sm:px-4 py-2 rounded-full shadow-lg max-w-[90%] sm:max-w-none">
      <button
        onClick={togglePlay}
        className="text-xl sm:text-2xl hover:scale-110 transition-transform"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '🔇' : '🎵'}
      </button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-16 sm:w-24 accent-accent"
        aria-label="Volume control"
      />
    </div>
  );
} 