import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devorq Systems — Software que transforma negocios",
  description:
    "Devorq Systems es la empresa detrás de CIGO y ASYS IA. Construimos software moderno, escalable y orientado a resultados reales para empresas latinoamericanas.",
  keywords: ["Devorq", "Devorq Systems", "CIGO", "ASYS IA", "software empresarial", "plataforma b2b", "chatbot IA", "WhatsApp", "Perú"],
  authors: [{ name: "Devorq Systems" }],
  openGraph: {
    title: "Devorq Systems — Software que transforma negocios",
    description:
      "Construimos software moderno para empresas reales. Conoce CIGO y ASYS IA.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
