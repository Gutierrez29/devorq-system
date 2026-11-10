"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  Copy,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";

const PROJECT_TYPES = [
  "Plataforma Web a Medida",
  "Agente de IA / Automatización",
  "Implementación CIGO",
  "Solución ASYS IA",
  "Auditoría & Optimización",
];

export default function Waitlist() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const emailAddress = "contacto@devorq.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    // Simular preparación y canal de envío instantáneo
    setTimeout(() => {
      setStatus("success");
      const subject = encodeURIComponent(`Consulta de Proyecto [${selectedType}] - ${fullName || "Empresa"}`);
      const body = encodeURIComponent(
        `Hola equipo Devorq,\n\n` +
        `Mi nombre: ${fullName}\n` +
        `Correo: ${email}\n` +
        `Tipo de Solución: ${selectedType}\n\n` +
        `Requerimiento:\n${details || "Deseo agendar una sesión exploratoria para mi empresa."}\n\n` +
        `Saludos.`
      );
      // Abrir cliente preferido en una ventana o pestaña limpia
      window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_blank");
    }, 600);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-transparent text-white relative overflow-hidden z-10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contacto Directo & Cotizaciones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Construyamos el próximo nivel de tu{" "}
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              infraestructura digital
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Conversemos sobre tu producto o requerimiento técnico. Diseñamos soluciones personalizadas que escalan sin fisuras.
          </p>
        </div>

        {/* Lead Form Card */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/40">
          {status === "success" ? (
            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-5">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Requerimiento Iniciado!</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                Hemos preparado el borrador con los detalles de tu consulta. Tu cliente de correo se ha abierto o puedes contactarnos directamente a{" "}
                <span className="text-sky-400 font-mono font-medium">{emailAddress}</span>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  ¿Qué tipo de solución buscas?
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition-all cursor-pointer ${
                        selectedType === type
                          ? "bg-sky-500 text-white shadow-md shadow-sky-500/30 font-semibold"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tu Nombre o Empresa
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Ej. Martín Vega / Logística Andina"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Correo Electrónico Corporativo
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="martin@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Details textarea */}
              <div>
                <label htmlFor="details" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Cuéntanos sobre tu objetivo o desafío técnico
                </label>
                <textarea
                  id="details"
                  rows={3}
                  placeholder="Describe brevemente el flujo, los volúmenes o las características clave que deseas implementar..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-400" />
                    Respuesta en &lt;24 horas
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Confidencialidad garantizada
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Procesando..." : "Solicitar Propuesta Técnica"}</span>
                </button>
              </div>
            </form>
          )}

          {/* Quick Direct Actions Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="text-slate-400">
              ¿Prefieres escribirnos directamente?
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-300">{emailAddress}</span>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all active:scale-95 cursor-pointer font-medium"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
