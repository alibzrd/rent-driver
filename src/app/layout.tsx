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
  title: "Rent Driver — Chauffeur pour votre véhicule",
  description:
    "Service de chauffeur professionnel partout en France. Avec ou sans votre voiture — chauffeurs assurés, disponibles 7j/7. Vernon Giverny.",
  keywords: [
    "chauffeur véhicule",
    "livraison voiture",
    "chauffeur privé",
    "transport véhicule France",
    "service chauffeur",
  ],
  authors: [{ name: "Rent Driver" }],
  openGraph: {
    title: "Rent Driver — Chauffeur pour votre véhicule",
    description:
      "Service de chauffeur professionnel partout en France. Avec ou sans votre voiture.",
    type: "website",
    locale: "fr_FR",
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
