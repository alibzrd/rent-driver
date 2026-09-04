export const metadata = { title: "Politique de confidentialité — Rent Driver" };

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen px-6 py-32 max-w-3xl mx-auto text-white/80" style={{ backgroundColor: "#050B18" }}>
      <h1 className="font-display text-3xl font-black text-white mb-10">Politique de confidentialité</h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Responsable du traitement</h2>
        <p>Rent Driver — Vernon Giverny, France — contact@rentdriver.fr</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Données collectées</h2>
        <p className="mb-2">Dans le cadre de votre utilisation du simulateur et du paiement en ligne, nous collectons :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
          <li>Villes de départ et d'arrivée</li>
          <li>Données de paiement (traitées exclusivement par Stripe — nous n'avons jamais accès à vos coordonnées bancaires)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Finalités</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Traitement et suivi de votre réservation</li>
          <li>Contact avant et après la prestation</li>
          <li>Facturation et obligations comptables</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Base légale</h2>
        <p>Exécution du contrat (article 6.1.b du RGPD) et obligations légales (article 6.1.c).</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Durée de conservation</h2>
        <p>Vos données sont conservées 3 ans à compter de votre dernière interaction, puis archivées 5 ans supplémentaires pour les obligations comptables.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Vos droits</h2>
        <p className="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Accès, rectification et effacement de vos données</li>
          <li>Portabilité et limitation du traitement</li>
          <li>Opposition au traitement</li>
        </ul>
        <p className="mt-2">Exercice : contact@rentdriver.fr</p>
        <p>Réclamation : CNIL — cnil.fr</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Sous-traitants</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Stripe Inc. — paiement sécurisé (stripe.com/privacy)</li>
          <li>Mapbox Inc. — calcul d'itinéraire (mapbox.com/legal/privacy)</li>
          <li>Vercel Inc. — hébergement (vercel.com/legal/privacy-policy)</li>
        </ul>
      </section>

      <a href="/" className="text-sm underline" style={{ color: "#A1E3F9" }}>← Retour à l'accueil</a>
    </main>
  );
}
