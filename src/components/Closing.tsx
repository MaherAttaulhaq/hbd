"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BIRTHDAY } from "@/lib/constants";

export default function Closing() {
  const reduceMotion = useReducedMotion();

  return (
    <footer id="closing" className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="flex items-center justify-center gap-3 text-2xl">
          <span aria-hidden className="animate-sparkle text-gold-300">
            ✦
          </span>
          <span aria-hidden>🎉</span>
          <span aria-hidden className="animate-sparkle text-gold-300">
            ✦
          </span>
        </div>

        <p className="font-display mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          With love and warmest wishes,
        </p>
        <p className="text-gradient-gold font-display mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          {BIRTHDAY.name}
        </p>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">
          {BIRTHDAY.dateLabel} · Turning {BIRTHDAY.age}
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/70" />
          <span aria-hidden className="text-gold-400">
            ✦
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/70" />
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Crafted with <span aria-hidden>💛</span> to celebrate a truly special
          day. Happy Birthday, once more.
        </p>
      </motion.div>
    </footer>
  );
}
