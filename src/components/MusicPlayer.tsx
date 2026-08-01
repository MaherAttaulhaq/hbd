"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMusic } from "@/components/MusicProvider";

export default function MusicPlayer() {
  const { playing, toggle, supported } = useMusic();
  const reduced = useReducedMotion() ?? false;

  if (!supported) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7">
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        whileTap={{ scale: 0.9 }}
        className="focus-ring relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-navy-950 shadow-lg shadow-gold-500/40"
      >
        {!playing && !reduced ? (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gold-400/60"
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <span className="relative z-10">
          {playing ? <PauseIcon /> : <PlayIcon />}
        </span>
      </motion.button>
      <span
        aria-hidden
        className="glass-card flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
      >
        {playing ? <Equalizer /> : null}
        {playing ? "Now playing" : "Tap for music"}
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
      className="translate-x-0.5"
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
