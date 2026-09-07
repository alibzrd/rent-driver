import { CheckCircle2, ArrowLeft, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservation confirmée — Rent Driver",
};

interface Props {
  searchParams: Promise<{ from?: string; to?: string; km?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const from = params.from ?? "—";
  const to = params.to ?? "—";
  const km = params.km ?? "—";

  return (
    <main
      style={{ backgroundColor: "#000000" }}
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      {/* Glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(161,227,249,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              backgroundColor: "rgba(161,227,249,0.1)",
              border: "1px solid rgba(161,227,249,0.25)",
            }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 size={36} style={{ color: "#A1E3F9" }} />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
          Paiement confirmé
        </h1>
        <p className="text-white/50 text-sm mb-10 leading-relaxed">
          Votre réservation est enregistrée. Notre équipe vous contacte sous
          peu pour coordonner la prise en charge.
        </p>

        {/* Booking card */}
        <div
          style={{
            backgroundColor: "rgba(5,11,24,0.5)",
            border: "1px solid rgba(161,227,249,0.15)",
          }}
          className="rounded-2xl p-6 mb-10 text-left"
        >
          <p
            style={{ color: "#A1E3F9" }}
            className="text-xs font-bold tracking-[0.15em] uppercase mb-4"
          >
            Détails du trajet
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Départ</span>
              <span className="text-white font-medium">{decodeURIComponent(from)}</span>
            </div>
            <div
              style={{ borderTop: "1px solid rgba(161,227,249,0.06)" }}
              className="flex justify-between text-sm pt-3"
            >
              <span className="text-white/40">Arrivée</span>
              <span className="text-white font-medium">{decodeURIComponent(to)}</span>
            </div>
            <div
              style={{ borderTop: "1px solid rgba(161,227,249,0.06)" }}
              className="flex justify-between text-sm pt-3"
            >
              <span className="text-white/40">Distance</span>
              <span className="text-white font-medium">{km} km</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            style={{
              border: "1px solid rgba(161,227,249,0.2)",
              color: "rgba(240,240,240,0.7)",
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Retour à l&apos;accueil
          </a>
          <a
            href="tel:+33767230362"
            style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition-all"
          >
            <Phone size={15} />
            Appeler notre équipe
          </a>
        </div>
      </div>
    </main>
  );
}
