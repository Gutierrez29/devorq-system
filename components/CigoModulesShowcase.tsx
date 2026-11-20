"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  FileText,
  LayoutDashboard,
  Maximize2,
  MessageSquare,
  Route,
  Settings,
  UserCog,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PlatformModule {
  id: string;
  navName: string;
  title: string;
  desc: string;
  highlights: string[];
  outcome: string;
  img: string;
  width: number;
  height: number;
  icon: LucideIcon;
}

const MODULES: PlatformModule[] = [
  {
    id: "dashboard",
    navName: "Dashboard",
    title: "Panel de Control Analítico",
    desc: "Resumen gerencial de gastos totales, validación SUNAT, crédito fiscal IGV recuperable, evolución mensual y ranking de mayor gasto por camión o chofer.",
    highlights: [
      "Alertas de comprobantes por auditar y falta de voucher bancario",
      "Desglose por categoría: combustible, mantenimiento, hospedaje y peajes",
      "Ranking conmutable por camión (placa) o por conductor",
    ],
    outcome: "Control claro del gasto real de tu flota antes del cierre de mes.",
    img: "/cigo/screens/01-dashboard.webp",
    width: 972,
    height: 867,
    icon: LayoutDashboard,
  },
  {
    id: "choferes",
    navName: "Choferes & Flota",
    title: "Choferes, Vehículos y Carretas",
    desc: "Padrón centralizado de conductores, tractocamiones y semirremolques, con control de licencias MTC vigentes y acceso directo a la línea oficial WhatsApp.",
    highlights: [
      "Pestañas unificadas: Choferes, Vehículos & Camiones y Carretas",
      "Número oficial de WhatsApp listo para activar choferes en segundos",
      "Importación y exportación masiva en Excel",
    ],
    outcome: "Toda tu tripulación y flota vinculada al canal de WhatsApp en minutos.",
    img: "/cigo/screens/02-choferes-flota.webp",
    width: 1024,
    height: 516,
    icon: Users,
  },
  {
    id: "mensajes-whatsapp",
    navName: "Mensajes WhatsApp",
    title: "Consola WhatsApp en Vivo",
    desc: "Supervisa en tiempo real los mensajes, fotos de comprobantes y fotos del tablero digital (odómetro y porcentaje de tanque) leídas automáticamente por IA.",
    highlights: [
      "Lectura automática de kilometraje y nivel de combustible desde la foto",
      "Botones rápidos en el chat: Cerrar Ruta, Control en Ruta o Corregir Salida",
      "Filtros por empresa, choferes, jefes y estado de IA activa",
    ],
    outcome: "Ves al instante qué reportó cada conductor en carretera sin llamadas.",
    img: "/cigo/screens/03-consola-whatsapp.webp",
    width: 1024,
    height: 456,
    icon: MessageSquare,
  },
  {
    id: "rutas",
    navName: "Rutas & Viajes",
    title: "Viajes, Despachos, Rutas y Taller",
    desc: "Programa viajes, controla el catálogo de rutas y rendimiento Km/galón, recibe Auto-Despachos por WhatsApp y registra ingresos a taller o mantenimiento.",
    highlights: [
      "Auto-Despacho (WSP) e ingreso a Taller reportados directo por el chofer",
      "Recorrido en km, placa + carreta acoplada y gasto acumulado por viaje",
      "Vistas de Viajes y Despachos, Catálogo de Rutas y Rendimiento",
    ],
    outcome: "Sabes exactamente cuánto costó cada viaje y cada parada de mantenimiento.",
    img: "/cigo/screens/04-rutas-viajes.webp",
    width: 1024,
    height: 522,
    icon: Route,
  },
  {
    id: "comprobantes",
    navName: "Comprobantes",
    title: "Historial de Comprobantes y Auditoría",
    desc: "Base histórica de facturas, boletas y recibos de ruta vinculados a cada viaje, con filtros por estado SUNAT, validación interna y alertas de bancarización.",
    highlights: [
      "Etiquetas visibles de Bancarizado, Falta Voucher, SUNAT Aceptado y Observado",
      "Buscador rápido por chofer, razón social, RUC, serie o código CIGO",
      "Prevención automática de comprobantes duplicados",
    ],
    outcome: "Auditoría ordenada en minutos sin revisar sobres físicos de papel.",
    img: "/cigo/screens/05-comprobantes.webp",
    width: 1024,
    height: 534,
    icon: FileText,
  },
  {
    id: "detalle-comprobante",
    navName: "Detalle de Comprobante",
    title: "Expediente de Gasto, OCR y Bancarización",
    desc: "Revisa la foto original del comprobante o vale de crédito lado a lado con los ítems extraídos por IA, galones, precio unitario y control de Ley N° 28194.",
    highlights: [
      "Visor con zoom, rotación y descarga junto al desglose de combustible",
      "Alerta automática de bancarización para gastos desde S/ 2,000 o US$ 500",
      "Revalidación ante SUNAT y carga de voucher bancario en 1 clic",
    ],
    outcome: "Respalda la deducibilidad tributaria de cada gasto mayor ante SUNAT.",
    img: "/cigo/screens/06-expediente-gasto.webp",
    width: 1024,
    height: 746,
    icon: FileSearch,
  },
  {
    id: "reportes",
    navName: "Reportes",
    title: "Cierres Mensuales, Liquidaciones y SIRE",
    desc: "Descarga en un clic los 4 paquetes contables por periodo, alternando entre Fecha de Emisión (Fiscal SUNAT) y Fecha de Registro (Caja CIGO).",
    highlights: [
      "Liquidación de Choferes lista para pagos y firmas de caja",
      "Libro de Compras Excel y Paquete SIRE RCE Estructura 8.4 (.zip)",
      "Descarga masiva de Fotos de Comprobantes (.zip) con índice CSV",
    ],
    outcome: "Reduce horas de digitación contable en cada cierre mensual.",
    img: "/cigo/screens/07-reportes-sire.webp",
    width: 1024,
    height: 532,
    icon: BarChart3,
  },
  {
    id: "usuarios",
    navName: "Usuarios",
    title: "Usuarios, Multi-Empresa y Copilot WhatsApp",
    desc: "Administra cuentas web por empresa o grupo corporativo con roles y permisos granulares, además de accesos Multi-Empresa y Copilot WhatsApp para jefes de flota.",
    highlights: [
      "Soporte Multi-Empresa para grupos corporativos con múltiples razones sociales",
      "Pestaña Copilot WhatsApp para consultas directas de jefes de flota",
      "Roles diferenciados: Gerencia, Operaciones, Auditoría y Contabilidad",
    ],
    outcome: "Cada integrante y razón social accede solo a lo que le corresponde.",
    img: "/cigo/screens/08-usuarios-copilot.webp",
    width: 1024,
    height: 524,
    icon: UserCog,
  },
  {
    id: "configuracion",
    navName: "Configuración",
    title: "Perfil Fiscal, Políticas, Telegram y API",
    desc: "Configura tu RUC y régimen tributario, topes de viáticos, metodología de combustible, alertas por Telegram, integraciones API ERP y seguridad Ley N° 29733.",
    highlights: [
      "Políticas & Reglas: topes de comida/hotel, bancarización y combustible",
      "Alertas Telegram configurables para retrasos y notificaciones operativas",
      "API & Integraciones ERP con entorno privado aislado por empresa",
    ],
    outcome: "Adapta las reglas de control y alertas exactamente a tu operación.",
    img: "/cigo/screens/09-configuracion-politicas.webp",
    width: 1024,
    height: 530,
    icon: Settings,
  },
];

