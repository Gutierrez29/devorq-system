"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Truck,
  Fuel,
  ShieldCheck,
  Mic,
  Receipt,
  CheckCircle2,
  Gauge,
  FileSpreadsheet,
  MapPin,
  Sparkles,
} from "lucide-react";

interface LiveScenario {
  id: string;
  label: string;
  driver: string;
  plate: string;
  route: string;
  routeProgress: number;
  waMessage: string;
  waSub: string;
  aiExtract: string;
  sunatStatus: string;
  kpiLabel: string;
  kpiValue: string;
  kpiBadge: string;
  balanceAfter: string;
  icon: "fuel" | "toll" | "audio";
}

const SCENARIOS: LiveScenario[] = [
  {
    id: "fuel",
    label: "Combustible",
    driver: "Carlos M.",
    plate: "V1A-892",
    route: "Lima → Trujillo",
    routeProgress: 64,
    waMessage: "Foto Ticket Repsol + Tablero Odómetro",
    waSub: "78.4 gal Diésel B5 · S/ 1,420.00 · 142,500 km",
    aiExtract: "RUC 20503840121 · Factura F042-0019284",
    sunatStatus: "SUNAT Aceptado · RUC Activo y Habido",
    kpiLabel: "Rendimiento real",
    kpiValue: "3.84 km/gal",
    kpiBadge: "Dentro de meta",
    balanceAfter: "S/ 1,280.00",
    icon: "fuel",
  },
  {
    id: "toll",
    label: "Peaje & Viáticos",
    driver: "Jorge R.",
    plate: "B4K-719",
    route: "Chimbote → Piura",
    routeProgress: 82,
    waMessage: "Foto Boleta Peaje Autopista del Norte",
    waSub: "Boleta B001-004892 · S/ 45.00 (IGV S/ 6.86)",
    aiExtract: "Control duplicado: comprobante único",
    sunatStatus: "Validado en vivo · Listo para SIRE TXT",
    kpiLabel: "Liquidación viaje",
    kpiValue: "92% rendido",
    kpiBadge: "Sin observaciones",
    balanceAfter: "S/ 310.00",
    icon: "toll",
  },
  {
    id: "audio",
    label: "Nota de Voz IA",
    driver: "Luis P.",
    plate: "T9M-405",
    route: "Arequipa → Matarani",
    routeProgress: 45,
    waMessage: 'Audio: "Cochera S/ 20 y parchado S/ 25"',
    waSub: "Transcrito automáticamente desde WhatsApp",
    aiExtract: "2 egresos menores -> Planilla de Movilidad",
    sunatStatus: "Registrado con fecha y hora de ruta",
    kpiLabel: "Tiempo de cierre",
    kpiValue: "Al instante",
    kpiBadge: "0 digitación manual",
    balanceAfter: "S/ 640.00",
    icon: "audio",
  },
];

