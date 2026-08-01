"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BIRTHDAY, HERO_IMAGE } from "@/lib/constants";
import { celebrate } from "@/lib/celebrate";
import { useMounted } from "@/hooks/useMounted";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const mounted = useMounted();
  const reduced = useReducedMotion() ?? false;
  const reduceMotion = mounted && reduced;

  const motionProps = reduceMotion
    ? { initial: false, animate: "show" }
    : { initial: "hidden", animate: "show" };

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-navy-600/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-gold-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-navy-600/20 blur-3xl"
      />

      <motion.div
        variants={container}
        {...motionProps}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-24"
      >
        <motion.div variants={item} className="text-center lg:text-left">
          <span className="eyebrow justify-center lg:justify-start">
            {BIRTHDAY.heroBadge}
          </span>

          <p className="font-display mt-6 text-sm font-medium uppercase tracking-[0.4em] text-slate-300 sm:text-base">
            Happy Birthday
          </p>

          <h1 className="font-display mt-3 text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
            <span className="text-gradient-gold animate-shine block">
              {BIRTHDAY.name}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg lg:mx-0">
            {BIRTHDAY.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="#wishes" className="btn-gold focus-ring px-7 py-3.5 text-sm">
              Read Birthday Wishes
            </a>
            <button
              type="button"
              onClick={celebrate}
              className="btn-ghost focus-ring px-7 py-3.5 text-sm"
            >
              Celebrate&nbsp;🎉
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="glass-card rounded-full px-5 py-2 text-sm text-slate-200">
              🎂 Turning {BIRTHDAY.age} today
            </span>
            <span className="glass-card rounded-full px-5 py-2 text-sm text-slate-200">
              ✦ Since {BIRTHDAY.birthDate}
            </span>
          </div>
        </motion.div>

        <motion.div variants={item} className="relative mx-auto w-full max-w-md">
          <div className="gold-frame animate-float">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 768px) 90vw, 420px"
              className="aspect-square h-auto w-full rounded-[1.1rem] object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-1.5 rounded-[1.1rem] ring-1 ring-white/30"
            />
          </div>

          <motion.div
            aria-hidden
            className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="glass-card rounded-full px-6 py-2.5 text-sm font-semibold text-gold-200">
              {BIRTHDAY.salutation}
            </div>
          </motion.div>

          <Sparkles />
        </motion.div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

function Sparkles() {
  const sparkles = [
    { top: "8%", left: "-6%", delay: 0, size: 14 },
    { top: "18%", right: "-8%", delay: 0.8, size: 10 },
    { top: "60%", left: "-10%", delay: 1.6, size: 12 },
    { top: "72%", right: "-6%", delay: 0.4, size: 8 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {sparkles.map((sparkle, index) => (
        <span
          key={index}
          className="animate-sparkle absolute text-gold-300"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            right: sparkle.right,
            fontSize: sparkle.size,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

function ScrollHint() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-2 text-slate-400">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="animate-float flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-2 w-1 rounded-full bg-gold-400" />
        </span>
      </div>
    </div>
  );
}
