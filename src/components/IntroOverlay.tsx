"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BIRTHDAY, INTRO_IMAGE } from "@/lib/constants";
import { useMusic } from "@/components/MusicProvider";

export default function IntroOverlay() {
  const { playing, start, supported } = useMusic();
  const reduced = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(true);

  const dismiss = () => setVisible(false);

  const begin = () => {
    start();
    dismiss();
  };

  useEffect(() => {
    if (playing && visible) dismiss();
  }, [playing, visible]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!supported) return null;

  const duration = reduced ? 0 : 0.5;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          role="presentation"
          onClick={begin}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center overflow-y-auto bg-navy-950 px-6 py-10"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

          <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-7 text-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[13rem]"
            >
              <div className="gold-frame animate-float">
                <Image
                  src={INTRO_IMAGE.src}
                  alt={INTRO_IMAGE.alt}
                  width={1080}
                  height={1080}
                  priority
                  sizes="208px"
                  className="aspect-square h-auto w-full rounded-[1.1rem] object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-1.5 rounded-[1.1rem] ring-1 ring-white/30"
                />
              </div>
            </motion.div>

            <div>
              <p className="eyebrow justify-center">{BIRTHDAY.heroBadge}</p>
              <p className="font-display mt-4 text-xs font-medium uppercase tracking-[0.4em] text-slate-300">
                Happy Birthday
              </p>
              <h1 className="font-display text-gradient-gold animate-shine mt-2 text-3xl font-bold leading-tight sm:text-4xl">
                {BIRTHDAY.name}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {BIRTHDAY.tagline}
              </p>
            </div>

            <motion.button
              type="button"
              onClick={begin}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="btn-gold focus-ring relative flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              {!reduced ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gold-400/50"
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              ) : null}
              <span className="relative z-10">Tap to begin&nbsp;🎵</span>
            </motion.button>

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              Tap anywhere to start the celebration
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
