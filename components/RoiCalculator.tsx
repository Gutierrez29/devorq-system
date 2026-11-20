"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Check, Download, FileText, Play } from "lucide-react";

const REGISTER_URL = "https://cigo.devorq.com/registro";
const WSP_MAIN =
  "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quisiera%20agendar%20una%20demostraci%C3%B3n%20gratuita%20de%2015%20minutos%20de%20CIGO%20para%20mi%20flota.";
const DEMO_VIDEO_URL = "https://q.me-qr.com/ll0rpmpm";
const CARTA_PDF_URL = "/cigo/carta-presentacion-cigo.pdf";
const BROCHURE_PDF_URL = "/cigo/brochure-cigo.pdf";

const CLIENTS = [
  {
    sector: "Flota corporativa de carga nacional",
    name: "GRUPO TRANSYACU — TRANSYACU S.A.C.",
    ruc: "RUC 20558624605",
    metrics: [
      { value: "+25", label: "Tractocamiones en ruta" },
      { value: "+30", label: "Semirremolques y plataformas" },
    ],
    description:
      "Operación con tractocamiones Scania, Volvo, Freightliner y Mercedes-Benz gestionando reportes de combustible, lecturas de odómetro y viáticos por WhatsApp en rutas nacionales.",
    highlights: [
      "Control diario de combustible y odómetros por placa",
      "Rendición de viáticos desde carretera sin instalar apps",
    ],
  },
  {
    sector: "Transporte de carga pesada",
    name: "DIFEYA S.A.C.",
    ruc: "RUC 20539547233",
    metrics: [
      { value: "100%", label: "Digitalización en carretera" },
      { value: "Excel + ZIP", label: "Entrega contable ordenada" },
    ],
    description:
      "Control operativo de flota pesada con seguimiento de viajes asignados, registro de transferencias de viáticos, digitalización fotográfica de comprobantes en carretera y pre-liquidación asistida.",
    highlights: [
      "Seguimiento en vivo de saldos entregados frente a gastos",
      "Respaldo fotográfico y exportación contable lista al cierre",
    ],
  },
] as const;

