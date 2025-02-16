'use client';

import { useState, useEffect, useRef } from 'react';

interface AudioState {
  isPlaying: boolean;
  volume: number;
}

export function useAudio(rainySoundUrl: string, sunnySoundUrl: string, isRaining: boolean) {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    volume: 0.5,
  });
  
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  const sunAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements
    rainAudioRef.current = new Audio(rainySoundUrl);
    sunAudioRef.current = new Audio(sunnySoundUrl);
    
    // Configure audio settings
    [rainAudioRef.current, sunAudioRef.current].forEach(audio => {
      if (audio) {
        audio.loop = true;
        audio.volume = audioState.volume;
      }
    });

    // Cleanup on unmount
    return () => {
      [rainAudioRef.current, sunAudioRef.current].forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, [rainySoundUrl, sunnySoundUrl]);

  // Handle weather changes
  useEffect(() => {
    if (!rainAudioRef.current || !sunAudioRef.current) return;

    if (audioState.isPlaying) {
      if (isRaining) {
        sunAudioRef.current.pause();
        rainAudioRef.current.play();
      } else {
        rainAudioRef.current.pause();
        sunAudioRef.current.play();
      }
    }
  }, [isRaining, audioState.isPlaying]);

  const togglePlay = () => {
    setAudioState(prev => {
      const newIsPlaying = !prev.isPlaying;
      const activeAudio = isRaining ? rainAudioRef.current : sunAudioRef.current;
      
      if (activeAudio) {
        if (newIsPlaying) {
          activeAudio.play();
        } else {
          activeAudio.pause();
        }
      }
      
      return { ...prev, isPlaying: newIsPlaying };
    });
  };

  const setVolume = (newVolume: number) => {
    setAudioState(prev => {
      if (rainAudioRef.current) rainAudioRef.current.volume = newVolume;
      if (sunAudioRef.current) sunAudioRef.current.volume = newVolume;
      return { ...prev, volume: newVolume };
    });
  };

  return {
    isPlaying: audioState.isPlaying,
    volume: audioState.volume,
    togglePlay,
    setVolume,
  };
} 