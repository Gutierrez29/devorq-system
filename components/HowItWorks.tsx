"use client";

import { useRef, useEffect, useState } from "react";
import { MessageSquare, Sliders, LineChart, ArrowRight } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico de tu operación",
    description:
      "Analizamos cómo trabaja tu empresa hoy: qué procesos manuales generan errores, dónde se pierde tiempo y qué controles necesitas automatizar.",
    icon: MessageSquare,
    badgeColor: "text-sky-400 bg-sky-950/80 border-sky-800/80",
    iconBg: "bg-sky-950 text-sky-400 border-sky-800/60",
  },
  {
    number: "02",
    title: "Arquitectura y despliegue rápido",
    description:
      "Adaptamos nuestras plataformas e integraciones con IA a tu flujo real. Sin código que tengas que mantener ni meses de espera: en días estás operando.",
    icon: Sliders,
    badgeColor: "text-indigo-400 bg-indigo-950/80 border-indigo-800/80",
    iconBg: "bg-indigo-950 text-indigo-400 border-indigo-800/60",
  },
  {
    number: "03",
    title: "Operación fluida con métricas en vivo",
    description:
      "Dashboards claros, auditorías tributarias automáticas y alertas presupuestales. Tu equipo enfocado en el negocio, no en planillas desordenadas.",
    icon: LineChart,
    badgeColor: "text-emerald-400 bg-emerald-950/80 border-emerald-800/80",
    iconBg: "bg-emerald-950 text-emerald-400 border-emerald-800/60",
  },
];

export default function HowItWorks() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            headInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-800/80">
            <span>Metodología</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            De la consulta a la producción en{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              tres pasos
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Un proceso ágil y transparente diseñado para entregar valor tangible desde la primera semana.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-6 font-mono font-black text-5xl text-slate-800/40 select-none group-hover:text-slate-800/70 transition-colors">
                  {step.number}
                </span>

                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${step.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group"
          >
            <span>¿Listo para comenzar el diagnóstico de tu empresa?</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