export default function RoiCalculator() {
  return (
    <section
      id="documentacion-cigo"
      className="py-20 sm:py-24 px-5 sm:px-8 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
              Empresas peruanas de carga pesada que ya confían en CIGO.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#475569] leading-relaxed">
              Revisa nuestras referencias reales en operación y descarga la propuesta formal en PDF, el brochure o el video demostrativo para compartir con tu equipo.
            </p>
          </div>
        </div>

        {/* Part 1: Real Client Case Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#E2E8F0] rounded-2xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0] mb-14 bg-white">
          {CLIENTS.map((client) => (
            <article key={client.ruc} className="p-6 sm:p-9 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-[#64748B]">
                    {client.sector}
                  </span>
                  <span className="font-cigo-mono text-xs font-bold text-[#0F766E]">
                    {client.ruc}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-[-0.02em] mb-4">
                  {client.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 py-4 my-4 border-y border-[#F1F5F9]">
                  {client.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-cigo-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] cigo-tabular">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-[#475569] leading-relaxed">
                  {client.description}
                </p>
              </div>

              <ul className="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#0F172A]">
                {client.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5"
                      strokeWidth={2.25}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Part 2: Executive Documentation Shelf */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#0F172A] tracking-[-0.02em] mb-5">
            Material oficial para gerencia y contabilidad
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document 1: Carta de Presentación 7 páginas (CIGO Navy) */}
            <div className="bg-[#0B1320] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 border border-[#1E293B]">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#94A3B8] mb-3">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                    <FileText className="w-4 h-4 text-[#14B8A6]" strokeWidth={2} />
                    Propuesta ejecutiva
                  </span>
                  <span className="font-cigo-mono text-[11px] text-[#14B8A6]">
                    7 páginas A4
                  </span>
                </div>
                <h4 className="font-cigo-display text-xl font-bold text-white leading-snug mb-2.5">
                  Carta de Presentación y Propuesta Comercial CIGO
                </h4>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                  Documento formal dirigido a Gerencia General, Operaciones y Contabilidad. Incluye diagnóstico en ruta, control Km/galón, casos reales, tabla de precios con IGV y formato de aceptación.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={CARTA_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1320] text-xs font-extrabold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" strokeWidth={2.25} />
                  Ver Carta (PDF)
                </a>
                <a
                  href={CARTA_PDF_URL}
                  download="Carta_Presentacion_CIGO_Devorq.pdf"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  Descargar
                </a>
              </div>
            </div>

            {/* Document 2: Brochure Comercial + QR */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] mb-1.5">
                      <BookOpen className="w-4 h-4" strokeWidth={2} />
                      Resumen gráfico
                    </div>
                    <h4 className="font-cigo-display text-xl font-bold text-[#0F172A] leading-snug">
                      Brochure Comercial CIGO
                    </h4>
                  </div>
                  <div className="border border-[#E2E8F0] rounded-lg p-1 bg-white shrink-0">
                    <Image
                      src="/cigo/qr_brochure.png"
                      alt="Código QR del Brochure Comercial CIGO"
                      width={72}
                      height={72}
                      className="w-[72px] h-[72px] object-contain block"
                    />
                  </div>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Resumen visual del reporte en carretera por WhatsApp, lectura de comprobantes y odómetros, control de viáticos y módulos del panel web.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={BROCHURE_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
                  Ver Brochure (PDF)
                </a>
                <a
                  href={BROCHURE_PDF_URL}
                  download="Brochure_Comercial_CIGO.pdf"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  Descargar
                </a>
              </div>
            </div>

            {/* Document 3: Video Demostrativo + QR */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] mb-1.5">
                      <Play className="w-4 h-4" strokeWidth={2} />
                      Demostración práctica
                    </div>
                    <h4 className="font-cigo-display text-xl font-bold text-[#0F172A] leading-snug">
                      Video Demostrativo en Ruta
                    </h4>
                  </div>
                  <div className="border border-[#E2E8F0] rounded-lg p-1 bg-white shrink-0">
                    <Image
                      src="/cigo/qr_video.png"
                      alt="Código QR del Video Demostrativo CIGO"
                      width={72}
                      height={72}
                      className="w-[72px] h-[72px] object-contain block"
                    />
                  </div>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Observa en pocos minutos cómo el conductor envía sus comprobantes desde WhatsApp y cómo se refleja la liquidación en el panel web de la empresa.
                </p>
              </div>

              <a
                href={DEMO_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition-colors"
              >
                <Play className="w-3.5 h-3.5" strokeWidth={2} />
                Ver Video Demostrativo
              </a>
            </div>
          </div>
        </div>

        {/* Part 3: Clean Direct Trial Strip */}
        <div className="bg-white border border-[#99F6E4] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-cigo-mono text-xs font-bold text-[#0F766E] mb-1.5">
              Prueba gratuita de 7 días · Hasta 5 camiones en ruta · Sin tarjeta
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] tracking-[-0.02em]">
              Registra tu empresa y evalúa CIGO en operación real esta misma semana.
            </h3>
            <p className="text-sm text-[#475569] mt-1.5 leading-relaxed">
              Si prefieres acompañamiento directo para tu evaluación, escríbenos al{" "}
              <strong className="text-[#0F172A] font-semibold">+51 929 222 980</strong>,{" "}
              <strong className="text-[#0F172A] font-semibold">+51 935 351 768</strong> o{" "}
              <strong className="text-[#0F172A] font-semibold">contacto@devorq.com</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#14B8A6] hover:bg-[#0D9488] text-[#0B1320] hover:text-white text-sm font-extrabold transition-colors"
            >
              Probar 7 días gratis
              <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
            </a>
            <a
              href={WSP_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] text-sm font-semibold transition-colors"
            >
              Agendar demo por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
