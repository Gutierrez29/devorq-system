"use client";

import { useState, useEffect, useRef } from "react";
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

const REGISTER_URL = "https://cigo.devorq.com/registro";

type ChatTab = "combustible" | "audio" | "peaje";

interface SimulationScenario {
  id: ChatTab;
  label: string;
  driverHeader: string;
  sentTime: string;
  receiptVendor: string;
  receiptSeries: string;
  receiptDetail: string;
  receiptTotal: string;
  receiptMeta: string;
  audioCaption?: string;
  analyzingText: string;
  botTitle: string;
  botLines: string[];
  ledgerFields: { field: string; value: string; mono?: boolean; tone?: "teal" | "navy" }[];
}

const SCENARIOS: Record<ChatTab, SimulationScenario> = {
  combustible: {
    id: "combustible",
    label: "Combustible + Odómetro",
    driverHeader: "Carlos Mendoza · V1A-892",
    sentTime: "10:14",
    receiptVendor: "REPSOL COMBUSTIBLE S.A.",
    receiptSeries: "F042-0019284",
    receiptDetail: "78.4 gal Diésel B5 S-50 + foto tablero",
    receiptTotal: "S/ 1,420.00",
    receiptMeta: "Odómetro leído: 142,500 km",
    analyzingText: "Leyendo comprobante y calculando Km/galón...",
    botTitle: "Carga registrada y validada en SUNAT",
    botLines: [
      "Proveedor: Repsol Combustible S.A.",
      "Carga: 78.4 gal Diésel B5 (S/ 1,420.00)",
      "Rendimiento: 3.84 km/gal (óptimo)",
      "Saldo restante de viático: S/ 1,280.00",
    ],
    ledgerFields: [
      { field: "Tracto y chofer", value: "V1A-892 / Carlos Mendoza", mono: true },
      { field: "Emisor y RUC", value: "Repsol S.A. · 20503840121", mono: true },
      { field: "Comprobante", value: "Factura F042-0019284", mono: true },
      { field: "Abastecimiento", value: "78.4 gal · S/ 1,420.00", mono: true },
      { field: "IGV recuperable (18%)", value: "S/ 216.61", mono: true, tone: "teal" },
      { field: "Rendimiento real", value: "3.84 km/gal (en meta)", mono: true, tone: "teal" },
      { field: "Validación SUNAT", value: "Aceptado · RUC Activo y Habido", tone: "teal" },
      { field: "Saldo de viaje", value: "S/ 1,280.00", mono: true, tone: "navy" },
    ],
  },
  audio: {
    id: "audio",
    label: "Nota de voz en ruta",
    driverHeader: "Carlos Mendoza · V1A-892",
    sentTime: "19:22",
    receiptVendor: "AUDIO WHATSAPP",
    receiptSeries: "MOV-0084",
    receiptDetail: "Gasto menor sin boleta",
    receiptTotal: "S/ 20.00",
    receiptMeta: "Duración 0:06",
    audioCaption: "“Pagué 20 soles de cochera en Chimbote para pernoctar.”",
    analyzingText: "Transcribiendo nota de voz...",
    botTitle: "Gasto menor registrado en planilla",
    botLines: [
      "Concepto: Cochera / Pernocte en Chimbote",
      "Monto extraído: S/ 20.00",
      "Destino: Planilla de Movilidad CIGO",
      "Estado: Listo para liquidación de viaje",
    ],
    ledgerFields: [
      { field: "Tracto y chofer", value: "V1A-892 / Carlos Mendoza", mono: true },
      { field: "Canal", value: "Nota de voz WhatsApp transcrita" },
      { field: "Concepto", value: "Cochera / Pernocte en Chimbote" },
      { field: "Monto", value: "S/ 20.00", mono: true },
      { field: "Clasificación", value: "Planilla de Movilidad (sin comprobante)" },
      { field: "Regla de empresa", value: "Dentro del tope diario configurado", tone: "teal" },
      { field: "Exportación", value: "Liquidación por viaje (.xlsx)", tone: "navy" },
    ],
  },
  peaje: {
    id: "peaje",
    label: "Peaje validado SUNAT",
    driverHeader: "Carlos Mendoza · V1A-892",
    sentTime: "13:08",
    receiptVendor: "AUTOPISTA DEL NORTE S.A.C.",
    receiptSeries: "B001-004892",
    receiptDetail: "Peaje Estación Virú · 6 ejes",
    receiptTotal: "S/ 45.00",
    receiptMeta: "IGV incluido: S/ 6.86",
    analyzingText: "Consultando comprobante ante SUNAT...",
    botTitle: "Comprobante validado y archivado",
    botLines: [
      "Comprobante: B001-004892",
      "Monto: S/ 45.00 (IGV S/ 6.86)",
      "Estado SUNAT: Aceptado (Activo y Habido)",
      "Control duplicado: comprobante único",
    ],
    ledgerFields: [
      { field: "Tracto y chofer", value: "V1A-892 / Carlos Mendoza", mono: true },
      { field: "Emisor", value: "Autopista del Norte S.A.C." },
      { field: "Comprobante", value: "Boleta B001-004892", mono: true },
      { field: "Total e IGV", value: "S/ 45.00 (IGV S/ 6.86)", mono: true },
      { field: "Validación SUNAT", value: "Aceptado · Activo y Habido", tone: "teal" },
      { field: "Control duplicados", value: "Único en base de datos", tone: "teal" },
      { field: "Exportación", value: "TXT SIRE Compras + foto en ZIP", tone: "navy" },
    ],
  },
};

