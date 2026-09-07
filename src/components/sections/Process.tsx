"use client";

import { motion } from "framer-motion";
import { Calculator, MessageCircle, Car } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Calculator,
    title: "Simulation",
    description:
      "Renseignez votre ville de départ et d'arrivée. Obtenez une estimation instantanée du prix de votre trajet.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Validation WhatsApp",
    description:
      "Un clic envoie votre demande avec tous les détails directement à notre équipe. Un conseiller confirme votre réservation en quelques minutes.",
  },
  {
    number: "03",
    icon: Car,
    title: "Prise en charge",
    description:
      "Votre chauffeur se présente à l'adresse convenue. Suivi GPS en temps réel via WhatsApp. Votre véhicule arrive à destination.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      style={{ backgroundColor: "#050B18" }}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(161,227,249,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            style={{ color: "#A1E3F9" }}
            className="text-xs font-bold tracking-[0.15em] uppercase mb-4 block"
          >
            Comment ça marche
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Réservez en 3 étapes
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(161,227,249,0.2) 20%, rgba(161,227,249,0.2) 80%, transparent 100%)",
            }}
          />

          {STEPS.map(({ number, icon: Icon, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center gap-5"
            >
              {/* Step circle */}
              <div className="relative">
                <div
                  style={{
                    backgroundColor: "rgba(161,227,249,0.08)",
                    border: "1px solid rgba(161,227,249,0.25)",
                  }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                >
                  <Icon size={28} style={{ color: "#A1E3F9" }} />
                </div>
                <span
                  style={{
                    backgroundColor: "#A1E3F9",
                    color: "#000000",
                  }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center"
                >
                  {i + 1}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#simulator"
            style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-200"
          >
            Commencer ma simulation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
