export const metadata = { title: "Conditions Générales de Vente — Rent Driver" };

export default function CGV() {
  return (
    <main className="min-h-screen px-6 py-32 max-w-3xl mx-auto text-white/80" style={{ backgroundColor: "#050B18" }}>
      <h1 className="font-display text-3xl font-black text-white mb-10">Conditions Générales de Vente</h1>
      <p className="text-white/40 text-sm mb-10">En vigueur au 1er septembre 2026</p>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 1 — Objet</h2>
        <p>
          Les présentes CGV régissent les relations contractuelles entre Rent Driver (SAS, capital 10 000 €, siège Vernon Giverny)
          et toute personne physique ou morale (ci-après « le Client ») souhaitant bénéficier du service de mise à disposition de chauffeur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 2 — Services proposés</h2>
        <p className="mb-2">Rent Driver propose deux types de prestations :</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Chauffeur sans voiture :</strong> un chauffeur professionnel conduit le véhicule du Client d'un point A à un point B.</li>
          <li><strong>Chauffeur avec voiture :</strong> un chauffeur arrive avec son propre véhicule (service VTC) pour transporter le Client.</li>
        </ul>
        <p className="mt-2">Des prestations de mise à disposition journalière sont proposées aux professionnels sur devis.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 3 — Tarifs</h2>
        <p className="mb-2">Les tarifs kilométriques applicables sont :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Trajet ≤ 300 km : 0,95 € / km</li>
          <li>Trajet de 300 à 700 km : 0,85 € / km</li>
          <li>Trajet {">"} 700 km : 0,79 € / km</li>
        </ul>
        <p className="mt-2">Forfait minimum : 50 €. Majoration de 20 % appliquée la nuit (22h–6h) et le dimanche.</p>
        <p className="mt-2">
          <strong>Frais de déplacement du chauffeur</strong> (péages, carburant, transport retour) : toujours à la charge du Client,
          non inclus dans le tarif ci-dessus. Le montant est communiqué avant validation définitive.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 4 — Commande et paiement</h2>
        <p className="mb-2">La réservation est effectuée via le simulateur en ligne. Le paiement est réalisé par :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Carte bancaire (Visa, Mastercard…)</li>
          <li>PayPal</li>
        </ul>
        <p className="mt-2">Le paiement est traité de manière sécurisée par Stripe. Rent Driver n'a accès à aucune donnée bancaire.</p>
        <p className="mt-2">La réservation est confirmée à réception du paiement intégral.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 5 — Délais d'intervention</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cas standard : intervention sous 48h.</li>
          <li>Cas de perte ou suspension de permis : intervention sous 24h (sous réserve de disponibilité).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 6 — Annulation et remboursement</h2>
        <p className="mb-2">Toute annulation doit être notifiée par email à contact@rentdriver.fr :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Plus de 48h avant la prestation : remboursement intégral.</li>
          <li>Entre 24h et 48h : remboursement à 50 %.</li>
          <li>Moins de 24h : aucun remboursement.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 7 — Responsabilité</h2>
        <p>
          Rent Driver souscrit une assurance Tous Risques couvrant le véhicule du Client durant la prestation.
          Le Client reste responsable de tout dommage préexistant non signalé avant la prise en charge.
          Rent Driver ne saurait être tenu responsable des retards causés par des événements extérieurs (météo, accidents tiers, grèves).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Article 8 — Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher
          une solution amiable avant tout recours judiciaire. À défaut, le tribunal compétent sera celui du siège de Rent Driver.
        </p>
      </section>

      <a href="/" className="text-sm underline" style={{ color: "#A1E3F9" }}>← Retour à l'accueil</a>
    </main>
  );
}
