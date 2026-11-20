"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CheckCheck,
  Fuel,
  Mic,
  Play,
  Receipt,
  ShieldCheck,
} from "lucide-react";

type HeroCaseId = "fuel" | "toll" | "audio";

interface HeroCase {
  id: HeroCaseId;
  tab: string;
  plate: string;
  driver: string;
  route: string;
  time: string;
  receiptTitle: string;
  receiptSub: string;
  receiptCode: string;
  receiptAmount: string;
  receiptExtra: string;
  botTitle: string;
  botSummary: string;
  panelCode: string;
  panelVendor: string;
  panelStatus: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  metric3Label: string;
  metric3Value: string;
}

const HERO_CASES: HeroCase[] = [
  {
    id: "fuel",
    tab: "Ticket combustible",
    plate: "V1A-892",
    driver: "Carlos Mendoza",
    route: "Lima — Trujillo",
    time: "10:14",
    receiptTitle: "REPSOL COMBUSTIBLE S.A.",
    receiptSub: "78.4 gal Diésel B5 S-50",
    receiptCode: "F042-0019284",
    receiptAmount: "S/ 1,420.00",
    receiptExtra: "Odómetro: 142,500 km",
    botTitle: "Carga auditada y válida SUNAT",
    botSummary: "Rendimiento 3.84 km/gal · Saldo viático S/ 1,280.00",
    panelCode: "F042-0019284",
    panelVendor: "Repsol Combustible S.A.",
    panelStatus: "Aceptado SUNAT",
    metric1Label: "Rendimiento",
    metric1Value: "3.84 km/gal",
    metric2Label: "IGV recuperable",
    metric2Value: "S/ 216.61",
    metric3Label: "Saldo viaje",
    metric3Value: "S/ 1,280.00",
  },
  {
    id: "toll",
    tab: "Boleta de peaje",
    plate: "B4K-719",
    driver: "Jorge Rojas",
    route: "Chimbote — Piura",
    time: "11:42",
    receiptTitle: "AUTOPISTA DEL NORTE S.A.C.",
    receiptSub: "Peaje Estación Virú · 6 ejes",
    receiptCode: "B001-004892",
    receiptAmount: "S/ 45.00",
    receiptExtra: "RUC 20517933998 · Habido",
    botTitle: "Comprobante validado y único",
    botSummary: "IGV S/ 6.86 listo para SIRE · Saldo S/ 310.00",
    panelCode: "B001-004892",
    panelVendor: "Autopista del Norte S.A.C.",
    panelStatus: "Aceptado SUNAT",
    metric1Label: "Duplicados",
    metric1Value: "0 alertas",
    metric2Label: "IGV recuperable",
    metric2Value: "S/ 6.86",
    metric3Label: "Saldo viaje",
    metric3Value: "S/ 310.00",
  },
  {
    id: "audio",
    tab: "Audio gasto menor",
    plate: "T9M-405",
    driver: "Luis Paredes",
    route: "Arequipa — Matarani",
    time: "18:05",
    receiptTitle: "NOTA DE VOZ TRANSCRITA",
    receiptSub: "“Cochera S/ 20 y parchado S/ 25”",
    receiptCode: "MOV-0084",
    receiptAmount: "S/ 45.00",
    receiptExtra: "0:08 · Audio WhatsApp",
    botTitle: "Gasto menor en planilla",
    botSummary: "2 conceptos registrados · Saldo S/ 640.00",
    panelCode: "MOV-0084",
    panelVendor: "Planilla de Movilidad (2 ítems)",
    panelStatus: "Aprobado interno",
    metric1Label: "Digitación",
    metric1Value: "0 minutos",
    metric2Label: "Total gasto",
    metric2Value: "S/ 45.00",
    metric3Label: "Saldo viaje",
    metric3Value: "S/ 640.00",
  },
];

const WAVEFORM_HEIGHT_CLASSES = [
  "h-2",
  "h-4",
  "h-6",
  "h-3",
  "h-5",
  "h-6",
  "h-4",
  "h-2.5",
  "h-5",
  "h-6",
  "h-3.5",
  "h-4",
  "h-3",
  "h-5",
  "h-4",
  "h-2.5",
  "h-4.5",
  "h-3",
];

