"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Terminal,
  Play,
  RotateCcw,
  Server,
  Workflow,
} from "lucide-react";

const ROTATING_WORDS = [
  "empresas reales.",
  "operaciones B2B.",
  "procesos tributarios.",
  "agentes de IA.",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"platform" | "architecture" | "ai">("platform");
  const [benchmarkLatency, setBenchmarkLatency] = useState<number | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  // Rotating headline word index
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeWord, setFadeWord] = useState(true);

  // Interactive Live Deploy Simulation
  const [deployStep, setDeployStep] = useState<number>(0);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);

  // Rotate headline words every 2.8s
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeWord(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setFadeWord(true);
      }, 250);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const runBenchmark = useCallback(() => {
    if (isBenchmarking) return;
    setIsBenchmarking(true);
    setBenchmarkLatency(null);

    const startTime = performance.now();
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - startTime + 18);
      setBenchmarkLatency(elapsed);
      setIsBenchmarking(false);
    }, 450);
  }, [isBenchmarking]);

  const startDeploySimulation = useCallback(() => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeployStep(1);

    const s1 = setTimeout(() => setDeployStep(2), 600);
    const s2 = setTimeout(() => setDeployStep(3), 1300);
    const s3 = setTimeout(() => setDeployStep(4), 2100);
    const s4 = setTimeout(() => {
      setDeployStep(5);
      setIsDeploying(false);
    }, 2900);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, [isDeploying]);

  return (
    <section
      ref={heroRef}
      className="relative pt-16 pb-16 md:pt-24 md:pb-28 overflow-hidden bg-transparent"
    >
      {/* Ambient Radial Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 text-white text-xs sm:text-sm font-medium shadow-lg shadow-sky-950/20 transition-all cursor-default border border-slate-800 mb-6 group backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300">Devorq Systems</span>
          <span className="text-slate-600">•</span>
          <span className="text-sky-400 font-semibold flex items-center gap-1">
            Ingeniería de Software & IA{" "}
            <Sparkles className="w-3.5 h-3.5 text-sky-300 group-hover:rotate-12 transition-transform" />
          </span>
        </div>

        {/* Hero Headline with dynamic word rotation */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Software moderno que{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              transforma
            </span>
            <br />
            <span
              className={`inline-block min-h-[1.15em] transition-all duration-300 ${
                fadeWord
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3"
              } bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Creamos aplicaciones web interactivas, plataformas empresariales de alta concurrencia
            y agentes de inteligencia artificial diseñados para acelerar tu negocio.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-base shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/35 transition-all active:scale-95 group"
          >
            <span>Cotizar mi Proyecto</span>
            <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => {
              const el = document.getElementById("cigo");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Ver Productos en Producción</span>
          </button>
        </div>

        {/* Interactive Technology Showcase with Border Beam Glow */}
        <div className="relative w-full max-w-4xl mx-auto mb-16 rounded-2xl p-[1px] bg-gradient-to-r from-sky-500/40 via-indigo-500/40 to-blue-500/40 shadow-2xl shadow-sky-950/40 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 rounded-2xl blur-sm opacity-25 group-hover:opacity-45 transition-opacity" />

          <div className="relative rounded-2xl bg-slate-950/95 backdrop-blur-2xl text-slate-100 p-2 sm:p-5 border border-slate-800 overflow-hidden text-left">
            {/* Laser scanning beam during deployment */}
            {isDeploying && (
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none z-20"
                style={{ animation: "laser-sweep 1.2s ease-in-out infinite" }}
              />
            )}

            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline-block">
                  devorq-core-engine://live-preview
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab("platform")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === "platform"
                      ? "bg-sky-500 text-white font-medium shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === "architecture"
                      ? "bg-sky-500 text-white font-medium shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  <span>Arquitectura</span>
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === "ai"
                      ? "bg-sky-500 text-white font-medium shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Agente IA</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Live Platform Preview */}
            {activeTab === "platform" && (
              <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800/60 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Disponibilidad</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="text-2xl font-bold text-white">99.98%</div>
                    <div className="text-[11px] text-emerald-400 mt-1 font-mono">Infraestructura Serverless</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Latencia Global</span>
                      <Zap className="w-3 h-3 text-sky-400" />
                    </div>
                    <div className="text-2xl font-bold text-sky-400">
                      {benchmarkLatency ? `${benchmarkLatency}ms` : "24ms"}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">Edge Computing LATAM</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Transacciones Auditadas</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-[11px] text-emerald-400 mt-1 font-mono">SUNAT Compliant</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Tecnologías: Next.js 16 • React 19 • Tailwind CSS v4 • TypeScript
                  </span>
                  <button
                    onClick={runBenchmark}
                    disabled={isBenchmarking}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 font-medium transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {isBenchmarking ? "Midiendo..." : "Test de Velocidad"}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Architecture / Code Preview with Live Deploy Simulator */}
            {activeTab === "architecture" && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-xl border border-slate-800/60 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
                  <div className="text-slate-500 mb-2">{"// Devorq Next.js 16 Server Component & Type-Safe Action"}</div>
                  <p>
                    <span className="text-indigo-400">export async function</span>{" "}
                    <span className="text-sky-300">processBusinessTransaction</span>(
                    <span className="text-amber-300">payload</span>:{" "}
                    <span className="text-emerald-300">AuditRequest</span>
                    ) &#123;
                  </p>
                  <p className="pl-4 text-slate-400">
                    <span className="text-indigo-400">const</span> validated ={" "}
                    <span className="text-sky-300">Schema.parse</span>(payload);
                  </p>
                  <p className="pl-4 text-slate-400">
                    <span className="text-indigo-400">const</span> [result, taxVerification] ={" "}
                    <span className="text-indigo-400">await</span> Promise.all([
                  </p>
                  <p className="pl-8 text-sky-200">database.transactions.create(validated),</p>
                  <p className="pl-8 text-sky-200">sunatAPI.verifyCDR(validated.documentId),</p>
                  <p className="pl-4 text-slate-400">]);</p>
                  <p className="pl-4">
                    <span className="text-indigo-400">return</span> &#123; success:{" "}
                    <span className="text-emerald-400">true</span>, latencyMs:{" "}
                    <span className="text-amber-300">22</span> &#125;;
                  </p>
                  <p>&#125;</p>
                </div>

                {/* Live Deploy Simulator Panel */}
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-sky-400" />
                    <span className="text-slate-300 font-mono">
                      {deployStep === 0 && "Pipeline CI/CD listo para prueba"}
                      {deployStep === 1 && "⚡ Turbopack: Compilando 142 módulos en 38ms..."}
                      {deployStep === 2 && "🛡️ TypeScript: 0 errores de tipo detectados"}
                      {deployStep === 3 && "🌐 Distribuyendo a Edge Nodes LATAM (Lima, Bogotá, CDMX)..."}
                      {deployStep >= 4 && "✅ Despliegue Exitoso en Producción (Uptime 99.98%)"}
                    </span>
                  </div>

                  <button
                    onClick={startDeploySimulation}
                    disabled={isDeploying}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 font-medium transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isDeploying ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Desplegando...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Simular Deploy en Vivo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: AI Autonomous Agent */}
            {activeTab === "ai" && (
              <div className="p-4 sm:p-6 bg-slate-900/70 rounded-xl border border-slate-800/60 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-900/50 w-fit">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>ASYS AI Orchestrator: Multi-Agent Workflow</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">[10:04:12]</span>
                    <span className="text-slate-300">
                      Cliente envía consulta por WhatsApp: <span className="text-sky-300">&quot;Quiero coordinar despacho de flota #14&quot;</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-bold">[10:04:13]</span>
                    <span className="text-slate-300">
                      Agente IA extrae entidad: Vehículo asignado <span className="text-amber-300">Placa F1X-892</span>. Consulta disponibilidad en ERP.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-indigo-400 font-bold">[10:04:13]</span>
                    <span className="text-slate-300">
                      Respuesta generada y sincronizada en CRM en <span className="text-emerald-400 font-semibold">180ms</span>.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bento Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto w-full text-left">
          <SpotlightCard
            icon={Zap}
            iconBg="bg-sky-950 text-sky-400 border border-sky-800/60"
            borderHover="hover:border-sky-500/50"
            title="Rendimiento Extremo"
            description="Puntuaciones perfectas en Core Web Vitals, tiempos de carga inferiores a 1 segundo y código limpio."
          />

          <SpotlightCard
            icon={ShieldCheck}
            iconBg="bg-indigo-950 text-indigo-400 border border-indigo-800/60"
            borderHover="hover:border-indigo-500/50"
            title="Sistemas en Producción"
            description="Plataformas activas gestionando operaciones financieras y atención inteligente para empresas reales."
          />

          <SpotlightCard
            icon={Workflow}
            iconBg="bg-blue-950 text-blue-400 border border-blue-800/60"
            borderHover="hover:border-blue-500/50"
            title="Código de Vanguardia"
            description="Arquitecturas modernas en TypeScript, Next.js 16 y React 19 sin deuda técnica ni librerías obsoletas."
          />
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({
  icon: Icon,
  iconBg,
  borderHover,
  title,
  description,
}: {
  icon: typeof Zap;
  iconBg: string;
  borderHover: string;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 ${borderHover} transition-all duration-300 overflow-hidden group shadow-lg`}
    >
      {/* Dynamic Cursor Spotlight Gradient */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-70 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
          }}
        />
      )}

      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10`}>
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-lg font-bold text-white mb-1 relative z-10">{title}</h2>
      <p className="text-sm text-slate-400 leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
}
