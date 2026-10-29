import { LegalPage, LegalSection, LegalList } from "@/components/ui/LegalPage";
import ManageCookiesButton from "@/components/tracking/ManageCookiesButton";

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

      <LegalSection title="Cookies et mesure d'audience">
        <p>
          Les cookies de mesure d&apos;audience et de publicité ne sont déposés qu&apos;avec votre accord,
          recueilli via le bandeau affiché lors de votre première visite (base légale : consentement,
          article 6.1.a du RGPD). Refuser n&apos;a aucune incidence sur l&apos;utilisation du site.
        </p>
        <LegalList items={[
          "Nécessaires — mémorisation de votre choix de cookies (stockage local, 6 mois). Toujours actifs.",
          "Mesure d'audience — Google Analytics (cookies _ga, 13 mois maximum) : pages consultées, provenance des visites, utilisation du simulateur.",
          "Publicité — Google Ads (cookies _gcl, 90 jours) et Pixel Meta pour Facebook et Instagram (cookies _fbp / _fbc, 90 jours) : mesure de l'efficacité de nos annonces et publicités personnalisées.",
          "Statistiques anonymes — Vercel Web Analytics : comptage des visites sans cookie ni identifiant personnel.",
        ]} />
        <p className="mt-3">Vous pouvez modifier ou retirer votre consentement à tout moment.</p>
        <ManageCookiesButton
          className="mt-3 underline underline-offset-4 hover:text-white transition-colors"
        />
      </LegalSection>

      <LegalSection title="Sous-traitants" last>
        <LegalList items={[
          "Stripe Inc. — paiement sécurisé",
          "Mapbox Inc. — calcul d'itinéraire",
          "Vercel Inc. — hébergement et statistiques anonymes",
          "Google Ireland Ltd — mesure d'audience et publicité (avec votre accord)",
          "Meta Platforms Ireland Ltd — publicité Facebook / Instagram (avec votre accord) et messagerie WhatsApp",
        ]} />
        <p className="mt-3">
          Certains de ces prestataires peuvent transférer des données hors de l&apos;Union européenne ;
          ces transferts sont encadrés par le Data Privacy Framework UE–États-Unis ou par des clauses
          contractuelles types de la Commission européenne.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