export default function CigoHeroCockpit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const current = SCENARIOS[activeIndex];

  const renderScenarioIcon = (type: LiveScenario["icon"]) => {
    if (type === "fuel") return <Fuel className="w-4 h-4 text-sky-400" />;
    if (type === "toll") return <Receipt className="w-4 h-4 text-emerald-400" />;
    return <Mic className="w-4 h-4 text-violet-400" />;
  };

  return (
    <div
      className="relative w-full max-w-[580px] mx-auto lg:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle Ambient Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-emerald-500/20 blur-2xl opacity-80"
      />

      {/* Main Command-Center Glass Frame */}
      <div className="relative rounded-2xl border border-sky-400/25 bg-slate-950/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Window Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/90 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-[11px] font-mono font-semibold text-slate-400">
              cigo.devorq.com · Flota en Vivo
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
            <span className="radar-live" />
            Tiempo real
          </span>
        </div>

        {/* Interactive Scenario Switcher Pills */}
        <div className="px-4 pt-3.5 pb-2 flex items-center gap-1.5 overflow-x-auto">
          {SCENARIOS.map((sc, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  active
                    ? "bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-sm"
                    : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {renderScenarioIcon(sc.icon)}
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Telemetry Body */}
        <div key={current.id} className="p-4 space-y-3.5 cigo-fade-up">
          {/* 1. Active Route Telemetry Strip */}
          <div className="rounded-xl bg-slate-900/85 border border-slate-800 p-3.5">
            <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
              <div className="flex items-center gap-2 font-bold text-white">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400">
                  <Truck className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span>Tracto {current.plate}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      · {current.driver}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-sky-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {current.route}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Saldo viático
                </div>
                <div className="text-sm font-black font-mono text-emerald-400">
                  {current.balanceAfter}
                </div>
              </div>
            </div>

            {/* Animated SVG Route Progress Track */}
            <div className="relative h-5 flex items-center">
              <svg
                viewBox="0 0 400 20"
                className="w-full h-5 overflow-visible"
                aria-hidden="true"
              >
                <line
                  x1="6"
                  y1="10"
                  x2="394"
                  y2="10"
                  stroke="#1E293B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="10"
                  x2={Math.round(6 + (388 * current.routeProgress) / 100)}
                  y2="10"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="cigo-route-dash"
                />
                <circle cx="6" cy="10" r="4" fill="#38BDF8" />
                <circle
                  cx={Math.round(6 + (388 * current.routeProgress) / 100)}
                  cy="10"
                  r="5.5"
                  fill="#10B981"
                  stroke="#022C22"
                  strokeWidth="2"
                />
                <circle cx="394" cy="10" r="4" fill="#475569" />
              </svg>
            </div>
          </div>

          {/* 2. Live Pipeline: WhatsApp Driver -> AI/SUNAT Engine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
            {/* Step A: Driver WhatsApp Report */}
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  1. Reporte WhatsApp
                </span>
                <span className="text-[10px] font-mono text-emerald-300/80">
                  Hace 2s
                </span>
              </div>
              <div className="text-xs font-bold text-white leading-snug">
                {current.waMessage}
              </div>
              <div className="text-[11px] text-slate-300 leading-snug">
                {current.waSub}
              </div>
            </div>

            {/* Step B: AI + SUNAT Auto-Verification */}
            <div className="rounded-xl bg-sky-950/40 border border-sky-400/30 p-3 space-y-1.5 relative overflow-hidden">
              {/* Shimmering analysis beam */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-400/15 to-transparent cigo-beam"
              />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  2. IA + SUNAT
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white leading-snug relative z-10">
                {current.aiExtract}
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold leading-snug relative z-10">
                {current.sunatStatus}
              </div>
            </div>
          </div>

          {/* 3. Real Panel Web Preview + Live KPI Readout */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-44 h-24 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 shrink-0 relative">
              <Image
                src="/cigo/02-dashboard.webp"
                alt="Vista real del Panel Gerencial CIGO"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 176px"
                className="object-cover object-top"
              />
              <span className="absolute bottom-1.5 left-1.5 z-10 text-[9px] font-bold bg-slate-950/85 text-sky-300 px-1.5 py-0.5 rounded border border-sky-400/30">
                Panel Web Real
              </span>
            </div>

            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-sky-400" />
                  {current.kpiLabel}
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full">
                  {current.kpiBadge}
                </span>
              </div>
              <div className="text-xl font-black text-white tracking-tight">
                {current.kpiValue}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-slate-300">
                <span className="inline-flex items-center gap-1 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  SUNAT OK
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
                  <FileSpreadsheet className="w-3 h-3 text-sky-400" />
                  Excel + SIRE + ZIP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Floating Telemetry Pill (Desktop only, non-intrusive) */}
      <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-emerald-400/30 shadow-xl absolute -bottom-5 -left-6 badge-float-1">
        <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4" />
        </span>
        <div>
          <div className="text-[11px] font-extrabold text-white leading-tight">
            0 Boletas Duplicadas
          </div>
          <div className="text-[10px] text-slate-400">
            Validación automática de serie y RUC
          </div>
        </div>
      </div>
    </div>
  );
}
