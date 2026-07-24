"use client";

import { useRef, useEffect, useState } from "react";

const CIGO_FEATURES = [
  "Gestión de comprobantes electrónicos",
  "Control de choferes y flota",
  "Exportación SIRE / SUNAT",
  "Reportes en Excel y PDF",
  "Roles y permisos por usuario",
  "Auditoría de cambios en tiempo real",
];

const ASYS_FEATURES = [
  "Atención al cliente 24/7 por WhatsApp",
  "Toma de pedidos automática",
  "Gestión de reservas y citas",
  "Soporte técnico inteligente",
  "Integración con sistemas existentes",
  "Múltiples negocios desde un panel",
];

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ProductCard({
  tag,
  tagColor,
  gradient,
  icon,
  title,
  subtitle,
  description,
  features,
  cta,
  ctaStyle,
  delay,
  accent,
}: {
  tag: string;
  tagColor: string;
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  ctaStyle: "primary" | "secondary";
  delay: number;
  accent: string;
}) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1",
        minWidth: "300px",
        background: "white",
        borderRadius: "1.5rem",
        border: "1px solid rgba(91,78,255,0.1)",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 24px 60px ${accent}28, 0 8px 24px rgba(13,8,32,0.08)`
          : "0 4px 20px rgba(13,8,32,0.06)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: inView
          ? hovered
            ? "translateY(-8px) scale(1.01)"
            : "translateY(0) scale(1)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        cursor: "default",
      }}
    >
      {/* Card header with gradient */}
      <div
        style={{
          background: gradient,
          padding: "2rem 2rem 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "130px", height: "130px", borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20px", right: "40px",
          width: "80px", height: "80px", borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }} />

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.3rem 0.875rem",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {tag}
          </span>
          <span style={{ fontSize: "2.25rem" }}>{icon}</span>
        </div>

        <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.375rem" }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
          {subtitle}
        </p>
      </div>

      {/* Card body */}
      <div style={{ padding: "2rem" }}>
        <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {description}
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
          {features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: "var(--fg-muted)" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: accent + "18",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href={ctaStyle === "primary" ? "#contacto" : "#asys-ia"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0.875rem",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "0.9375rem",
            textDecoration: "none",
            transition: "all 0.2s ease",
            ...(ctaStyle === "primary"
              ? {
                  background: gradient,
                  color: "white",
                  boxShadow: `0 6px 20px ${accent}40`,
                }
              : {
                  background: "transparent",
                  color: accent,
                  border: `1.5px solid ${accent}50`,
                }),
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${accent}50`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = ctaStyle === "primary" ? `0 6px 20px ${accent}40` : "none";
          }}
        >
          {cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Products() {
  const { ref: titleRef, inView: titleInView } = useInView();

  return (
    <section id="productos" style={{ padding: "6rem 1.5rem", background: "var(--bg-secondary)" }}>
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
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Nuestros productos
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
            Herramientas hechas para{" "}
            <span className="gradient-text">el mundo real</span>
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--fg-muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Cada producto resuelve un problema concreto. Sin features de relleno, sin curvas de aprendizaje innecesarias.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <ProductCard
            tag="Disponible"
            tagColor="#0EA5E9"
            gradient="linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)"
            icon="📦"
            title="CIGO"
            subtitle="Sistema de gestión empresarial para transporte"
            description="ERP diseñado específicamente para empresas de transporte en Perú. Gestiona comprobantes electrónicos, choferes y reportes de forma integrada con SUNAT y SIRE."
            features={CIGO_FEATURES}
            cta="Contactar equipo"
            ctaStyle="primary"
            delay={0}
            accent="#0EA5E9"
          />
          <ProductCard
            tag="Próximamente"
            tagColor="#7C3AED"
            gradient="linear-gradient(135deg, #7C3AED 0%, #E040FB 100%)"
            icon="🤖"
            title="ASYS IA"
            subtitle="Agente de IA para negocios vía WhatsApp"
            description="Chatbot con inteligencia artificial que atiende a tus clientes 24/7 por WhatsApp. Gestiona pedidos, reservas y soporte sin intervención humana constante."
            features={ASYS_FEATURES}
            cta="Unirme a la lista de espera"
            ctaStyle="secondary"
            delay={120}
            accent="#7C3AED"
          />
        </div>
      </div>
    </section>
  );
}
