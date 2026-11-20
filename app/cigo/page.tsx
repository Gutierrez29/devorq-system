"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  EyeOff,
  FileSpreadsheet,
  FileText,
  FileWarning,
  Fuel,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
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

const PROBLEMS = [
  {
    num: "01",
    title: "Boletas térmicas perdidas o borradas",
    desc: "Los recibos de grifo y peaje en papel térmico se borran por el calor o se extravían en ruta, provocando pérdida directa de crédito fiscal (IGV) y gasto deducible.",
    tag: "Pérdida tributaria",
    icon: FileWarning,
  },
  {
    num: "02",
    title: "Demoras al liquidar viáticos y caja chica",
    desc: "Administración espera días o semanas hasta que el camión regrese a base con un sobre de recibos físicos para cuadrar saldos pendientes.",
    tag: "Cuello de botella",
    icon: Clock,
  },
  {
    num: "03",
    title: "Sobreconsumos en combustible y peajes",
    desc: "Cuando las facturas se revisan recién a fin de mes es tarde para detectar fugas, cobros alterados o caídas en el rendimiento Km/galón de cada tracto.",
    tag: "Fugas en ruta",
    icon: Fuel,
  },
  {
    num: "04",
    title: "Cero visibilidad mientras el camión viaja",
    desc: "Sin herramientas simples para el chofer, gerencia opera a ciegas respecto al dinero entregado frente al gasto realmente ejecutado en carretera.",
    tag: "Sin trazabilidad",
    icon: EyeOff,
  },
] as const;

const COMPARISON_ROWS = [
  {
    before: "Sobres con recibos térmicos borrosos al volver a base",
    after: "Foto inmediata por WhatsApp con respaldo en la nube",
  },
  {
    before: "Horas digitando facturas en Excel al cierre de mes",
    after: "Extracción IA y descarga Excel, SIRE TXT y ZIP en 1 clic",
  },
  {
    before: "Riesgo de boletas duplicadas o RUC No Habido sin detectar",
    after: "Validación automática ante SUNAT y alerta de duplicados",
  },
  {
    before: "Sin control real del rendimiento Km/galón por tracto",
    after: "Cálculo por abastecimiento y alertas ante desvíos de consumo",
  },
] as const;

