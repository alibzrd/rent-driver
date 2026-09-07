import { LegalPage, LegalSection, LegalRow } from "@/components/ui/LegalPage";

export const metadata = { title: "Mentions légales — Rent Driver" };

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <LegalRow label="Société" value="Rent Driver" />
        <LegalRow label="Forme juridique" value="SAS (Société par Actions Simplifiée)" />
        <LegalRow label="Capital social" value="10 000 €" />
        <LegalRow label="Siège social" value="Vernon Giverny, France" />
        <LegalRow label="Téléphone" value="07 67 23 03 62" />
        <LegalRow label="Email" value="contact@rentdriver.fr" />
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        Le Directeur Général de la société Rent Driver.
      </LegalSection>

      <LegalSection title="Hébergement">
        <LegalRow label="Hébergeur" value="Vercel Inc." />
        <LegalRow label="Adresse" value="440 N Barranca Ave #4133, Covina, CA 91723, États-Unis" />
        <LegalRow label="Site" value="vercel.com" />
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        L&apos;ensemble du contenu du site (textes, images, logos, design) est la propriété exclusive de Rent Driver.
        Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
      </LegalSection>

      <LegalSection title="Responsabilité" last>
        Rent Driver s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées sur ce site. Toutefois,
        la société ne saurait être tenue responsable des erreurs, omissions ou résultats obtenus par un mauvais usage de ces informations.
      </LegalSection>
    </LegalPage>
  );
}
