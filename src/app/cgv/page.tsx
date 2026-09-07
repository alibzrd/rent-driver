import { LegalPage, LegalSection, LegalList } from "@/components/ui/LegalPage";

export const metadata = { title: "Conditions Générales de Vente — Rent Driver" };

export default function CGV() {
  return (
    <LegalPage title="Conditions Générales de Vente" subtitle="En vigueur au 1er septembre 2026">
      <LegalSection title="Article 1 — Objet">
        Les présentes CGV régissent les relations contractuelles entre Rent Driver (SAS, capital 10 000 €, siège Vernon Giverny)
        et toute personne physique ou morale (ci-après « le Client ») souhaitant bénéficier du service de mise à disposition de chauffeur.
      </LegalSection>

      <LegalSection title="Article 2 — Services proposés">
        <p>Rent Driver propose deux types de prestations :</p>
        <LegalList items={[
          "<strong>Chauffeur sans voiture :</strong> un chauffeur professionnel conduit le véhicule du Client d'un point A à un point B.",
          "<strong>Chauffeur avec voiture :</strong> un chauffeur arrive avec son propre véhicule (service VTC) pour transporter le Client.",
        ]} />
        <p className="mt-3">Des prestations de mise à disposition journalière sont proposées aux professionnels sur devis.</p>
      </LegalSection>

      <LegalSection title="Article 3 — Tarifs">
        <LegalList items={[
          "Trajet ≤ 300 km : <strong>0,95 € / km</strong>",
          "Trajet de 300 à 700 km : <strong>0,85 € / km</strong>",
          "Trajet > 700 km : <strong>0,79 € / km</strong>",
        ]} />
        <p className="mt-3">Forfait minimum : 50 €. Majoration de 20 % la nuit (22h–6h) et le dimanche.</p>
        <p className="mt-2">
          <strong>Frais de déplacement du chauffeur</strong> (péages, carburant, transport retour) : toujours à la charge du Client, non inclus dans le tarif ci-dessus.
        </p>
      </LegalSection>

      <LegalSection title="Article 4 — Paiement">
        <LegalList items={[
          "Carte bancaire (Visa, Mastercard…)",
          "PayPal",
        ]} />
        <p className="mt-3">Paiement traité par Stripe. Rent Driver n&apos;a accès à aucune donnée bancaire. Réservation confirmée à réception du paiement intégral.</p>
      </LegalSection>

      <LegalSection title="Article 5 — Délais d'intervention">
        <LegalList items={[
          "Cas standard : intervention sous <strong>48h</strong>.",
          "Perte ou suspension de permis : intervention sous <strong>24h</strong> (sous réserve de disponibilité).",
        ]} />
      </LegalSection>

      <LegalSection title="Article 6 — Annulation et remboursement">
        <LegalList items={[
          "Plus de 48h avant la prestation : <strong>remboursement intégral</strong>.",
          "Entre 24h et 48h : <strong>remboursement à 50 %</strong>.",
          "Moins de 24h : <strong>aucun remboursement</strong>.",
        ]} />
      </LegalSection>

      <LegalSection title="Article 7 — Responsabilité">
        Rent Driver souscrit une assurance Tous Risques couvrant le véhicule du Client durant la prestation.
        Le Client reste responsable de tout dommage préexistant non signalé avant la prise en charge.
        Rent Driver ne saurait être tenu responsable des retards causés par des événements extérieurs (météo, accidents tiers, grèves).
      </LegalSection>

      <LegalSection title="Article 8 — Droit applicable" last>
        Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;engagent à rechercher
        une solution amiable avant tout recours judiciaire. À défaut, le tribunal compétent sera celui du siège de Rent Driver.
      </LegalSection>
    </LegalPage>
  );
}
