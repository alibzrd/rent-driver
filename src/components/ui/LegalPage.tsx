"use client";

import { ReactNode } from "react";

export function LegalPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#050B18", minHeight: "100vh" }}>
      {/* Top band */}
      <div style={{ borderBottom: "1px solid rgba(161,227,249,0.1)", backgroundColor: "rgba(0,0,0,0.4)" }} className="px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="font-display text-lg font-black tracking-[0.2em] text-white">
            RENT <span style={{ color: "#A1E3F9" }}>DRIVER</span>
          </a>
          <a href="/" style={{ color: "#A1E3F9" }} className="text-xs hover:underline">
            ← Accueil
          </a>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p style={{ color: "#A1E3F9" }} className="text-xs font-bold tracking-[0.15em] uppercase mb-3">
            Rent Driver — Informations légales
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white">{title}</h1>
          {subtitle && <p className="text-white/35 text-sm mt-2">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="space-y-0">{children}</div>
      </main>
    </div>
  );
}

export function LegalSection({ title, children, last }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <section
      className={last ? "pb-0" : "pb-10 mb-10"}
      style={last ? {} : { borderBottom: "1px solid rgba(161,227,249,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div style={{ width: 3, height: 20, backgroundColor: "#A1E3F9", borderRadius: 2, flexShrink: 0 }} />
        <h2 className="text-sm font-bold text-white tracking-wide">{title}</h2>
      </div>
      <div className="text-white/60 text-sm leading-relaxed space-y-2 pl-[15px]">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#A1E3F9" }} />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

export function LegalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span className="text-white/35 shrink-0" style={{ minWidth: 130 }}>{label}</span>
      <span className="text-white/70">{value}</span>
    </div>
  );
}
