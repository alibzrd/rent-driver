import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Tracking from "@/components/tracking/Tracking";
import { SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Rent Driver — Chauffeur pour votre véhicule",
    description:
      "Chauffeur professionnel partout en France sous 24h–48h. Avec ou sans votre voiture. Tarifs dès 0,79 €/km.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Rent Driver",
    images: [
      {
        url: "/og-rentdriver.png",
        width: 1200,
        height: 630,
        alt: "Rent Driver — chauffeur pour votre véhicule partout en France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-rentdriver.png"],
    title: "Rent Driver — Chauffeur pour votre véhicule",
    description: "Chauffeur professionnel partout en France. Tarifs dès 0,79 €/km. Disponible sous 24h–48h.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "24MNHQAOvgJpyIe-kKpOmw6IsEk5rNykKaaAUfJmDoU",
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
        <Tracking />
        <Analytics />
      </body>
    </html>
  );
}
