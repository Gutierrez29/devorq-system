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
    <section
      id="modulos-carousel"
      className="py-20 sm:py-24 px-5 sm:px-8 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
              Conoce la plataforma real por dentro: 8 módulos conectados.
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-center gap-3">
            <span className="font-cigo-mono text-xs text-[#64748B]">
              Módulo {activeIndex + 1} de {MODULES.length}
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

        {/* Desktop 12-Col Index + Real Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 4-col Vertical Index */}
          <div className="hidden lg:block lg:col-span-4 border-t border-[#E2E8F0]">
            {MODULES.map((mod, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-current={active ? "true" : undefined}
                  className={`w-full text-left py-4 px-4 border-b border-[#E2E8F0] transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                    active
                      ? "bg-[#F0FDFA] text-[#0F172A]"
                      : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span className={active ? "text-sm font-bold text-[#0F172A]" : "text-sm font-medium"}>
                    {mod.shortName}
                  </span>
                  {active && (
                    <span className="font-cigo-mono text-[11px] font-bold text-[#0F766E]">
                      Viendo
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right 8-col Uncropped Real Screenshot + Outcomes */}
          <div key={current.id} className="lg:col-span-8 space-y-6 cigo-swap">
            <div className="border border-[#CBD5E1] rounded-2xl overflow-hidden bg-[#F8FAFC] shadow-sm">
              <Image
                src={current.img}
                alt={current.title}
                width={1280}
                height={720}
                sizes="(max-width: 1024px) 100vw, 780px"
                className="w-full h-auto max-h-[470px] object-contain block bg-[#F8FAFC]"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-[-0.02em]">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed mt-2 max-w-[68ch]">
                  {current.desc}
                </p>
              </div>

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
    </section>
  );
}
