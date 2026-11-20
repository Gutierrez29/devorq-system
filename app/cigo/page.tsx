"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
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
    before: "Los recibos de grifo y peaje en papel térmico se borran por el calor o se extravían, perdiendo crédito fiscal (IGV) y gasto deducible.",
    after: "El chofer fotografía el ticket en el grifo y CIGO conserva imagen, serie, RUC y montos en la nube.",
  },
  {
    issue: "Liquidaciones de viáticos atrasadas por semanas",
    before: "Administración espera que el tracto vuelva a base con un sobre de papeles físicos para recién cuadrar caja chica y saldos.",
    after: "Cada entrega y gasto se descuenta en vivo mientras el camión sigue en ruta.",
  },
  {
    issue: "Sobreconsumos de diésel detectados tarde",
    before: "Al revisar facturas recién a fin de mes es imposible reaccionar ante desvíos de rendimiento Km/galón o cargas atípicas.",
    after: "Cálculo por abastecimiento con foto de odómetro y alertas automáticas cuando el rendimiento cae fuera de meta.",
  },
  {
    issue: "Digitación manual y riesgo de boletas duplicadas",
    before: "Horas pasando comprobantes uno por uno a Excel sin validar si el emisor está Habido en SUNAT o si la serie ya se rindió antes.",
    after: "Consulta automática de RUC/comprobante, bloqueo de duplicados y descarga directa en Excel, SIRE TXT y ZIP.",
  },
] as const;

