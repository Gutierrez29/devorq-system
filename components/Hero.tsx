"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "En Ruta", label: "Digitalización de tickets y odómetro" },
  { value: "Km / Gal", label: "Seguimiento de consumo por unidad" },
  { value: "7 Días", label: "Prueba gratis con hasta 10 unidades" },
  { value: "WhatsApp", label: "Operación sin instalar aplicaciones" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        heroRef.current.getBoundingClientRect();
      const x = ((clientX - left) / width - 0.5) * 20;
      const y = ((clientY - top) / height - 0.5) * 20;

      const blob = heroRef.current.querySelector<HTMLElement>(".hero-blob");
      if (blob) {
        blob.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        paddingTop: "7.5rem",
        paddingBottom: "4.5rem",
        overflow: "hidden",
      }}
    >
      {/* Background mesh gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.12) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 90% 80%, rgba(124,58,237,0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 40% 50% at 10% 90%, rgba(6,182,212,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated blobs */}
      <div
        className="hero-blob"
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, rgba(124,58,237,0.08) 60%, transparent 80%)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          animation: "blob-morph 10s ease-in-out infinite",
          transition: "transform 0.8s ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)",
          borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
          animation: "blob-morph 12s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(14,165,233,0.14) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          animation: "slide-in-bottom 0.8s ease both",
        }}
      >
        {/* Floating Interactive Badge (Left) - Desktop only */}
        <div
          className="badge-float-1 glass-pill"
          style={{
            position: "absolute",
            top: "20px",
            left: "2%",
            padding: "0.5rem 1rem",
            borderRadius: "100px",
            display: "none",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#0F172A",
            zIndex: 2,
          }}
          id="hero-badge-left"
        >
          <span className="radar-live" />
          <span>Telemetría Km/Galón en Vivo</span>
        </div>

        {/* Floating Interactive Badge (Right) - Desktop only */}
        <div
          className="badge-float-2 glass-pill"
          style={{
            position: "absolute",
            top: "80px",
            right: "2%",
            padding: "0.5rem 1rem",
            borderRadius: "100px",
            display: "none",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#0F172A",
            zIndex: 2,
          }}
          id="hero-badge-right"
        >
          <span style={{ color: "#0EA5E9", fontWeight: 900 }}>✓ En Ruta</span>
          <span>Digitalización por WhatsApp</span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(14, 165, 233, 0.08)",
            border: "1px solid rgba(14, 165, 233, 0.25)",
            borderRadius: "100px",
            padding: "0.4rem 1.125rem",
            marginBottom: "1.75rem",
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "#0284C7",
            boxShadow: "0 2px 10px rgba(14, 165, 233, 0.08)",
            animation: "fade-in 0.6s 0.2s both",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#10B981",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.7)",
              animation: "pulse-ring 2s infinite",
            }}
          />
          Plataformas Empresariales B2B · Conexión Directa con SUNAT & WhatsApp
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "1.35rem",
            animation: "slide-in-bottom 0.8s 0.1s both",
            color: "#0F172A",
          }}
        >
          Software que
          <br />
          <span className="animated-gradient-text">automatiza</span>
          <br />
          operaciones reales.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#475569",
            maxWidth: "680px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            animation: "slide-in-bottom 0.8s 0.2s both",
          }}
        >
          Construimos tecnología de alta precisión para transporte, finanzas y atención al cliente. Cero fricción, cero apps complejas: tus equipos operan desde WhatsApp y supervisas en tiempo real.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "slide-in-bottom 0.8s 0.3s both",
          }}
        >
          <button
            onClick={() => {
              const el = document.getElementById("cigo");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="btn-primary"
            style={{ border: "none", cursor: "pointer" }}
          >
            Ver productos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a href="#contacto" className="btn-secondary">
            Hablar con nosotros
          </a>
          <a
            href="/cigo/carta-presentacion-cigo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ borderColor: "rgba(14,165,233,0.35)", color: "#0284C7" }}
          >
            📄 Ver Carta de Presentación CIGO
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(91,78,255,0.1)",
            animation: "slide-in-bottom 0.8s 0.5s both",
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "0.375rem",
                }}
                className="gradient-text"
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--fg-muted)", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: "fade-in 1s 1s both",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: "22px",
            height: "36px",
            border: "2px solid rgba(91,78,255,0.4)",
            borderRadius: "100px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "4px",
              height: "8px",
              background: "var(--primary)",
              borderRadius: "2px",
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #hero-badge-left {
            display: flex !important;
          }
          #hero-badge-right {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}