const ROLLOUT_SEQUENCE = [
  {
    step: "1",
    timing: "5 minutos",
    title: "Creas tu cuenta y cargas tus placas",
    desc: "Activas tu prueba gratuita de 7 días sin tarjeta y registras tus camiones y números de WhatsApp de tus choferes.",
  },
  {
    step: "2",
    timing: "Día 1 en carretera",
    title: "Tus choferes reportan por su WhatsApp",
    desc: "Cero apps nuevas ni contraseñas. Envían fotos de tickets, tablero de odómetro o audios incluso tras zonas sin señal.",
  },
  {
    step: "3",
    timing: "Cierre en minutos",
    title: "Operaciones audita y Contabilidad exporta",
    desc: "Control continuo de Km/galón y saldos de viáticos; descarga en 1 clic de Excel, liquidación, SIRE TXT y carpeta ZIP.",
  },
] as const;

const AUDIO_HEIGHT_CLASSES = [
  "h-2",
  "h-4",
  "h-5",
  "h-3",
  "h-6",
  "h-4",
  "h-2.5",
  "h-5",
  "h-4",
  "h-3",
  "h-5",
  "h-6",
  "h-3.5",
  "h-4",
  "h-2.5",
  "h-5",
  "h-4",
  "h-3",
  "h-4.5",
  "h-2",
];

