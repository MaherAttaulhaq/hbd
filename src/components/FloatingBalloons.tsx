"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const BALLOON_COLORS = [
  "#d4af37",
  "#f0d27f",
  "#5b8def",
  "#9db8f5",
  "#e8ecf8",
  "#b3922a",
];

type BalloonConfig = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  opacity: number;
};

function BalloonSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.25)}
      viewBox="0 0 40 50"
      fill="none"
      role="presentation"
    >
      <path
        d="M8 5 a12 13 0 1 1 24 0 c0 6 -5 10 -8 14 l4 7 h-16 l4 -7 c-3 -4 -8 -8 -8 -14z"
        fill={color}
        opacity="0.92"
      />
      <path d="M16 26 L14 31 H26 L24 26 Z" fill={color} opacity="0.7" />
      <path
        d="M20 31 q0 6 3 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="15"
        cy="9"
        rx="4"
        ry="6"
        fill="#ffffff"
        opacity="0.45"
        transform="rotate(-18 15 9)"
      />
    </svg>
  );
}

export default function FloatingBalloons({ count = 12 }: { count?: number }) {
  const reduceMotion = useReducedMotion();

  const balloons = useMemo<BalloonConfig[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i / count) * 100 + (Math.random() * 6 - 3),
        delay: Math.random() * 14,
        duration: 18 + Math.random() * 14,
        size: 30 + Math.random() * 40,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        opacity: 0.35 + Math.random() * 0.4,
      })),
    [count],
  );

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${balloon.left}%`, opacity: balloon.opacity }}
          initial={{ y: "115vh", x: 0 }}
          animate={{
            y: "-140vh",
            x: [0, 24, -18, 12, 0],
          }}
          transition={{
            y: {
              duration: balloon.duration,
              delay: balloon.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: balloon.duration * 0.6,
              delay: balloon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="drop-shadow-[0_6px_18px_rgba(212,175,55,0.25)]">
            <BalloonSvg size={balloon.size} color={balloon.color} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
