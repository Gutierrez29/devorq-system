"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Fuel, Mic, Receipt } from "lucide-react";

const REGISTER_URL = "https://cigo.devorq.com/registro";

type ChatTab = "combustible" | "audio" | "peaje";

interface SimulationScenario {
  id: ChatTab;
  label: string;
  driverHeader: string;
  sentTime: string;
  userLines: string[];
  analyzingText: string;
  botTitle: string;
  botLines: string[];
  ledgerFields: { field: string; value: string; mono?: boolean; highlight?: "ok" | "blue" }[];
}

const SCENARIOS: Record<ChatTab, SimulationScenario> = {
  combustible: {
    id: "combustible",
    label: "Combustible",
    driverHeader: "Carlos M. (Tracto V1A-892)",
    sentTime: "10:14",
    userLines: [
      "Foto Ticket Repsol: 78.4 gal Diésel B5",
      "Foto Tablero Odómetro: 142,500 km",
    ],
    analyzingText: "Leyendo comprobante y calculando Km/galón...",
    botTitle: "Carga registrada y validada en SUNAT",
    botLines: [
      "Proveedor: Repsol Combustible S.A.",
      "Carga: 78.4 gal Diésel B5 (S/ 1,420.00)",
      "Rendimiento: 3.84 km/gal (dentro de meta)",
      "Saldo restante de viático: S/ 1,280.00",
    ],
    ledgerFields: [
      { field: "Unidad y chofer", value: "V1A-892 / Carlos Mendoza", mono: true },
      { field: "Proveedor", value: "Repsol Combustible S.A." },
      { field: "Serie y correlativo", value: "F042-0019284", mono: true },
      { field: "Abastecimiento", value: "78.4 gal · S/ 1,420.00", mono: true },
      { field: "Lectura odómetro", value: "142,500 km", mono: true },
      { field: "Rendimiento real", value: "3.84 km/gal", mono: true, highlight: "blue" },
      { field: "Estado SUNAT", value: "Aceptado (RUC Activo y Habido)", highlight: "ok" },
      { field: "Saldo de viaje", value: "S/ 1,280.00", mono: true },
    ],
  },
  audio: {
    id: "audio",
    label: "Nota de voz",
    driverHeader: "Carlos M. (Tracto V1A-892)",
    sentTime: "19:22",
    userLines: [
      "“Pagué 20 soles de cochera en Chimbote para pernoctar.”",
    ],
    analyzingText: "Transcribiendo nota de voz...",
    botTitle: "Gasto menor registrado en planilla",
    botLines: [
      "Concepto: Cochera / Pernocte en ruta",
      "Monto extraído: S/ 20.00",
      "Destino: Planilla de Movilidad CIGO",
      "Estado: Listo para liquidación de viaje",
    ],
    ledgerFields: [
      { field: "Unidad y chofer", value: "V1A-892 / Carlos Mendoza", mono: true },
      { field: "Origen del registro", value: "Audio WhatsApp transcrito" },
      { field: "Concepto", value: "Cochera / Pernocte en Chimbote" },
      { field: "Monto", value: "S/ 20.00", mono: true },
      { field: "Clasificación", value: "Planilla de Movilidad (sin comprobante)" },
      { field: "Validación", value: "Dentro de tope diario configurado", highlight: "ok" },
      { field: "Exportación", value: "Liquidación por viaje (.xlsx)", highlight: "blue" },
    ],
  },
  peaje: {
    id: "peaje",
    label: "Peaje SUNAT",
    driverHeader: "Carlos M. (Tracto V1A-892)",
    sentTime: "13:08",
    userLines: [
      "Foto Boleta de Peaje Autopista del Norte",
    ],
    analyzingText: "Consultando comprobante ante SUNAT...",
    botTitle: "Comprobante validado y archivado",
    botLines: [
      "Comprobante: B001-004892",
      "Monto: S/ 45.00 (IGV S/ 6.86)",
      "Estado SUNAT: Aceptado (RUC Activo y Habido)",
      "Control duplicado: comprobante único",
    ],
    ledgerFields: [
      { field: "Unidad y chofer", value: "V1A-892 / Carlos Mendoza", mono: true },
      { field: "Emisor", value: "Autopista del Norte S.A.C." },
      { field: "Comprobante", value: "B001-004892", mono: true },
      { field: "Total e IGV", value: "S/ 45.00 (IGV S/ 6.86)", mono: true },
      { field: "Estado SUNAT", value: "Aceptado · Activo y Habido", highlight: "ok" },
      { field: "Control duplicados", value: "Sin registros repetidos", highlight: "ok" },
      { field: "Exportación", value: "TXT SIRE Compras + foto en ZIP", highlight: "blue" },
    ],
  },
};

