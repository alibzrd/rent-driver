"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Plane, Car } from "lucide-react";

const SERVICES = [
  {
    icon: HeartHandshake,
    badge: "Urgence & Empêchement",
    title: "Immobilisé ? Votre vie ne s'arrête pas.",
    description:
      "Problème de santé, mobilité réduite, perte de permis, fatigue… Peu importe la raison — sans jugement. Un chauffeur récupère votre véhicule et le livre à l'adresse de votre choix.",
    points: [
      "Disponible sous 48h",
      "Perte de permis : intervention sous 24h",
      "Retour chauffeur par la gare la plus proche",
      "Zéro question posée",
    ],
    featured: true,
  },
  {
    icon: Plane,
    badge: "Vacances & Résidences",
    title: "Prenez le train, votre voiture arrive.",
    description:
      "Résidence secondaire, maison de vacances, déménagement partiel. Partez léger — retrouvez votre véhicule sur place. Sans l'autoroute, sans la fatigue.",
    points: [
      "Paris → Nice, Lyon → Biarritz…",
      "Retour chauffeur par la gare la plus proche",
      "Livraison porte-à-porte",
    ],
  },
  {
    icon: Car,
    badge: "Achat & Rapatriement",
    title: "Achetez à distance, livré chez vous.",
    description:
      "Véhicule trouvé sur Leboncoin, chez un concessionnaire ou à l'étranger ? Nos chauffeurs assurent la récupération et la livraison depuis toute l'Europe.",
    points: [
      "Allemagne, Pays-Bas, Espagne…",
      "Vérification visuelle au départ",
      "Sur devis pour l'Europe",
    ],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: EASE },
  }),
};

export default function Services() {
  return (
    <section id="services" style={{ backgroundColor: "#000000" }} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span style={{ color: "#A1E3F9" }} className="text-xs font-bold tracking-[0.15em] uppercase mb-4 block">
            Nos services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Une solution pour chaque situation
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, badge, title, description, points, featured }, i) => (
            <motion.div
              key={badge}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: featured
                  ? "0 12px 48px rgba(161,227,249,0.18), inset 0 0 0 1px rgba(161,227,249,0.45)"
                  : "0 12px 40px rgba(161,227,249,0.1), inset 0 0 0 1px rgba(161,227,249,0.28)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                backgroundColor: "rgba(5,11,24,0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: featured
                  ? "1px solid rgba(161,227,249,0.35)"
                  : "1px solid rgba(161,227,249,0.12)",
              }}
              className="rounded-2xl p-8 flex flex-col gap-6 relative cursor-default"
            >
              {featured && (
                <span
                  style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full tracking-wider uppercase whitespace-nowrap"
                >
                  Le plus demandé
                </span>
              )}

              <div className="flex items-start justify-between">
                <motion.div
                  style={{ backgroundColor: "rgba(161,227,249,0.1)", border: "1px solid rgba(161,227,249,0.15)" }}
                  whileHover={{ backgroundColor: "rgba(161,227,249,0.18)", boxShadow: "0 0 20px rgba(161,227,249,0.2)" }}
                  transition={{ duration: 0.2 }}
                  className="p-3 rounded-xl"
                >
                  <Icon size={22} style={{ color: "#A1E3F9" }} />
                </motion.div>
                <span
                  style={{ border: "1px solid rgba(161,227,249,0.2)", color: "rgba(161,227,249,0.7)" }}
                  className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{description}</p>
              </div>

              <ul className="flex flex-col gap-2 mt-auto">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-white/50 text-sm">
                    <span style={{ backgroundColor: "#A1E3F9" }} className="w-1 h-1 rounded-full shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
