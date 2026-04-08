import type { Metadata } from "next";
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
  title: "Casa Meyahuac — Donde México Celebra",
  description:
    "Bebidas de lujo mexicanas para bodas y celebraciones de alta gama. Tres espíritus, una celebración. Vainilla de Papantla, cítricos mexicanos, guayaba y plátano de Tabasco.",
  metadataBase: new URL("https://casameyahuac.com"),
  openGraph: {
    title: "Casa Meyahuac — Donde México Celebra",
    description:
      "Tres amigos. Tres espíritus. Tres regiones de México. Licores artesanales para tus momentos más importantes.",
    type: "website",
    locale: "es_MX",
  },
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
