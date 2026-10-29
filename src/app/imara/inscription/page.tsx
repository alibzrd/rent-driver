"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, GraduationCap, Loader2 } from "lucide-react";

const FORMATIONS = [
  "HeadSpa",
  "Microblading",
  "Microshading",
  "Microblading + Microshading",
  "Extension de cils — Classique",
  "Extension de cils — Volume Russe",
  "Réhaussement de cils · Teinture · Lash Botox",
  "Épilation au fil",
  "Épilation au fil · Teinture",
  "Épilation au fil · Browlift · Teinture",
  "Browlift",
  "Hydr'Imara",
  "Imara Lips",
  "Eye Liner permanent",
  "Blanchiment dentaire",
  "Strass dentaire",
  "Maquillage",
  "Auto-Maquillage",
  "Maquillage Mariée",
  "Piercing",
  "Hygiène et salubrité",
];

const FINANCEMENTS = [
  { value: "cpf", label: "CPF — Mon Compte Formation", desc: "Financement via vos droits CPF accumulés" },
  { value: "opco", label: "OPCO — Prise en charge employeur", desc: "Via votre OPCO si vous êtes salarié(e)" },
  { value: "pole-emploi", label: "France Travail (Pôle Emploi)", desc: "Si vous êtes demandeur d'emploi" },
  { value: "particulier", label: "Particulier — Paiement personnel", desc: "Paiement en une ou plusieurs fois" },
  { value: "non-defini", label: "Je ne sais pas encore", desc: "Notre équipe vous guidera" },
];

type FormData = {
  formation: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  financement: string;
  message: string;
};

const EMPTY: FormData = {
  formation: "", nom: "", prenom: "", email: "",
  telephone: "", ville: "", financement: "", message: "",
};

export default function InscriptionPage() {
  return (
    <Suspense>
      <InscriptionForm />
    </Suspense>
  );
}

function InscriptionForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);

  useEffect(() => {
    const f = searchParams.get("formation");
    if (f) setData((d) => ({ ...d, formation: f }));
  }, [searchParams]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 1) return !!data.formation;
    if (step === 2) return !!(data.nom && data.prenom && data.email && data.telephone);
    if (step === 3) return !!data.financement;
    return true;
  };

  const submit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/imara/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessayez ou contactez-nous sur Instagram.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#4A7C59]/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} style={{ color: "#4A7C59" }} />
          </div>
          <h1
            className="text-4xl font-light text-[#2C2C2C] mb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Demande envoyée !
          </h1>
          <p
            className="text-[#6B6B6B] text-base leading-relaxed mb-2"
            style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
          >
            Bonjour <strong>{data.prenom}</strong>, votre demande d&apos;inscription à{" "}
            <strong>{data.formation}</strong> a bien été reçue.
          </p>
          <p
            className="text-[#6B6B6B] text-sm mb-8"
            style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
          >
            Maryline vous contactera sous <strong>48h</strong> pour confirmer les dates
            et modalités. Un email de confirmation vous a été envoyé à{" "}
            <strong>{data.email}</strong>.
          </p>
          <Link
            href="/imara"
            className="inline-flex items-center gap-2 bg-[#2A4A5E] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#1e3a4e] transition-colors"
            style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DF]">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/imara"
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#2C2C2C] transition-colors text-sm"
            style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
          >
            <ChevronLeft size={16} />
            Retour
          </Link>
          <span
            className="text-sm font-medium text-[#2C2C2C]"
            style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
          >
            Inscription formation
          </span>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: s <= step ? "#2A4A5E" : "#E8E4DF",
                  color: s <= step ? "white" : "#6B6B6B",
                  fontFamily: "var(--font-dmsans), system-ui, sans-serif",
                }}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 4 && (
                <div
                  className="flex-1 h-0.5 transition-all"
                  style={{ background: s < step ? "#2A4A5E" : "#E8E4DF" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Formation */}
        {step === 1 && (
          <div>
            <div className="mb-8">
              <p
                className="text-xs tracking-widest text-[#2A4A5E] uppercase mb-2"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Étape 1 / 4
              </p>
              <h1
                className="text-4xl font-light text-[#2C2C2C] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Quelle formation vous intéresse ?
              </h1>
              <p
                className="text-[#6B6B6B] text-sm"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                22 programmes disponibles · CPF éligible pour la plupart
              </p>
            </div>

            <div className="grid gap-2">
              {FORMATIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => set("formation", f)}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-left transition-all"
                  style={{
                    background: data.formation === f ? "#2A4A5E08" : "white",
                    borderColor: data.formation === f ? "#2A4A5E" : "#E8E4DF",
                    fontFamily: "var(--font-dmsans), system-ui, sans-serif",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: data.formation === f ? "#2A4A5E" : "#2C2C2C" }}
                  >
                    {f}
                  </span>
                  {data.formation === f && (
                    <CheckCircle2 size={16} style={{ color: "#2A4A5E", flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Contact */}
        {step === 2 && (
          <div>
            <div className="mb-8">
              <p
                className="text-xs tracking-widest text-[#2A4A5E] uppercase mb-2"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Étape 2 / 4
              </p>
              <h1
                className="text-4xl font-light text-[#2C2C2C] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Vos coordonnées
              </h1>
              <p
                className="text-[#6B6B6B] text-sm"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Formation choisie : <strong style={{ color: "#2A4A5E" }}>{data.formation}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prénom *" value={data.prenom} onChange={(v) => set("prenom", v)} placeholder="Marie" />
                <Field label="Nom *" value={data.nom} onChange={(v) => set("nom", v)} placeholder="Dupont" />
              </div>
              <Field label="Email *" type="email" value={data.email} onChange={(v) => set("email", v)} placeholder="marie@email.com" />
              <Field label="Téléphone *" type="tel" value={data.telephone} onChange={(v) => set("telephone", v)} placeholder="06 XX XX XX XX" />
              <Field label="Ville" value={data.ville} onChange={(v) => set("ville", v)} placeholder="Lieusaint, Melun..." />
            </div>
          </div>
        )}

        {/* Step 3 — Financement */}
        {step === 3 && (
          <div>
            <div className="mb-8">
              <p
                className="text-xs tracking-widest text-[#2A4A5E] uppercase mb-2"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Étape 3 / 4
              </p>
              <h1
                className="text-4xl font-light text-[#2C2C2C] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Financement envisagé
              </h1>
              <p
                className="text-[#6B6B6B] text-sm"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Vous ne savez pas encore ? Pas de souci, on vous guide.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {FINANCEMENTS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => set("financement", f.label)}
                  className="flex items-start gap-4 w-full px-5 py-4 rounded-xl border text-left transition-all"
                  style={{
                    background: data.financement === f.label ? "#2A4A5E08" : "white",
                    borderColor: data.financement === f.label ? "#2A4A5E" : "#E8E4DF",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0"
                    style={{
                      borderColor: data.financement === f.label ? "#2A4A5E" : "#E8E4DF",
                      background: data.financement === f.label ? "#2A4A5E" : "transparent",
                    }}
                  >
                    {data.financement === f.label && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: data.financement === f.label ? "#2A4A5E" : "#2C2C2C",
                        fontFamily: "var(--font-dmsans), system-ui, sans-serif",
                      }}
                    >
                      {f.label}
                    </p>
                    <p
                      className="text-xs text-[#6B6B6B] mt-0.5"
                      style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Récap + message */}
        {step === 4 && (
          <div>
            <div className="mb-8">
              <p
                className="text-xs tracking-widest text-[#2A4A5E] uppercase mb-2"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Étape 4 / 4
              </p>
              <h1
                className="text-4xl font-light text-[#2C2C2C] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Confirmation
              </h1>
            </div>

            {/* Recap */}
            <div className="bg-white rounded-2xl border border-[#E8E4DF] divide-y divide-[#E8E4DF] mb-6">
              {[
                ["Formation", data.formation],
                ["Nom", `${data.prenom} ${data.nom}`],
                ["Email", data.email],
                ["Téléphone", data.telephone],
                ["Ville", data.ville || "—"],
                ["Financement", data.financement],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start gap-4 px-5 py-3.5">
                  <span
                    className="text-xs text-[#6B6B6B] w-28 flex-shrink-0 pt-0.5"
                    style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm font-medium text-[#2C2C2C]"
                    style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Message optionnel */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-[#2C2C2C] mb-2"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                Message (optionnel)
              </label>
              <textarea
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
                rows={3}
                placeholder="Questions sur la formation, disponibilités particulières..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E4DF] bg-white outline-none focus:border-[#2A4A5E] resize-none transition-colors"
                style={{
                  fontFamily: "var(--font-dmsans), system-ui, sans-serif",
                  color: "#2C2C2C",
                }}
              />
            </div>

            {errorMsg && (
              <p
                className="text-red-600 text-sm mb-4"
                style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
              >
                {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E4DF]">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#2C2C2C] transition-colors"
              style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
            >
              <ChevronLeft size={16} />
              Retour
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 bg-[#2A4A5E] text-white text-sm font-medium px-6 py-3 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1e3a4e]"
              style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
            >
              Continuer
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={status === "loading"}
              className="flex items-center gap-2 bg-[#2A4A5E] text-white text-sm font-medium px-6 py-3 rounded-lg transition-all disabled:opacity-60 hover:bg-[#1e3a4e]"
              style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
            >
              {status === "loading" ? (
                <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
              ) : (
                <><GraduationCap size={16} /> Envoyer ma demande</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label
        className="block text-xs font-medium text-[#2C2C2C] mb-1.5 uppercase tracking-wide"
        style={{ fontFamily: "var(--font-dmsans), system-ui, sans-serif" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E4DF] bg-white outline-none focus:border-[#2A4A5E] transition-colors"
        style={{
          fontFamily: "var(--font-dmsans), system-ui, sans-serif",
          color: "#2C2C2C",
        }}
      />
    </div>
  );
}
