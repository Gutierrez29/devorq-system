import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devorq.com"),
  title: "Devorq Systems — Software que transforma negocios",
  description:
    "Devorq Systems es la empresa detrás de CIGO y ASYS IA. Construimos software moderno, escalable y orientado a resultados reales para empresas latinoamericanas.",
  keywords: [
    "Devorq",
    "Devorq Systems",
    "CIGO",
    "ASYS IA",
    "software empresarial",
    "plataforma b2b",
    "chatbot IA",
    "WhatsApp",
    "Perú",
  ],
  authors: [{ name: "Devorq Systems" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/devorq-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/devorq-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Devorq Systems — Software que transforma negocios",
    description:
      "Construimos software moderno para empresas reales. Conoce CIGO y ASYS IA.",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/devorq-logo.png",
        width: 520,
        height: 520,
        alt: "Devorq Systems Logo",
      },
    ],
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
