"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  FileText,
  LayoutDashboard,
  Lock,
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
    title: "Usuarios, Grupos y Copilot WhatsApp",
    desc: "Administra cuentas web por empresa o grupo corporativo con permisos por rol, además de los accesos a Copilot WhatsApp para jefes de flota.",
    highlights: [
      "Soporte para Grupos Corporativos con múltiples empresas clientes",
      "Pestaña Copilot WhatsApp para consultas directas de jefes de flota",
      "Control granular de roles: Gerencia, Operaciones, Auditoría y Contabilidad",
    ],
    outcome: "Cada integrante y empresa del grupo accede solo a lo que le corresponde.",
    img: "/cigo/screens/08-usuarios-copilot.webp",
    width: 1024,
    height: 524,
    icon: UserCog,
  },
  {
    id: "configuracion",
    navName: "Configuración",
    title: "Perfil Fiscal, Políticas, Telegram y API",
    desc: "Configura tu RUC y régimen tributario, topes de viáticos, metodología de combustible, alertas por Telegram, integraciones API ERP y capacidad de tu plan.",
    highlights: [
      "Políticas & Reglas: topes de comida/hotel, bancarización y combustible",
      "Alertas Telegram configurables para retrasos y notificaciones operativas",
      "API & Integraciones ERP para conectar tus datos con tu sistema contable",
    ],
    outcome: "Adapta las reglas de control y alertas exactamente a tu operación.",
    img: "/cigo/screens/09-configuracion-politicas.webp",
    width: 1024,
    height: 530,
    icon: Settings,
  },
  {
    id: "perfil",
    navName: "Perfil y Multi-Empresa",
    title: "Expediente de Usuario y Acceso Multi-Empresa",
    desc: "Gestiona credenciales, seguridad personal y la lista de razones sociales autorizadas para auditar y operar varias empresas desde una sola sesión.",
    highlights: [
      "Acceso Multi-Empresa para grupos de transporte con varios RUC",
      "Gestión segura de credenciales y datos del responsable",
      "Trazabilidad clara del rol y empresas asignadas",
    ],
    outcome: "Controla todas tus razones sociales sin cerrar sesión ni mezclar datos.",
    img: "/cigo/screens/10-perfil-multiempresa.webp",
    width: 1024,
    height: 685,
    icon: Building2,
  },
  {
    id: "acceso",
    navName: "Inicio de Sesión",
    title: "Acceso Privado y Resguardo Cloud",
    desc: "Portal autenticado con aislamiento por empresa y protección de comprobantes y datos operativos conforme a la Ley N° 29733.",
    highlights: [
      "Entorno privado aislado por empresa y reserva comercial Ley N° 29733",
      "Cifrado de sesiones y respaldo permanente en la nube",
      "Acceso rápido desde oficina o celular",
    ],
    outcome: "Tu información operativa y fiscal permanece privada y siempre disponible.",
    img: "/cigo/01-login.webp",
    width: 1417,
    height: 742,
    icon: Lock,
  },
];

export default function CigoModulesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const current = MODULES[activeIndex];

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
        {/* Compact Section Header so the full module + text + image fits in one viewport */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-tight">
              Conoce cada módulo real de CIGO Dashboard
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-1.5">
              Selecciona cualquier pantalla del menú para ver qué incluye y amplía la captura si deseas revisar el detalle.
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

        {/* Mobile Horizontal Pill Bar */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-4 [scrollbar-width:none]">
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const active = idx === activeIndex;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border cursor-pointer shrink-0 transition-colors ${
                  active
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${active ? "text-[#14B8A6]" : "text-[#64748B]"}`}
                  strokeWidth={2}
                />
                <span>{mod.navName}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Single-Viewport App Shell: Real CIGO Sidebar (Left) + Description ABOVE Screenshot (Right) */}
        <div className="border border-[#CBD5E1] rounded-2xl overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12">
          {/* Left 3 cols: Authentic CIGO Dashboard Sidebar */}
          <aside
            aria-label="Módulos de CIGO Dashboard"
            className="hidden lg:flex lg:col-span-3 flex-col bg-[#F8FAFC] border-r border-[#E2E8F0] py-3 px-2.5"
          >
            <div className="px-3 pb-2 mb-1 text-[11px] font-bold text-[#64748B]">
              Menú de CIGO
            </div>
            <div className="space-y-0.5">
              {MODULES.map((mod, idx) => {
                const Icon = mod.icon;
                const active = idx === activeIndex;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-current={active ? "true" : undefined}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-[13px] transition-colors cursor-pointer ${
                      active
                        ? "bg-[#CCFBF1]/70 text-[#0F766E] font-bold"
                        : "text-[#475569] hover:text-[#0F172A] hover:bg-white font-medium"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? "text-[#0D9488]" : "text-[#64748B]"
                      }`}
                      strokeWidth={2}
                    />
                    <span className="truncate">{mod.navName}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right 9 cols: Visible Info Header ABOVE the Image + Crisp Screenshot + Bottom Outcome Bar */}
          <div key={current.id} className="lg:col-span-9 flex flex-col justify-between bg-white cigo-swap">
            {/* TOP: Immediately Visible Module Explanation & 3 Concrete Benefits */}
            <div className="px-5 sm:px-6 py-4 border-b border-[#E2E8F0] bg-white space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-cigo-mono text-[11px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                      {current.navName}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-[-0.02em]">
                      {current.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed mt-1.5 max-w-[76ch]">
                    {current.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F766E] bg-[#F0FDFA] hover:bg-[#CCFBF1] border border-[#99F6E4] cursor-pointer shrink-0 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Ampliar captura</span>
                </button>
              </div>

              {/* 3 Compact Scannable Check Bullets (100% visible above the fold!) */}
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                {current.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-[#1E293B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 leading-snug"
                  >
                    <Check
                      className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MIDDLE: Clean Uncropped Real Screenshot */}
            <div className="p-4 sm:p-5 bg-[#F8FAFC] flex-1 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label={`Ampliar captura de ${current.title}`}
                className="block w-full rounded-xl overflow-hidden border border-[#CBD5E1] bg-white cursor-zoom-in shadow-xs hover:border-[#0D9488] transition-colors"
              >
                <Image
                  src={current.img}
                  alt={current.title}
                  width={current.width}
                  height={current.height}
                  sizes="(max-width: 1024px) 100vw, 880px"
                  className="w-full h-auto max-h-[380px] object-contain block mx-auto bg-white"
                />
              </button>
            </div>

            {/* BOTTOM: Single Crisp Operational Takeaway Line */}
            <div className="px-5 sm:px-6 py-3 bg-white border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="text-[#334155]">
                <strong className="text-[#0F766E] font-bold">Resultado:</strong>{" "}
                {current.outcome}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1 font-bold text-[#0F172A] hover:text-[#0F766E] cursor-pointer transition-colors"
              >
                <span>Siguiente: {MODULES[(activeIndex + 1) % MODULES.length].navName}</span>
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.25} />
              </button>
            </div>
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