export default function CigoWhatsAppDemo() {
  const [activeTab, setActiveTab] = useState<ChatTab>("combustible");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSwitchTab = (tab: ChatTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setIsAnalyzing(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsAnalyzing(false);
    }, 360);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const current = SCENARIOS[activeTab];

  return (
    <section
      id="whatsapp-feature"
      className="py-20 sm:py-24 px-5 sm:px-8 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
              Así de simple lo usa tu chofer en WhatsApp y así llega a tu oficina.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#475569] leading-relaxed">
              Si tu conductor sabe mandar una foto o un audio por WhatsApp, ya sabe usar CIGO. Prueba los 3 escenarios reales:
            </p>
          </div>
        </div>

        {/* Scenario Switcher */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Casos de reporte por WhatsApp"
        >
          {(
            [
              { id: "combustible", label: "Combustible + Odómetro", icon: Fuel },
              { id: "audio", label: "Nota de voz en ruta", icon: Mic },
              { id: "peaje", label: "Peaje validado SUNAT", icon: Receipt },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleSwitchTab(item.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                  active
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white text-[#334155] border-[#CBD5E1] hover:border-[#0D9488] hover:text-[#0F172A]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${active ? "text-[#14B8A6]" : "text-[#0D9488]"}`}
                  strokeWidth={2}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main 12-Col Split: Authentic Smartphone Frame + Structured CIGO Record */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left 5 cols: Full-Size Crisp Smartphone WhatsApp Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[370px] bg-[#0F172A] p-2.5 rounded-[32px] border border-[#334155] shadow-xl">
              <div className="rounded-[24px] overflow-hidden bg-[#EFEAE2]">
                {/* WhatsApp Top Bar */}
                <div className="bg-[#075E54] text-white px-4 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#14B8A6] text-[#0B1320] font-cigo-display font-extrabold text-xs flex items-center justify-center shrink-0">
                        CIGO
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold leading-tight truncate">
                          CIGO Flotas Bot
                        </div>
                        <div className="text-[11px] text-[#A7F3D0] truncate">
                          {isAnalyzing ? current.analyzingText : "En línea · WhatsApp Oficial"}
                        </div>
                      </div>
                    </div>
                    <span className="font-cigo-mono text-[11px] text-emerald-100/90 shrink-0">
                      {current.sentTime}
                    </span>
                  </div>
                </div>

                {/* Chat Thread */}
                <div className="cigo-wa-bg p-4 min-h-[340px] flex flex-col justify-center gap-3">
                  {/* Outgoing Driver Message */}
                  <div
                    key={`wa-u-${current.id}`}
                    className="self-end w-[92%] bg-[#D9FDD3] rounded-xl rounded-tr-none p-2.5 shadow-xs text-[#111B21] cigo-swap"
                  >
                    <div className="text-[11px] font-bold text-[#075E54] mb-1.5">
                      {current.driverHeader}
                    </div>

                    {current.id === "audio" ? (
                      <div className="bg-white/75 rounded-lg p-2.5 space-y-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </span>
                          <div className="flex-1 flex items-center gap-[2px] h-7" aria-hidden="true">
                            {AUDIO_HEIGHT_CLASSES.map((heightCls, i) => (
                              <span
                                key={i}
                                className={`flex-1 rounded-full bg-[#075E54]/65 ${heightCls}`}
                              />
                            ))}
                          </div>
                          <span className="font-cigo-mono text-[10px] text-[#54656F]">
                            0:06
                          </span>
                        </div>
                        <p className="text-xs text-[#1E293B] italic leading-snug">
                          {current.audioCaption}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border border-dashed border-[#CBD5E1] rounded-lg p-3 text-[#0F172A] mb-1.5">
                        <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-dashed border-[#CBD5E1]">
                          <span className="text-[11px] font-bold truncate">
                            {current.receiptVendor}
                          </span>
                          <span className="font-cigo-mono text-[10px] font-bold text-[#0F766E] shrink-0">
                            {current.receiptSeries}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#475569]">
                          {current.receiptDetail}
                        </div>
                        <div className="flex items-baseline justify-between mt-2 pt-1.5 border-t border-[#F1F5F9]">
                          <span className="font-cigo-mono text-[10px] text-[#64748B]">
                            {current.receiptMeta}
                          </span>
                          <span className="font-cigo-mono text-sm font-bold text-[#0F172A]">
                            {current.receiptTotal}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[10px] text-[#54656F]">
                      <span>{current.sentTime}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" strokeWidth={2.25} />
                    </div>
                  </div>

                  {/* Incoming CIGO Reply */}
                  {isAnalyzing ? (
                    <div className="self-start bg-white text-[#475569] px-3.5 py-2.5 rounded-xl rounded-tl-none shadow-xs text-xs">
                      {current.analyzingText}
                    </div>
                  ) : (
                    <div
                      key={`wa-b-${current.id}`}
                      className="self-start w-[94%] bg-white rounded-xl rounded-tl-none p-3 shadow-xs text-xs leading-relaxed text-[#1E293B] cigo-swap"
                    >
                      <div className="font-bold text-[#0F766E] mb-1.5 flex items-center gap-1.5">
                        <Check className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                        <span>{current.botTitle}</span>
                      </div>
                      <div className="space-y-0.5 text-[#334155]">
                        {current.botLines.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Structured CIGO Web Panel Output */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-[#0F172A] text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#14B8A6]" strokeWidth={2} />
                <div>
                  <h3 className="text-base font-bold leading-tight">
                    Así queda registrado en tu Panel CIGO
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Sin digitación manual · Listo para auditoría y contabilidad
                  </p>
                </div>
              </div>
              <span className="font-cigo-mono text-[11px] font-bold text-[#0B1320] bg-[#14B8A6] px-2.5 py-1 rounded">
                {isAnalyzing ? "Validando..." : "Sincronizado"}
              </span>
            </div>

            <div className="p-6">
              <dl
                key={`led-${current.id}`}
                className={`divide-y divide-[#F1F5F9] text-sm transition-opacity duration-200 ${
                  isAnalyzing ? "opacity-45" : "opacity-100 cigo-swap"
                }`}
              >
                {current.ledgerFields.map((row) => (
                  <div
                    key={row.field}
                    className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                  >
                    <dt className="text-xs font-medium text-[#64748B]">{row.field}</dt>
                    <dd
                      className={`text-sm sm:text-right font-semibold ${
                        row.tone === "teal"
                          ? "text-[#0F766E]"
                          : "text-[#0F172A]"
                      } ${row.mono ? "font-cigo-mono" : ""}`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Genuine Sequential 3-Step Rollout (48h) */}
        <div className="pt-10 border-t border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">
                Tu flota operando en menos de 48 horas
              </h3>
              <p className="text-sm text-[#475569] mt-1">
                Tres pasos claros desde el registro gratuito hasta tu primera liquidación exportada.
              </p>
            </div>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0F766E] hover:text-[#0D9488] underline underline-offset-4 shrink-0"
            >
              Activar prueba de 7 días ahora
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLLOUT_SEQUENCE.map((item) => (
              <li
                key={item.step}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-cigo-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded">
                      Paso {item.step}
                    </span>
                    <span className="font-cigo-mono text-xs text-[#64748B]">
                      {item.timing}
                    </span>
                  </div>
                  <h4 className="font-cigo-display text-lg font-bold text-[#0F172A] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