export default function CigoModulesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const current = MODULES[activeIndex];
  const nextMod = MODULES[(activeIndex + 1) % MODULES.length];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MODULES.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      else if (e.key === "ArrowRight") setActiveIndex((prev) => (prev + 1) % MODULES.length);
      else if (e.key === "ArrowLeft")
        setActiveIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen]);

  return (
    <section
      id="modulos-carousel"
      className="py-16 sm:py-20 px-5 sm:px-8 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-tight">
              Conoce cada módulo real de CIGO Dashboard
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-1.5">
              Explora los 9 módulos operativos y contables del sistema real. Haz clic en cualquier pantalla para ampliarla.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-cigo-mono text-xs text-[#64748B]">
              {activeIndex + 1} / {MODULES.length}
            </span>
            <div className="inline-flex border border-[#CBD5E1] rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Módulo anterior"
                className="px-3 py-2 text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer border-r border-[#CBD5E1]"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Módulo siguiente"
                className="px-3 py-2 text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Top Horizontal Module Tabs (All 9 Commercial Modules Directly Accessible) */}
        <div
          role="tablist"
          aria-label="Módulos de CIGO Dashboard"
          className="flex flex-nowrap lg:flex-wrap gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 mb-6 [scrollbar-width:none]"
        >
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const active = idx === activeIndex;
            return (
              <button
                key={mod.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveIndex(idx)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-[13px] font-semibold whitespace-nowrap border transition-colors cursor-pointer shrink-0 ${
                  active
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-[#0D9488] hover:text-[#0F172A]"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    active ? "text-[#14B8A6]" : "text-[#64748B]"
                  }`}
                  strokeWidth={2}
                />
                <span>{mod.navName}</span>
              </button>
            );
          })}
        </div>

        {/* Main 12-Col Side-by-Side Stage: Left Explanation (4 cols) + Right Large Full-Width Screenshot (8 cols) */}
        <div
          key={current.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start cigo-swap"
        >
          {/* Left 4 cols: Always-Visible Clean Explanation & Actions */}
          <div className="lg:col-span-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <span className="inline-block font-cigo-mono text-[11px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded mb-2.5">
                  {current.navName}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-[-0.02em] leading-snug">
                  {current.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mt-2">
                  {current.desc}
                </p>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-[#E2E8F0]">
                {current.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#1E293B] leading-snug">
                    <Check
                      className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] space-y-3.5">
              <p className="text-xs text-[#334155] leading-relaxed">
                <strong className="text-[#0F766E] font-bold">Resultado:</strong>{" "}
                {current.outcome}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#0B1320] bg-[#14B8A6] hover:bg-[#0D9488] hover:text-white cursor-pointer transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={2.25} />
                  Ampliar captura
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#0F172A] bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] cursor-pointer transition-colors"
                >
                  <span>{nextMod.navName}</span>
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.25} />
                </button>
              </div>
            </div>
          </div>

          {/* Right 8 cols: Full-Width Crisp Real Screenshot (No Dead Side Margins) */}
          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label={`Ampliar captura de ${current.title}`}
              className="group relative block w-full rounded-2xl overflow-hidden border border-[#CBD5E1] hover:border-[#0D9488] bg-white shadow-sm cursor-zoom-in transition-colors text-left"
            >
              <Image
                src={current.img}
                alt={current.title}
                width={current.width}
                height={current.height}
                sizes="(max-width: 1024px) 100vw, 820px"
                className="w-full h-auto max-h-[560px] object-contain block bg-white"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0F172A]/90 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#14B8A6]" strokeWidth={2} />
                Ver en grande
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Screenshot Inspection Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Captura ampliada: ${current.title}`}
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-[#0B1320]/92 backdrop-blur-xs p-4 sm:p-8 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden border border-[#334155] shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="px-5 py-3.5 bg-[#0F172A] text-white flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-cigo-mono text-[11px] text-[#2DD4BF]">
                  {current.navName} · {activeIndex + 1} / {MODULES.length}
                </div>
                <div className="text-sm sm:text-base font-bold truncate">
                  {current.title}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Captura anterior"
                  className="w-9 h-9 rounded-lg border border-[#334155] bg-[#162236] hover:bg-[#1E2E48] text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Captura siguiente"
                  className="w-9 h-9 rounded-lg border border-[#334155] bg-[#162236] hover:bg-[#1E2E48] text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Cerrar vista ampliada"
                  className="w-9 h-9 rounded-lg bg-[#14B8A6] text-[#0B1320] hover:bg-[#2DD4BF] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[#F8FAFC] overflow-auto flex-1 flex items-center justify-center">
              <Image
                src={current.img}
                alt={current.title}
                width={current.width}
                height={current.height}
                sizes="95vw"
                className="w-full h-auto max-h-[76vh] object-contain rounded-lg border border-[#E2E8F0] bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
