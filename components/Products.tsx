"use client";

import Link from "next/link";
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

/* --- CIGO Visual Mockup --- */
function CigoMockup() {
  const rows = [
    { code: "#24-A", detail: "Autopista Del Norte S.A.C.", amount: "S/. 1,240.00", status: "✓ Válido SUNAT" },
    { code: "#23-A", detail: "Repsol Peajes & Combustible", amount: "S/. 890.00", status: "✓ Válido SUNAT" },
    { code: "#22-A", detail: "Concesionaria Vial Sierra Norte", amount: "S/. 3,100.00", status: "✓ Válido SUNAT" },
    { code: "#21-A", detail: "Autopista Del Norte S.A.C.", amount: "S/. 670.00", status: "✓ Válido SUNAT" },
    { code: "#20-A", detail: "Servicios de Transporte LATAM", amount: "S/. 1,450.00", status: "✓ Válido SUNAT" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F8FAFC",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid rgba(14,165,233,0.2)",
        boxShadow: "0 8px 30px rgba(14,165,233,0.08)",
        fontSize: "0.78rem",
      }}
    >
      {/* Top Navbar */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          padding: "0.6rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* CIGO Real Logo */}
          <img
            src="/cigo-logo.webp"
            alt="CIGO Logo"
            style={{ height: "22px", width: "auto", objectFit: "contain" }}
          />
          <div style={{ height: "14px", width: "1px", background: "#CBD5E1" }} />
          <span style={{ fontWeight: 600, color: "#334155", fontSize: "0.78rem" }}>Historial de Comprobantes</span>
          <span style={{ background: "#E0F2FE", color: "#0EA5E9", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "100px", fontSize: "0.68rem" }}>
            Flota Activa
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B", fontSize: "0.72rem" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#0EA5E9", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.65rem" }}>
            C
          </div>
          <span style={{ fontWeight: 600, color: "#1E293B" }}>Cesar Pereda</span>
        </div>
      </div>

      {/* Content Table Area — Full Width without Sidebar */}
      <div style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflow: "hidden", background: "#F8FAFC" }}>
        {/* Header & Filter Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", padding: "0.65rem 1rem", borderRadius: "10px", border: "1px solid #E2E8F0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.92rem" }}>Comprobantes Auditados</span>
            <span style={{ fontSize: "0.75rem", color: "#10B981", fontWeight: 700 }}>● 100% Válidos SUNAT</span>
          </div>
          <span style={{ background: "#E0F2FE", color: "#0284C7", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "6px", fontSize: "0.75rem" }}>
            Filtrar por RUC
          </span>
        </div>

        {/* Table */}
        <div style={{ background: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0", overflow: "hidden", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2.5fr 1.2fr 1.4fr",
              padding: "0.65rem 1rem",
              background: "#F1F5F9",
              fontWeight: 700,
              color: "#475569",
              fontSize: "0.78rem",
              borderBottom: "1px solid #E2E8F0",
              flexShrink: 0,
            }}
          >
            <span>Código</span>
            <span>Proveedor / Detalle</span>
            <span>Monto</span>
            <span>Estado SUNAT</span>
          </div>

          {/* Table Rows */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {rows.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2.5fr 1.2fr 1.4fr",
                  padding: "0.7rem 1rem",
                  borderBottom: i < rows.length - 1 ? "1px solid #F1F5F9" : "none",
                  alignItems: "center",
                  fontSize: "0.82rem",
                  background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                }}
              >
                <span style={{ fontWeight: 800, color: "#0EA5E9" }}>{r.code}</span>
                <span style={{ fontWeight: 600, color: "#1E293B" }}>{r.detail}</span>
                <span style={{ fontWeight: 800, color: "#0F172A" }}>{r.amount}</span>
                <span>
                  <span style={{ background: "rgba(16,185,129,0.12)", color: "#059669", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "100px", fontSize: "0.75rem", display: "inline-block" }}>
                    {r.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- ASYS Visual Mockup --- */
function AsysMockup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #faf5ff 0%, #f3e8ff 100%)",
        borderRadius: "16px",
        padding: "0.75rem",
      }}
    >
      {/* Phone container mockup: narrow & tall */}
      <div
        style={{
          width: "320px",
          height: "100%",
          background: "#ECE5DD",
          borderRadius: "18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          boxShadow: "0 12px 32px rgba(124, 58, 237, 0.15), 0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* WhatsApp Header Bar */}
        <div
          style={{
            background: "#075E54",
            padding: "0.55rem 0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            {/* Avatar */}
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.1 }}>
                ASYS
              </div>
              <div style={{ fontSize: "0.62rem", opacity: 0.85 }}>en línea</div>
            </div>
          </div>

          {/* Action icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", opacity: 0.85 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        {/* Messages area */}
        <div
          style={{
            padding: "0.55rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Date pill */}
          <div style={{ textAlign: "center", margin: "0.05rem 0" }}>
            <span style={{ background: "rgba(255,255,255,0.85)", color: "#54656F", fontSize: "0.58rem", fontWeight: 600, padding: "0.15rem 0.55rem", borderRadius: "6px", boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}>
              HOY
            </span>
          </div>

          {/* User message 1 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                maxWidth: "86%",
                background: "#DCF8C6",
                color: "#111B21",
                padding: "0.4rem 0.6rem",
                borderRadius: "8px 0px 8px 8px",
                fontSize: "0.7rem",
                lineHeight: 1.35,
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              }}
            >
              Hola! ¿Tienen stock de las zapatillas urbanas en talla 41?
              <div style={{ fontSize: "0.56rem", color: "#667781", textAlign: "right", marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2px" }}>
                14:30 <span style={{ color: "#53bdeb", fontWeight: 700 }}>✓✓</span>
              </div>
            </div>
          </div>

          {/* Bot message 1 */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                maxWidth: "88%",
                background: "#FFFFFF",
                color: "#111B21",
                padding: "0.4rem 0.6rem",
                borderRadius: "0px 8px 8px 8px",
                fontSize: "0.7rem",
                lineHeight: 1.35,
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              }}
            >
              ¡Hola! 👋 Sí tenemos en stock. Su precio es S/. 240 con envío gratis hoy a todo Lima.
              <div style={{ fontSize: "0.56rem", color: "#667781", textAlign: "right", marginTop: "1px" }}>
                14:30
              </div>
            </div>
          </div>

          {/* User message 2 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                maxWidth: "86%",
                background: "#DCF8C6",
                color: "#111B21",
                padding: "0.4rem 0.6rem",
                borderRadius: "8px 0px 8px 8px",
                fontSize: "0.7rem",
                lineHeight: 1.35,
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              }}
            >
              Excelente, envíenmelas a Miraflores por favor.
              <div style={{ fontSize: "0.56rem", color: "#667781", textAlign: "right", marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2px" }}>
                14:31 <span style={{ color: "#53bdeb", fontWeight: 700 }}>✓✓</span>
              </div>
            </div>
          </div>

          {/* Bot message 2 */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                maxWidth: "88%",
                background: "#FFFFFF",
                color: "#111B21",
                padding: "0.4rem 0.6rem",
                borderRadius: "0px 8px 8px 8px",
                fontSize: "0.7rem",
                lineHeight: 1.35,
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              }}
            >
              ¡Perfecto! Pedido registrado. Te envío el link de pago seguro 💳
              <div style={{ fontSize: "0.56rem", color: "#667781", textAlign: "right", marginTop: "1px" }}>
                14:31
              </div>
            </div>
          </div>

          {/* User message 3 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                maxWidth: "86%",
                background: "#DCF8C6",
                color: "#111B21",
                padding: "0.4rem 0.6rem",
                borderRadius: "8px 0px 8px 8px",
                fontSize: "0.7rem",
                lineHeight: 1.35,
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              }}
            >
              Listo, pago realizado!
              <div style={{ fontSize: "0.56rem", color: "#667781", textAlign: "right", marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2px" }}>
                14:32 <span style={{ color: "#53bdeb", fontWeight: 700 }}>✓✓</span>
              </div>
            </div>
          </div>

          {/* Bot message 3 */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                maxWidth: "88%",
                background: "#FFFFFF",
                color: "#111B21",
                padding: "0.4rem 0.6rem",
                borderRadius: "0px 8px 8px 8px",
                fontSize: "0.7rem",
                lineHeight: 1.35,
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              }}
            >
              ¡Gracias por tu compra! Tu pedido sale en camino en breve 🚀
              <div style={{ fontSize: "0.56rem", color: "#667781", textAlign: "right", marginTop: "1px" }}>
                14:32
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div
          style={{
            background: "#F0F2F5",
            padding: "0.4rem 0.65rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "0.35rem 0.75rem",
              fontSize: "0.65rem",
              color: "#8696A0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Escribe un mensaje</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </div>

          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "#00A884",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Product Row --- */
function ProductRow({
  reverse,
  accent,
  accentLight,
  gradient,
  label,
  tagline,
  description,
  features,
  href,
  visual,
  delay = 0,
  id,
  showUpArrow,
  scrollToId,
  isComingSoon,
}: {
  reverse?: boolean;
  accent: string;
  accentLight: string;
  gradient: string;
  label: string;
  tagline: string;
  description: string;
  features: { icon: string; title: string; desc: string }[];
  href: string;
  visual: React.ReactNode;
  delay?: number;
  id?: string;
  showUpArrow?: boolean;
  scrollToId?: string;
  isComingSoon?: boolean;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      id={id}
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className="product-row"
    >
      {/* Copy — izquierda o derecha según reverse */}
      <div style={{ order: reverse ? 2 : 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: accentLight,
              color: accent,
              fontSize: "0.8125rem",
              fontWeight: 700,
              padding: "0.35rem 0.875rem",
              borderRadius: "100px",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, display: "inline-block" }} />
            {label}
          </div>

          {showUpArrow && scrollToId && (
            <button
              onClick={() => {
                const el = document.getElementById(scrollToId);
                if (el) {
                  const yOffset = -70;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              aria-label="Volver a CIGO"
              title="Volver a CIGO"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1.5px solid rgba(14, 165, 233, 0.3)",
                boxShadow: "0 4px 12px rgba(14, 165, 233, 0.16)",
                color: "#0EA5E9",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(14, 165, 233, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(14, 165, 233, 0.16)";
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: "bounce-up 1.8s infinite ease-in-out" }}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>

        <h3
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          {tagline}
        </h3>

        <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.75, marginBottom: "1.75rem" }}>
          {description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  background: accentLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.15rem" }}>{f.title}</div>
                <div style={{ fontSize: "0.84rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {isComingSoon ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.75rem",
              borderRadius: "100px",
              background: "#94A3B8",
              color: "white",
              fontWeight: 700,
              fontSize: "0.9375rem",
              cursor: "not-allowed",
              boxShadow: "0 4px 14px rgba(148,163,184,0.3)",
              userSelect: "none",
            }}
          >
            Próximamente
          </div>
        ) : (
          <Link
            href={href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.75rem",
              borderRadius: "100px",
              background: gradient,
              color: "white",
              fontWeight: 700,
              fontSize: "0.9375rem",
              textDecoration: "none",
              boxShadow: `0 8px 24px ${accent}28`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 14px 32px ${accent}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${accent}28`;
            }}
          >
            Conocer {label}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Visual */}
      <div
        style={{
          height: "430px",
          borderRadius: "20px",
          border: `1px solid ${accent}18`,
          boxShadow: `0 16px 48px ${accent}10, 0 4px 16px rgba(0,0,0,0.04)`,
          overflow: "hidden",
          padding: "1.25rem",
          background: "white",
          order: reverse ? 1 : 2,
        }}
      >
        {visual}
      </div>
    </div>
  );
}

/* --- Main Section --- */
export default function Products() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section
      id="productos"
      style={{
        padding: "3rem 1.5rem 6rem",
        background: "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="section-label" style={{ margin: "0 auto 1rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Nuestras Soluciones
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "0.875rem",
            }}
          >
            Dos productos. <span className="gradient-text">Un objetivo.</span>
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--fg-muted)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Cada herramienta ataca un problema específico de tu operación y se implementa en días.
          </p>
        </div>

        {/* Products stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
          {/* CIGO */}
          <ProductRow
            id="cigo"
            accent="#0EA5E9"
            accentLight="rgba(14,165,233,0.08)"
            gradient="linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)"
            label="CIGO"
            tagline="Control Inteligente de Gastos Operativos"
            description="Centralizá y automatizá el control de gastos de tu flota. Validá comprobantes en tiempo real contra SUNAT y eliminá errores antes de que se conviertan en multas."
            features={[
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Auditoría SUNAT en tiempo real",
                desc: "Verifica CDR de cada comprobante automáticamente, sin procesos manuales.",
              },
              {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "Candados anti-duplicados",
                desc: "Detecta y bloquea facturas duplicadas antes de que ingresen al sistema.",
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "Dashboard de flota y rutas",
                desc: "Gastos por chofer, ruta y vehículo en una sola pantalla.",
              },
            ]}
            href="/cigo"
            visual={<CigoMockup />}
          />

          {/* Interactive Scroll Down Indicator to ASYS (Below CIGO) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginTop: "-1.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.18), transparent)",
                zIndex: 0,
              }}
            />

            {/* Down Arrow (Purple) to ASYS */}
            <button
              onClick={() => {
                const el = document.getElementById("asys-ia");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              aria-label="Bajar a ASYS IA"
              title="Bajar a ASYS IA"
              style={{
                position: "relative",
                zIndex: 1,
                width: "42px",
                height: "42px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                border: "1.5px solid rgba(124, 58, 237, 0.3)",
                boxShadow: "0 6px 16px rgba(124, 58, 237, 0.16)",
                borderRadius: "50%",
                color: "#7C3AED",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(124, 58, 237, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(124, 58, 237, 0.16)";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: "bounce-down 1.8s infinite ease-in-out" }}
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* ASYS IA (espejado) */}
          <ProductRow
            id="asys-ia"
            reverse
            accent="#7C3AED"
            accentLight="rgba(124,58,237,0.08)"
            gradient="linear-gradient(135deg, #7C3AED 0%, #E040FB 100%)"
            label="ASYS IA"
            tagline="Agente de Ventas con Inteligencia Artificial"
            description="Automatizá la atención a clientes en WhatsApp con IA. Vendé, cotizá y agendá reservas las 24 horas sin intervención humana."
            features={[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Atención 24/7 sin pausas",
                desc: "Responde consultas y cierra ventas fuera del horario laboral automáticamente.",
              },
              {
                icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Toma de pedidos automática",
                desc: "Tu catálogo integrado: el agente procesa pedidos completos sin fricción.",
              },
              {
                icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
                title: "Personalidad de tu marca",
                desc: "Configuramos el agente con tu voz, tono y respuestas específicas.",
              },
            ]}
            href="#"
            visual={<AsysMockup />}
            delay={100}
            showUpArrow
            scrollToId="cigo"
            isComingSoon={true}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-row {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .product-row > div {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
