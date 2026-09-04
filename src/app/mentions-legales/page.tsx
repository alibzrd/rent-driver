export const metadata = { title: "Mentions légales — Rent Driver" };

export default function MentionsLegales() {
  return (
    <main className="min-h-screen px-6 py-32 max-w-3xl mx-auto text-white/80" style={{ backgroundColor: "#050B18" }}>
      <h1 className="font-display text-3xl font-black text-white mb-10">Mentions légales</h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Éditeur du site</h2>
        <p>Rent Driver</p>
        <p>Forme juridique : SAS (Société par Actions Simplifiée)</p>
        <p>Capital social : 10 000 €</p>
        <p>Siège social : Vernon Giverny, France</p>
        <p>Téléphone : 07 67 23 03 62</p>
        <p>Email : contact@rentdriver.fr</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Directeur de la publication</h2>
        <p>Le Directeur Général de la société Rent Driver.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Hébergement</h2>
        <p>Vercel Inc.</p>
        <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
        <p>Site : vercel.com</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu du site (textes, images, logos, design) est la propriété exclusive de Rent Driver.
          Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Responsabilité</h2>
        <p>
          Rent Driver s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, la société
          ne saurait être tenue responsable des erreurs, omissions ou résultats qui pourraient être obtenus par
          un mauvais usage de ces informations.
        </p>
      </section>

      <a href="/" className="text-sm underline" style={{ color: "#A1E3F9" }}>← Retour à l'accueil</a>
    </main>
  );
}
