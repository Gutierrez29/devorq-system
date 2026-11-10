"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Lock,
  Layers,
  Send,
  Bot,
  Zap,
  Clock,
  ScanLine,
} from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Stable High-Tech Glow Card (Zero 3D Tilt, completely steady buttons) ─── */
function GlowCard({
  children,
  borderColor = "border-sky-500/30",
  ambientGlow = "from-sky-500/10 via-indigo-500/5 to-transparent",
}: {
  children: React.ReactNode;
  borderColor?: string;
  ambientGlow?: string;
}) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl border ${borderColor} bg-slate-950/80 backdrop-blur-xl group transition-all duration-300`}>
      {/* Ambient background glow inside card */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ambientGlow} opacity-50 group-hover:opacity-75 transition-opacity`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── CIGO LIVE INTERACTIVE AUDIT SIMULATOR ─── */
interface InvoiceRow {
  id: string;
  code: string;
  detail: string;
  category: "peajes" | "combustible" | "viaticos";
  amount: string;
  status: "valido" | "escaneando" | "pendiente";
  time: string;
}

const INITIAL_ROWS: InvoiceRow[] = [
  { id: "1", code: "#F001-4921", detail: "Autopista Del Norte S.A.C.", category: "peajes", amount: "S/. 1,240.00", status: "valido", time: "10:14" },
  { id: "2", code: "#E001-8312", detail: "Primax Estación Central", category: "combustible", amount: "S/. 890.00", status: "valido", time: "10:22" },
  { id: "3", code: "#F004-1290", detail: "Concesionaria Vial Sierra", category: "peajes", amount: "S/. 3,100.00", status: "valido", time: "10:35" },
  { id: "4", code: "#B002-9411", detail: "Repsol Flota Norte", category: "combustible", amount: "S/. 670.00", status: "valido", time: "10:48" },
];

