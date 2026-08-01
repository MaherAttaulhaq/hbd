"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MUSIC } from "@/lib/constants";

type MusicContextValue = {
  playing: boolean;
  supported: boolean;
  start: () => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    void audio
      .play()
      .then(() => {
        startedRef.current = true;
        setPlaying(true);
      })
      .catch(() => setPlaying(false));
  }, []);

  const start = useCallback(() => {
    if (startedRef.current) return;
    playAudio();
  }, [playAudio]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      startedRef.current = true;
      playAudio();
    }
  }, [playing, playAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setSupported(false);
    audio.addEventListener("error", onError);
    audio.load();
    start();
    document.addEventListener("pointerdown", start);
    return () => {
      audio.removeEventListener("error", onError);
      document.removeEventListener("pointerdown", start);
    };
  }, [start]);

  return (
    <MusicContext.Provider value={{ playing, supported, start, toggle }}>
      <audio ref={audioRef} src={MUSIC.src} loop preload="auto" playsInline />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within a MusicProvider");
  return ctx;
}
