export const metadata = { title: "Mentions légales — Rent Driver" };

export default function MentionsLegales() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050B18" }}>
      <main className="max-w-3xl mx-auto px-6 py-32 text-white/75 leading-relaxed">
        <a href="/" className="text-xs mb-10 inline-block hover:opacity-70 transition-opacity" style={{ color: "#A1E3F9" }}>
          ← Retour à l&apos;accueil
        </a>

        <h1 className="font-display text-3xl font-black text-white mb-12">Mentions légales</h1>

        <Section title="Éditeur du site">
          <Row label="Société">Rent Driver</Row>
          <Row label="Forme juridique">SAS (Société par Actions Simplifiée)</Row>
          <Row label="Capital social">10 000 €</Row>
          <Row label="Siège social">Vernon Giverny, France</Row>
          <Row label="Téléphone">07 67 23 03 62</Row>
          <Row label="Email">contact@rentdriver.fr</Row>
        </Section>

        <Section title="Directeur de la publication">
          Le Directeur Général de la société Rent Driver.
        </Section>

        <Section title="Hébergement">
          <Row label="Hébergeur">Vercel Inc.</Row>
          <Row label="Adresse">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</Row>
          <Row label="Site">vercel.com</Row>
        </Section>

        <Section title="Propriété intellectuelle">
          L&apos;ensemble du contenu du site (textes, images, logos, design) est la propriété exclusive de Rent Driver.
          Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
        </Section>

        <Section title="Responsabilité" last>
          Rent Driver s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées sur ce site. Toutefois,
          la société ne saurait être tenue responsable des erreurs, omissions ou résultats obtenus par un mauvais usage de ces informations.
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section className={last ? "mb-0" : "mb-10 pb-10"} style={last ? {} : { borderBottom: "1px solid rgba(161,227,249,0.08)" }}>
      <h2 className="text-base font-bold mb-4" style={{ color: "#A1E3F9" }}>{title}</h2>
      <div className="text-white/70 text-sm space-y-2">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-white/40 shrink-0 w-32">{label}</span>
      <span>{children}</span>
    </div>
  );
}
