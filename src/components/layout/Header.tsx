"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#simulator", label: "Simulateur" },
  { href: "#process", label: "Comment ça marche" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-black tracking-[0.2em] text-white">
          RENT{" "}
          <span
            style={{ color: "#A1E3F9" }}
            className="font-black"
          >
            DRIVER
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+33767230362"
            style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
            className="hidden sm:flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition-all duration-200"
          >
            <Phone size={15} strokeWidth={2.5} />
            Urgence
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm font-medium">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="tel:+33767230362"
            style={{ backgroundColor: "#A1E3F9", color: "#000000" }}
            className="flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-full"
          >
            <Phone size={15} strokeWidth={2.5} />
            Appel Urgence
          </a>
        </div>
      )}
    </header>
  );
}
