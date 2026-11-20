"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, FileSpreadsheet, Fuel, Mic, Receipt } from "lucide-react";

interface DispatchEvent {
  id: string;
  tabLabel: string;
  plate: string;
  driver: string;
  route: string;
  sentAt: string;
  channelType: string;
  driverInput: string;
  rows: { label: string; value: string; mono?: boolean; verified?: boolean }[];
  kpiLabel: string;
  kpiValue: string;
  balanceLeft: string;
  icon: "fuel" | "toll" | "audio";
}

const DISPATCH_EVENTS: DispatchEvent[] = [
  {
    id: "fuel",
    tabLabel: "Combustible",
    plate: "V1A-892",
    driver: "Carlos Mendoza",
    route: "Lima — Trujillo",
    sentAt: "10:14",
    channelType: "Foto de ticket y odómetro por WhatsApp",
    driverInput: "Repsol Km 312 · 78.4 gal Diésel B5 + foto tablero 142,500 km",
    rows: [
      { label: "Emisor", value: "Repsol Combustible S.A." },
      { label: "Comprobante", value: "F042-0019284 · RUC 20503840121", mono: true },
      { label: "Importe", value: "S/ 1,420.00 (78.4 gal)", mono: true },
      { label: "Validación SUNAT", value: "Aceptado · Activo y Habido", verified: true },
    ],
    kpiLabel: "Rendimiento calculado",
    kpiValue: "3.84 km/gal",
    balanceLeft: "S/ 1,280.00",
    icon: "fuel",
  },
  {
    id: "toll",
    tabLabel: "Peaje SUNAT",
    plate: "B4K-719",
    driver: "Jorge Rojas",
    route: "Chimbote — Piura",
    sentAt: "11:42",
    channelType: "Foto de boleta electrónica por WhatsApp",
    driverInput: "Boleta Peaje Autopista del Norte · Estación Virú",
    rows: [
      { label: "Emisor", value: "Autopista del Norte S.A.C." },
      { label: "Comprobante", value: "B001-004892", mono: true },
      { label: "Importe", value: "S/ 45.00 (IGV S/ 6.86)", mono: true },
      { label: "Control fiscal", value: "Único en base · Listo para SIRE", verified: true },
    ],
    kpiLabel: "Estado de liquidación",
    kpiValue: "92% rendido",
    balanceLeft: "S/ 310.00",
    icon: "toll",
  },
  {
    id: "audio",
    tabLabel: "Nota de voz",
    plate: "T9M-405",
    driver: "Luis Paredes",
    route: "Arequipa — Matarani",
    sentAt: "18:05",
    channelType: "Audio de WhatsApp transcrito por IA",
    driverInput: "“Pagué 20 soles de cochera en Matarani y 25 de parchado de llanta.”",
    rows: [
      { label: "Clasificación", value: "Planilla de Movilidad y Gastos Menores" },
      { label: "Registros", value: "Cochera S/ 20.00 · Llanta S/ 25.00", mono: true },
      { label: "Total gasto", value: "S/ 45.00", mono: true },
      { label: "Trazabilidad", value: "Vinculado al viaje activo", verified: true },
    ],
    kpiLabel: "Digitación manual",
    kpiValue: "0 minutos",
    balanceLeft: "S/ 640.00",
    icon: "audio",
  },
];

