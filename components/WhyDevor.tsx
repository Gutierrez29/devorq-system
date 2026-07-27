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

const PILLARS = [
  {
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    color: "#5B4EFF",
    bg: "rgba(91,78,255,0.06)",
    title: "Tecnología de vanguardia",
    description:
      "Construimos con las últimas versiones de los frameworks más robustos del mercado. Nada de legacy, nada de deuda técnica innecesaria.",
    points: ["Next.js & React 19", "IA y machine learning", "Infraestructura en la nube"],
  },
  {
    iconPath: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.06)",
    title: "Diseñado para el mundo real",
    description:
      "Cada función existe porque un negocio real la necesita. No construimos features para impresionar — construimos para resolver.",
    points: ["Flujos de trabajo reales", "Onboarding sin fricción", "UX probada con usuarios"],
  },
  {
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    color: "#10B981",
    bg: "rgba(16,185,129,0.06)",
    title: "Escalable y seguro",
    description:
      "Arquitecturas que crecen contigo. Seguridad por diseño, no como afterthought. Desde una empresa hasta miles de usuarios.",
    points: ["Row Level Security", "Auditoría completa", "Alta disponibilidad"],
  },
];

export default function WhyDevor() {
  const { ref: titleRef, inView: titleInView } = useInView();

  return (
    <section id="por-que-devor" style={{ padding: "6rem 1.5rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            transition: "all 0.7s ease",
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            ¿Por qué Devorq?
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Principios que guían{" "}
            <span className="gradient-text">cada línea de código</span>
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--fg-muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            No somos un estudio de freelancers ni una agencia. Somos un equipo producto — construimos, iteramos y mantenemos.
          </p>
        </div>

        {/* Pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} delay={i * 100} />
          ))}
        </div>

        {/* Bottom banner */}
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
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        border: `1px solid ${hovered ? pillar.color + "30" : "rgba(91,78,255,0.07)"}`,
        borderRadius: "1.25rem",
        padding: "2rem",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: inView
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: hovered
          ? `0 16px 48px ${pillar.color}18, 0 4px 16px rgba(13,8,32,0.06)`
          : "var(--shadow-sm)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: pillar.bg,
          border: `1.5px solid ${pillar.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke={pillar.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {pillar.iconPath.split(" M ").map((seg, i) => (
            <path key={i} d={i === 0 ? seg : `M ${seg}`} />
          ))}
        </svg>
      </div>

      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
          color: "var(--fg)",
        }}
      >
        {pillar.title}
      </h3>

      <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        {pillar.description}
      </p>

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {pillar.points.map((point) => (
          <li
            key={point}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: pillar.color,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={pillar.color} strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {point}
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
      style={{
        marginTop: "3rem",
        background: "linear-gradient(135deg, #5B4EFF 0%, #E040FB 100%)",
        borderRadius: "1.5rem",
        padding: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.7s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <div
        style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "-20px", left: "30%",
          width: "120px", height: "120px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />

      <div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "0.375rem" }}>
          ¿Tienes un proyecto en mente?
        </h3>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem" }}>
          Cuéntanos tu problema y encontramos la solución.
        </p>
      </div>

      <a
        href="#contacto"
        style={{
          background: "white",
          color: "var(--primary)",
          fontWeight: 700,
          fontSize: "0.9375rem",
          padding: "0.875rem 2rem",
          borderRadius: "100px",
          textDecoration: "none",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
        }}
      >
        Conversemos →
      </a>
    </div>
  );
}