export default function CigoHeroCockpit() {
  const [activeId, setActiveId] = useState<HeroCaseId>("fuel");
  const current = HERO_CASES.find((c) => c.id === activeId) ?? HERO_CASES[0];

  const renderTabIcon = (id: HeroCaseId) => {
    if (id === "fuel") return <Fuel className="w-3.5 h-3.5" strokeWidth={2} />;
    if (id === "toll") return <Receipt className="w-3.5 h-3.5" strokeWidth={2} />;
    return <Mic className="w-3.5 h-3.5" strokeWidth={2} />;
  };

  return (
    <div className="space-y-4">
      {/* Interactive Scenario Selector (Matches CIGO Navy + Signature Teal) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          className="inline-flex flex-wrap items-center gap-1.5 bg-[#111C2F] border border-[#24344D] p-1 rounded-lg"
          role="tablist"
          aria-label="Ejemplos reales en carretera"
        >
          {HERO_CASES.map((item) => {
            const active = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? "bg-[#14B8A6] text-[#0B1320]"
                    : "text-[#CBD5E1] hover:text-white hover:bg-[#1A2942]"
                }`}
              >
                {renderTabIcon(item.id)}
                <span>{item.tab}</span>
              </button>
            );
          })}
        </div>
        <span className="font-cigo-mono text-[11px] text-[#94A3B8]">
          Haz clic para probar cada flujo
        </span>
      </div>

      {/* Visual Product Bridge: Real Smartphone WhatsApp -> Real CIGO Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* LEFT (5 cols): Realistic Smartphone Running WhatsApp */}
        <div className="md:col-span-5 bg-[#1B2638] p-2 rounded-[26px] border border-[#30415C] shadow-xl flex flex-col">
          <div className="rounded-[20px] overflow-hidden bg-[#EFEAE2] flex-1 flex flex-col">
            {/* Phone Status + Authentic WhatsApp Header */}
            <div className="bg-[#075E54] text-white px-3.5 pt-2.5 pb-2.5">
              <div className="flex items-center justify-between text-[10px] text-emerald-100/80 font-cigo-mono mb-1.5">
                <span>{current.time}</span>
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#14B8A6] text-[#0B1320] font-cigo-display font-extrabold text-[11px] flex items-center justify-center shrink-0">
                  CIGO
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold leading-tight truncate">
                    CIGO Flotas
                  </div>
                  <div className="text-[10px] text-[#A7F3D0] truncate">
                    {current.driver} · {current.plate}
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic WhatsApp Chat Body */}
            <div
              key={`phone-${current.id}`}
              className="cigo-wa-bg p-3 flex-1 flex flex-col justify-between gap-2.5 cigo-swap"
            >
              {/* Outgoing Driver Message Bubble (Photo Ticket or Audio Player) */}
              <div className="self-end w-[92%] bg-[#D9FDD3] rounded-lg rounded-tr-none p-2 shadow-xs text-[#111B21]">
                {current.id === "audio" ? (
                  <div className="space-y-2 p-1">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </span>
                      <div className="flex-1 flex items-center gap-[2px] h-7" aria-hidden="true">
                        {WAVEFORM_HEIGHT_CLASSES.map((heightCls, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded-full bg-[#075E54]/65 ${heightCls}`}
                          />
                        ))}
                      </div>
                      <span className="font-cigo-mono text-[10px] text-[#54656F]">
                        0:08
                      </span>
                    </div>
                    <p className="text-[11px] text-[#1F2937] italic leading-snug">
                      {current.receiptSub}
                    </p>
                  </div>
                ) : (
                  /* Realistic Miniature Thermal Receipt Card inside WhatsApp Photo Bubble */
                  <div className="bg-white border border-dashed border-[#CBD5E1] rounded-md p-2.5 text-[#0F172A] mb-1.5">
                    <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-dashed border-[#CBD5E1]">
                      <span className="text-[10px] font-bold tracking-tight truncate">
                        {current.receiptTitle}
                      </span>
                      <span className="font-cigo-mono text-[9px] text-[#0F766E] font-semibold shrink-0">
                        {current.receiptCode}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#475569] leading-snug">
                      {current.receiptSub}
                    </div>
                    <div className="flex items-baseline justify-between mt-1.5 pt-1 border-t border-[#F1F5F9]">
                      <span className="font-cigo-mono text-[9px] text-[#64748B]">
                        {current.receiptExtra}
                      </span>
                      <span className="font-cigo-mono text-xs font-bold text-[#0F172A]">
                        {current.receiptAmount}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 text-[10px] text-[#54656F]">
                  <span>{current.time}</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" strokeWidth={2.25} />
                </div>
              </div>

              {/* Incoming Instant CIGO Bot Reply */}
              <div className="self-start w-[94%] bg-white rounded-lg rounded-tl-none p-2.5 shadow-xs text-[#0F172A]">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0F766E] mb-1">
                  <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                  <span>{current.botTitle}</span>
                </div>
                <p className="text-[11px] text-[#334155] leading-snug">
                  {current.botSummary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (7 cols): Real Synced CIGO Panel Card (Matches 02-dashboard & 04-comprobantes) */}
        <div className="md:col-span-7 bg-white text-[#0F172A] rounded-2xl border border-[#CBD5E1] shadow-xl overflow-hidden flex flex-col justify-between">
          <div>
            {/* CIGO Panel Header */}
            <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
                  Panel CIGO
                </span>
                <span className="font-cigo-mono text-[11px] text-[#475569] truncate">
                  {current.plate} · {current.route}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0F766E] shrink-0">
                <ArrowRight className="w-3 h-3" />
                En vivo
              </span>
            </div>

            {/* Synced Comprobante Entry (Exact style of 04-comprobantes.webp) */}
            <div key={`panel-${current.id}`} className="p-4 space-y-3.5 cigo-swap">
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-cigo-mono text-xs font-bold text-[#0D9488]">
                      {current.panelCode}
                    </span>
                    <span className="text-xs font-bold text-[#0F172A] truncate">
                      {current.panelVendor}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Chofer: {current.driver} · Registrado por WhatsApp
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-cigo-mono text-sm font-bold text-[#0F172A]">
                    {current.receiptAmount}
                  </span>
                  <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full">
                    {current.panelStatus}
                  </span>
                </div>
              </div>

              {/* 3 CIGO Live Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-[#E2E8F0] p-2.5 bg-white">
                  <div className="text-[10px] font-medium text-[#64748B]">
                    {current.metric1Label}
                  </div>
                  <div className="font-cigo-mono text-sm font-bold text-[#0F172A] mt-0.5">
                    {current.metric1Value}
                  </div>
                </div>
                <div className="rounded-lg border border-[#E2E8F0] p-2.5 bg-white">
                  <div className="text-[10px] font-medium text-[#64748B]">
                    {current.metric2Label}
                  </div>
                  <div className="font-cigo-mono text-sm font-bold text-[#0D9488] mt-0.5">
                    {current.metric2Value}
                  </div>
                </div>
                <div className="rounded-lg border border-[#E2E8F0] p-2.5 bg-white">
                  <div className="text-[10px] font-medium text-[#64748B]">
                    {current.metric3Label}
                  </div>
                  <div className="font-cigo-mono text-sm font-bold text-[#0F172A] mt-0.5">
                    {current.metric3Value}
                  </div>
                </div>
              </div>

              {/* Real CIGO Dashboard Preview */}
              <div className="rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
                <Image
                  src="/cigo/02-dashboard.webp"
                  alt="Captura real del panel gerencial de CIGO"
                  width={1037}
                  height={720}
                  priority
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="w-full h-36 sm:h-40 object-cover object-top block"
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Exportación contable:</span>
            <span className="font-cigo-mono text-[#0F766E] font-medium">
              Excel · Liquidación · SIRE TXT · ZIP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
