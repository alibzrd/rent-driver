"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Shield, Clock, MapPin, Car, Users } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/pricing";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

function useCounter(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(value, 1600, inView);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span style={{ color: "#A1E3F9" }} className="font-display text-5xl sm:text-6xl font-black tabular-nums">
        +{count}
      </span>
      <span className="text-white/40 text-sm tracking-wide">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(161,227,249,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(161,227,249,1) 1px, transparent 1px), linear-gradient(90deg, rgba(161,227,249,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        {/* Eyebrow */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
          <span
            style={{ border: "1px solid rgba(161,227,249,0.3)", color: "#A1E3F9", backgroundColor: "rgba(161,227,249,0.06)" }}
            className="text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
          >
            Service de chauffeur — France & Europe
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-white"
        >
          Votre voiture livrée.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #A1E3F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vous, libre.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Un chauffeur se déplace à votre véhicule — ou arrive avec le sien.
          Vous prenez le train, on gère le reste.
        </motion.p>

        {/* Two service pills */}
        <motion.div
          custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          {[
            { icon: Car, label: "Chauffeur sans voiture", sub: "Il conduit votre véhicule" },
            { icon: Users, label: "Chauffeur avec voiture", sub: "Il amène son propre véhicule" },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              style={{
                backgroundColor: "rgba(161,227,249,0.06)",
                border: "1px solid rgba(161,227,249,0.22)",
              }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
            >
              <div
                style={{ backgroundColor: "rgba(161,227,249,0.12)" }}
                className="p-2 rounded-lg"
              >
                <Icon size={16} style={{ color: "#A1E3F9" }} />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold leading-none mb-0.5">{label}</p>
                <p className="text-white/40 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#simulator"
            style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-200 shadow-lg"
          >
            Estimer mon trajet
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href={`tel:+${PHONE_DISPLAY.replace(/\s/g, "")}`}
            style={{ border: "1px solid rgba(161,227,249,0.25)", color: "rgba(240,240,240,0.8)" }}
            className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm hover:border-[rgba(161,227,249,0.6)] hover:text-white transition-all duration-200"
          >
            Appeler — {PHONE_DISPLAY}
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Shield, label: "Assurance Tous Risques" },
            { icon: Clock, label: "Disponible 7j/7" },
            { icon: MapPin, label: "France & Europe" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/40 text-sm">
              <Icon size={15} style={{ color: "#A1E3F9" }} />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Social proof counters */}
        <motion.div
          custom={6} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20"
        >
          <StatCounter value={150} label="particuliers accompagnés" />
          <div className="hidden sm:block w-px h-12" style={{ backgroundColor: "rgba(161,227,249,0.15)" }} />
          <StatCounter value={40} label="clients professionnels" />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
      />
    </section>
  );
}
