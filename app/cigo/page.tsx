"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import CigoHeroCockpit from "@/components/CigoHeroCockpit";
import CigoWhatsAppDemo from "@/components/CigoWhatsAppDemo";
import CigoModulesShowcase from "@/components/CigoModulesShowcase";
import RoiCalculator from "@/components/RoiCalculator";
import CigoPricing from "@/components/CigoPricing";

const REGISTER_URL = "https://cigo.devorq.com/registro";
const WSP_DEMO_URL =
  "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quiero%20agendar%20una%20demostraci%C3%B3n%20gratuita%20de%2015%20minutos%20de%20CIGO%20para%20mi%20flota.";
const GMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@devorq.com&su=Solicitud%20de%20Demostraci%C3%B3n%20CIGO%20-%20Devorq%20Systems";

const OPERATIONAL_GAPS = [
  {
    issue: "Boletas térmicas perdidas o borradas en cabina",
    before:
      "Los recibos de grifo y peaje en papel térmico se borran por el calor o se extravían, perdiendo crédito fiscal (IGV) y gasto deducible.",
    after:
      "El chofer fotografía el ticket en el grifo y CIGO conserva imagen, serie, RUC y montos en la nube.",
  },
  {
    issue: "Liquidaciones de viáticos atrasadas por semanas",
    before:
      "Administración espera que el tracto vuelva a base con un sobre de papeles físicos para recién cuadrar caja chica y saldos.",
    after:
      "Cada entrega y gasto se descuenta en vivo mientras el camión sigue en ruta.",
  },
  {
    issue: "Sobreconsumos de diésel detectados demasiado tarde",
    before:
      "Al revisar facturas recién a fin de mes es imposible reaccionar ante desvíos de rendimiento Km/galón o cargas atípicas.",
    after:
      "Cálculo por abastecimiento con foto de odómetro y alertas automáticas cuando el rendimiento cae fuera de meta.",
  },
  {
    issue: "Digitación manual y riesgo de boletas duplicadas",
    before:
      "Horas pasando comprobantes uno por uno a Excel sin validar si el emisor está Habido en SUNAT o si la serie ya se rindió antes.",
    after:
      "Consulta automática de RUC/comprobante, bloqueo de duplicados y descarga directa en Excel, SIRE TXT y ZIP.",
  },
] as const;

const ROLE_OUTCOMES = [
  {
    role: "Gerencia General",
    headline: "Visibilidad de costos por viaje y placa sin esperar el cierre de mes.",
    points: [
      "Control real de margen operativo en cada ruta nacional.",
      "Reducción de fugas en combustible, peajes y gastos no autorizados.",
      "Información privada y auditable conforme a la Ley N° 29733.",
    ],
  },
  {
    role: "Jefatura de Operaciones",
    headline: "Adopción inmediata por tus conductores sin instalar aplicaciones.",
    points: [
      "Los choferes reportan por su WhatsApp habitual (foto o nota de voz).",
      "Seguimiento continuo del saldo entregado frente a lo rendido.",
      "Alertas de desvíos Km/galón y reglas de topes por categoría.",
    ],
  },
  {
    role: "Contabilidad y Auditoría",
    headline: "Cierre ágil con respaldos ordenados y listos para SUNAT.",
    points: [
      "Validación de RUC (Activo/Habido) y detección de series duplicadas.",
      "Exportación en Excel, liquidación por viaje y TXT SIRE Compras.",
      "Carpeta ZIP descargable con las fotografías de respaldo por periodo.",
    ],
  },
] as const;

