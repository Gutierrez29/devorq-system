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

export default function Waitlist() {
  const { ref, inView } = useInView();
  const [copied, setCopied] = useState(false);

  const emailAddress = "diego.gutierrez2911@gmail.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=Consulta%20sobre%20Devorq%20Systems`;
  const mailtoUrl = `mailto:${emailAddress}?subject=Consulta%20sobre%20Devorq%20Systems`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contacto"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(91,78,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          transition: "all 0.7s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #EA4335, #E040FB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 12px 40px rgba(234,67,53,0.25)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>

        <div className="section-label" style={{ margin: "0 auto 1rem" }}>
          Contacto Directo
        </div>

        <h2
          style={{
            fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          Hablemos sobre <span className="gradient-text">tu proyecto</span>
        </h2>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--fg-muted)",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
          }}
        >
          Envíanos un mensaje directo con tus consultas o requerimientos operativos. Te responderemos en menos de 24 horas.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          {/* Primary Gmail Web Button */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.9375rem 2.25rem",
              borderRadius: "100px",
              background: "linear-gradient(135deg, #EA4335 0%, #C5221F 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(234, 67, 53, 0.35)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(234, 67, 53, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(234, 67, 53, 0.35)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
            Enviar correo desde Gmail
          </a>

          {/* Copyable email pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              background: "rgba(91,78,255,0.06)",
              border: "1px solid rgba(91,78,255,0.12)",
              borderRadius: "100px",
              padding: "0.4rem 1rem",
              fontSize: "0.8125rem",
              color: "var(--fg-muted)",
              marginTop: "0.5rem",
            }}
          >
            <span>{emailAddress}</span>
            <button
              onClick={copyEmail}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: copied ? "#10B981" : "var(--primary)",
                fontWeight: 700,
                fontSize: "0.78125rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