const ROLE_OUTCOMES = [
  {
    role: "Gerencia General",
    headline: "Visibilidad de costos por viaje y placa sin esperar el cierre de mes.",
    points: [
      "Control real de margen operativo en cada ruta nacional.",
      "Reducción de fugas en combustible, peajes y gastos no autorizados.",
      "Información privada y auditable bajo Ley N° 29733.",
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
  { id: "whatsapp-feature", label: "Cómo opera" },
  { id: "modulos-carousel", label: "Módulos" },
  { id: "documentacion-cigo", label: "Clientes y PDF" },
  { id: "planes", label: "Tarifas" },
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
    <div className="min-h-screen bg-[#F6F5F1] text-[#14181D]">
      {/* ── Header Bar (Warm Industrial Paper + Crisp Hairline) ── */}
      <header className="sticky top-0 z-50 bg-[#F6F5F1]/95 backdrop-blur-md border-b border-[#D8D6CE]">
        <nav
          aria-label="Navegación principal CIGO"
          className="max-w-[1240px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4"
        >
          {/* Brand Lockup */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#4E5661] hover:text-[#14181D] transition-colors shrink-0"
              title="Volver a Devorq Systems"
            >
              <Image
                src="/devorq-isotype.png"
                alt="Devorq Systems"
                width={26}
                height={26}
                priority
                className="w-[26px] h-[26px] rounded object-contain"
              />
              <span className="hidden sm:inline text-xs font-semibold">Devorq</span>
            </Link>
            <span className="h-4 w-px bg-[#C9C6BC]" aria-hidden="true" />
            <Image
              src="/cigo-logo.webp"
              alt="CIGO — Control Inteligente de Gastos Operativos"
              width={110}
              height={45}
              priority
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-medium text-[#4E5661] hover:text-[#14181D] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/cigo/carta-presentacion-cigo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14181D] hover:text-[#0A58CA] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" strokeWidth={1.75} />
              Dossier PDF
            </a>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold text-white bg-[#147A4B] hover:bg-[#10643D] transition-colors"
            >
              Probar 7 días gratis
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#D8D6CE] bg-white text-[#14181D] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            )}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#D8D6CE] bg-[#F6F5F1] px-5 py-4 space-y-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2.5 text-sm font-medium text-[#14181D] border-b border-[#E4E2DA] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md text-sm font-bold text-white bg-[#147A4B]"
              >
                Probar 7 días gratis
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/cigo/carta-presentacion-cigo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold text-[#14181D] bg-white border border-[#D8D6CE]"
                >
                  <FileText className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Dossier PDF
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold text-[#4E5661] bg-white border border-[#D8D6CE]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Devorq
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── 1. EDITORIAL ASYMMETRIC HERO + LIVE PRODUCT WORKBENCH ── */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 px-5 sm:px-8 bg-[#F6F5F1] border-b border-[#D8D6CE]">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-12 sm:mb-14 cigo-enter">
              {/* Left 7 cols: Commanding Editorial Headline & Direct Actions */}
              <div className="lg:col-span-7 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.45rem] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#14181D]">
                  Controla el combustible y los viáticos de tu flota desde el WhatsApp de tus choferes.
                </h1>

                <p className="text-base sm:text-lg text-[#4E5661] leading-relaxed max-w-[60ch]">
                  Tus conductores envían fotos de tickets, lecturas de odómetro o notas de voz sin descargar ninguna aplicación. CIGO valida comprobantes ante SUNAT, calcula el rendimiento Km/galón y entrega tu cierre contable listo.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm sm:text-base font-bold text-white bg-[#147A4B] hover:bg-[#10643D] transition-colors"
                  >
                    Probar 7 días gratis
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <a
                    href={WSP_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md text-sm font-semibold text-[#14181D] bg-white hover:bg-[#ECEAE3] border border-[#C9C6BC] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#147A4B]" strokeWidth={1.75} />
                    Agendar demo de 15 min
                  </a>
                </div>

                <p className="text-xs text-[#5B6470]">
                  Hasta 5 camiones activos durante la prueba sin tarjeta de crédito. Factura electrónica con IGV incluido en Perú.
                </p>
              </div>

              {/* Right 5 cols: Operational Spec Sheet (Replaces generic stat cards) */}
              <div className="lg:col-span-5 border-t border-[#14181D]">
                <dl className="divide-y divide-[#D8D6CE] text-sm">
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs font-medium text-[#5B6470]">Canal en carretera</dt>
                    <dd className="text-right font-semibold text-[#14181D]">
                      WhatsApp habitual (0 apps extra)
                    </dd>
                  </div>
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs font-medium text-[#5B6470]">Auditoría fiscal</dt>
                    <dd className="text-right font-semibold text-[#14181D]">
                      Consulta RUC SUNAT y duplicados
                    </dd>
                  </div>
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs font-medium text-[#5B6470]">Entregables contables</dt>
                    <dd className="text-right font-semibold text-[#14181D]">
                      Excel, Liquidación, SIRE TXT y ZIP
                    </dd>
                  </div>
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs font-medium text-[#5B6470]">Flotas operando</dt>
                    <dd className="text-right font-semibold text-[#0A58CA]">
                      TRANSYACU S.A.C. y DIFEYA S.A.C.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Authored Centerpiece: Live Interactive Dispatch Workbench + Real Dashboard */}
            <div className="cigo-enter-delay">
              <CigoHeroCockpit />
            </div>
          </div>
        </section>

        {/* ── 2. EL PROBLEMA VS. CIGO (EDITORIAL HAIRLINE LEDGER) ── */}
        <section id="problema" className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#D8D6CE]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Sticky Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#14181D] leading-[1.12]">
                Cuatro fugas que el sobre de papel esconde hasta fin de mes.
              </h2>
              <p className="text-sm sm:text-base text-[#4E5661] leading-relaxed">
                Gestionar viajes con recibos térmicos sueltos y hojas manuales encarece cada ruta y sobrecarga al área administrativa. Así cambia la operación al pasar a CIGO.
              </p>
            </div>

            {/* Right Editorial Contrast Ledger */}
            <div className="lg:col-span-8 border-t border-[#14181D] divide-y divide-[#D8D6CE]">
              {OPERATIONAL_GAPS.map((row) => (
                <article key={row.issue} className="py-7 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#14181D] tracking-[-0.015em]">
                    {row.issue}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-semibold text-[#9F2D2D] mb-1">
                        Operación en papel
                      </div>
                      <p className="text-sm text-[#4E5661] leading-relaxed">
                        {row.before}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#147A4B] mb-1">
                        Con CIGO en ruta
                      </div>
                      <p className="text-sm text-[#14181D] leading-relaxed font-medium">
                        {row.after}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. SIMULADOR WHATSAPP → REGISTRO CONTABLE + SECUENCIA 48H ── */}
        <CigoWhatsAppDemo />

        {/* ── 4. IMPACTO POR ÁREA (3-COLUMN EDITORIAL MATRIX, NO BENTO CARDS) ── */}
        <section id="beneficios" className="py-20 sm:py-24 px-5 sm:px-8 bg-[#FAF9F6] border-b border-[#D8D6CE]">
          <div className="max-w-[1240px] mx-auto">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#14181D] leading-[1.12]">
                Un mismo dato sirve a gerencia, operaciones y contabilidad.
              </h2>
              <p className="text-base text-[#4E5661] mt-3 leading-relaxed">
                Sin reescribir planillas entre departamentos ni perseguir comprobantes cuando el camión ya salió a otro viaje.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-[#14181D] divide-y lg:divide-y-0 lg:divide-x divide-[#D8D6CE]">
              {ROLE_OUTCOMES.map((col, idx) => (
                <article
                  key={col.role}
                  className={
                    idx === 0
                      ? "py-7 lg:pr-8"
                      : idx === 1
                      ? "py-7 lg:px-8"
                      : "py-7 lg:pl-8"
                  }
                >
                  <div className="font-cigo-mono text-xs font-semibold text-[#0A58CA] mb-2">
                    {col.role}
                  </div>
                  <h3 className="text-xl font-bold text-[#14181D] tracking-[-0.015em] leading-snug mb-4">
                    {col.headline}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#4E5661] leading-relaxed">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span className="text-[#147A4B] font-bold" aria-hidden="true">
                          /
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. EXPLORADOR DE LOS 8 MÓDULOS REALES ── */}
        <CigoModulesShowcase />

        {/* ── 6. CLIENTES EN OPERACIÓN Y DOCUMENTACIÓN EJECUTIVA ── */}
        <RoiCalculator />

        {/* ── 7. PRICING DE EXPANSIÓN (SINGLE CARBON ANCHOR BAND) ── */}
        <CigoPricing />

        {/* ── 8. PREGUNTAS FRECUENTES (2-COL EDITORIAL SPLIT) ── */}
        <section id="faq" className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#D8D6CE]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#14181D] leading-[1.12]">
                Preguntas frecuentes sobre CIGO.
              </h2>
              <p className="text-sm sm:text-base text-[#4E5661] leading-relaxed">
                Detalles claros sobre la prueba gratuita de 7 días, tarifas con IGV, consultas SUNAT y exportaciones SIRE.
              </p>
              <div className="pt-4 border-t border-[#E4E2DA] space-y-1.5 text-xs text-[#4E5661]">
                <div className="font-semibold text-[#14181D]">Atención directa en Perú</div>
                <div className="font-cigo-mono">+51 929 222 980 / +51 935 351 768</div>
                <div className="font-cigo-mono">contacto@devorq.com</div>
              </div>
            </div>

            <div className="lg:col-span-8 border-t border-[#14181D] divide-y divide-[#D8D6CE]">
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
                        className={`text-base font-semibold transition-colors ${
                          isOpen
                            ? "text-[#0A58CA]"
                            : "text-[#14181D] group-hover:text-[#0A58CA]"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5B6470] shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#0A58CA]" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-sm text-[#4E5661] leading-relaxed max-w-[68ch] cigo-swap">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 9. CIERRE DIRECTO DE CONVERSIÓN ── */}
        <section className="py-20 sm:py-24 px-5 sm:px-8 bg-[#F6F5F1]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] text-[#14181D] leading-[1.08]">
                Activa tu prueba gratis de 7 días con hasta 5 camiones hoy mismo.
              </h2>
              <p className="text-base text-[#4E5661] leading-relaxed max-w-[58ch]">
                Crea tu cuenta en{" "}
                <strong className="text-[#14181D] font-semibold">cigo.devorq.com/registro</strong> sin tarjeta de crédito, o coordina una demostración de 15 minutos con nuestro equipo técnico.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm font-bold text-white bg-[#147A4B] hover:bg-[#10643D] transition-colors"
              >
                Registrar mi flota gratis
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href={WSP_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md text-sm font-semibold text-[#14181D] bg-white hover:bg-[#ECEAE3] border border-[#C9C6BC] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#147A4B]" strokeWidth={1.75} />
                Demo por WhatsApp
              </a>
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-md text-sm font-semibold text-[#4E5661] hover:text-[#14181D] bg-white border border-[#D8D6CE] transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.75} />
                Correo
              </a>
            </div>
          </div>

          <div className="max-w-[1240px] mx-auto mt-12 pt-6 border-t border-[#D8D6CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5B6470]">
            <span>Formatos de exportación incluidos en el panel web:</span>
            <div className="flex flex-wrap gap-x-5 gap-y-1 font-cigo-mono text-[#14181D]">
              <span>Excel operativo (.xlsx)</span>
              <span>Liquidación por viaje (.xlsx)</span>
              <span>TXT SIRE Compras SUNAT</span>
              <span>Respaldo fotográfico (.zip)</span>
            </div>
          </div>
        </section>

        {/* ── Términos y Condiciones (Desplegable, #terminos) ── */}
        {showTerms && (
          <section
            id="terminos"
            className="py-14 px-5 sm:px-8 bg-white border-t border-[#D8D6CE]"
          >
            <div className="max-w-4xl mx-auto text-[#4E5661] text-sm leading-relaxed relative">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                aria-label="Cerrar términos y condiciones"
                className="absolute top-0 right-0 w-9 h-9 rounded-md border border-[#D8D6CE] bg-[#F6F5F1] hover:bg-[#ECEAE3] text-[#14181D] flex items-center justify-center cursor-pointer transition-colors"
                title="Cerrar"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <h2 className="text-2xl font-bold text-[#14181D] pr-12">
                TÉRMINOS Y CONDICIONES DEL SERVICIO &quot;CIGO&quot;
              </h2>
              <p className="font-cigo-mono text-xs text-[#5B6470] mt-1 mb-6">
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
                  <h3 className="text-base font-bold text-[#14181D] mb-1.5">
                    1. NATURALEZA Y ALCANCE DEL SERVICIO
                  </h3>
                  <p>
                    1.1. CIGO es un software as a service (SaaS) de asistencia tecnológica que utiliza inteligencia artificial y procesamiento de datos para la lectura, extracción automatizada y consolidación de comprobantes de pago de viáticos y transporte. 1.2. EL PRESTADOR opera legalmente amparado por la legislación de la República del Perú, emitiendo comprobantes de pago electrónicos (Facturas y Boletas Electrónicas) válidos y deducibles para EL CLIENTE.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#14181D] mb-1.5">
                    2. DESLINDE DE RESPONSABILIDAD CONTABLE Y TRIBUTARIA
                  </h3>
                  <p>
                    2.1. CIGO es una herramienta tecnológica de automatización y auditoría preliminar. En ningún caso EL PRESTADOR actúa como estudio contable, auditor tributario ni asesor fiscal de EL CLIENTE. 2.2. La responsabilidad legal, fiscal y tributaria sobre la veracidad, sustento, declaración de IGV, impuesto a la renta y presentación final de libros contables ante la SUNAT recae exclusivamente sobre EL CLIENTE y sus contadores designados.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#14181D] mb-1.5">
                    3. DISPONIBILIDAD DEL SERVICIO (SLA Y PROVEEDORES TERCEROS)
                  </h3>
                  <p>
                    3.1. El servicio se presta bajo la modalidad &quot;Tal cual&quot; (As Is) y &quot;Según disponibilidad&quot;. 3.2. EL PRESTADOR realiza sus mejores esfuerzos para garantizar una disponibilidad del 99% del servicio, sin asumir responsabilidad por interrupciones en plataformas de terceros (Meta/WhatsApp, SUNAT o telecomunicaciones).
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#14181D] mb-1.5">
                    4. PROTECCIÓN DE DATOS PERSONALES (LEY N° 29733)
                  </h3>
                  <p>
                    4.1. De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), EL PRESTADOR trata la información, comprobantes y números de teléfono con estricta confidencialidad y reserva, exclusivamente para la prestación del servicio contratado.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#14181D] mb-1.5">
                    5. PAGOS, FACTURACIÓN Y SUSPENSIÓN DEL SERVICIO
                  </h3>
                  <p>
                    5.1. El servicio se factura de forma mensual según la cantidad de vehículos/unidades activas contratadas conforme al tramo vigente del tarifario (con IGV incluido en Perú). 5.2. Las facturas emitidas cuentan con un plazo máximo de pago de cinco (5) días calendario desde su emisión. 5.3. El incumplimiento del pago faculta a EL PRESTADOR a suspender temporalmente el procesamiento hasta regularizar el saldo adeudado.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#14181D] mb-1.5">
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
      <footer className="border-t border-[#D8D6CE] py-7 px-5 sm:px-8 bg-[#F6F5F1]">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5B6470]">
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
              className="text-[#14181D] hover:text-[#0A58CA] font-medium underline underline-offset-4 cursor-pointer"
            >
              {showTerms ? "Ocultar Términos y Condiciones" : "Términos y Condiciones"}
            </button>
            <Link href="/" className="text-[#14181D] hover:text-[#0A58CA] font-medium">
              Volver a Devorq
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