export default function CigoHeroCockpit() {
  const [selectedId, setSelectedId] = useState<string>(DISPATCH_EVENTS[0].id);
  const current =
    DISPATCH_EVENTS.find((ev) => ev.id === selectedId) ?? DISPATCH_EVENTS[0];

  const renderIcon = (kind: DispatchEvent["icon"]) => {
    if (kind === "fuel") return <Fuel className="w-4 h-4" strokeWidth={1.75} />;
    if (kind === "toll") return <Receipt className="w-4 h-4" strokeWidth={1.75} />;
    return <Mic className="w-4 h-4" strokeWidth={1.75} />;
  };

  return (
    <div className="bg-white border border-[#D8D6CE] rounded-xl overflow-hidden shadow-[0_18px_40px_-24px_rgba(20,24,29,0.22)]">
      {/* Top Dispatch Selector Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#F0EFE9] border-b border-[#D8D6CE]">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Ejemplos de reporte en ruta">
          {DISPATCH_EVENTS.map((ev) => {
            const active = ev.id === current.id;
            return (
              <button
                key={ev.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedId(ev.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? "bg-[#14181D] text-white"
                    : "text-[#4E5661] hover:text-[#14181D] hover:bg-white/80"
                }`}
              >
                {renderIcon(ev.icon)}
                <span>{ev.tabLabel}</span>
                <span
                  className={`font-cigo-mono text-[11px] ${
                    active ? "text-[#A7B2C2]" : "text-[#717B88]"
                  }`}
                >
                  {ev.plate}
                </span>
              </button>
            );
          })}
        </div>

        <span className="font-cigo-mono text-[11px] text-[#5B6470]">
          Ejemplo interactivo de ingreso en ruta
        </span>
      </div>

      {/* Main 12-Col Workbench: Left Live Ledger + Right Real CIGO Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Structured Route Entry */}
        <div
          key={current.id}
          className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#E4E2DA] flex flex-col justify-between gap-5 cigo-swap"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#ECEAE3]">
              <div>
                <div className="font-cigo-mono text-xs font-semibold text-[#0A58CA]">
                  {current.plate} — {current.route}
                </div>
                <div className="text-sm font-semibold text-[#14181D] mt-0.5">
                  {current.driver}
                </div>
              </div>
              <span className="font-cigo-mono text-xs text-[#5B6470] bg-[#F6F5F1] border border-[#E4E2DA] px-2 py-0.5 rounded">
                {current.sentAt}
              </span>
            </div>

            <div className="bg-[#F6F5F1] border border-[#E4E2DA] rounded-lg p-3.5">
              <div className="text-[11px] font-medium text-[#5B6470] mb-1">
                {current.channelType}
              </div>
              <div className="text-sm font-medium text-[#14181D] leading-snug">
                {current.driverInput}
              </div>
            </div>

            <dl className="divide-y divide-[#ECEAE3] text-xs">
              {current.rows.map((row) => (
                <div
                  key={row.label}
                  className="py-2.5 flex items-baseline justify-between gap-3"
                >
                  <dt className="text-[#5B6470] shrink-0">{row.label}</dt>
                  <dd
                    className={`text-right font-medium ${
                      row.verified
                        ? "text-[#147A4B] inline-flex items-center gap-1 font-semibold"
                        : row.mono
                        ? "font-cigo-mono text-[#14181D]"
                        : "text-[#14181D]"
                    }`}
                  >
                    {row.verified && <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />}
                    <span>{row.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E4E2DA]">
            <div>
              <div className="text-[11px] text-[#5B6470]">{current.kpiLabel}</div>
              <div className="font-cigo-display text-lg font-bold text-[#14181D] cigo-tabular mt-0.5">
                {current.kpiValue}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-[#5B6470]">Saldo viático restante</div>
              <div className="font-cigo-mono text-lg font-semibold text-[#147A4B] mt-0.5">
                {current.balanceLeft}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real Uncropped CIGO Web Dashboard */}
        <div className="lg:col-span-7 bg-[#FAF9F6] p-4 sm:p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between gap-3 text-xs text-[#5B6470]">
            <span className="font-medium text-[#14181D]">
              Vista real del panel web de administración
            </span>
            <span className="font-cigo-mono text-[11px] text-[#5B6470]">
              cigo.devorq.com
            </span>
          </div>

          <div className="rounded-lg border border-[#D8D6CE] overflow-hidden bg-white">
            <Image
              src="/cigo/02-dashboard.webp"
              alt="Panel web real de CIGO mostrando control de combustible, viáticos y comprobantes"
              width={1037}
              height={720}
              priority
              sizes="(max-width: 1024px) 100vw, 720px"
              className="w-full h-auto block"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-[#4E5661]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#14181D]">
              <FileSpreadsheet className="w-4 h-4 text-[#0A58CA]" strokeWidth={1.75} />
              Listo para contabilidad:
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-cigo-mono text-[11px] text-[#4E5661]">
              <span>Excel (.xlsx)</span>
              <span>Liquidación por viaje</span>
              <span>TXT SIRE SUNAT</span>
              <span>Evidencias (.zip)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
