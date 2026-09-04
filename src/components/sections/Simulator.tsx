"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Calculator,
  MessageCircle,
  AlertCircle,
  Moon,
  Sun,
  Loader2,
  MapPin,
  TriangleAlert,
  ChevronLeft,
  Car,
  Users,
  Briefcase,
  UserRound,
  CreditCard,
  PackageOpen,
} from "lucide-react";
import { useSimulator } from "@/hooks/useSimulator";
import PlaceAutocomplete from "@/components/ui/PlaceAutocomplete";
import { buildWhatsAppLink, buildProWhatsAppLink, getRateLabel, calculatePrice } from "@/lib/pricing";

type Step = "client-type" | "driver-mode" | "passengers" | "form" | "pro-devis";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideIn: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.22, ease: "easeIn" } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

interface SelectCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  selected?: boolean;
  onClick: () => void;
}

function SelectCard({ icon, title, subtitle, selected, onClick }: SelectCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      style={{
        backgroundColor: selected ? "rgba(161,227,249,0.12)" : "rgba(255,255,255,0.04)",
        border: selected ? "1.5px solid rgba(161,227,249,0.6)" : "1.5px solid rgba(255,255,255,0.1)",
      }}
      className="w-full rounded-xl p-4 text-left flex items-start gap-4 cursor-pointer transition-colors"
    >
      <div
        style={{
          backgroundColor: selected ? "rgba(161,227,249,0.18)" : "rgba(255,255,255,0.06)",
          color: selected ? "#A1E3F9" : "rgba(255,255,255,0.4)",
        }}
        className="rounded-lg p-2.5 shrink-0 mt-0.5 transition-colors"
      >
        {icon}
      </div>
      <div>
        <p
          style={{ color: selected ? "#A1E3F9" : "rgba(255,255,255,0.85)" }}
          className="font-semibold text-sm leading-snug transition-colors"
        >
          {title}
        </p>
        <p className="text-white/40 text-xs mt-1 leading-relaxed">{subtitle}</p>
      </div>
    </motion.button>
  );
}

