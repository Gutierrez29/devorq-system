"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Monitor } from "lucide-react";

const MODULES = [
  {
    id: "01",
    shortName: "Dashboard Flota",
    badge: "VISIBILIDAD OPERATIVA GERENCIAL",
    title: "Panel Operativo de Flota, Combustible y Gastos",
    desc: "Consolidado visual de egresos, abastecimientos de combustible (Km/galón), comprobantes registrados y saldos por viaje en una sola vista gerencial.",
    logro: "Visibilidad clara de los costos operativos por viaje, conductor y unidad antes del cierre de fin de mes.",
    auto: "Consolidación continua de gastos reportados desde carretera y alertas ante variaciones de rendimiento.",
    img: "/cigo/02-dashboard.webp",
  },
  {
    id: "02",
    shortName: "Choferes & Flota",
    badge: "TRACTOS, CARRETAS Y VIÁTICOS",
    title: "Padrón de Choferes, Tractos, Carretas & Viáticos",
    desc: "Directorio de conductores habilitados en WhatsApp, asignación de tractocamiones y semirremolques, lecturas de odómetro y control de viáticos entregados.",
    logro: "Control ordenado de unidades activas y del dinero entregado a cada conductor para peajes, diésel y gastos de ruta.",
    auto: "Cálculo continuo de saldo entregado frente a gastos sustentados, identificando liquidaciones pendientes.",
    img: "/cigo/03-choferes.webp",
  },
  {
    id: "03",
    shortName: "Revisión SUNAT",
    badge: "CONSULTA TRIBUTARIA Y DUPLICADOS",
    title: "Revisión de Comprobantes & Consulta SUNAT",
    desc: "Recepción de fotos de boletas y facturas por WhatsApp con consulta de RUC emisor (Activo/Habido), estado del comprobante electrónico y alerta de documentos repetidos.",
    logro: "Ordenamiento fiscal previo al cierre contable y prevención de doble registro de un mismo comprobante.",
    auto: "Consulta automatizada del estado del comprobante electrónico y detección de duplicidades por serie y correlativo.",
    img: "/cigo/04-comprobantes.webp",
  },
  {
    id: "04",
    shortName: "Reportes & SIRE",
    badge: "EXPORTACIÓN EXCEL, SIRE Y ZIP",
    title: "Reportes Contables, Liquidación Excel & SIRE SUNAT",
    desc: "Descarga de reportes operativos en Excel, planillas de liquidación por viaje, archivo TXT estructurado para el Registro de Compras Electrónico (SIRE) y paquete ZIP de evidencias.",
    logro: "Reducción de horas de digitación manual para el equipo contable con respaldos fotográficos ordenados por periodo.",
    auto: "Generación estructurada de hojas Excel, archivo TXT SIRE Compras y carpeta comprimida ZIP de comprobantes.",
    img: "/cigo/05-reportes.webp",
  },
  {
    id: "05",
    shortName: "Políticas & Topes",
    badge: "REGLAS DE VIÁTICOS Y COMBUSTIBLE",
    title: "Configuración de Topes, Bancarización y Reglas",
    desc: "Definición de parámetros operativos, metodología de combustible (Tanque lleno, Nivel de tablero, Cuota por ruta), bancarización SUNAT y topes de alimentación y hospedaje.",
    logro: "Mayor control sobre los límites presupuestados y reglas fiscales para cada categoría de gasto en carretera.",
    auto: "Observación automática de gastos cuando superan los topes o umbrales de bancarización definidos por tu empresa.",
    img: "/cigo/07-configuracion.webp",
  },
  {
    id: "06",
    shortName: "Usuarios & Roles",
    badge: "PERMISOS POR ÁREA",
    title: "Gestión de Usuarios, Roles y Permisos Granulares",
    desc: "Perfiles diferenciados para Gerencia General, Jefatura de Operaciones, Auditoría y Contabilidad con permisos específicos por módulo.",
    logro: "Cada área accede exactamente a las funciones y reportes que le corresponden, con control centralizado.",
    auto: "Control de accesos y límites de cuentas web desde el panel administrativo.",
    img: "/cigo/06-usuarios.webp",
  },
  {
    id: "07",
    shortName: "Trazabilidad",
    badge: "EXPEDIENTE Y AUDITORÍA",
    title: "Expediente de Usuario y Trazabilidad Operativa",
    desc: "Vista detallada de permisos asignados, seguridad de credenciales y actividad registrada por cada integrante del equipo administrativo.",
    logro: "Respaldo interno y control de cambios en las liquidaciones y parámetros de la empresa.",
    auto: "Registro continuo de auditoría sobre aprobaciones, ajustes y cambios de configuración.",
    img: "/cigo/08-perfil.webp",
  },
  {
    id: "08",
    shortName: "Acceso Privado",
    badge: "ENTORNO PRIVADO LEY N° 29733",
    title: "Entorno Privado por Empresa & Seguridad Cloud",
    desc: "Acceso autenticado con aislamiento por empresa y resguardo en la nube de comprobantes y evidencia fotográfica.",
    logro: "Reserva comercial conforme a la Ley N° 29733: tu información operativa es de titularidad exclusiva de tu empresa.",
    auto: "Almacenamiento cifrado y acceso permanente desde oficina o dispositivo móvil.",
    img: "/cigo/01-login.webp",
  },
];

