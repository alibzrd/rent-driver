import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rent Driver — Chauffeur pour votre véhicule | France",
  description:
    "Besoin d'un chauffeur pour conduire votre voiture ? Rent Driver intervient partout en France sous 24h à 48h. Service avec ou sans votre véhicule. Tarifs dès 0,79 €/km.",
  keywords: [
    "chauffeur véhicule",
    "chauffeur pour conduire ma voiture",
    "livraison voiture France",
    "chauffeur privé domicile",
    "transport véhicule longue distance",
    "chauffeur perte de permis",
    "service VTC",
    "Vernon Giverny",
  ],
  authors: [{ name: "Rent Driver" }],
  metadataBase: new URL("https://rentdriver.fr"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rent Driver — Chauffeur pour votre véhicule",
    description:
      "Chauffeur professionnel partout en France sous 24h–48h. Avec ou sans votre voiture. Tarifs dès 0,79 €/km.",
    type: "website",
    locale: "fr_FR",
    url: "https://rentdriver.fr",
    siteName: "Rent Driver",
  },
  twitter: {
    card: "summary",
    title: "Rent Driver — Chauffeur pour votre véhicule",
    description: "Chauffeur professionnel partout en France. Tarifs dès 0,79 €/km. Disponible sous 24h–48h.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
