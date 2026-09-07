import { LegalPage, LegalSection, LegalList } from "@/components/ui/LegalPage";

export const metadata = { title: "Politique de confidentialité — Rent Driver" };

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <LegalSection title="Responsable du traitement">
        Rent Driver — Vernon Giverny, France — contact@rentdriver.fr
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Dans le cadre de votre utilisation du simulateur et du paiement en ligne, nous collectons :</p>
        <LegalList items={[
          "Nom et prénom",
          "Adresse email",
          "Numéro de téléphone",
          "Villes de départ et d'arrivée",
          "Données de paiement (traitées exclusivement par Stripe — nous n'avons jamais accès à vos coordonnées bancaires)",
        ]} />
      </LegalSection>

      <LegalSection title="Finalités">
        <LegalList items={[
          "Traitement et suivi de votre réservation",
          "Contact avant et après la prestation",
          "Facturation et obligations comptables",
        ]} />
      </LegalSection>

      <LegalSection title="Base légale">
        Exécution du contrat (article 6.1.b du RGPD) et obligations légales (article 6.1.c).
      </LegalSection>

      <LegalSection title="Durée de conservation">
        Vos données sont conservées 3 ans à compter de votre dernière interaction,
        puis archivées 5 ans supplémentaires pour les obligations comptables.
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <LegalList items={[
          "Accès, rectification et effacement de vos données",
          "Portabilité et limitation du traitement",
          "Opposition au traitement",
        ]} />
        <p className="mt-3">Exercice : contact@rentdriver.fr · Réclamation : cnil.fr</p>
      </LegalSection>

      <LegalSection title="Sous-traitants" last>
        <LegalList items={[
          "Stripe Inc. — paiement sécurisé",
          "Mapbox Inc. — calcul d'itinéraire",
          "Vercel Inc. — hébergement",
        ]} />
      </LegalSection>
    </LegalPage>
  );
}
