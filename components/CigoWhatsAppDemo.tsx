"use client";

import { useState, useEffect, useRef } from "react";
import {
  Fuel,
  Mic,
  Receipt,
  Camera,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";

const REGISTER_URL = "https://cigo.devorq.com/registro";

type ChatTab = "combustible" | "audio" | "peaje";

const METHODOLOGY_STEPS = [
  {
    phase: "Fase 1 · 5 minutos",
    title: "Registro directo y carga de flota",
    desc: "Creas tu cuenta gratuita en cigo.devorq.com/registro sin tarjeta de crédito y registras placas y números de WhatsApp de tus choferes.",
  },
  {
    phase: "Fase 2 · Día 1 en carretera",
    title: "Tus conductores reportan por WhatsApp",
    desc: "Sin descargar aplicaciones ni contraseñas. Envían fotos de boletas, tablero de odómetro o notas de voz al chat incluso en zonas con baja señal.",
  },
  {
    phase: "Fase 3 · Continuo en oficina",
    title: "Auditoría SUNAT y liquidación inmediata",
    desc: "Operaciones monitorea Km/galón y saldos en vivo; Contabilidad exporta Excel, liquidaciones de viaje, archivo TXT SIRE y carpeta ZIP.",
  },
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
    }, 520);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      id="whatsapp-feature"
      className="py-18 sm:py-22 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-emerald-50/35 to-white border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-100 border border-emerald-200 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            La Solución · Reporte en Ruta vía WhatsApp
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
            El Conductor Envía Foto o Audio →{" "}
            <span className="text-emerald-600">CIGO Valida y Liquida al Instante</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Sin descargar aplicaciones pesadas ni recordar contraseñas. Haz clic en los ejemplos del chat para ver cómo responde CIGO en segundos.
          </p>
        </div>

        {/* Main 2-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left: 3 Clear Operational Steps */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">
                  Paso 1 · En Carretera
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Foto del comprobante, odómetro o nota de voz
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  Al abastecer combustible o pagar peaje/viático, el chofer manda la foto al chat. Si atraviesa tramos sin señal, WhatsApp transmite el reporte al recuperar cobertura.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-sky-300 transition-colors flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">
                  Paso 2 · Motor IA + SUNAT
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Extracción automática, Km/galón y consulta fiscal
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  CIGO lee proveedor, RUC, galones, montos y kilometraje, verifica estado en SUNAT y alerta duplicados o desvíos de rendimiento de inmediato.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-violet-300 transition-colors flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 border border-violet-200 flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-violet-600">
                  Paso 3 · En Oficina
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Supervisión en vivo y exportación contable en 1 clic
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  Gerencia y Contabilidad siguen el saldo por viaje en tiempo real y exportan reportes Excel, planilla de liquidación, archivo TXT SIRE y carpeta ZIP de fotos.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive WhatsApp Phone Simulator */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0B141A] p-4 sm:p-5 border border-emerald-500/40 shadow-2xl">
              {/* WhatsApp Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#202C33]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-md">
                    CIGO
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#E9EDEF]">
                      CIGO Flotas Bot
                    </div>
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      {isAnalyzing ? "Analizando comprobante con IA..." : "En línea · Rendición en Ruta"}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-[#1F2C34] px-2.5 py-1 rounded-md">
                  WhatsApp Oficial
                </span>
              </div>

              {/* Scenario Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#111B21] p-1 rounded-xl mb-4">
                {(
                  [
                    { id: "combustible", label: "Combustible", icon: Fuel },
                    { id: "audio", label: "Audio Ruta", icon: Mic },
                    { id: "peaje", label: "Peaje SUNAT", icon: Receipt },
                  ] as const
                ).map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSwitchTab(item.id)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#202C33] text-emerald-400 shadow-xs"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Messages */}
              <div className="flex flex-col gap-3 min-h-[250px] text-xs">
                {activeTab === "combustible" && (
                  <>
                    <div className="self-end max-w-[88%] bg-[#005C4B] text-[#E9EDEF] px-3.5 py-2.5 rounded-2xl rounded-tr-xs shadow-sm cigo-fade-up">
                      <div className="text-[11px] font-bold text-emerald-300 mb-1">
                        Chofer Carlos M. (Tracto V1A-892)
                      </div>
                      <div>Foto Ticket Repsol: 78.4 gal Diésel B5</div>
                      <div>Foto Tablero Odómetro: 142,500 km</div>
                    </div>

                    {isAnalyzing ? (
                      <div className="self-start bg-[#202C33] text-slate-300 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:120ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:240ms]" />
                        <span className="ml-1.5 text-[11px] font-medium">
                          Validando RUC y calculando Km/galón...
                        </span>
                      </div>
                    ) : (
                      <div className="self-start max-w-[94%] bg-[#202C33] text-[#E9EDEF] px-4 py-3 rounded-2xl rounded-tl-xs border-l-4 border-emerald-500 cigo-fade-up">
                        <div className="font-extrabold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Carga Auditada y Válida SUNAT
                        </div>
                        <div className="space-y-0.5 text-[12px] leading-relaxed text-slate-200">
                          <div><strong>Proveedor:</strong> Repsol Combustible S.A.</div>
                          <div><strong>Carga:</strong> 78.4 gal DIESEL B5 (S/ 1,420.00)</div>
                          <div><strong>Odómetro:</strong> 142,500 km</div>
                          <div>
                            <strong>Rendimiento:</strong>{" "}
                            <span className="text-sky-400 font-bold">3.84 km/gal (Óptimo)</span>
                          </div>
                          <div><strong>Saldo Restante Viático:</strong> S/ 1,280.00</div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "audio" && (
                  <>
                    <div className="self-end max-w-[88%] bg-[#005C4B] text-[#E9EDEF] px-3.5 py-2.5 rounded-2xl rounded-tr-xs shadow-sm cigo-fade-up">
                      <div className="text-[11px] font-bold text-emerald-300 mb-1">
                        Chofer Carlos M. (Tracto V1A-892)
                      </div>
                      <em className="text-slate-100">
                        &quot;Pagué 20 soles de cochera en Chimbote para pernoctar&quot;
                      </em>
                    </div>

                    {isAnalyzing ? (
                      <div className="self-start bg-[#202C33] text-slate-300 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:120ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:240ms]" />
                        <span className="ml-1.5 text-[11px] font-medium">
                          Transcribiendo nota de voz...
                        </span>
                      </div>
                    ) : (
                      <div className="self-start max-w-[94%] bg-[#202C33] text-[#E9EDEF] px-4 py-3 rounded-2xl rounded-tl-xs border-l-4 border-violet-500 cigo-fade-up">
                        <div className="font-extrabold text-violet-400 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Gasto Menor Transcrito por IA
                        </div>
                        <div className="space-y-0.5 text-[12px] leading-relaxed text-slate-200">
                          <div><strong>Concepto:</strong> Cochera / Pernocte en Ruta</div>
                          <div><strong>Monto Extraído:</strong> S/ 20.00</div>
                          <div><strong>Destino:</strong> Planilla de Movilidad CIGO</div>
                          <div><strong>Estado:</strong> Registrado para Liquidación</div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "peaje" && (
                  <>
                    <div className="self-end max-w-[88%] bg-[#005C4B] text-[#E9EDEF] px-3.5 py-2.5 rounded-2xl rounded-tr-xs shadow-sm cigo-fade-up">
                      <div className="text-[11px] font-bold text-emerald-300 mb-1">
                        Chofer Carlos M. (Tracto V1A-892)
                      </div>
                      <div>Foto Boleta de Peaje Autopista del Norte</div>
                    </div>

                    {isAnalyzing ? (
                      <div className="self-start bg-[#202C33] text-slate-300 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:120ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:240ms]" />
                        <span className="ml-1.5 text-[11px] font-medium">
                          Consultando comprobante ante SUNAT...
                        </span>
                      </div>
                    ) : (
                      <div className="self-start max-w-[94%] bg-[#202C33] text-[#E9EDEF] px-4 py-3 rounded-2xl rounded-tl-xs border-l-4 border-sky-400 cigo-fade-up">
                        <div className="font-extrabold text-sky-400 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Comprobante Validado en SUNAT
                        </div>
                        <div className="space-y-0.5 text-[12px] leading-relaxed text-slate-200">
                          <div><strong>Comprobante:</strong> B001-004892</div>
                          <div><strong>Monto:</strong> S/ 45.00 (IGV S/ 6.86)</div>
                          <div><strong>Estado SUNAT:</strong> ACEPTADO (RUC Activo y Habido)</div>
                          <div><strong>Control Duplicado:</strong> Único en base</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Metodología de Implementación en 3 Fases */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-sky-700">
                <Clock className="w-3.5 h-3.5" />
                Metodología de Puesta en Marcha
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                Tu flota operando en menos de 48 horas
              </h3>
            </div>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-full transition-colors shrink-0"
            >
              Activar Fase 1 Gratis ahora
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {METHODOLOGY_STEPS.map((step, index) => (
              <div
                key={step.phase}
                className="relative rounded-2xl bg-slate-50 border border-slate-200/90 p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">
                    {step.phase}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