const KEY_BENEFITS = [
  {
    kpi: "Tiempo Real",
    title: "Control de viáticos, combustible y peajes en ruta",
    desc: "Visualiza saldos entregados frente a gastos rendidos por viaje, chofer y placa mientras la unidad sigue en carretera.",
    icon: Activity,
    accentClass: "bg-sky-100 text-sky-700 border-sky-200",
    iconWrapClass: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    kpi: "Menos Fugas",
    title: "Validación SUNAT y alerta de duplicados",
    desc: "Consulta automática de RUC (Activo/Habido), detección de boletas repetidas y alertas ante desvíos en combustible Km/galón.",
    icon: ShieldCheck,
    accentClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    iconWrapClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    kpi: "Cierre Ágil",
    title: "Ahorro de horas administrativas y contables",
    desc: "Elimina la digitación manual desde sobres de papel. Descarga reportes Excel, liquidaciones de viaje, TXT SIRE y fotos en ZIP.",
    icon: FileSpreadsheet,
    accentClass: "bg-violet-100 text-violet-700 border-violet-200",
    iconWrapClass: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    kpi: "0 Apps Extra",
    title: "Adopción inmediata por tus conductores",
    desc: "Opera 100% desde el WhatsApp habitual del chofer con lectura por IA de tickets térmicos, tableros y notas de voz.",
    icon: MessageSquare,
    accentClass: "bg-cyan-100 text-cyan-700 border-cyan-200",
    iconWrapClass: "bg-cyan-50 text-cyan-600 border-cyan-100",
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
  { id: "problema", label: "El Problema" },
  { id: "whatsapp-feature", label: "Cómo Funciona" },
  { id: "modulos-carousel", label: "Módulos" },
  { id: "planes", label: "Planes" },
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
    <div className="min-h-screen bg-white text-slate-900">
      {/* ── Dark Product Navbar (Distinct CIGO Identity) ── */}
      <header className="sticky top-0 z-50 bg-[#070D19]/92 backdrop-blur-xl border-b border-slate-800/80">
        <nav
          aria-label="Navegación principal CIGO"
          className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
        >
          {/* Brand + Product Pill */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity shrink-0"
            >
              <Image
                src="/devorq-isotype.png"
                alt="Devorq Systems Logo"
                width={32}
                height={32}
                priority
                className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5"
              />
              <span className="text-base font-black tracking-tight text-white">
                Devorq <span className="text-sky-400">Systems</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block h-5 w-px bg-slate-700" aria-hidden="true" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
              <span className="radar-live" />
              CIGO Flotas
            </span>
          </div>

          {/* Desktop Section Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <a
              href="/cigo/carta-presentacion-cigo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              Dossier PDF
            </a>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/25 transition-all"
            >
              Prueba Gratis
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors pl-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Inicio
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#070D19] px-4 py-4 space-y-2 cigo-fade-up">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800/80 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-emerald-600"
              >
                Comenzar Prueba Gratis (7 días)
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/cigo/carta-presentacion-cigo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  Dossier PDF
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Devorq Inicio
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── 1. DARK COMMAND-CENTER SPLIT HERO ── */}
        <section className="relative overflow-hidden bg-[#070D19] text-white border-b border-slate-800/90">
          {/* Technical Telemetry Grid & Subtle Ambient Glows */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 cigo-grid-bg opacity-85" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-sky-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-0 w-[440px] h-[440px] rounded-full bg-emerald-500/12 blur-3xl"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-18 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left: Value Proposition + Direct CTAs */}
              <div className="lg:col-span-6 space-y-6 cigo-fade-up">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center bg-white/95 px-3.5 py-1.5 rounded-xl shadow-lg shadow-sky-500/10">
                    <Image
                      src="/cigo-logo.webp"
                      alt="CIGO — Control Inteligente de Gastos Operativos"
                      width={195}
                      height={80}
                      priority
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 bg-sky-500/10 border border-sky-400/25 px-3.5 py-1.5 rounded-full">
                    <span className="radar-live" />
                    Control de Flotas B2B · Sin Instalar Apps
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl xl:text-[3.35rem] font-black tracking-tight leading-[1.06] text-white">
                  Frena las fugas en ruta y{" "}
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    liquida combustible y viáticos en tiempo real
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                  Tus conductores envían fotos de boletas, odómetro o notas de voz desde su{" "}
                  <strong className="text-white font-semibold">WhatsApp habitual</strong>. CIGO valida ante{" "}
                  <strong className="text-white font-semibold">SUNAT</strong>, controla el rendimiento{" "}
                  <strong className="text-sky-300 font-semibold">Km/galón</strong> y entrega tu liquidación contable lista.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
                  >
                    Comenzar Prueba Gratis de 7 Días
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={WSP_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold text-slate-100 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-sky-400/50 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Agendar Demo 15 min
                  </a>
                </div>

                {/* Friction Reducers */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Hasta 5 camiones gratis · Sin tarjeta
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Factura electrónica con IGV
                  </span>
                  <a
                    href="/cigo/brochure-cigo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200 underline underline-offset-4"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Brochure PDF
                  </a>
                </div>

                {/* 3-Step Instant Clarity Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/90 max-w-xl">
                  <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-3">
                    <div className="text-xs font-extrabold text-emerald-400">WhatsApp</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Foto o audio del chofer en ruta
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-3">
                    <div className="text-xs font-extrabold text-sky-400">IA + SUNAT</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      RUC, duplicados y Km/galón
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-3">
                    <div className="text-xs font-extrabold text-violet-400">Excel · SIRE</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Liquidación y ZIP contable
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Interactive Telemetry Cockpit */}
              <div className="lg:col-span-6 lg:pl-4">
                <CigoHeroCockpit />
              </div>
            </div>

            {/* Bottom Trust Strip */}
            <div className="mt-14 pt-7 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>En operación activa con empresas de transporte de carga pesada en el Perú:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-extrabold tracking-wide text-slate-200 bg-slate-900 border border-slate-700/90 px-3.5 py-1.5 rounded-full">
                  GRUPO TRANSYACU — TRANSYACU S.A.C.
                </span>
                <span className="text-xs font-extrabold tracking-wide text-slate-200 bg-slate-900 border border-slate-700/90 px-3.5 py-1.5 rounded-full">
                  DIFEYA S.A.C.
                </span>
                <button
                  type="button"
                  onClick={() => scrollToSection("planes")}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 underline underline-offset-4 cursor-pointer pl-1"
                >
                  Ver Pricing por Volumen ↓
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. EL PROBLEMA ACTUAL + COMPARATIVA ANTES VS. CON CIGO ── */}
        <section id="problema" className="py-18 sm:py-22 px-4 sm:px-6 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" />
                El Problema Actual en Carretera
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                Lo que hoy le cuesta dinero y horas a tu flota
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Gestionar viajes con sobres de papel, hojas sueltas y rendiciones tardías abre cuatro frentes críticos cada mes.
              </p>
            </div>

            {/* Side-by-Side Operational Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="rounded-2xl bg-rose-50/60 border border-rose-200 p-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Método tradicional (Sobres + Excel)
                </div>
                <ul className="space-y-2.5">
                  {COMPARISON_ROWS.map((row) => (
                    <li key={row.before} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.before}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200 p-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Operación controlada con CIGO
                </div>
                <ul className="space-y-2.5">
                  {COMPARISON_ROWS.map((row) => (
                    <li key={row.after} className="flex items-start gap-2.5 text-sm font-medium text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.after}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4 Detailed Pain Point Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROBLEMS.map((p) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.num}
                    className="group rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-rose-300 p-5 transition-all hover:shadow-lg flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-950 leading-snug mb-2">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <div className="text-[11px] font-mono font-bold text-slate-400 pt-2 border-t border-slate-200/70">
                      DOLOR #{p.num}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. LA SOLUCIÓN INTERACTIVA (WHATSAPP + METODOLOGÍA 48H) ── */}
        <CigoWhatsAppDemo />

        {/* ── 4. BENEFICIOS CLAVE BENTO GRID ── */}
        <section id="beneficios" className="py-18 sm:py-22 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Beneficios Clave para tu Empresa
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                Diseñado para Gerencia, Operaciones y Contabilidad
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Cada área recibe información estructurada sin duplicar esfuerzos ni perseguir comprobantes en papel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {KEY_BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <article
                    key={b.title}
                    className="rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-sky-300 p-6 transition-all hover:shadow-lg flex flex-col gap-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center ${b.iconWrapClass}`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${b.accentClass}`}
                      >
                        {b.kpi}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-950 leading-snug">
                      {b.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {b.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. TOUR INTERACTIVO DE LOS 8 MÓDULOS ── */}
        <CigoModulesShowcase />

        {/* ── 6. CLIENTES REALES + DOCUMENTACIÓN OFICIAL (DOSSIER, BROCHURE, VIDEO) ── */}
        <RoiCalculator />

        {/* ── 7. PRICING DE EXPANSIÓN POR VOLUMEN (IGV INCLUIDO) ── */}
        <CigoPricing />

        {/* ── 8. PREGUNTAS FRECUENTES (FAQ) ── */}
        <section id="faq" className="py-18 sm:py-22 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 px-3.5 py-1 rounded-full">
                Preguntas Frecuentes · CIGO
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                Dudas Operativas, Planes y Prueba Gratuita
              </h2>
              <p className="mt-2.5 text-base text-slate-600">
                Respuestas claras sobre el registro gratuito, precios con IGV, consultas SUNAT y exportaciones SIRE.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 px-5 sm:px-8">
              {CIGO_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.q} className="py-4 sm:py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? "text-sky-700" : "text-slate-900 group-hover:text-sky-700"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? "bg-sky-100 text-sky-700 rotate-180"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed pr-8 cigo-fade-up">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 9. CIERRE Y LLAMADO A LA ACCIÓN (DARK COMMAND FINALE) ── */}
        <section className="py-18 sm:py-22 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-[#070D19] text-white border border-sky-400/25 shadow-2xl px-6 py-12 sm:px-12 sm:py-16 text-center">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 cigo-grid-bg opacity-70" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[240px] rounded-full bg-emerald-500/20 blur-3xl"
              />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <span className="radar-live" />
                  Activación Inmediata · Sin Tarjeta de Crédito
                </span>

                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight leading-tight text-white">
                  Empieza tu Prueba Gratis de 7 Días Hoy Mismo
                </h2>

                <p className="mt-4 text-base text-slate-300 leading-relaxed">
                  Registra tu empresa directamente en{" "}
                  <strong className="text-white">cigo.devorq.com/registro</strong> para probar con hasta 5 camiones en ruta, o agenda una demostración gratuita de 15 minutos con nuestro equipo.
                </p>

                <p className="mt-3 text-sm font-bold text-sky-300">
                  WhatsApp / Teléfonos: +51 929 222 980 · +51 935 351 768 · Correo: contacto@devorq.com
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                  >
                    Registrar mi Flota Gratis (7 Días)
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={WSP_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#22c55e] shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Agendar Demo 15 min
                  </a>

                  <a
                    href={GMAIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-sky-400" />
                    Correo
                  </a>
                </div>

                <div className="mt-9 pt-7 border-t border-slate-800">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    Formatos de Exportación Disponibles en el Panel Web
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Reporte Operativo Excel (.xlsx)
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Planilla de Liquidación por Viaje (.xlsx)
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-sky-500/15 border border-sky-400/30 text-sky-300 px-3 py-1.5 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                      Archivo TXT SIRE Compras SUNAT
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Paquete ZIP de Evidencias Fotográficas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Términos y Condiciones (Desplegable) ── */}
        {showTerms && (
          <section
            id="terminos"
            className="py-14 px-4 sm:px-6 bg-slate-50 border-t border-slate-200"
          >
            <div className="max-w-4xl mx-auto text-slate-700 text-sm leading-relaxed relative">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                aria-label="Cerrar términos y condiciones"
                className="absolute top-0 right-0 w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-2xl font-black text-slate-950 pr-12">
                TÉRMINOS Y CONDICIONES DEL SERVICIO &quot;CIGO&quot;
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1 mb-6">
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
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
                    1. NATURALEZA Y ALCANCE DEL SERVICIO
                  </h3>
                  <p>
                    1.1. CIGO es un software as a service (SaaS) de asistencia tecnológica que utiliza inteligencia artificial y procesamiento de datos para la lectura, extracción automatizada y consolidación de comprobantes de pago de viáticos y transporte. 1.2. EL PRESTADOR opera legalmente amparado por la legislación de la República del Perú, emitiendo comprobantes de pago electrónicos (Facturas y Boletas Electrónicas) válidos y deducibles para EL CLIENTE.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
                    2. DESLINDE DE RESPONSABILIDAD CONTABLE Y TRIBUTARIA
                  </h3>
                  <p>
                    2.1. CIGO es una herramienta tecnológica de automatización y auditoría preliminar. En ningún caso EL PRESTADOR actúa como estudio contable, auditor tributario ni asesor fiscal de EL CLIENTE. 2.2. La responsabilidad legal, fiscal y tributaria sobre la veracidad, sustento, declaración de IGV, impuesto a la renta y presentación final de libros contables ante la SUNAT recae exclusivamente sobre EL CLIENTE y sus contadores designados.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
                    3. DISPONIBILIDAD DEL SERVICIO (SLA Y PROVEEDORES TERCEROS)
                  </h3>
                  <p>
                    3.1. El servicio se presta bajo la modalidad &quot;Tal cual&quot; (As Is) y &quot;Según disponibilidad&quot;. 3.2. EL PRESTADOR realiza sus mejores esfuerzos para garantizar una disponibilidad del 99% del servicio, sin asumir responsabilidad por interrupciones en plataformas de terceros (Meta/WhatsApp, SUNAT o telecomunicaciones).
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
                    4. PROTECCIÓN DE DATOS PERSONALES (LEY N° 29733)
                  </h3>
                  <p>
                    4.1. De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), EL PRESTADOR trata la información, comprobantes y números de teléfono con estricta confidencialidad y reserva, exclusivamente para la prestación del servicio contratado.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
                    5. PAGOS, FACTURACIÓN Y SUSPENSIÓN DEL SERVICIO
                  </h3>
                  <p>
                    5.1. El servicio se factura de forma mensual según la cantidad de vehículos/unidades activas contratadas conforme al tramo vigente del tarifario (con IGV incluido en Perú). 5.2. Las facturas emitidas cuentan con un plazo máximo de pago de cinco (5) días calendario desde su emisión. 5.3. El incumplimiento del pago faculta a EL PRESTADOR a suspender temporalmente el procesamiento hasta regularizar el saldo adeudado.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950 mb-1.5">
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
      <footer className="border-t border-slate-200 py-6 px-4 text-center bg-white">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Devorq Systems · CIGO Control Inteligente de Gastos ·{" "}
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
            className="text-sky-600 hover:text-sky-700 font-semibold underline cursor-pointer"
          >
            {showTerms ? "Ocultar Términos y Condiciones" : "Términos y Condiciones"}
          </button>{" "}
          ·{" "}
          <Link href="/" className="text-sky-600 hover:text-sky-700 font-semibold">
            Volver a Devorq
          </Link>
        </p>
      </footer>
    </div>
  );
}
