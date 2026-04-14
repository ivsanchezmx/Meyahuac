import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { AgeGate } from "@/components/AgeGate";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Casa Meyahuac — Donde México Celebra",
    template: "%s · Casa Meyahuac",
  },
  description:
    "Bebidas de lujo mexicanas para bodas y celebraciones de alta gama. Tres espíritus, una celebración. Vainilla de Papantla, cítricos mexicanos, guayaba y plátano de Tabasco.",
  metadataBase: new URL("https://casameyahuac.com"),
  applicationName: "Casa Meyahuac",
  keywords: [
    "Casa Meyahuac",
    "licores mexicanos",
    "bebidas artesanales",
    "bodas de lujo",
    "vainilla de Papantla",
    "guayaba",
    "cítricos mexicanos",
    "espíritus mexicanos",
  ],
  authors: [{ name: "Casa Meyahuac" }],
  creator: "Casa Meyahuac",
  publisher: "Casa Meyahuac",
  openGraph: {
    title: "Casa Meyahuac — Donde México Celebra",
    description:
      "Tres amigos. Tres espíritus. Tres regiones de México. Licores artesanales para tus momentos más importantes.",
    url: "https://casameyahuac.com",
    siteName: "Casa Meyahuac",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Meyahuac — Donde México Celebra",
    description:
      "Tres amigos. Tres espíritus. Tres regiones de México. Licores artesanales para tus momentos más importantes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-mey-black text-mey-cream">
        <AgeGate />
        <Cursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