const ROLLOUT_SEQUENCE = [
  {
    step: "1",
    timing: "En 5 minutos",
    title: "Registro directo y alta de flota",
    desc: "Creas tu cuenta gratuita sin tarjeta de crédito, cargas las placas de tus camiones y habilitas el WhatsApp de tus conductores.",
  },
  {
    step: "2",
    timing: "Día 1 en carretera",
    title: "Reporte directo desde el celular del chofer",
    desc: "No instalan aplicaciones ni recuerdan claves. Envían fotos de boletas, odómetro o notas de voz incluso tras tramos sin cobertura.",
  },
  {
    step: "3",
    timing: "Cierre continuo en oficina",
    title: "Validación SUNAT y exportación contable",
    desc: "Operaciones sigue el consumo Km/galón en vivo y Contabilidad descarga Excel, liquidación de viaje, TXT SIRE y respaldo ZIP.",
  },
] as const;

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
    }, 380);
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
      className="py-20 sm:py-24 px-5 sm:px-8 bg-[#F6F5F1] border-b border-[#D8D6CE]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Left-aligned Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#14181D] leading-[1.12]">
              El conductor envía una foto o un audio por WhatsApp. Tu oficina recibe el asiento listo.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#4E5661] leading-relaxed">
              Sin instalar aplicaciones adicionales ni capacitar durante semanas. Selecciona un tipo de gasto para ver cómo se procesa de extremo a extremo.
            </p>
          </div>
        </div>

        {/* Interactive Split Desk: Left WhatsApp Thread | Right Accounting Ledger */}
        <div className="bg-white border border-[#D8D6CE] rounded-xl overflow-hidden mb-14">
          {/* Scenario Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#F0EFE9] border-b border-[#D8D6CE]">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Escenarios de reporte en WhatsApp">
              {(
                [
                  { id: "combustible", label: "Combustible", icon: Fuel },
                  { id: "audio", label: "Nota de voz", icon: Mic },
                  { id: "peaje", label: "Peaje SUNAT", icon: Receipt },
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
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? "bg-[#14181D] text-white"
                        : "text-[#4E5661] hover:text-[#14181D] hover:bg-white/80"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-[#5B6470]">
              Simulación en vivo: chat del conductor y registro contable
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Realistic WhatsApp Window */}
            <div className="lg:col-span-5 bg-[#EFEAE2] border-b lg:border-b-0 lg:border-r border-[#D8D6CE] flex flex-col">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 font-cigo-display font-bold text-xs flex items-center justify-center">
                    CIGO
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight">CIGO Flotas</div>
                    <div className="text-[11px] text-emerald-100">
                      {isAnalyzing ? current.analyzingText : "Cuenta verificada · WhatsApp"}
                    </div>
                  </div>
                </div>
                <span className="font-cigo-mono text-[11px] text-emerald-100/90">
                  {current.sentTime}
                </span>
              </div>

              {/* Messages Thread */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center gap-3 min-h-[300px]">
                {/* Outgoing Driver Bubble */}
                <div
                  key={`u-${current.id}`}
                  className="self-end max-w-[88%] bg-[#D9FDD3] text-[#111B21] px-3.5 py-2.5 rounded-lg rounded-tr-none shadow-xs text-xs leading-relaxed cigo-swap"
                >
                  <div className="text-[11px] font-semibold text-[#147A4B] mb-1">
                    {current.driverHeader}
                  </div>
                  {current.userLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>

                {/* Incoming Bot Reply */}
                {isAnalyzing ? (
                  <div className="self-start bg-white text-[#54656F] px-3.5 py-2.5 rounded-lg rounded-tl-none shadow-xs text-xs">
                    {current.analyzingText}
                  </div>
                ) : (
                  <div
                    key={`b-${current.id}`}
                    className="self-start max-w-[92%] bg-white text-[#111B21] px-3.5 py-3 rounded-lg rounded-tl-none shadow-xs text-xs leading-relaxed cigo-swap"
                  >
                    <div className="font-semibold text-[#147A4B] mb-1.5 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                      <span>{current.botTitle}</span>
                    </div>
                    <div className="space-y-0.5 text-[#3B4A54]">
                      {current.botLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Accounting & Operations Live Record */}
            <div className="lg:col-span-7 p-5 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-2 border-b border-[#E4E2DA]">
                  <div>
                    <h3 className="text-base font-bold text-[#14181D]">
                      Registro estructurado en el panel web
                    </h3>
                    <p className="text-xs text-[#5B6470] mt-0.5">
                      Datos extraídos automáticamente y listos para revisión o exportación
                    </p>
                  </div>
                  <span className="font-cigo-mono text-[11px] font-medium text-[#147A4B] bg-[#EAF6F0] border border-[#C3E5D3] px-2.5 py-1 rounded">
                    {isAnalyzing ? "Procesando..." : "Sincronizado"}
                  </span>
                </div>

                <dl
                  key={`l-${current.id}`}
                  className={`divide-y divide-[#ECEAE3] text-sm transition-opacity duration-200 ${
                    isAnalyzing ? "opacity-45" : "opacity-100 cigo-swap"
                  }`}
                >
                  {current.ledgerFields.map((row) => (
                    <div
                      key={row.field}
                      className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                    >
                      <dt className="text-xs font-medium text-[#5B6470]">{row.field}</dt>
                      <dd
                        className={`text-sm font-medium sm:text-right ${
                          row.highlight === "ok"
                            ? "text-[#147A4B] font-semibold"
                            : row.highlight === "blue"
                            ? "text-[#0A58CA] font-semibold"
                            : "text-[#14181D]"
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
        </div>

        {/* Genuine Sequential 3-Step Rollout Timeline (No boxed cards) */}
        <div className="pt-8 border-t border-[#D8D6CE]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#14181D]">
                Tu flota operando en menos de 48 horas
              </h3>
              <p className="text-sm text-[#4E5661] mt-1">
                Tres pasos reales desde el alta de placas hasta el primer cierre contable.
              </p>
            </div>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A58CA] hover:text-[#084298] underline underline-offset-4 shrink-0"
            >
              Activar cuenta gratuita ahora
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </a>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-[#D8D6CE]">
            {ROLLOUT_SEQUENCE.map((item, idx) => (
              <li
                key={item.step}
                className={
                  idx === 0
                    ? "md:pr-8"
                    : idx === 1
                    ? "md:px-8"
                    : "md:pl-8"
                }
              >
                <div className="flex items-baseline gap-2.5 mb-2.5">
                  <span className="font-cigo-mono text-xs font-semibold text-[#0A58CA]">
                    Paso {item.step}
                  </span>
                  <span className="text-xs text-[#5B6470]">({item.timing})</span>
                </div>
                <h4 className="font-cigo-display text-lg font-bold text-[#14181D] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-[#4E5661] leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
