"use client";

import { useRef, useEffect, useState } from "react";

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
    q: "¿Qué soluciones ofrece actualmente Devorq Systems?",
    a: "Desarrollamos dos plataformas principales: CIGO (control operativo de flotas, combustible, viáticos y revisión contable vía WhatsApp) y ASYS IA (agente conversacional 24/7 para ventas, pedidos y atención al cliente por WhatsApp). También evaluamos implementaciones y automatizaciones a medida.",
  },
  {
    q: "¿Cómo se adapta cada plataforma a los procesos de mi empresa?",
    a: "Realizamos un diagnóstico inicial para configurar reglas operativas, categorías, catálogos, roles de usuario y reportes de acuerdo con la estructura real de tu negocio.",
  },
  {
    q: "¿Necesito contar con un equipo de TI o instalar aplicaciones complejas?",
    a: "No. Nuestras plataformas operan en la nube y aprovechan canales cotidianos como WhatsApp y un panel web intuitivo. Nosotros nos encargamos de la configuración inicial, infraestructura y puesta en marcha.",
  },
  {
    q: "¿Cómo protegen la privacidad y confidencialidad de nuestra información?",
    a: "De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), cada empresa opera en un entorno privado independiente con roles diferenciados y acceso restringido. La información es de titularidad exclusiva de tu empresa.",
  },
  {
    q: "¿Qué acompañamiento recibimos después del lanzamiento?",
    a: "Brindamos soporte directo desde el Perú por WhatsApp y correo electrónico, además de sesiones virtuales de seguimiento para acompañar la adopción del equipo y atender ajustes operativos.",
  },
];

function FaqItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      style={{
        borderBottom: "1px solid rgba(91,78,255,0.08)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          padding: "1.375rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: open ? "var(--primary)" : "var(--fg)",
            lineHeight: 1.4,
            transition: "color 0.2s ease",
          }}
        >
          {faq.q}
        </span>
        {/* Chevron */}
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open ? "var(--primary-light)" : "rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s ease",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "var(--primary)" : "var(--fg-muted)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: "transform 0.25s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Answer */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "300px" : "0",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--fg-muted)",
            lineHeight: 1.75,
            paddingBottom: "1.375rem",
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section
      id="faq"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="section-label" style={{ margin: "0 auto 1rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Preguntas frecuentes
          </div>
          <h2
            style={{
              fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Todo lo que necesitas{" "}
            <span className="gradient-text">saber antes de empezar</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--fg-muted)",
              lineHeight: 1.7,
            }}
          >
            Si tienes alguna consulta adicional sobre tu operación, escríbenos directamente.
          </p>
        </div>

        {/* FAQ list */}
        <div>
          {FAQS.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* CTA bottom */}
        <div
          style={{
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", marginBottom: "1rem" }}>
            ¿Tienes una consulta específica sobre tu empresa o proyecto?
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contacto");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="btn-secondary"
          >
            Contáctanos directamente
          </a>
        </div>
      </div>
    </section>
  );
}