export default function Simulator() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const noToken = !token || token === "pk.ton_token_mapbox_copie_ici";

  const [step, setStep] = useState<Step>("client-type");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const {
    placeFrom,
    placeTo,
    distanceKm,
    isLoadingDistance,
    distanceError,
    result,
    priceFormatted,
    clientType,
    driverMode,
    hasPassengers,
    setPlaceFrom,
    setPlaceTo,
    setDistanceKm,
    setIsLoadingDistance,
    setDistanceError,
    setClientType,
    setDriverMode,
    setHasPassengers,
    reset,
  } = useSimulator();

  // Auto-fetch distance when both places set
  useEffect(() => {
    if (!placeFrom || !placeTo || noToken) return;

    setIsLoadingDistance(true);
    setDistanceError(null);
    setDistanceKm(null);

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${placeFrom.lon},${placeFrom.lat};${placeTo.lon},${placeTo.lat}?access_token=${token}&overview=false`
    )
      .then((r) => r.json())
      .then((data) => {
        const dist = data?.routes?.[0]?.distance;
        if (dist) {
          const km = Math.round(dist / 1000);
          setDistanceKm(km);
          const { price } = calculatePrice(km);
          fetch("/api/notify-simulation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cityFrom: placeFrom.label,
              cityTo: placeTo.label,
              distanceKm: km,
              price,
              driverMode,
              hasPassengers,
            }),
          }).catch(() => {});
        } else {
          setDistanceError("Impossible de calculer ce trajet. Vérifiez les villes.");
        }
      })
      .catch(() => setDistanceError("Erreur réseau. Réessayez."))
      .finally(() => setIsLoadingDistance(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeFrom, placeTo]);

  const handleCheckout = async () => {
    if (!result || !placeFrom || !placeTo || distanceKm === null) return;
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: result.price,
          cityFrom: placeFrom.label,
          cityTo: placeTo.label,
          distanceKm,
          driverMode,
          hasPassengers,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error ?? "Erreur lors du paiement.");
      }
    } catch {
      setCheckoutError("Erreur réseau. Réessayez.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleReset = () => {
    reset();
    setStep("client-type");
    setCheckoutError(null);
  };

  // Step labels for breadcrumb / back nav
  const stepLabel: Record<Step, string> = {
    "client-type": "Type de client",
    "driver-mode": "Type de service",
    "passengers": "Passagers",
    "form": "Votre trajet",
    "pro-devis": "Devis pro",
  };

  const canGoBack = step !== "client-type";
  const handleBack = () => {
    if (step === "driver-mode") setStep("client-type");
    else if (step === "passengers") setStep("driver-mode");
    else if (step === "form") setStep("passengers");
    else if (step === "pro-devis") setStep("client-type");
  };

  const whatsappLink =
    result && placeFrom && placeTo && distanceKm !== null
      ? buildWhatsAppLink(placeFrom.value, placeTo.value, distanceKm, result.price, {
          driverMode: driverMode ?? undefined,
          hasPassengers: hasPassengers ?? undefined,
        })
      : "#";

  return (
    <section
      id="simulator"
      style={{ backgroundColor: "#050B18" }}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(161,227,249,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator size={18} style={{ color: "#A1E3F9" }} />
            <span
              style={{ color: "#A1E3F9" }}
              className="text-xs font-bold tracking-[0.15em] uppercase"
            >
              Simulateur de prix
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
            Estimez votre trajet
          </h2>
          <p className="text-white/50 text-sm">
            De 0,79 à 0,95 €/km · Forfait minimum 50 € · +20% nuit &amp; dimanche
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="glass-card rounded-2xl p-8"
        >
          {/* Token warning */}
          {noToken && step === "form" && (
            <div
              style={{
                backgroundColor: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.25)",
              }}
              className="flex items-start gap-3 rounded-xl p-4 mb-6 text-amber-400/80 text-xs leading-relaxed"
            >
              <TriangleAlert size={14} className="shrink-0 mt-0.5" />
              <span>
                Token Mapbox non configuré. Renseignez{" "}
                <code className="font-mono text-amber-300">NEXT_PUBLIC_MAPBOX_TOKEN</code>{" "}
                dans <code className="font-mono text-amber-300">.env.local</code> pour
                activer l&apos;autocomplétion.
              </span>
            </div>
          )}

          {/* Back button + step indicator */}
          {canGoBack && (
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-xs"
              >
                <ChevronLeft size={14} />
                Retour
              </button>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-white/40 text-xs">{stepLabel[step]}</span>
            </div>
          )}

          {/* Steps */}
          <AnimatePresence mode="wait">

            {/* ── Step 1: Client type ── */}
            {step === "client-type" && (
              <motion.div
                key="client-type"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <p className="text-white/70 text-sm font-medium mb-1">
                  Quel type de client êtes-vous ?
                </p>
                <SelectCard
                  icon={<UserRound size={18} />}
                  title="Particulier · Un trajet simple"
                  subtitle="Vous avez un trajet ponctuel — estimation immédiate au kilomètre."
                  selected={clientType === "particulier"}
                  onClick={() => {
                    setClientType("particulier");
                    setStep("driver-mode");
                  }}
                />
                <SelectCard
                  icon={<Briefcase size={18} />}
                  title="Professionnel · Mise à disposition"
                  subtitle="Besoin d'un chauffeur pour une ou plusieurs journées — devis personnalisé."
                  selected={clientType === "professionnel"}
                  onClick={() => {
                    setClientType("professionnel");
                    setStep("pro-devis");
                  }}
                />
              </motion.div>
            )}

            {/* ── Step 2: Driver mode ── */}
            {step === "driver-mode" && (
              <motion.div
                key="driver-mode"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <p className="text-white/70 text-sm font-medium mb-1">
                  Quel service vous convient ?
                </p>
                <SelectCard
                  icon={<Car size={18} />}
                  title="Chauffeur sans voiture"
                  subtitle="Un chauffeur conduit votre véhicule de A vers B."
                  selected={driverMode === "sans-voiture"}
                  onClick={() => {
                    setDriverMode("sans-voiture");
                    setStep("passengers");
                  }}
                />
                <SelectCard
                  icon={<Users size={18} />}
                  title="Chauffeur avec voiture"
                  subtitle="Le chauffeur arrive avec son propre véhicule (service VTC). Idéal si vous n'avez pas de voiture disponible."
                  selected={driverMode === "avec-voiture"}
                  onClick={() => {
                    setDriverMode("avec-voiture");
                    setStep("passengers");
                  }}
                />
              </motion.div>
            )}

            {/* ── Step 3: Passengers ── */}
            {step === "passengers" && (
              <motion.div
                key="passengers"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-4"
              >
                <p className="text-white/70 text-sm font-medium mb-1">
                  {driverMode === "sans-voiture"
                    ? "Votre véhicule sera-t-il occupé ?"
                    : "Le véhicule transportera-t-il des passagers ?"}
                </p>
                <SelectCard
                  icon={<PackageOpen size={18} />}
                  title="Voiture vide"
                  subtitle="Le véhicule sera conduit sans passager — convoyage seul."
                  selected={hasPassengers === false}
                  onClick={() => {
                    setHasPassengers(false);
                    setStep("form");
                  }}
                />
                <SelectCard
                  icon={<Users size={18} />}
                  title="Avec passagers"
                  subtitle="Vous ou vos proches serez à bord durant le trajet."
                  selected={hasPassengers === true}
                  onClick={() => {
                    setHasPassengers(true);
                    setStep("form");
                  }}
                />
              </motion.div>
            )}

            {/* ── Step 4: Geo form + result ── */}
            {step === "form" && (
              <motion.div
                key="form"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="flex flex-col gap-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Départ */}
                  <motion.div variants={fieldVariants} className="flex flex-col gap-2">
                    <label className="text-white/60 text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: "#A1E3F9" }} />
                      Ville de départ
                    </label>
                    <PlaceAutocomplete
                      placeholder="Ex : Paris"
                      onSelect={setPlaceFrom}
                      onClear={() => setPlaceFrom(null)}
                    />
                  </motion.div>

                  {/* Arrivée */}
                  <motion.div variants={fieldVariants} className="flex flex-col gap-2">
                    <label className="text-white/60 text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: "#A1E3F9" }} />
                      Ville d&apos;arrivée
                    </label>
                    <PlaceAutocomplete
                      placeholder="Ex : Lyon"
                      onSelect={setPlaceTo}
                      onClear={() => setPlaceTo(null)}
                    />
                  </motion.div>

                  {/* Distance row */}
                  <AnimatePresence>
                    {(isLoadingDistance || distanceKm !== null || distanceError) && (
                      <motion.div
                        key="distance-row"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-2"
                      >
                        <label className="text-white/60 text-xs font-semibold tracking-wide uppercase">
                          Distance calculée
                        </label>
                        <div
                          className="input-dark w-full px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                          style={{ opacity: 0.85 }}
                        >
                          {isLoadingDistance && (
                            <>
                              <Loader2 size={14} className="animate-spin" style={{ color: "#A1E3F9" }} />
                              <span className="text-white/40">Calcul en cours…</span>
                            </>
                          )}
                          {!isLoadingDistance && distanceKm !== null && (
                            <span style={{ color: "#A1E3F9" }} className="font-semibold">
                              {distanceKm} km
                            </span>
                          )}
                          {!isLoadingDistance && distanceError && (
                            <span className="text-red-400/70 text-xs">{distanceError}</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isLoadingDistance && distanceKm === null && !distanceError && (
                    <motion.p variants={fieldVariants} className="text-white/25 text-xs text-center">
                      {noToken
                        ? "Ajoutez votre token Mapbox pour activer l'autocomplétion."
                        : "Sélectionnez vos villes — la distance se calcule automatiquement."}
                    </motion.p>
                  )}
                </motion.div>

                {/* Result panel */}
                <AnimatePresence>
                  {distanceKm !== null && result && (
                    <motion.div
                      initial={{ opacity: 0, y: 16, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 8, height: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="mt-6 overflow-hidden"
                    >
                      <div
                        style={{
                          backgroundColor: "rgba(161,227,249,0.06)",
                          border: "1px solid rgba(161,227,249,0.2)",
                        }}
                        className="rounded-xl p-6"
                      >
                        {/* Surcharge indicator */}
                        {result.hasSurcharge ? (
                          <div className="flex items-center gap-2 mb-3 text-amber-400/80 text-xs">
                            <Moon size={13} />
                            <span>Majoration nuit / dimanche (+20%) appliquée</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mb-3 text-white/30 text-xs">
                            <Sun size={13} />
                            <span>Tarif standard appliqué</span>
                          </div>
                        )}

                        {/* Rate info */}
                        <div className="flex items-center gap-2 mb-4 text-white/35 text-xs">
                          <span
                            style={{
                              backgroundColor: "rgba(161,227,249,0.1)",
                              color: "#A1E3F9",
                              border: "1px solid rgba(161,227,249,0.2)",
                            }}
                            className="rounded px-2 py-0.5 font-mono font-semibold text-[11px]"
                          >
                            {result.ratePerKm.toFixed(2).replace(".", ",")} €/km
                          </span>
                          <span>
                            {getRateLabel(distanceKm ?? 0)}
                          </span>
                        </div>

                        {/* Price */}
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="flex items-baseline gap-3 mb-5"
                        >
                          <span style={{ color: "#A1E3F9" }} className="font-display text-4xl font-black">
                            {priceFormatted}
                          </span>
                          <span className="text-white/40 text-sm">estimation TTC</span>
                        </motion.div>

                        {/* Frais de déplacement disclaimer */}
                        <div
                          style={{
                            backgroundColor: "rgba(251,191,36,0.06)",
                            border: "1px solid rgba(251,191,36,0.15)",
                          }}
                          className="flex items-start gap-2 rounded-lg px-3 py-2.5 mb-5"
                        >
                          <AlertCircle size={12} className="mt-0.5 shrink-0 text-amber-400/60" />
                          <p className="text-amber-400/60 text-xs leading-relaxed">
                            Frais de déplacement du chauffeur (péages, carburant, transport retour) à la charge du client — non inclus dans cette estimation.
                          </p>
                        </div>

                        {/* Stripe CTA */}
                        <motion.button
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                          style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
                          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                          whileHover={!isCheckingOut ? { scale: 1.02, boxShadow: "0 0 32px rgba(161,227,249,0.3)" } : {}}
                          whileTap={!isCheckingOut ? { scale: 0.97 } : {}}
                          transition={{ duration: 0.15 }}
                        >
                          {isCheckingOut ? (
                            <Loader2 size={17} className="animate-spin" />
                          ) : (
                            <CreditCard size={17} strokeWidth={2.5} />
                          )}
                          {isCheckingOut ? "Redirection…" : "Réserver et payer"}
                        </motion.button>

                        {checkoutError && (
                          <p className="text-red-400/70 text-xs text-center mt-3">{checkoutError}</p>
                        )}

                        {/* WhatsApp secondary */}
                        <div className="flex items-center justify-center gap-1.5 mt-4">
                          <MessageCircle size={13} style={{ color: "rgba(161,227,249,0.4)" }} />
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/35 text-xs hover:text-white/60 transition-colors"
                          >
                            Une question ? Écrivez-nous sur WhatsApp
                          </a>
                        </div>

                        {/* Reset */}
                        <div className="flex justify-center mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <button
                            onClick={handleReset}
                            className="text-white/25 text-xs hover:text-white/45 transition-colors"
                          >
                            Recommencer une simulation
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── Step 5: Pro devis ── */}
            {step === "pro-devis" && (
              <motion.div
                key="pro-devis"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center text-center gap-6 py-4"
              >
                <div
                  style={{
                    backgroundColor: "rgba(161,227,249,0.08)",
                    border: "1px solid rgba(161,227,249,0.2)",
                  }}
                  className="rounded-full p-4"
                >
                  <Briefcase size={28} style={{ color: "#A1E3F9" }} />
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    Devis professionnel sur mesure
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                    Pour une mise à disposition d&apos;un ou plusieurs jours, nous établissons un devis personnalisé adapté à vos besoins spécifiques.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  className="rounded-xl p-4 w-full text-left"
                >
                  <p className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-3">
                    Ce devis comprend
                  </p>
                  {[
                    "Tarif journalier ou forfaitaire",
                    "Chauffeur dédié à votre disposition",
                    "Frais kilométriques inclus selon accord",
                    "Facturation professionnelle (TVA, avoir)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 mb-2 last:mb-0">
                      <div
                        style={{ backgroundColor: "rgba(161,227,249,0.3)" }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={buildProWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-sm"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(161,227,249,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle size={17} strokeWidth={2.5} />
                  Demander un devis sur WhatsApp
                </motion.a>

                <button
                  onClick={handleReset}
                  className="text-white/25 text-xs hover:text-white/45 transition-colors"
                >
                  Revenir au début
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
