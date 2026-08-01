"use client";

import confetti from "canvas-confetti";

const COLORS = ["#d4af37", "#f0d27f", "#5b8def", "#9db8f5", "#ffffff"];

export function celebrate(): void {
  const defaults = {
    disableForReducedMotion: true,
    zIndex: 60,
    spread: 80,
    ticks: 140,
    gravity: 0.9,
    colors: COLORS,
  };

  confetti({ ...defaults, particleCount: 90, origin: { y: 0.6 } });
  confetti({
    ...defaults,
    particleCount: 60,
    angle: 60,
    spread: 60,
    origin: { x: 0, y: 0.7 },
  });
  confetti({
    ...defaults,
    particleCount: 60,
    angle: 120,
    spread: 60,
    origin: { x: 1, y: 0.7 },
  });
  window.setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 130,
      startVelocity: 35,
      origin: { y: 0.3 },
    });
  }, 250);
}
