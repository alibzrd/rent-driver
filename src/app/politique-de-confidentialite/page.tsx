export const metadata = { title: "Politique de confidentialité — Rent Driver" };

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050B18" }}>
      <main className="max-w-3xl mx-auto px-6 py-32 text-white/75 leading-relaxed">
        <a href="/" className="text-xs mb-10 inline-block hover:opacity-70 transition-opacity" style={{ color: "#A1E3F9" }}>
          ← Retour à l&apos;accueil
        </a>

        <h1 className="font-display text-3xl font-black text-white mb-12">Politique de confidentialité</h1>

        <Section title="Responsable du traitement">
          Rent Driver — Vernon Giverny, France — contact@rentdriver.fr
        </Section>

        <Section title="Données collectées">
          <p className="mb-3">Dans le cadre de votre utilisation du simulateur et du paiement en ligne, nous collectons :</p>
          <ul className="space-y-2 list-none">
            <Li>Nom et prénom</Li>
            <Li>Adresse email</Li>
            <Li>Numéro de téléphone</Li>
            <Li>Villes de départ et d&apos;arrivée</Li>
            <Li>Données de paiement (traitées exclusivement par Stripe — nous n&apos;avons jamais accès à vos coordonnées bancaires)</Li>
          </ul>
        </Section>

        <Section title="Finalités">
          <ul className="space-y-2 list-none">
            <Li>Traitement et suivi de votre réservation</Li>
            <Li>Contact avant et après la prestation</Li>
            <Li>Facturation et obligations comptables</Li>
          </ul>
        </Section>

        <Section title="Base légale">
          Exécution du contrat (article 6.1.b du RGPD) et obligations légales (article 6.1.c).
        </Section>

        <Section title="Durée de conservation">
          Vos données sont conservées 3 ans à compter de votre dernière interaction,
          puis archivées 5 ans supplémentaires pour les obligations comptables.
        </Section>

        <Section title="Vos droits">
          <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="space-y-2 list-none mb-3">
            <Li>Accès, rectification et effacement de vos données</Li>
            <Li>Portabilité et limitation du traitement</Li>
            <Li>Opposition au traitement</Li>
          </ul>
          <p>Exercice : <span className="text-white">contact@rentdriver.fr</span></p>
          <p>Réclamation : CNIL — cnil.fr</p>
        </Section>

        <Section title="Sous-traitants" last>
          <ul className="space-y-2 list-none">
            <Li>Stripe Inc. — paiement sécurisé</Li>
            <Li>Mapbox Inc. — calcul d&apos;itinéraire</Li>
            <Li>Vercel Inc. — hébergement</Li>
          </ul>
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
