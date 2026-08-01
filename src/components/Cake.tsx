"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { celebrate } from "@/lib/celebrate";
import { useMounted } from "@/hooks/useMounted";

const FLAME_STYLE = {
  transformBox: "fill-box" as const,
  transformOrigin: "bottom center",
};

export default function Cake() {
  const mounted = useMounted();
  const reduced = useReducedMotion() ?? false;
  const reduceMotion = mounted && reduced;

  return (
    <section id="cake" className="relative px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <SectionHeading
        eyebrow="The Celebration"
        title="Light a Candle, Make a Wish"
        description="Tap the cake to shower the moment with a little extra magic."
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-xl flex-col items-center"
      >
        <button
          type="button"
          onClick={celebrate}
          aria-label="Celebrate by tapping the birthday cake"
          className="focus-ring group relative cursor-pointer rounded-3xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 rounded-full bg-gold-500/0 blur-2xl transition-all duration-500 group-hover:bg-gold-500/20"
          />
          <svg
            viewBox="0 0 400 470"
            role="img"
            aria-label="A three-tier birthday cake with lit candles"
            className="relative h-auto w-full max-w-md drop-shadow-[0_20px_45px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-[1.02]"
          >
            <defs>
              <linearGradient id="goldTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f0d27f" />
                <stop offset="0.55" stopColor="#d4af37" />
                <stop offset="1" stopColor="#b3922a" />
              </linearGradient>
              <linearGradient id="navyTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#16255c" />
                <stop offset="1" stopColor="#0a1128" />
              </linearGradient>
              <linearGradient id="creamTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#ece5d0" />
              </linearGradient>
              <radialGradient id="flameGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ffd257" stopOpacity="0.55" />
                <stop offset="0.6" stopColor="#ffd257" stopOpacity="0.18" />
                <stop offset="1" stopColor="#ffd257" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Candle glows */}
            {[175, 200, 225].map((x) => (
              <circle
                key={`glow-${x}`}
                cx={x}
                cy={112}
                r={30}
                fill="url(#flameGlow)"
                className="animate-flicker-slow"
                style={FLAME_STYLE}
              />
            ))}

            {/* Plate */}
            <ellipse cx="200" cy="430" rx="180" ry="26" fill="#101a3f" />
            <ellipse
              cx="200"
              cy="428"
              rx="150"
              ry="20"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.5"
            />

            {/* Bottom tier — gold */}
            <rect x="45" y="310" width="310" height="110" rx="16" fill="url(#goldTop)" />
            <path
              d="M45 310 a16 16 0 0 1 16 -16 h9 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h8 a10 10 0 0 1 20 0 h9 a16 16 0 0 1 16 16z"
              fill="#b3922a"
            />
            <rect x="45" y="360" width="310" height="8" fill="#8f7321" opacity="0.55" />
            <circle cx="120" cy="340" r="7" fill="#f7e3a8" />
            <circle cx="200" cy="352" r="7" fill="#16255c" />
            <circle cx="280" cy="340" r="7" fill="#f7e3a8" />

            {/* Middle tier — navy */}
            <rect x="105" y="210" width="190" height="105" rx="14" fill="url(#navyTop)" />
            <path
              d="M105 210 a14 14 0 0 1 14 -14 h12 a10 10 0 0 1 20 0 h12 a10 10 0 0 1 20 0 h12 a10 10 0 0 1 20 0 h12 a10 10 0 0 1 20 0 h12 a10 10 0 0 1 20 0 h12 a10 10 0 0 1 20 0 h12 a14 14 0 0 1 14 14z"
              fill="#ffffff"
            />
            <rect x="105" y="252" width="190" height="6" fill="#d4af37" opacity="0.9" />
            <rect x="105" y="286" width="190" height="6" fill="#d4af37" opacity="0.5" />

            {/* Top tier — cream */}
            <rect x="148" y="130" width="104" height="85" rx="12" fill="url(#creamTop)" />
            <path
              d="M148 130 a12 12 0 0 1 12 -12 h6 a8 8 0 0 1 16 0 h8 a8 8 0 0 1 16 0 h8 a8 8 0 0 1 16 0 h8 a8 8 0 0 1 16 0 h6 a12 12 0 0 1 12 12z"
              fill="#d4af37"
            />
            <rect x="148" y="170" width="104" height="5" fill="#d4af37" opacity="0.7" />

            {/* Candles */}
            {[
              { x: 175, stripe: "#0a1128" },
              { x: 200, stripe: "#d4af37" },
              { x: 225, stripe: "#0a1128" },
            ].map((candle) => (
              <g key={`candle-${candle.x}`}>
                <rect
                  x={candle.x - 5}
                  y={96}
                  width="10"
                  height="38"
                  rx="3"
                  fill={candle.stripe}
                />
                <rect
                  x={candle.x - 5}
                  y={108}
                  width="10"
                  height="4"
                  fill={candle.stripe === "#0a1128" ? "#d4af37" : "#16255c"}
                />
                <rect
                  x={candle.x - 5}
                  y={118}
                  width="10"
                  height="4"
                  fill={candle.stripe === "#0a1128" ? "#d4af37" : "#16255c"}
                />
                <line
                  x1={candle.x}
                  y1={96}
                  x2={candle.x}
                  y2={88}
                  stroke="#f7e3a8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <g className="animate-flicker" style={FLAME_STYLE}>
                  <path
                    d={`M${candle.x} 86 q-6 -12 0 -18 q6 6 0 18z`}
                    fill="#ffd257"
                  />
                  <path
                    d={`M${candle.x} 82 q-2.5 -5 0 -8 q2.5 3 0 8z`}
                    fill="#fff6d8"
                  />
                </g>
              </g>
            ))}
          </svg>
        </button>

        <p className="mt-8 text-center text-sm text-slate-400 md:text-base">
          May every wish you make tonight come true.
          <span className="text-gold-300"> ✦</span>
        </p>
      </motion.div>
    </section>
  );
}
