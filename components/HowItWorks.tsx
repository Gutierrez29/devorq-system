"use client";

import { useRef, useEffect, useState } from "react";

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
    title: "Diagnóstico de tu Operación",
    description:
      "Analizamos tus procesos actuales en operaciones, administración o atención al cliente para identificar cuellos de botella y definir el flujo ideal con CIGO, ASYS IA o una solución a medida.",
    color: "#0EA5E9",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Configuración y Despliegue",
    description:
      "Adaptamos la plataforma a las reglas de tu empresa, integramos los canales de WhatsApp y capacitamos a tu equipo sin fricciones técnicas ni necesidad de instalar apps complejas.",
    color: "#5B4EFF",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <polyline points="9 11 12 14 22 4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Control y Métricas en Vivo",
    description:
      "Tu operación fluye desde WhatsApp mientras gerencia y administración supervisan reportes, alertas, pedidos o liquidaciones en tiempo real desde la web.",
    color: "#10B981",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

function StepCard({ step, delay, isLast }: { step: typeof STEPS[0]; delay: number; isLast: boolean }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        position: "relative",
      }}
    >
      {/* Connector line (not on last) */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            top: "28px",
            left: "calc(50% + 32px)",
            right: "calc(-50% + 32px)",
            height: "1px",
            background: `linear-gradient(90deg, ${step.color}40, rgba(0,0,0,0.06))`,
            zIndex: 0,
          }}
          className="step-connector"
        />
      )}

      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem 1.5rem",
          borderRadius: "20px",
          background: hovered ? "white" : "transparent",
          boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.06)" : "none",
          border: hovered ? "1px solid rgba(0,0,0,0.04)" : "1px solid transparent",
          transition: "all 0.3s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transitionDelay: `${delay}ms`,
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: `${step.color}12`,
            border: `1.5px solid ${step.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: step.color,
            marginBottom: "1.25rem",
            transition: "transform 0.3s ease, background 0.3s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {step.icon}
        </div>

        {/* Step number */}
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: step.color,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            opacity: 0.8,
          }}
        >
          Paso {step.number}
        </span>

        <h3
          style={{
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "var(--fg)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: "260px",
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section
      id="como-funciona"
      style={{
        padding: "6rem 1.5rem",
        background: "#F8F9FC",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="section-label" style={{ margin: "0 auto 1rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Proceso
          </div>
          <h2
            style={{
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Implementación en 3 Pasos,{" "}
            <span className="gradient-text">Cero Complicaciones</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--fg-muted)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Sin equipos de TI internos ni meses de integración. Tres pasos para poner en marcha nuestras plataformas en tu empresa.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            gap: "0",
            alignItems: "flex-start",
          }}
          className="steps-grid"
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              delay={i * 120}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
