import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Simulator from "@/components/sections/Simulator";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import { SITE_URL } from "@/lib/site";
import { PHONE_E164 } from "@/lib/pricing";

// Canonical défini ici (et non dans le layout) pour ne pas être hérité par les autres pages.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Rent Driver",
  description:
    "Chauffeur professionnel pour conduire et livrer votre véhicule partout en France et en Europe : convoyage, perte de permis, résidence secondaire, rapatriement de véhicule.",
  url: `${SITE_URL}/`,
  telephone: PHONE_E164,
  image: `${SITE_URL}/og-rentdriver.png`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vernon",
    postalCode: "27200",
    addressRegion: "Normandie",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
    { "@type": "Country", name: "Pays-Bas" },
    { "@type": "Country", name: "Luxembourg" },
    { "@type": "Country", name: "Suisse" },
    { "@type": "Country", name: "Espagne" },
    { "@type": "Country", name: "Italie" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="flex flex-col flex-1">
        <Hero />
        <Simulator />
        <Services />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