export default function CigoModulesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextModule = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % MODULES.length);
  }, []);

  const prevModule = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextModule, 9000);
    return () => clearInterval(timer);
  }, [nextModule, isPaused, activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX < -50) nextModule();
      else if (deltaX > 50) prevModule();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  const currentMod = MODULES[activeIndex];

  return (
    <section id="modulos-carousel" className="py-18 sm:py-22 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 px-3.5 py-1 rounded-full">
            <Monitor className="w-3.5 h-3.5" />
            Capturas Reales · Panel Web de Administración
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Explora los 8 Módulos de la Plataforma
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2.5 flex-wrap text-sm text-slate-500">
            <span>Selecciona cualquier módulo o desliza en móvil</span>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                isPaused
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-sky-50 text-sky-700 border-sky-200"
              }`}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {isPaused ? "Reanudar tour" : "Rotación activa"}
            </button>
          </div>
        </div>

        {/* Scrollable Pill Selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 [scrollbar-width:none]">
          {MODULES.map((mod, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative overflow-hidden px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer border transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-slate-900"
                }`}
              >
                <span className={isActive ? "text-sky-400" : "text-slate-400"}>
                  {mod.id}.
                </span>
                <span>{mod.shortName}</span>
                {isActive && !isPaused && (
                  <span
                    key={`bar-${activeIndex}`}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 cigo-progress-bar"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-9"
        >
          <div
            key={currentMod.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cigo-fade-up"
          >
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                  {currentMod.badge}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Módulo <strong className="text-slate-900">{activeIndex + 1}</strong> / {MODULES.length}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-snug">
                {currentMod.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {currentMod.desc}
              </p>

              <div className="space-y-3 pt-1">
                <div className="bg-sky-50/80 border-l-4 border-sky-500 rounded-r-xl p-3.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 mb-0.5">
                    Lo que logrará tu empresa
                  </div>
                  <div className="text-xs font-semibold text-slate-900 leading-relaxed">
                    {currentMod.logro}
                  </div>
                </div>

                <div className="bg-emerald-50/80 border-l-4 border-emerald-500 rounded-r-xl p-3.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 mb-0.5">
                    Proceso que se automatiza
                  </div>
                  <div className="text-xs font-semibold text-slate-900 leading-relaxed">
                    {currentMod.auto}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={prevModule}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-sky-400 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={nextModule}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Browser-Framed Screenshot */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xl bg-slate-950">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    cigo.devorq.com · {currentMod.shortName}
                  </span>
                  <span className="w-10" />
                </div>
                <div className="bg-slate-100">
                  <Image
                    src={currentMod.img}
                    alt={currentMod.title}
                    width={1280}
                    height={720}
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="w-full h-auto max-h-[440px] object-contain block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
