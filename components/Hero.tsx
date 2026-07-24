"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "2", label: "Productos en desarrollo" },
  { value: "100%", label: "Orientado a resultados" },
  { value: "LATAM", label: "Foco regional" },
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
        paddingTop: "7rem",
        paddingBottom: "4rem",
        overflow: "hidden",
      }}
    >
      {/* Background mesh gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,78,255,0.12) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 90% 80%, rgba(224,64,251,0.08) 0%, transparent 60%), " +
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
          background: "radial-gradient(circle, rgba(91,78,255,0.15) 0%, rgba(224,64,251,0.08) 60%, transparent 80%)",
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
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
          animation: "blob-morph 12s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Floating decorative icons */}
      <div
        className="floating"
        style={{
          position: "absolute",
          top: "22%",
          right: "15%",
          width: "52px",
          height: "52px",
          background: "white",
          borderRadius: "14px",
          boxShadow: "0 8px 32px rgba(91,78,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          animationDelay: "0s",
        }}
      >
        ⚡
      </div>

      <div
        className="floating-delayed"
        style={{
          position: "absolute",
          top: "45%",
          right: "6%",
          width: "44px",
          height: "44px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(224,64,251,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem",
          animationDelay: "2s",
        }}
      >
        🤖
      </div>

      <div
        className="floating"
        style={{
          position: "absolute",
          bottom: "25%",
          right: "20%",
          width: "40px",
          height: "40px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 8px 32px rgba(6,182,212,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          animationDelay: "1s",
        }}
      >
        📊
      </div>

      {/* Dot grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(91,78,255,0.12) 1px, transparent 1px)",
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
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(91,78,255,0.06)",
            border: "1px solid rgba(91,78,255,0.2)",
            borderRadius: "100px",
            padding: "0.4rem 1.125rem",
            marginBottom: "2rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--primary)",
            animation: "fade-in 0.6s 0.2s both",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--green-wa)",
              display: "inline-block",
              boxShadow: "0 0 6px rgba(37,211,102,0.6)",
              animation: "pulse-ring 2s infinite",
            }}
          />
          Empresa de software latinoamericana
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            marginBottom: "1.5rem",
            animation: "slide-in-bottom 0.8s 0.1s both",
          }}
        >
          Software que
          <br />
          <span className="animated-gradient-text">transforma</span>
          <br />
          negocios reales.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--fg-muted)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            animation: "slide-in-bottom 0.8s 0.2s both",
          }}
        >
          En Devorq construimos herramientas modernas para empresas que quieren operar
          mejor. Sin fricciones, sin código enredado — solo resultados.
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
          <a href="#productos" className="btn-primary">
            Ver productos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contacto" className="btn-secondary">
            Hablar con nosotros
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
    </section>
  );
}
