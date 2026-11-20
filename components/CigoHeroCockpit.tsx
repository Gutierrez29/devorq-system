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
  previewImg: string;
  previewWidth: number;
  previewHeight: number;
  previewAlt: string;
  previewLabel: string;
}

const HERO_CASES: HeroCase[] = [
  {
    id: "fuel",
    tab: "Ticket combustible",
    plate: "V5C-892",
    driver: "Carlos Mendoza",
    route: "Lima — Huancayo",
    time: "10:14",
    receiptTitle: "ESTACIÓN DE SERVICIOS SAN JOSÉ",
    receiptSub: "100 gal Diésel B5 S-50 UV · Orden de crédito",
    receiptCode: "425045",
    receiptAmount: "S/ 2,425.00",
    receiptExtra: "Odómetro: 51,408 km · 80%",
    botTitle: "Carga auditada y registrada",
    botSummary: "100 gal a S/ 24.25 · Alerta Ley 28194 (voucher bancario)",
    panelCode: "#2611-004",
    panelVendor: "Estación de Servicios San José",
    panelStatus: "Aprobado · Ley 28194",
    metric1Label: "Combustible",
    metric1Value: "100.0 gal",
    metric2Label: "Validación SUNAT",
    metric2Value: "94% al día",
    metric3Label: "Importe",
    metric3Value: "S/ 2,425.00",
    previewImg: "/cigo/screens/01-dashboard.webp",
    previewWidth: 972,
    previewHeight: 867,
    previewAlt: "Panel de Control Analítico real de CIGO con indicadores SUNAT y gastos por categoría",
    previewLabel: "Panel de Control Analítico",
  },
  {
    id: "toll",
    tab: "Expediente OCR + SUNAT",
    plate: "V5C-892",
    driver: "Jorge Rojas",
    route: "Trujillo — Lima",
    time: "11:42",
    receiptTitle: "COMPROBANTE EN RUTA",
    receiptSub: "Lectura OCR de ítems, galones y precio unitario",
    receiptCode: "N° 425045",
    receiptAmount: "S/ 2,425.00",
    receiptExtra: "Bancarización Ley 28194",
    botTitle: "Expediente con foto archivado",
    botSummary: "Desglose automático y solicitud de voucher bancarizado",
    panelCode: "EXP-425045",
    panelVendor: "Expediente de Gasto + OCR",
    panelStatus: "Requiere Voucher",
    metric1Label: "Ítem extraído",
    metric1Value: "Diésel B5",
    metric2Label: "Precio unit.",
    metric2Value: "S/ 24.25/gal",
    metric3Label: "Ley 28194",
    metric3Value: ">= S/ 2,000",
    previewImg: "/cigo/screens/06-expediente-gasto.webp",
    previewWidth: 1024,
    previewHeight: 746,
    previewAlt: "Expediente de gasto real de CIGO comparando foto del vale físico con desglose OCR y alerta de bancarización",
    previewLabel: "Expediente OCR + Bancarización",
  },
  {
    id: "audio",
    tab: "Odómetro y Bot en vivo",
    plate: "VBH-737",
    driver: "Luis Paredes",
    route: "Arequipa — Cusco",
    time: "13:43",
    receiptTitle: "TABLERO DIGITAL / AUDIO",
    receiptSub: "“Llegué a Arequipa: tablero en 51,408 km y 80% de tanque.”",
    receiptCode: "VJ-261119",
    receiptAmount: "51,408 km",
    receiptExtra: "0:08 · Bot WhatsApp IA",
    botTitle: "Lectura detectada: 51,408 km",
    botSummary: "Combustible 80% · Botones: Cerrar Ruta / Control en Ruta",
    panelCode: "VJ-261119",
    panelVendor: "Consola WhatsApp en Vivo",
    panelStatus: "En curso",
    metric1Label: "Odómetro IA",
    metric1Value: "51,408 km",
    metric2Label: "Nivel tanque",
    metric2Value: "80% lleno",
    metric3Label: "Auto-despacho",
    metric3Value: "WhatsApp",
    previewImg: "/cigo/screens/03-consola-whatsapp.webp",
    previewWidth: 1024,
    previewHeight: 456,
    previewAlt: "Consola WhatsApp real de CIGO leyendo foto del tablero digital de un camión en ruta",
    previewLabel: "Consola WhatsApp + Lectura IA",
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
          Haz clic para ver cada pantalla real
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

        {/* RIGHT (7 cols): Real Synced CIGO Panel Card with Live Production Screenshot */}
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

            {/* Synced Comprobante Entry + Real Production Screen */}
            <div key={`panel-${current.id}`} className="p-4 space-y-3 cigo-swap">
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
                    {current.previewLabel} · Registrado desde WhatsApp
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full shrink-0">
                  {current.panelStatus}
                </span>
              </div>

              {/* 3 Live CIGO Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-[#E2E8F0] p-2.5 bg-white">
                  <div className="text-[10px] font-medium text-[#64748B]">
                    {current.metric1Label}
                  </div>
                  <div className="font-cigo-mono text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
                    {current.metric1Value}
                  </div>
                </div>
                <div className="rounded-lg border border-[#E2E8F0] p-2.5 bg-white">
                  <div className="text-[10px] font-medium text-[#64748B]">
                    {current.metric2Label}
                  </div>
                  <div className="font-cigo-mono text-xs sm:text-sm font-bold text-[#0D9488] mt-0.5">
                    {current.metric2Value}
                  </div>
                </div>
                <div className="rounded-lg border border-[#E2E8F0] p-2.5 bg-white">
                  <div className="text-[10px] font-medium text-[#64748B]">
                    {current.metric3Label}
                  </div>
                  <div className="font-cigo-mono text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
                    {current.metric3Value}
                  </div>
                </div>
              </div>

              {/* Real New Production CIGO Screenshot */}
              <div className="rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={current.previewImg}
                  alt={current.previewAlt}
                  width={current.previewWidth}
                  height={current.previewHeight}
                  priority
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="w-full h-40 sm:h-44 object-cover object-top block"
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Exportación contable:</span>
            <span className="font-cigo-mono text-[#0F766E] font-medium">
              Liquidación · Excel · SIRE 8.4 · ZIP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
