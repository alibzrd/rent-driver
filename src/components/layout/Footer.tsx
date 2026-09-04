import { PHONE_DISPLAY } from "@/lib/pricing";

const CITIES_FR = [
  "Aix-en-Provence","Amiens","Angers","Annecy","Bordeaux","Brest","Caen","Dijon",
  "Grenoble","Le Havre","Lille","Limoges","Lyon","Marseille","Montpellier","Nantes",
  "Nice","Nîmes","Orléans","Paris","Perpignan","Reims","Rennes","Rouen",
  "Saint-Étienne","Strasbourg","Toulon","Toulouse","Tours","Villeurbanne",
];

const CITIES_EU = [
  "Bruxelles","Anvers","Gand","Liège","Amsterdam","Rotterdam","Utrecht",
  "Luxembourg-Ville","Genève","Zurich","Barcelone","Madrid","Milan","Rome",
];

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#050B18", borderTop: "1px solid rgba(161,227,249,0.1)" }}
      className="py-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Brand */}
        <div className="mb-12">
          <p className="font-display text-2xl font-black tracking-[0.2em] text-white mb-2">
            RENT <span style={{ color: "#A1E3F9" }}>DRIVER</span>
          </p>
          <p className="text-white/40 text-sm max-w-xs">
            Service de chauffeur professionnel — France &amp; Europe.
          </p>
          <p className="text-white/30 text-xs mt-1">{PHONE_DISPLAY}</p>
        </div>

        {/* SEO Cities — France */}
        <div className="mb-12">
          <h3 style={{ color: "#A1E3F9" }} className="text-xs font-bold tracking-[0.15em] uppercase mb-4">
            Service chauffeur — France
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {CITIES_FR.map((city) => (
              <span key={city} className="text-white/40 text-xs hover:text-white/70 transition-colors cursor-default">
                Chauffeur {city}
              </span>
            ))}
          </div>
        </div>

        {/* SEO Cities — Europe */}
        <div className="mb-12">
          <h3 style={{ color: "#A1E3F9" }} className="text-xs font-bold tracking-[0.15em] uppercase mb-4">
            Service Europe — Sur Devis
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {CITIES_EU.map((city) => (
              <span key={city} className="text-white/40 text-xs hover:text-white/70 transition-colors cursor-default">
                Chauffeur {city}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid rgba(161,227,249,0.08)" }}
          className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white/30 text-xs"
        >
          <p>© {new Date().getFullYear()} Rent Driver · SAS au capital de 10 000 € · Vernon Giverny</p>
          <div className="flex gap-6">
            <a href="/mentions-legales" className="hover:text-white/60 transition-colors">Mentions légales</a>
            <a href="/politique-de-confidentialite" className="hover:text-white/60 transition-colors">Confidentialité</a>
            <a href="/cgv" className="hover:text-white/60 transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
