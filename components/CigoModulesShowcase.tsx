"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PlatformModule {
  id: string;
  shortName: string;
  title: string;
  desc: string;
  logro: string;
  auto: string;
  img: string;
}

const MODULES: PlatformModule[] = [
  {
    id: "dashboard",
    shortName: "Panel de flota y gastos",
    title: "Panel operativo de flota, combustible y gastos",
    desc: "Consolidado de egresos, abastecimientos de combustible (Km/galón), comprobantes registrados y saldos por viaje en una sola vista.",
    logro: "Visibilidad clara de los costos operativos por viaje, chofer y unidad antes del cierre de fin de mes.",
    auto: "Consolidación continua de gastos reportados desde carretera y alertas ante variaciones de rendimiento.",
    img: "/cigo/02-dashboard.webp",
  },
  {
    id: "choferes",
    shortName: "Choferes, tractos y viáticos",
    title: "Padrón de choferes, tractos, carretas y viáticos",
    desc: "Directorio de conductores habilitados en WhatsApp, asignación de tractocamiones y semirremolques, lecturas de odómetro y control de viáticos entregados.",
    logro: "Control ordenado de unidades activas y del dinero entregado a cada conductor para peajes, diésel y gastos de ruta.",
    auto: "Cálculo continuo de saldo entregado frente a gastos sustentados, identificando liquidaciones pendientes.",
    img: "/cigo/03-choferes.webp",
  },
  {
    id: "comprobantes",
    shortName: "Comprobantes y SUNAT",
    title: "Revisión de comprobantes y consulta SUNAT",
    desc: "Recepción de fotos de boletas y facturas por WhatsApp con consulta de RUC emisor (Activo/Habido), estado del comprobante electrónico y alerta de documentos repetidos.",
    logro: "Ordenamiento fiscal previo al cierre contable y prevención de doble registro de un mismo comprobante.",
    auto: "Consulta automatizada del estado del comprobante electrónico y detección de duplicidades por serie y correlativo.",
    img: "/cigo/04-comprobantes.webp",
  },
  {
    id: "reportes",
    shortName: "Reportes, Excel y SIRE",
    title: "Reportes contables, liquidación Excel y SIRE SUNAT",
    desc: "Descarga de reportes operativos en Excel, planillas de liquidación por viaje, archivo TXT estructurado para el Registro de Compras Electrónico (SIRE) y paquete ZIP de evidencias.",
    logro: "Reducción de horas de digitación manual para el equipo contable con respaldos fotográficos ordenados por periodo.",
    auto: "Generación estructurada de hojas Excel, archivo TXT SIRE Compras y carpeta comprimida ZIP de comprobantes.",
    img: "/cigo/05-reportes.webp",
  },
  {
    id: "politicas",
    shortName: "Políticas, topes y combustible",
    title: "Configuración de topes, bancarización y reglas",
    desc: "Definición de parámetros operativos, metodología de combustible (Tanque lleno, Nivel de tablero, Cuota por ruta), bancarización SUNAT y topes de alimentación y hospedaje.",
    logro: "Mayor control sobre los límites presupuestados y reglas fiscales para cada categoría de gasto en carretera.",
    auto: "Observación automática de gastos cuando superan los topes o umbrales de bancarización definidos por tu empresa.",
    img: "/cigo/07-configuracion.webp",
  },
  {
    id: "usuarios",
    shortName: "Usuarios y permisos",
    title: "Gestión de usuarios, roles y permisos por área",
    desc: "Perfiles diferenciados para Gerencia General, Jefatura de Operaciones, Auditoría y Contabilidad con permisos específicos por módulo.",
    logro: "Cada área accede exactamente a las funciones y reportes que le corresponden, con control centralizado.",
    auto: "Control de accesos y límites de cuentas web desde el panel administrativo.",
    img: "/cigo/06-usuarios.webp",
  },
  {
    id: "trazabilidad",
    shortName: "Auditoría y expediente",
    title: "Expediente de usuario y trazabilidad operativa",
    desc: "Vista detallada de permisos asignados, seguridad de credenciales y actividad registrada por cada integrante del equipo administrativo.",
    logro: "Respaldo interno y control de cambios en las liquidaciones y parámetros de la empresa.",
    auto: "Registro continuo de auditoría sobre aprobaciones, ajustes y cambios de configuración.",
    img: "/cigo/08-perfil.webp",
  },
  {
    id: "acceso",
    shortName: "Entorno privado y seguridad",
    title: "Entorno privado por empresa y resguardo cloud",
    desc: "Acceso autenticado con aislamiento por empresa y resguardo en la nube de comprobantes y evidencia fotográfica.",
    logro: "Reserva comercial conforme a la Ley N° 29733: tu información operativa es de titularidad exclusiva de tu empresa.",
    auto: "Almacenamiento cifrado y acceso permanente desde oficina o dispositivo móvil.",
    img: "/cigo/01-login.webp",
  },
];

