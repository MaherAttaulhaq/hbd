"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setSupported(false);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      void audio.play().catch(() => {
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing]);

  const toggle = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  if (!supported) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7">
      <audio
        ref={audioRef}
        src="/audio/birthday-loop.wav"
        loop
        preload="none"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        className="focus-ring glass-card flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <span
        aria-hidden
        className="glass-card hidden items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 sm:flex"
      >
        {playing ? <Equalizer /> : null}
        {playing ? "Now playing" : "Music off"}
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="translate-x-0.5 text-gold-300"
    >
      <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-gold-300"
    >
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="w-[3px] origin-bottom rounded-full bg-gold-400"
          style={{
            height: "100%",
            animation: `eq 0.9s ease-in-out infinite`,
            animationDelay: `${bar * 0.18}s`,
          }}
        />
      ))}
    </span>
  );
}