function CigoLiveSimulator() {
  const [activeTab, setActiveTab] = useState<"auditoria" | "dashboard">("auditoria");
  const [rows, setRows] = useState<InvoiceRow[]>(INITIAL_ROWS);
  const [filter, setFilter] = useState<"todos" | "peajes" | "combustible">("todos");
  const [isAuditing, setIsAuditing] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);

  const simulateNewInvoiceAudit = useCallback(() => {
    if (isAuditing) return;
    setIsAuditing(true);

    const newId = String(Date.now());
    setScannedId(newId);

    const pendingRow: InvoiceRow = {
      id: newId,
      code: `#F005-${Math.floor(1000 + Math.random() * 9000)}`,
      detail: "Servicios de Transporte & Peajes Lima S.A.",
      category: "peajes",
      amount: "S/. 1,450.00",
      status: "escaneando",
      time: "Ahora",
    };

    setRows((prev) => [pendingRow, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setRows((prev) =>
        prev.map((r) => (r.id === newId ? { ...r, status: "valido" } : r))
      );
      setIsAuditing(false);
      setScannedId(null);
    }, 900);
  }, [isAuditing]);

  const filteredRows = filter === "todos" ? rows : rows.filter((r) => r.category === filter);

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl overflow-hidden font-sans border border-slate-800/80">
      {/* Topbar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Image
            src="/cigo-logo.webp"
            alt="CIGO Logo"
            width={70}
            height={18}
            className="h-4 w-auto object-contain brightness-125"
          />
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            SUNAT CDR En Línea
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("auditoria")}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
              activeTab === "auditoria" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Auditoría en Vivo
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
              activeTab === "dashboard" ? "bg-sky-500 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>

      {activeTab === "auditoria" ? (
        <div className="p-4 space-y-3 bg-slate-950/70">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {(["todos", "peajes", "combustible"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2 py-0.5 rounded capitalize transition-all cursor-pointer ${
                    filter === cat ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={simulateNewInvoiceAudit}
              disabled={isAuditing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold transition-all shadow-md shadow-sky-500/25 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>{isAuditing ? "Verificando CDR..." : "Auditar Nuevo Comprobante"}</span>
            </button>
          </div>

          {/* Table */}
          <div className="space-y-1.5">
            {filteredRows.map((row) => (
              <div
                key={row.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                  row.id === scannedId
                    ? "bg-sky-500/10 border-sky-500/40 shadow-sm animate-pulse"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 font-mono text-[10px]">
                    {row.category === "peajes" ? "PEA" : "COMB"}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <span>{row.code}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{row.time}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[170px] sm:max-w-xs">{row.detail}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-slate-200">{row.amount}</div>
                  {row.status === "escaneando" ? (
                    <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1 justify-end">
                      <Clock className="w-2.5 h-2.5 animate-spin" /> Escaneando...
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Válido SUNAT
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Algoritmo anti-duplicados activo</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Deducción Tributaria
            </span>
          </div>
        </div>
      ) : (
        <div className="relative h-64 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          <Image
            src="/cigo/02-dashboard.webp"
            alt="CIGO Dashboard"
            fill
            className="object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      )}
    </div>
  );
}

/* ─── ASYS IA LIVE WHATSAPP AGENT SIMULATOR ─── */
interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "1",
    sender: "user",
    text: "Hola, necesito el estado del camión placa F1X-892 en ruta hacia Arequipa.",
    time: "14:32",
  },
  {
    id: "2",
    sender: "bot",
    text: "¡Hola! Vehículo F1X-892 verificado en GPS:\n📍 Ubicación: Km 480 Panamericana Sur\n⛽ Combustible: 72% • Temperatura: Normal\n👤 Conductor: Carlos M. (Viáticos al día)\n\n¿Deseas descargar el reporte de liquidación en PDF?",
    time: "14:32",
  },
];

function AsysLiveSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "dashboard">("chat");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendQuestion = (text: string, replyText: string) => {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text,
      time: "Ahora",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "bot",
        text: replyText,
        time: "Ahora",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText;
    setInputText("");
    sendQuestion(
      query,
      `Entendido. He procesado tu solicitud sobre "${query}". La información fue sincronizada en el ERP empresarial en 140ms. ¿Requieres notificar al supervisor?`
    );
  };

  return (
    <div className="w-full bg-[#0b141a] text-slate-100 rounded-2xl overflow-hidden font-sans border border-purple-900/40">
      {/* WhatsApp Header */}
      <div className="bg-[#1f2c34] px-4 py-3 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1f2c34]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>ASYS IA</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full border border-purple-500/30">
                Agente Oficial
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">En línea las 24 horas</div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#111b21] p-1 rounded-lg border border-slate-700/50 text-xs">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              activeTab === "chat" ? "bg-purple-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Chat WhatsApp
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              activeTab === "dashboard" ? "bg-purple-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>

      {activeTab === "chat" ? (
        <div className="flex flex-col h-[360px] bg-[#0b141a] relative">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Messages list */}
          <div ref={chatScrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 relative z-10 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3.5 py-2 leading-relaxed shadow-sm whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-[#005c4b] text-slate-100 rounded-tr-none"
                      : "bg-[#202c33] text-slate-200 rounded-tl-none border border-slate-700/40"
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.sender === "user" ? "text-emerald-300" : "text-slate-400"
                    }`}
                  >
                    {m.time} {m.sender === "user" && "✓✓"}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#202c33] text-slate-300 px-3 py-2 rounded-2xl rounded-tl-none w-fit border border-slate-700/40 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-400 ml-1">ASYS IA redactando...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#111b21] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
            <button
              onClick={() =>
                sendQuestion(
                  "¿Pueden cotizar despacho para 20 toneladas?",
                  "Cotización preliminar estimada: S/. 4,200 + IGV. Incluye rastreo satelital y seguro de carga. ¿Deseas que un asesor comercial valide tu ruta exacta?"
                )
              }
              className="px-2.5 py-1 rounded-full bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-800/60 whitespace-nowrap transition-all cursor-pointer"
            >
              📦 Cotizar 20 Toneladas
            </button>
            <button
              onClick={() =>
                sendQuestion(
                  "¿Cómo se integra ASYS con mi ERP actual?",
                  "ASYS cuenta con conectores directos vía Webhooks y REST API para SAP, Oracle, SQL Server y PostgreSQL. Se integra en menos de 48 horas sin interrumpir tus operaciones."
                )
              }
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition-all cursor-pointer"
            >
              ⚡ Integración ERP
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleCustomSubmit} className="p-2.5 bg-[#202c33] flex items-center gap-2 border-t border-slate-800">
            <input
              type="text"
              placeholder="Escribe un mensaje de prueba a ASYS IA..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#2a3942] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="relative h-[360px] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          <Image
            src="/asys_dashboard.webp"
            alt="ASYS IA Dashboard"
            fill
            className="object-contain p-2 opacity-95"
          />
        </div>
      )}
    </div>
  );
}

/* ─── MAIN PRODUCTS SECTION (Dark Cosmic Cyber-Clean) ─── */
export default function Products() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section id="productos" className="py-24 px-4 sm:px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headRef}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            headInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-800/80">
            <Layers className="w-3.5 h-3.5" />
            <span>Nuestras Soluciones Propias</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Dos plataformas de software.{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Resultados inmediatos.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Cada producto ataca un cuello de botella crítico de tu operación con automatización e inteligencia artificial.
          </p>
        </div>

        {/* Product 1: CIGO */}
        <div id="cigo" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-28 p-6 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-800/60">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              SaaS Financiero & Tributario
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              CIGO: Control Inteligente de Gastos y Flotas
            </h3>

            <p className="text-base text-slate-400 leading-relaxed mb-6">
              Centraliza y automatiza el control de viáticos y comprobantes de combustible y peajes. Valida cada factura en tiempo real contra los servicios de la SUNAT eliminando pérdidas operativas.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Auditoría SUNAT con CDR en Vivo</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Verificación instantánea del estado de validez tributaria del comprobante antes del pago.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Candados Anti-Duplicados</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Algoritmo que bloquea facturas ya rendidas por otros conductores o en otras rutas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Trazabilidad por Chofer y Vehículo</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Consolidado de gastos por placa vehicular y ruta con liquidaciones automáticas.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/cigo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 transition-all group active:scale-95"
            >
              <span>Explorar Módulos de CIGO</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Interactive Visual Playground (Steady, zero tilt) */}
          <div>
            <div className="mb-2 text-right">
              <span className="text-[11px] font-mono text-slate-400">
                🎮 Prueba interactiva: haz clic en los filtros o audita un comprobante
              </span>
            </div>
            <GlowCard borderColor="border-sky-500/30" ambientGlow="from-sky-500/10 via-indigo-500/5 to-transparent">
              <CigoLiveSimulator />
            </GlowCard>
          </div>
        </div>

        {/* Product 2: ASYS IA */}
        <div id="asys-ia" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center p-6 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          {/* Interactive WhatsApp Visual (Order 2 on mobile, 1 on desktop) */}
          <div className="order-2 lg:order-1">
            <div className="mb-2 text-left">
              <span className="text-[11px] font-mono text-slate-400">
                💬 Simulador en vivo: haz clic en los botones o escribe tu mensaje
              </span>
            </div>
            <GlowCard borderColor="border-purple-500/30" ambientGlow="from-purple-500/10 via-fuchsia-500/5 to-transparent">
              <AsysLiveSimulator />
            </GlowCard>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              Agente IA Autónomo
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              ASYS IA: Automatización Inteligente en WhatsApp
            </h3>

            <p className="text-base text-slate-400 leading-relaxed mb-6">
              Convierte WhatsApp en tu canal de atención y ventas más eficiente. Un agente entrenado con la lógica de tu empresa que responde dudas, consulta bases de datos y coordina despachos las 24 horas.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Atención Continua 24/7</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Responde al segundo consultas de clientes y conductores sin esperas ni fricción.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Conexión Bidireccional con tu ERP</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Lee inventarios, actualiza estados de viaje y sincroniza pedidos en tu sistema en tiempo real.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Capacidad Multimodal</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Procesa mensajes de voz, imágenes de comprobantes y documentos PDF automáticamente.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/asys-ia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35 transition-all group active:scale-95"
            >
              <span>Conocer ASYS IA</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
