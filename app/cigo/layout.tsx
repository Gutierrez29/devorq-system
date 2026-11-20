import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cigo-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cigo-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cigo-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CIGO — Control de Combustible, Viáticos y Comprobantes para Flotas | Devorq Systems",
  description:
    "Software peruano para flotas de transporte de carga. Tus choferes reportan por WhatsApp; CIGO valida ante SUNAT, calcula Km/galón y genera Excel, liquidaciones, SIRE TXT y ZIP.",
  openGraph: {
    title: "CIGO — Control de Gastos y Combustible para Flotas en el Perú",
    description:
      "Rendición de viáticos y combustible desde WhatsApp sin instalar apps. Prueba gratis de 7 días para hasta 5 camiones.",
    type: "website",
    locale: "es_PE",
  },
};

export default function CigoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} cigo-surface selection:bg-[#14B8A6] selection:text-[#0B1320]`}
    >
      {children}
    </div>
  );
}