const CIGO_FAQS = [
  {
    q: "¿Cómo funciona la prueba gratis de 7 días y cómo me registro?",
    a: "Solo ingresa directamente a cigo.devorq.com/registro, completa los datos básicos de tu empresa y en menos de 1 minuto queda activa tu cuenta gratuita por 7 días para hasta 5 camiones en ruta, sin tarjeta de crédito y sin compromiso de permanencia.",
  },
  {
    q: "¿Cómo funciona el pricing por volumen y los precios incluyen IGV?",
    a: "Sí. Todos nuestros precios mensuales por vehículo incluyen IGV en el Perú y emitimos Factura Electrónica: S/ 29 (5–10 camiones), S/ 27 (11–20), S/ 25 (21–50), S/ 23 (51–100) y S/ 20 (101+ camiones). Todos los tramos incluyen conductores ilimitados por WhatsApp.",
  },
  {
    q: "¿Cómo asiste CIGO en la revisión de comprobantes ante SUNAT?",
    a: "CIGO consulta el estado del RUC emisor (Activo y Habido) y el estado del comprobante electrónico mediante conectores de consulta tributaria. Si un establecimiento aún no ha enviado su resumen diario a SUNAT, el documento queda pendiente para revalidación y se alerta cualquier intento de registrar una serie y número duplicados.",
  },
  {
    q: "¿Qué archivos y reportes descarga el área de contabilidad?",
    a: "Desde el panel web puedes exportar el reporte operativo en Excel, las planillas de liquidación por viaje (viáticos entregados vs. gastos rendidos), el archivo TXT estructurado para el Registro de Compras Electrónico (SIRE) de SUNAT y un archivo ZIP con todas las fotografías de respaldo ordenadas.",
  },
  {
    q: "¿Necesito que mis choferes descarguen alguna aplicación especial?",
    a: "No. Los choferes no instalan aplicaciones adicionales ni manejan contraseñas. Todo el envío de fotos de boletas/facturas, lecturas de odómetro o notas de voz para gastos menores se realiza desde su número habitual de WhatsApp.",
  },
  {
    q: "¿Qué sucede si el conductor pasa por un tramo de carretera sin señal?",
    a: "El conductor toma la foto del comprobante o del tablero y la envía al chat de WhatsApp. En cuanto la unidad retoma cobertura móvil o Wi-Fi en ruta, WhatsApp transmite el mensaje y CIGO lo procesa conservando la fecha de emisión del documento.",
  },
] as const;

const NAV_ITEMS = [
  { id: "problema", label: "El problema" },
  { id: "whatsapp-feature", label: "WhatsApp en ruta" },
  { id: "modulos-carousel", label: "Módulos" },
  { id: "documentacion-cigo", label: "Clientes y PDF" },
  { id: "planes", label: "Precios" },
  { id: "faq", label: "FAQ" },
] as const;

