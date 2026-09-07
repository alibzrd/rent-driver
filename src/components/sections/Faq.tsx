"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "Le trajet est-il couvert par une assurance ?",
    answer:
      "Oui. Chaque prestation est couverte par une assurance Tous Risques spécifique au transport de véhicules privés. Votre voiture est protégée de la prise en charge jusqu'à la livraison, quel que soit le trajet ou la valeur du véhicule.",
  },
  {
    question: "Les frais de carburant et de péage sont-ils inclus ?",
    answer:
      "Non. L'estimation affichée dans le simulateur correspond uniquement aux frais de chauffeur (1,50 €/km). Les frais de carburant et de péage s'ajoutent selon l'itinéraire réel et sont détaillés dans le devis définitif confirmé par WhatsApp.",
  },
  {
    question: "Comment sont sélectionnés vos chauffeurs ?",
    answer:
      "Chaque chauffeur Rent Driver doit répondre à trois critères stricts : minimum 5 ans de permis de conduire, casier judiciaire vierge et test de conduite validé par notre équipe. Aucun chauffeur n'est mis en service sans avoir satisfait ces conditions.",
  },
  {
    question: "Puis-je suivre mon véhicule en temps réel ?",
    answer:
      "Oui. Votre chauffeur vous envoie sa position GPS en temps réel via WhatsApp tout au long du trajet. Vous recevez également une notification à la prise en charge et à la livraison.",
  },
  {
    question: "La majoration nuit et dimanche est-elle automatique ?",
    answer:
      "Le simulateur applique automatiquement la majoration de +20% pour les trajets de nuit (22h–06h) et les dimanches, en se basant sur l'heure actuelle de votre simulation. Le tarif définitif est confirmé dans le devis WhatsApp.",
  },
  {
    question: "Intervenez-vous en dehors de la France ?",
    answer:
      "Oui, sur devis. Nous couvrons la Belgique, les Pays-Bas, le Luxembourg, la Suisse, l'Espagne et l'Italie. Contactez-nous directement via WhatsApp pour obtenir une estimation personnalisée sur un trajet international.",
  },
  {
    question: "Quel est le délai de prise en charge ?",
    answer:
      "En général, nous intervenons sous 24h à 48h après confirmation de la réservation. Pour les urgences médicales ou situations critiques, nous faisons notre maximum pour intervenir le jour même selon les disponibilités.",
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ question, answer, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ borderBottom: "1px solid rgba(161,227,249,0.08)" }}
      className="py-5"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <span className="text-white/85 text-sm sm:text-base font-medium group-hover:text-white transition-colors duration-200 leading-snug">
          {question}
        </span>
        <span
          style={
            isOpen
              ? { backgroundColor: "#A1E3F9", color: "#000000" }
              : {
                  backgroundColor: "rgba(161,227,249,0.08)",
                  border: "1px solid rgba(161,227,249,0.2)",
                  color: "#A1E3F9",
                }
          }
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
        >
          {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-white/50 text-sm leading-relaxed pr-10">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      style={{ backgroundColor: "#000000" }}
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            style={{ color: "#A1E3F9" }}
            className="text-xs font-bold tracking-[0.15em] uppercase mb-4 block"
          >
            Questions fréquentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Tout ce que vous devez savoir
          </h2>
        </motion.div>

        <div
          style={{
            backgroundColor: "rgba(5,11,24,0.5)",
            border: "1px solid rgba(161,227,249,0.1)",
          }}
          className="rounded-2xl px-6 sm:px-8"
        >
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              {...faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/35 text-sm mt-10"
        >
          Autre question ?{" "}
          <a
            href="https://wa.me/33767230362"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#A1E3F9" }}
            className="hover:underline transition-colors"
          >
            Écrivez-nous sur WhatsApp
          </a>
        </motion.p>
      </div>
    </section>
  );
}
