"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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

const FAQS = [
  {
    q: "¿Cómo se personaliza la solución a las necesidades de mi empresa?",
    a: "Cada negocio opera diferente. Realizamos una sesión de diagnóstico inicial para adaptar las reglas de validación, flujos de trabajo e integraciones a la estructura operativa específica de tu empresa.",
  },
  {
    q: "¿Necesito contar con equipo de TI o conocimientos técnicos?",
    a: "No. Nuestras herramientas están diseñadas para ser utilizadas de inmediato por tu personal operativo. Nosotros gestionamos toda la configuración e infraestructura en la nube.",
  },
  {
    q: "¿Cuánto tiempo toma la implementación y puesta en marcha?",
    a: "El proceso completo toma únicamente de 1 a 2 semanas desde la primera sesión de trabajo. Nos encargamos de toda la configuración, pruebas y capacitación para que tu empresa esté operando al 100% en tiempo récord.",
  },
  {
    q: "¿Cómo garantizan la seguridad y privacidad de nuestra información?",
    a: "Toda la información viaja cifrada mediante protocolos de alta seguridad (SSL/TLS) y se almacena en infraestructura en la nube con respaldos automáticos continuos y acceso restringido.",
  },
  {
    q: "¿Qué acompañamiento recibimos después del lanzamiento?",
    a: "Ofrecemos soporte continuo por correo electrónico y la posibilidad de agendar reuniones virtuales de seguimiento con nuestro equipo para resolver cualquier consulta, realizar ajustes y acompañar la adopción operativa de tu empresa.",
  },
];

function FaqItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`border-b border-slate-800 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors cursor-pointer group"
      >
        <span
          className={`text-base font-semibold leading-relaxed transition-colors ${
            open ? "text-sky-400" : "text-white group-hover:text-sky-300"
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
            open
              ? "bg-sky-500/20 text-sky-400 border-sky-500/40 rotate-180"
              : "bg-slate-900 text-slate-400 border-slate-800 group-hover:text-white"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-slate-400 leading-relaxed pr-8">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            headInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-800/80">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolviendo Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Todo lo que necesitas saber sobre nuestra metodología, soporte y tiempos de entrega.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl">
          {FAQS.map((faq, index) => (
            <FaqItem key={faq.q} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