export default function CigoPage() {
  const [showTerms, setShowTerms] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncTermsHash = () => {
      if (window.location.hash === "#terminos") {
        setShowTerms(true);
        window.setTimeout(() => {
          document.getElementById("terminos")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };

    const rafId = window.requestAnimationFrame(syncTermsHash);
    window.addEventListener("hashchange", syncTermsHash);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("hashchange", syncTermsHash);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 74;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* ── Brand Header (Crisp White + Prominent CIGO Logo + Teal CTA) ── */}
      <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-md border-b border-[#E2E8F0]">
        <nav
          aria-label="Navegación principal CIGO"
          className="max-w-[1240px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4"
        >
          {/* Brand Lockup */}
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/cigo-logo.webp"
              alt="CIGO — Control Inteligente de Gastos Operativos"
              width={118}
              height={48}
              priority
              className="h-8 w-auto object-contain"
            />
            <span className="hidden sm:inline-block h-5 w-px bg-[#CBD5E1]" aria-hidden="true" />
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors shrink-0"
              title="Volver a Devorq Systems"
            >
              <Image
                src="/devorq-isotype.png"
                alt="Devorq Systems"
                width={20}
                height={20}
                priority
                className="w-5 h-5 rounded object-contain"
              />
              <span>por Devorq</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-semibold text-[#475569] hover:text-[#0F766E] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Conversion CTAs */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/cigo/carta-presentacion-cigo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#0D9488]" strokeWidth={2} />
              Dossier PDF
            </a>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold text-[#0B1320] bg-[#14B8A6] hover:bg-[#0D9488] hover:text-white transition-colors"
            >
              Probar 7 días gratis
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] bg-white px-5 py-4 space-y-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2.5 text-sm font-semibold text-[#0F172A] border-b border-[#F1F5F9] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-sm font-extrabold text-[#0B1320] bg-[#14B8A6]"
              >
                Probar 7 días gratis
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/cigo/carta-presentacion-cigo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0D9488]" strokeWidth={2} />
                  Dossier PDF
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                  Devorq
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── 1. CIGO DEEP NAVY HERO + INTERACTIVE WHATSAPP ↔ PANEL BRIDGE ── */}
        <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 bg-[#0B1320] text-white border-b border-[#1E2D45]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left 5 cols: Conversion Copy + Direct CTAs + Real Client Proof */}
            <div className="lg:col-span-5 space-y-6 cigo-enter">
              <div className="w-12 h-1 rounded-full bg-[#14B8A6]" aria-hidden="true" />

              <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
                Controla combustible, viáticos y boletas desde el WhatsApp de tus choferes.
              </h1>

              <p className="text-base text-[#CBD5E1] leading-relaxed">
                Tus conductores mandan una foto del ticket, odómetro o nota de voz sin instalar apps. CIGO valida el RUC en SUNAT, calcula el rendimiento{" "}
                <strong className="text-[#2DD4BF] font-semibold">Km/galón</strong> y entrega tu cierre en Excel, SIRE TXT y ZIP.
              </p>

              {/* Primary + Secondary CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-extrabold text-[#0B1320] bg-[#14B8A6] hover:bg-[#2DD4BF] transition-colors"
                >
                  Probar 7 días gratis
                  <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                </a>
                <a
                  href={WSP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" strokeWidth={2} />
                  Agendar demo 15 min
                </a>
              </div>

              {/* Risk Reversal Checks */}
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#CBD5E1]">
                <li className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#14B8A6]" strokeWidth={2.5} />
                  Hasta 5 camiones gratis
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#14B8A6]" strokeWidth={2.5} />
                  Sin tarjeta de crédito
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#14B8A6]" strokeWidth={2.5} />
                  Factura con IGV
                </li>
              </ul>

              {/* Real Peruvian Fleets Operating */}
              <div className="pt-5 border-t border-[#1E2D45]">
                <div className="text-xs text-[#94A3B8] mb-2">
                  Operando en rutas nacionales del Perú con:
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-white">
                  <span>TRANSYACU S.A.C. (+25 tractos)</span>
                  <span className="text-[#334155]" aria-hidden="true">|</span>
                  <span>DIFEYA S.A.C.</span>
                </div>
              </div>
            </div>

            {/* Right 7 cols: Real Smartphone WhatsApp -> Synced CIGO Panel */}
            <div className="lg:col-span-7 cigo-enter-delay">
              <CigoHeroCockpit />
            </div>
          </div>
        </section>

        {/* ── 2. POR QUÉ PIERDES DINERO EN RUTA (ANTES VS. CON CIGO) ── */}
        <section
          id="problema"
          className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#E2E8F0]"
        >
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Sticky Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
                Cuatro fugas que el sobre de papel esconde hasta fin de mes.
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Operar con boletas térmicas sueltas y rendiciones tardías te hace perder crédito fiscal, horas contables y control real sobre el combustible de cada camión.
              </p>
              <div className="pt-2">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F766E] hover:text-[#0D9488] underline underline-offset-4"
                >
                  Probar CIGO 7 días sin costo
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Right Contrast Ledger */}
            <div className="lg:col-span-8 border-t-2 border-[#0F172A] divide-y divide-[#E2E8F0]">
              {OPERATIONAL_GAPS.map((row) => (
                <article key={row.issue} className="py-7 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-[-0.015em]">
                    {row.issue}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-bold text-[#B91C1C] mb-1">
                        Sin CIGO (papel y Excel)
                      </div>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        {row.before}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F766E] mb-1">
                        Con CIGO en carretera
                      </div>
                      <p className="text-sm text-[#0F172A] leading-relaxed font-medium">
                        {row.after}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. EXPERIENCIA INTERACTIVA COMPLETA DE WHATSAPP + 48H ROLLOUT ── */}
        <CigoWhatsAppDemo />

        {/* ── 4. EXPLORADOR DE LOS 8 MÓDULOS REALES DE CIGO ── */}
        <CigoModulesShowcase />

        {/* ── 5. BENEFICIOS POR ÁREA (GERENCIA, OPERACIONES Y CONTABILIDAD) ── */}
        <section
          id="beneficios"
          className="py-20 sm:py-24 px-5 sm:px-8 bg-[#F8FAFC] border-b border-[#E2E8F0]"
        >
          <div className="max-w-[1240px] mx-auto">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
                Un solo registro sirve a gerencia, operaciones y contabilidad.
              </h2>
              <p className="text-base text-[#475569] mt-3 leading-relaxed">
                Cada área recibe la información que necesita en tiempo real sin duplicar hojas ni perseguir recibos en papel.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ROLE_OUTCOMES.map((col) => (
                <article
                  key={col.role}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="font-cigo-mono text-xs font-bold text-[#0F766E] mb-2">
                      {col.role}
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] tracking-[-0.015em] leading-snug mb-4">
                      {col.headline}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-[#475569] leading-relaxed">
                      {col.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5"
                            strokeWidth={2.25}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CLIENTES REALES EN PERÚ Y DOCUMENTACIÓN OFICIAL ── */}
        <RoiCalculator />

        {/* ── 7. PRICING DE EXPANSIÓN (CIGO DEEP NAVY + TEAL) ── */}
        <CigoPricing />

        {/* ── 8. PREGUNTAS FRECUENTES ── */}
        <section
          id="faq"
          className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#E2E8F0]"
        >
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
                Preguntas frecuentes sobre CIGO.
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Respuestas directas sobre la prueba gratuita de 7 días, tarifas con IGV, consultas SUNAT y exportaciones SIRE.
              </p>
              <div className="pt-4 border-t border-[#E2E8F0] space-y-1.5 text-xs text-[#475569]">
                <div className="font-bold text-[#0F172A]">Atención comercial en Perú</div>
                <div className="font-cigo-mono">+51 929 222 980 / +51 935 351 768</div>
                <div className="font-cigo-mono">contacto@devorq.com</div>
              </div>
            </div>

            <div className="lg:col-span-8 border-t-2 border-[#0F172A] divide-y divide-[#E2E8F0]">
              {CIGO_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.q} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span
                        className={`text-base font-bold transition-colors ${
                          isOpen
                            ? "text-[#0F766E]"
                            : "text-[#0F172A] group-hover:text-[#0F766E]"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#0F766E]" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-sm text-[#475569] leading-relaxed max-w-[68ch] cigo-swap">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 9. CIERRE DE CONVERSIÓN (CIGO NAVY + TEAL) ── */}
        <section className="py-16 sm:py-20 px-5 sm:px-8 bg-[#F8FAFC]">
          <div className="max-w-[1240px] mx-auto bg-[#0B1320] text-white rounded-2xl border border-[#1E2D45] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="font-cigo-mono text-xs font-bold text-[#2DD4BF]">
                  Activación inmediata · Sin tarjeta de crédito
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
                  Empieza tu prueba gratis de 7 días con hasta 5 camiones hoy mismo.
                </h2>
                <p className="text-base text-[#CBD5E1] leading-relaxed max-w-[58ch]">
                  Registra tu flota directamente en{" "}
                  <strong className="text-white font-semibold">cigo.devorq.com/registro</strong> o coordina una demostración en vivo de 15 minutos por WhatsApp.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-extrabold text-[#0B1320] bg-[#14B8A6] hover:bg-[#2DD4BF] transition-colors"
                >
                  Registrar mi flota gratis (7 días)
                  <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                </a>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={WSP_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" strokeWidth={2} />
                    Demo WhatsApp
                  </a>
                  <a
                    href={GMAIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#CBD5E1] hover:text-white bg-[#111C2F] border border-[#24344D] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#14B8A6]" strokeWidth={2} />
                    Correo
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#1E2D45] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#94A3B8]">
              <span>Exportaciones contables incluidas en el panel web:</span>
              <div className="flex flex-wrap gap-x-5 gap-y-1 font-cigo-mono text-[#CBD5E1]">
                <span>Excel operativo (.xlsx)</span>
                <span>Liquidación por viaje (.xlsx)</span>
                <span className="text-[#2DD4BF]">TXT SIRE Compras SUNAT</span>
                <span>Evidencias (.zip)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Términos y Condiciones (Desplegable, #terminos) ── */}
        {showTerms && (
          <section
            id="terminos"
            className="py-14 px-5 sm:px-8 bg-white border-t border-[#E2E8F0]"
          >
            <div className="max-w-4xl mx-auto text-[#475569] text-sm leading-relaxed relative">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                aria-label="Cerrar términos y condiciones"
                className="absolute top-0 right-0 w-9 h-9 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center cursor-pointer transition-colors"
                title="Cerrar"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>

              <h2 className="text-2xl font-bold text-[#0F172A] pr-12">
                TÉRMINOS Y CONDICIONES DEL SERVICIO &quot;CIGO&quot;
              </h2>
              <p className="font-cigo-mono text-xs text-[#64748B] mt-1 mb-6">
                Última actualización: Noviembre 2026
              </p>

              <p className="mb-4">
                El presente documento establece los Términos y Condiciones de Uso del software y servicio digital denominado &quot;CIGO&quot;, comercializado y operado bajo la marca comercial Devorq Systems por el prestador debidamente registrado y facultado ante la SUNAT (en adelante, &quot;EL PRESTADOR&quot;).
              </p>

              <p className="mb-6">
                Al contratar, registrarse o hacer uso de los servicios de CIGO a través de WhatsApp, la plataforma web o cualquier canal habilitado, la empresa o persona contratante (en adelante, &quot;EL CLIENTE&quot;) acepta de forma plena y sin reservas los siguientes términos:
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    1. NATURALEZA Y ALCANCE DEL SERVICIO
                  </h3>
                  <p>
                    1.1. CIGO es un software as a service (SaaS) de asistencia tecnológica que utiliza inteligencia artificial y procesamiento de datos para la lectura, extracción automatizada y consolidación de comprobantes de pago de viáticos y transporte. 1.2. EL PRESTADOR opera legalmente amparado por la legislación de la República del Perú, emitiendo comprobantes de pago electrónicos (Facturas y Boletas Electrónicas) válidos y deducibles para EL CLIENTE.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    2. DESLINDE DE RESPONSABILIDAD CONTABLE Y TRIBUTARIA
                  </h3>
                  <p>
                    2.1. CIGO es una herramienta tecnológica de automatización y auditoría preliminar. En ningún caso EL PRESTADOR actúa como estudio contable, auditor tributario ni asesor fiscal de EL CLIENTE. 2.2. La responsabilidad legal, fiscal y tributaria sobre la veracidad, sustento, declaración de IGV, impuesto a la renta y presentación final de libros contables ante la SUNAT recae exclusivamente sobre EL CLIENTE y sus contadores designados.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    3. DISPONIBILIDAD DEL SERVICIO (SLA Y PROVEEDORES TERCEROS)
                  </h3>
                  <p>
                    3.1. El servicio se presta bajo la modalidad &quot;Tal cual&quot; (As Is) y &quot;Según disponibilidad&quot;. 3.2. EL PRESTADOR realiza sus mejores esfuerzos para garantizar una disponibilidad del 99% del servicio, sin asumir responsabilidad por interrupciones en plataformas de terceros (Meta/WhatsApp, SUNAT o telecomunicaciones).
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    4. PROTECCIÓN DE DATOS PERSONALES (LEY N° 29733)
                  </h3>
                  <p>
                    4.1. De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), EL PRESTADOR trata la información, comprobantes y números de teléfono con estricta confidencialidad y reserva, exclusivamente para la prestación del servicio contratado.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    5. PAGOS, FACTURACIÓN Y SUSPENSIÓN DEL SERVICIO
                  </h3>
                  <p>
                    5.1. El servicio se factura de forma mensual según la cantidad de vehículos/unidades activas contratadas conforme al tramo vigente del tarifario (con IGV incluido en Perú). 5.2. Las facturas emitidas cuentan con un plazo máximo de pago de cinco (5) días calendario desde su emisión. 5.3. El incumplimiento del pago faculta a EL PRESTADOR a suspender temporalmente el procesamiento hasta regularizar el saldo adeudado.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    6. JURISDICCIÓN Y LEY APLICABLE
                  </h3>
                  <p>
                    6.1. Para todos los efectos del presente contrato, las partes se someten a la legislación vigente de la República del Perú y a la competencia de los jueces y tribunales de la ciudad de Lima, Perú.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#E2E8F0] py-7 px-5 sm:px-8 bg-white">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Devorq Systems · CIGO Control Inteligente de Gastos Operativos</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setShowTerms((prev) => !prev);
                if (!showTerms) {
                  setTimeout(() => {
                    document.getElementById("terminos")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
              className="text-[#0F172A] hover:text-[#0F766E] font-semibold underline underline-offset-4 cursor-pointer"
            >
              {showTerms ? "Ocultar Términos y Condiciones" : "Términos y Condiciones"}
            </button>
            <Link href="/" className="text-[#0F172A] hover:text-[#0F766E] font-semibold">
              Volver a Devorq
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
