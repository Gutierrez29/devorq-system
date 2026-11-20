"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PlatformModule {
  id: string;
  area: string;
  shortName: string;
  title: string;
  desc: string;
  highlights: string[];
  logro: string;
  auto: string;
  img: string;
  width: number;
  height: number;
}

const MODULES: PlatformModule[] = [
  {
    id: "dashboard",
    area: "Analítica",
    shortName: "Panel de Control Analítico",
    title: "Panel de Control Analítico y Consola Contable",
    desc: "Consolidado gerencial de gasto operativo histórico, porcentaje de validación SUNAT, crédito fiscal IGV recuperable, evolución mensual, desglose por categoría y ranking de mayor gasto por camión o por chofer.",
    highlights: [
      "Alertas directas de comprobantes que requieren auditoría o voucher bancario",
      "Ranking de mayor gasto conmutable entre unidades (placas) y conductores",
      "Desglose proporcional: combustible, mantenimiento, hospedaje, cochera, alimentación y peajes",
    ],
    logro: "Visibilidad completa del gasto real por camión, chofer y categoría antes del cierre mensual.",
    auto: "Consolidación continua de rendiciones, cálculo de salud tributaria y alertas de bancarización.",
    img: "/cigo/screens/01-dashboard.webp",
    width: 972,
    height: 867,
  },
  {
    id: "choferes-flota",
    area: "Flota",
    shortName: "Choferes, Vehículos y Carretas",
    title: "Padrón de Choferes, Tractos, Carretas y Canal WhatsApp",
    desc: "Directorio centralizado de conductores activos y archivados, vehículos/tractocamiones y carretas/semirremolques, con estado de licencias MTC vigentes, importación/exportación masiva y línea oficial de WhatsApp integrada.",
    highlights: [
      "Tres pestañas conectadas: Choferes, Vehículos & Camiones y Carretas & Semirremolques",
      "Línea oficial de recepción WhatsApp visible para activar conductores en segundos",
      "Control de licencias MTC vigentes, teléfonos habilitados e importación desde Excel",
    ],
    logro: "Padrón ordenado de toda tu tripulación, tractos y semirremolques desde una sola pantalla.",
    auto: "Vinculación inmediata entre el número de WhatsApp del chofer y la placa asignada a cada viaje.",
    img: "/cigo/screens/02-choferes-flota.webp",
    width: 1024,
    height: 516,
  },
  {
    id: "consola-whatsapp",
    area: "WhatsApp IA",
    shortName: "Consola WhatsApp en Vivo",
    title: "Consola WhatsApp en Tiempo Real y Lectura IA de Tableros",
    desc: "Monitoreo en vivo de las conversaciones entre tus choferes y el asistente CIGO: lectura automática por IA de fotos del tablero digital (odómetro en km y porcentaje de combustible) con botones interactivos en el chat.",
    highlights: [
      "Lectura automática de kilometraje y porcentaje de tanque directamente desde la foto del tablero",
      "Botones rápidos en WhatsApp para el chofer: Cerrar Ruta, Control en Ruta o Corregir Salida",
      "Supervisión en tiempo real por empresa, filtro de choferes/jefes y control de IA activa",
    ],
    logro: "Elimina llamadas interminables y reportes confusos: ves exactamente qué reportó el chofer y en qué minuto.",
    auto: "Extracción por visión IA del tablero, comprobantes y audios con respuesta inmediata al conductor.",
    img: "/cigo/screens/03-consola-whatsapp.webp",
    width: 1024,
    height: 456,
  },
  {
    id: "rutas-viajes",
    area: "Operaciones",
    shortName: "Rutas, Viajes y Taller",
    title: "Despachos, Rutas, Auto-Despacho WhatsApp y Mantenimiento",
    desc: "Control integral de viajes programados, catálogo de rutas y rendimiento Km/galón, incluyendo Auto-Despacho iniciado por el chofer desde WhatsApp e ingresos a Taller/Mantenimiento con trazabilidad de gastos.",
    highlights: [
      "Auto-Despacho (WSP): permite a tus choferes abrir viaje o reportar ingreso a taller desde ruta",
      "Cálculo de recorrido en kilómetros, nivel de tanque, placa + carreta acoplada y gasto por despacho",
      "Tres vistas especializadas: Viajes y Despachos, Catálogo de Rutas y Rendimiento y Auditoría",
    ],
    logro: "Trazabilidad exacta de cuánto cuesta cada viaje, cada ruta y cada parada de mantenimiento.",
    auto: "Agrupación automática de tickets, peajes y combustible dentro del expediente de cada despacho.",
    img: "/cigo/screens/04-rutas-viajes.webp",
    width: 1024,
    height: 522,
  },
  {
    id: "comprobantes",
    area: "Auditoría",
    shortName: "Historial de Comprobantes",
    title: "Historial de Comprobantes y Auditoría SUNAT",
    desc: "Base histórica de facturas, boletas y recibos de peajes, combustible y viáticos vinculados a cada ruta, con búsqueda por chofer, RUC, serie o código CIGO y etiquetas inmediatas de bancarización y validación fiscal.",
    highlights: [
      "Etiquetas automáticas de cumplimiento: Bancarizado, Falta Voucher, SUNAT Aceptado y Estado Interno",
      "Filtros rápidos por estado, tipo/categoría, rango de fechas y búsqueda instantánea por RUC o serie",
      "Trazabilidad directa del gasto hacia el chofer y la ruta/viaje donde fue emitido",
    ],
    logro: "Auditoría previa al cierre contable sin revisar carpetas físicas ni cruzar hojas de Excel manualmente.",
    auto: "Detección de comprobantes duplicados, validación tributaria SUNAT y marcaje de gastos observados.",
    img: "/cigo/screens/05-comprobantes.webp",
    width: 1024,
    height: 534,
  },
  {
    id: "expediente-gasto",
    area: "Auditoría",
    shortName: "Expediente OCR y Ley 28194",
    title: "Expediente de Gasto: Foto Real + Desglose OCR + Bancarización",
    desc: "Vista dividida de auditoría con la fotografía original del comprobante o vale de crédito (zoom, rotación y descarga) junto al desglose de ítems de combustible y la alerta legal de Bancarización (Ley N° 28194).",
    highlights: [
      "Visor lado a lado: evidencia fotográfica original frente a los campos extraídos por IA",
      "Desglose detallado de combustible: producto (Diésel B5), galones, precio unitario y subtotal",
      "Alerta automática Ley N° 28194 para exigir voucher bancario en gastos desde S/ 2,000 o US$ 500",
    ],
    logro: "Protege la deducibilidad de tus gastos mayores ante fiscalizaciones de SUNAT con respaldo completo.",
    auto: "Lectura OCR de ítems y alerta automática cuando un gasto supera el umbral legal de bancarización.",
    img: "/cigo/screens/06-expediente-gasto.webp",
    width: 1024,
    height: 746,
  },
  {
    id: "reportes-sire",
    area: "Contabilidad",
    shortName: "Cierres Mensuales y SIRE",
    title: "Cierres Mensuales, Liquidación de Choferes y SIRE RCE SUNAT",
    desc: "Consola de cierre contable con cambio entre Fecha de Emisión (Fiscal SUNAT) y Fecha de Registro (Caja CIGO), 5 KPI tributarios y descarga directa de los 4 paquetes que necesita tu contador cada mes.",
    highlights: [
      "Liquidación de Choferes: planilla de viáticos y gastos aprobados lista para firmas de caja",
      "Libro de Compras Multi-Hoja (Excel) con detalle de combustible y bancarización Ley 28194",
      "Paquete SIRE RCE Estructura 8.4 (.zip) y Carpeta ZIP de fotos clasificadas con índice CSV",
    ],
    logro: "Ahorra días de trabajo contable cada cierre de mes entregando todo estructurado para SUNAT.",
    auto: "Generación en 1 clic de archivos SIRE 8.4, liquidaciones, Excel consolidado y respaldo ZIP.",
    img: "/cigo/screens/07-reportes-sire.webp",
    width: 1024,
    height: 532,
  },
  {
    id: "usuarios-copilot",
    area: "Empresa",
    shortName: "Usuarios y Copilot WhatsApp",
    title: "Gestión de Usuarios, Grupos Corporativos y Copilot WhatsApp",
    desc: "Administración centralizada de usuarios web por empresa o grupo corporativo con roles y permisos granulares, además de la gestión de asientos de Copilot WhatsApp para jefes de flota y gerentes.",
    highlights: [
      "Soporte para Grupos Corporativos con varias empresas y control independiente de accesos",
      "Módulo Copilot WhatsApp para que jefes de flota consulten indicadores desde su celular",
      "Filtros por empresa, grupo, rol y estado con registro de fecha de alta y cargo",
    ],
    logro: "Cada área y razón social de tu grupo trabaja con permisos exactos sin mezclar información.",
    auto: "Aislamiento de accesos por rol y administración de cuotas de usuarios web y Copilot.",
    img: "/cigo/screens/08-usuarios-copilot.webp",
    width: 1024,
    height: 524,
  },
  {
    id: "configuracion-politicas",
    area: "Empresa",
    shortName: "Políticas, Telegram y API",
    title: "Configuración Fiscal, Políticas de Ruta, Telegram y API ERP",
    desc: "Panel unificado para administrar RUC y régimen tributario, políticas de topes de viáticos y metodología de combustible, alertas en tiempo real por Telegram, integraciones API/ERP y capacidad del plan.",
    highlights: [
      "Políticas & Reglas: topes de alimentación/hotel, metodología de combustible y bancarización",
      "Alertas por Telegram para notificaciones operativas de retrasos, desvíos o auditoría",
      "API & Integraciones ERP para conectar tus datos de flota con tu sistema contable",
    ],
    logro: "Adapta CIGO exactamente a las reglas de gasto y control de combustible de tu transportista.",
    auto: "Aplicación automática de topes, reglas de odómetro y notificaciones según tu configuración.",
    img: "/cigo/screens/09-configuracion-politicas.webp",
    width: 1024,
    height: 530,
  },
  {
    id: "perfil-multiempresa",
    area: "Empresa",
    shortName: "Expediente Multi-Empresa",
    title: "Expediente de Usuario y Acceso Multi-Empresa",
    desc: "Gestión de datos personales, seguridad de credenciales y matriz de razones sociales autorizadas para directivos, auditores o contadores que administran múltiples empresas de transporte.",
    highlights: [
      "Acceso Multi-Empresa: cambia entre razones sociales autorizadas sin salir de tu sesión",
      "Control centralizado de seguridad de cuenta y cambio verificado de credenciales",
      "Trazabilidad clara del cargo, rol asignado y empresas bajo supervisión",
    ],
    logro: "Simplifica la operación de grupos de transporte con dos o más RUC desde una sola cuenta.",
    auto: "Aislamiento seguro de datos y cambio ágil de contexto empresarial en el panel.",
    img: "/cigo/screens/10-perfil-multiempresa.webp",
    width: 1024,
    height: 685,
  },
  {
    id: "acceso-seguridad",
    area: "Seguridad",
    shortName: "Acceso Privado Ley 29733",
    title: "Entorno Privado por Empresa y Seguridad Cloud",
    desc: "Acceso autenticado con aislamiento lógico por empresa, cifrado de credenciales y resguardo seguro en la nube de todos los comprobantes y evidencia fotográfica.",
    highlights: [
      "Aislamiento privado por empresa y reserva comercial conforme a la Ley N° 29733",
      "Cifrado de sesiones y respaldo permanente accesible desde oficina o móvil",
      "Titularidad exclusiva de los datos, reportes y fotografías para tu empresa",
    ],
    logro: "Confidencialidad comercial y respaldo digital permanente sin depender de archivos locales.",
    auto: "Protección cifrada de accesos y disponibilidad continua en la nube.",
    img: "/cigo/01-login.webp",
    width: 1417,
    height: 742,
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
      className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
              Conoce toda la plataforma real por dentro: {MODULES.length} módulos integrados.
            </h2>
            <p className="text-base text-[#475569] mt-2.5 max-w-[65ch] leading-relaxed">
              Capturas reales del sistema actual: desde la consola WhatsApp con lectura de tableros y viajes hasta el expediente OCR con bancarización Ley 28194 y cierres SIRE SUNAT.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end items-center gap-3">
            <span className="font-cigo-mono text-xs text-[#64748B]">
              Vista {activeIndex + 1} de {MODULES.length}
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

        {/* Mobile Horizontal Selector */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 mb-4 [scrollbar-width:none]">
          {MODULES.map((mod, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border cursor-pointer shrink-0 transition-colors ${
                  active
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]"
                }`}
              >
                {mod.shortName}
              </button>
            );
          })}
        </div>

        {/* Desktop 12-Col Index + Real Screenshot & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-9 items-start">
          {/* Left 4-col Complete 11-Module Navigation Index */}
          <div className="hidden lg:block lg:col-span-4 border-t border-[#E2E8F0]">
            {MODULES.map((mod, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-current={active ? "true" : undefined}
                  className={`w-full text-left py-3 px-3.5 border-b border-[#E2E8F0] transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                    active
                      ? "bg-[#F0FDFA] text-[#0F172A]"
                      : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span
                    className={`text-[13px] truncate ${
                      active ? "font-bold text-[#0F172A]" : "font-medium"
                    }`}
                  >
                    {mod.shortName}
                  </span>
                  <span
                    className={`font-cigo-mono text-[10px] shrink-0 px-2 py-0.5 rounded ${
                      active
                        ? "bg-[#CCFBF1] text-[#0F766E] font-bold"
                        : "text-[#94A3B8]"
                    }`}
                  >
                    {mod.area}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 8-col Large Real Screenshot + Lightbox Trigger + Detailed Breakdown */}
          <div key={current.id} className="lg:col-span-8 space-y-6 cigo-swap">
            <div className="border border-[#CBD5E1] rounded-2xl overflow-hidden bg-[#F8FAFC] shadow-sm">
              {/* Crisp Screenshot Action Bar */}
              <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-cigo-mono text-[11px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                    {current.area}
                  </span>
                  <span className="text-xs font-semibold text-[#334155] truncate">
                    {current.shortName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:text-[#0F172A] cursor-pointer shrink-0 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Ampliar captura</span>
                </button>
              </div>

              {/* Clickable Uncropped Real Production Image */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label={`Ampliar captura de ${current.title}`}
                className="block w-full bg-[#F8FAFC] cursor-zoom-in text-left"
              >
                <Image
                  src={current.img}
                  alt={current.title}
                  width={current.width}
                  height={current.height}
                  sizes="(max-width: 1024px) 100vw, 790px"
                  className="w-full h-auto max-h-[500px] object-contain block mx-auto"
                />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-[-0.02em]">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed mt-2 max-w-[70ch]">
                  {current.desc}
                </p>
              </div>

              {/* Concrete Real Capabilities in This Screen */}
              <ul className="space-y-2 text-sm text-[#1E293B]">
                {current.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5"
                      strokeWidth={2.25}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#E2E8F0]">
                <div>
                  <div className="text-xs font-bold text-[#0F172A] mb-1">
                    Qué resuelve para tu empresa
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {current.logro}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F766E] mb-1">
                    Qué automatiza el sistema
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {current.auto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Screenshot Inspection Modal (Keyboard + Backdrop Accessible) */}
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
                  {current.area} · Vista {activeIndex + 1} de {MODULES.length}
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
