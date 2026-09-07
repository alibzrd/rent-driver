export const metadata = { title: "Conditions Générales de Vente — Rent Driver" };

export default function CGV() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050B18" }}>
      <main className="max-w-3xl mx-auto px-6 py-32 text-white/75 leading-relaxed">
        <a href="/" className="text-xs mb-10 inline-block hover:opacity-70 transition-opacity" style={{ color: "#A1E3F9" }}>
          ← Retour à l&apos;accueil
        </a>

        <h1 className="font-display text-3xl font-black text-white mb-3">Conditions Générales de Vente</h1>
        <p className="text-white/35 text-sm mb-12">En vigueur au 1er septembre 2026</p>

        <Section title="Article 1 — Objet">
          Les présentes CGV régissent les relations contractuelles entre Rent Driver (SAS, capital 10 000 €, siège Vernon Giverny)
          et toute personne physique ou morale (ci-après « le Client ») souhaitant bénéficier du service de mise à disposition de chauffeur.
        </Section>

        <Section title="Article 2 — Services proposés">
          <p className="mb-3">Rent Driver propose deux types de prestations :</p>
          <ul className="space-y-2 list-none">
            <Li><strong className="text-white">Chauffeur sans voiture :</strong> un chauffeur professionnel conduit le véhicule du Client d&apos;un point A à un point B.</Li>
            <Li><strong className="text-white">Chauffeur avec voiture :</strong> un chauffeur arrive avec son propre véhicule (service VTC) pour transporter le Client.</Li>
          </ul>
          <p className="mt-3">Des prestations de mise à disposition journalière sont proposées aux professionnels sur devis.</p>
        </Section>

        <Section title="Article 3 — Tarifs">
          <p className="mb-3">Les tarifs kilométriques applicables sont :</p>
          <ul className="space-y-2 list-none mb-3">
            <Li>Trajet ≤ 300 km : <strong className="text-white">0,95 € / km</strong></Li>
            <Li>Trajet de 300 à 700 km : <strong className="text-white">0,85 € / km</strong></Li>
            <Li>Trajet &gt; 700 km : <strong className="text-white">0,79 € / km</strong></Li>
          </ul>
          <p className="mb-2">Forfait minimum : 50 €. Majoration de 20 % appliquée la nuit (22h–6h) et le dimanche.</p>
          <p>
            <strong className="text-white">Frais de déplacement du chauffeur</strong> (péages, carburant, transport retour) : toujours à la charge du Client,
            non inclus dans le tarif ci-dessus. Le montant est communiqué avant validation définitive.
          </p>
        </Section>

        <Section title="Article 4 — Commande et paiement">
          <p className="mb-3">La réservation est effectuée via le simulateur en ligne. Le paiement est réalisé par :</p>
          <ul className="space-y-2 list-none mb-3">
            <Li>Carte bancaire (Visa, Mastercard…)</Li>
            <Li>PayPal</Li>
          </ul>
          <p className="mb-2">Le paiement est traité de manière sécurisée par Stripe. Rent Driver n&apos;a accès à aucune donnée bancaire.</p>
          <p>La réservation est confirmée à réception du paiement intégral.</p>
        </Section>

        <Section title="Article 5 — Délais d'intervention">
          <ul className="space-y-2 list-none">
            <Li>Cas standard : intervention sous <strong className="text-white">48h</strong>.</Li>
            <Li>Cas de perte ou suspension de permis : intervention sous <strong className="text-white">24h</strong> (sous réserve de disponibilité).</Li>
          </ul>
        </Section>

        <Section title="Article 6 — Annulation et remboursement">
          <p className="mb-3">Toute annulation doit être notifiée par email à contact@rentdriver.fr :</p>
          <ul className="space-y-2 list-none">
            <Li>Plus de 48h avant la prestation : <strong className="text-white">remboursement intégral</strong>.</Li>
            <Li>Entre 24h et 48h : <strong className="text-white">remboursement à 50 %</strong>.</Li>
            <Li>Moins de 24h : <strong className="text-white">aucun remboursement</strong>.</Li>
          </ul>
        </Section>

        <Section title="Article 7 — Responsabilité">
          Rent Driver souscrit une assurance Tous Risques couvrant le véhicule du Client durant la prestation.
          Le Client reste responsable de tout dommage préexistant non signalé avant la prise en charge.
          Rent Driver ne saurait être tenu responsable des retards causés par des événements extérieurs (météo, accidents tiers, grèves).
        </Section>

        <Section title="Article 8 — Droit applicable et litiges" last>
          Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;engagent à rechercher
          une solution amiable avant tout recours judiciaire. À défaut, le tribunal compétent sera celui du siège de Rent Driver.
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

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#A1E3F9" }} />
      <span>{children}</span>
    </li>
  );
}
