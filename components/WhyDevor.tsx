"use client";

import { useRef, useEffect, useState } from "react";
import { Zap, ShieldCheck, Cpu, Check, ArrowRight } from "lucide-react";

function useInView(threshold = 0.05) {
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

const PILLARS = [
  {
    icon: Zap,
    color: "sky",
    badge: "FRONTEND & CLOUD",
    title: "Tecnología de Vanguardia",
    description:
      "Desarrollamos interfaces ultra interactivas y reactivas con React 19, Next.js 16 y Tailwind CSS v4. Arquitecturas limpias sin deuda técnica.",
    points: ["Next.js 16 App Router", "Server Components & Client Islands", "Animaciones a 120 FPS"],
  },
  {
    icon: Cpu,
    color: "indigo",
    badge: "INTELIGENCIA ARTIFICIAL",
    title: "Soluciones de IA Realistas",
    description:
      "Integramos agentes autónomos de IA y flujos multimodales conectados directamente a tus bases de datos y canales como WhatsApp.",
    points: ["Agentes de WhatsApp con ASYS IA", "Automatización de flujos B2B", "Procesamiento de Lenguaje Natural"],
  },
  {
    icon: ShieldCheck,
    color: "emerald",
    badge: "SEGURIDAD & ESCALA",
    title: "Escalabilidad Empresarial",
    description:
      "Aislamiento estricto de datos con Row Level Security, encriptación en tránsito y reposo, y disponibilidad del 99.99% en infraestructura cloud.",
    points: ["Arquitecturas Serverless", "Auditoría en tiempo real", "Cumplimiento normativo y tributario"],
  },
];

export default function WhyDevor() {
  const { ref: titleRef, inView: titleInView } = useInView();

  return (
    <section id="por-que-devor" className="py-24 px-4 sm:px-6 bg-transparent border-y border-slate-800/60 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-800/80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Nuestros Estándares</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Ingeniería de software que marca la{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              diferencia
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            No somos intermediarios ni plantilleros. Diseñamos, programamos y desplegamos plataformas de software que resuelven problemas críticos con precisión quirúrgica.
          </p>
        </div>

        {/* Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} delay={i * 100} />
          ))}
        </div>

        {/* Bottom Banner */}
        <BottomBanner />
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  delay,
}: {
  pillar: (typeof PILLARS)[0];
  delay: number;
}) {
  const { ref, inView } = useInView();
  const Icon = pillar.icon;

  const colorStyles = {
    sky: {
      bgIcon: "bg-sky-950 text-sky-400 border-sky-800/60",
      badge: "text-sky-400 bg-sky-950/80 border border-sky-800/60",
      check: "text-sky-400",
      borderHover: "hover:border-sky-500/50 hover:shadow-sky-500/10",
    },
    indigo: {
      bgIcon: "bg-indigo-950 text-indigo-400 border-indigo-800/60",
      badge: "text-indigo-400 bg-indigo-950/80 border border-indigo-800/60",
      check: "text-indigo-400",
      borderHover: "hover:border-indigo-500/50 hover:shadow-indigo-500/10",
    },
    emerald: {
      bgIcon: "bg-emerald-950 text-emerald-400 border-emerald-800/60",
      badge: "text-emerald-400 bg-emerald-950/80 border border-emerald-800/60",
      check: "text-emerald-400",
      borderHover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    },
  }[pillar.color as "sky" | "indigo" | "emerald"];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        colorStyles.borderHover
      } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${colorStyles.bgIcon}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${colorStyles.badge}`}>
          {pillar.badge}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white tracking-tight mb-3">
        {pillar.title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        {pillar.description}
      </p>

      <ul className="space-y-2.5 pt-4 border-t border-slate-800">
        {pillar.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5 text-xs font-semibold text-slate-300">
            <span className={`rounded-full p-0.5 bg-slate-800 ${colorStyles.check}`}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BottomBanner() {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-blue-950 p-8 sm:p-12 text-white border border-slate-800 shadow-2xl transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-sky-400 font-semibold text-xs tracking-wider uppercase mb-2 inline-block">
            Asesoría Técnica Especializada
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            ¿Tienes una idea o requieres modernizar tu plataforma?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Te mostramos en una demo personalizada cómo podemos diseñar la solución ideal para tu empresa.
          </p>
        </div>

        <a
          href="#contacto"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 shrink-0 group"
        >
          <span>Agendar Sesión Técnica</span>
          <ArrowRight className="w-4 h-4 text-sky-600 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
