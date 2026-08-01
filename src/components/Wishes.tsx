"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import { wishes } from "@/lib/wishes";
import { WISHES_IMAGE } from "@/lib/constants";

export default function Wishes() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="wishes" className="relative px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-navy-600/20 blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Birthday Wishes"
          title="Warm wishes from all of us"
          description="A few words from the people who treasure you most."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-sm lg:sticky lg:top-24 lg:self-start"
          >
            <div className="glass-card rotate-[-2deg] rounded-3xl p-4 pb-7 transition-transform duration-500 hover:rotate-0">
              <div className="gold-frame">
                <Image
                  src={WISHES_IMAGE.src}
                  alt={WISHES_IMAGE.alt}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 640px) 90vw, 380px"
                  className="aspect-square h-auto w-full rounded-[1.1rem] object-cover"
                />
              </div>
              <p className="mt-5 text-center font-display text-xl font-bold text-white">
                {`Dr. Mansoor Ahmed`}
              </p>
              <p className="mt-1 text-center text-sm uppercase tracking-[0.28em] text-gold-300">
                A day to remember
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="h-px w-8 bg-gold-500/60" />
                ✦
                <span className="h-px w-8 bg-gold-500/60" />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-7">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.author}
                initial={reduceMotion ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard className="relative overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1 md:p-9">
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -right-2 -top-8 select-none text-[7rem] font-bold leading-none text-gold-500/15"
                  >
                    &ldquo;
                  </span>
                  <p className="relative text-base leading-relaxed text-slate-200 md:text-lg">
                    {wish.message}
                  </p>
                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-navy-950"
                    >
                      ✦
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-white">
                        {wish.author}
                      </p>
                      {wish.role ? (
                        <p className="text-xs uppercase tracking-[0.2em] text-gold-300">
                          {wish.role}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