export default function CigoModulesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = MODULES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MODULES.length);
  };

  return (
    <section id="modulos-carousel" className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#D8D6CE]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#14181D] leading-[1.12]">
              Ocho módulos reales conectados entre carretera y oficina.
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-center gap-3">
            <span className="font-cigo-mono text-xs text-[#5B6470]">
              Módulo {activeIndex + 1} de {MODULES.length}
            </span>
            <div className="inline-flex border border-[#D8D6CE] rounded-md overflow-hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Módulo anterior"
                className="px-3 py-2 text-[#14181D] hover:bg-[#F6F5F1] transition-colors cursor-pointer border-r border-[#D8D6CE]"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Módulo siguiente"
                className="px-3 py-2 text-[#14181D] hover:bg-[#F6F5F1] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
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
                className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap border cursor-pointer shrink-0 transition-colors ${
                  active
                    ? "bg-[#14181D] text-white border-[#14181D]"
                    : "bg-[#F6F5F1] text-[#4E5661] border-[#D8D6CE]"
                }`}
              >
                {mod.shortName}
              </button>
            );
          })}
        </div>

        {/* Desktop 12-Col Editorial Index + Full Real Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 4-col Vertical Navigation Index (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 border-t border-[#D8D6CE]">
            {MODULES.map((mod, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-current={active ? "true" : undefined}
                  className={`w-full text-left py-4 px-3 border-b border-[#E4E2DA] transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                    active
                      ? "bg-[#F6F5F1] text-[#14181D]"
                      : "text-[#5B6470] hover:text-[#14181D] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      active ? "font-bold text-[#14181D]" : "font-medium"
                    }`}
                  >
                    {mod.shortName}
                  </span>
                  <span
                    className={`font-cigo-mono text-[11px] ${
                      active ? "text-[#0A58CA] font-semibold" : "text-[#8B939E]"
                    }`}
                  >
                    {active ? "Activo" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 8-col Real Screenshot & Operational Detail */}
          <div key={current.id} className="lg:col-span-8 space-y-6 cigo-swap">
            <div className="border border-[#D8D6CE] rounded-xl overflow-hidden bg-[#F6F5F1]">
              <Image
                src={current.img}
                alt={current.title}
                width={1280}
                height={720}
                sizes="(max-width: 1024px) 100vw, 780px"
                className="w-full h-auto max-h-[470px] object-contain block bg-[#F6F5F1]"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14181D] tracking-[-0.02em]">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-[#4E5661] leading-relaxed mt-2 max-w-[68ch]">
                  {current.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#E4E2DA]">
                <div>
                  <div className="text-xs font-semibold text-[#14181D] mb-1">
                    Qué resuelve para tu empresa
                  </div>
                  <p className="text-sm text-[#4E5661] leading-relaxed">
                    {current.logro}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#147A4B] mb-1">
                    Qué se automatiza en el proceso
                  </div>
                  <p className="text-sm text-[#4E5661] leading-relaxed">
                    {current.auto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
