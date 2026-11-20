"use client";

import { useRef, useEffect, useState } from "react";

const REGISTER_URL = "https://cigo.devorq.com/registro";
const WSP_MAIN =
  "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quisiera%20agendar%20una%20demostraci%C3%B3n%20gratuita%20de%2015%20minutos%20de%20CIGO%20para%20mi%20flota.";
const DEMO_VIDEO_URL = "https://q.me-qr.com/ll0rpmpm";
const CARTA_PDF_URL = "/cigo/carta-presentacion-cigo.pdf";
const BROCHURE_PDF_URL = "/cigo/brochure-cigo.pdf";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const CLIENTS = [
  {
    tag: "Flota Corporativa · Carga Nacional",
    name: "GRUPO TRANSYACU — TRANSYACU S.A.C.",
    ruc: "RUC: 20558624605",
    description:
      "Operación con más de 25 tractocamiones (Scania, Volvo, Freightliner y Mercedes-Benz) y más de 30 plataformas/semirremolques, gestionando reportes de combustible, lecturas de odómetro y viáticos en rutas nacionales.",
    highlights: [
      "+25 Tractocamiones en ruta",
      "+30 Semirremolques / Plataformas",
      "Control de combustible y viáticos por WhatsApp",
    ],
  },
  {
    tag: "Transporte de Carga Pesada",
    name: "DIFEYA S.A.C.",
    ruc: "RUC: 20539547233",
    description:
      "Control operativo de flota pesada con seguimiento de viajes asignados, registro de transferencias de viáticos, digitalización fotográfica de comprobantes de compra en carretera y pre-liquidación asistida por WhatsApp.",
    highlights: [
      "Seguimiento de saldos por viaje",
      "Digitalización de boletas y facturas en ruta",
      "Exportación contable en Excel y archivo ZIP",
    ],
  },
];

export default function RoiCalculator() {
  const { ref, inView } = useInView();

  return (
    <section
      id="documentacion-cigo"
      style={{
        padding: "5.5rem 1.5rem",
        background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
          <div className="section-label" style={{ margin: "0 auto 1rem" }}>
            <span className="radar-live" />
            Respaldo Operativo & Documentación Oficial
          </div>
          <h2
            style={{
              fontSize: "clamp(1.85rem, 3.8vw, 2.65rem)",
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: "0.9rem",
            }}
          >
            Empresas que ya Operan con CIGO y{" "}
            <span className="gradient-text">Documentación Ejecutiva</span>
          </h2>
          <p style={{ fontSize: "1.02rem", color: "#475569", lineHeight: 1.7 }}>
            Conoce las flotas de transporte de carga pesada que ya utilizan CIGO en el Perú y revisa nuestra Carta de Presentación formal, el Brochure Comercial y el Video Demostrativo del sistema.
          </p>
        </div>

        {/* Part 1: Real Client References */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {CLIENTS.map((client) => (
            <article
              key={client.ruc}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "2rem",
                border: "1px solid #CBD5E1",
                borderLeft: "5px solid #0284C7",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#0284C7",
                    background: "#E0F2FE",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {client.tag}
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {client.name}
                </h3>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#64748B",
                    marginBottom: "1rem",
                  }}
                >
                  {client.ruc}
                </div>
                <p
                  style={{
                    fontSize: "0.94rem",
                    color: "#334155",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                  }}
                >
                  {client.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #F1F5F9",
                }}
              >
                {client.highlights.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "8px",
                    }}
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Part 2: Official Documents (Carta de Presentación + Brochure + Video Demo) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Card 1: Carta de Presentación Formal */}
          <div
            style={{
              background: "linear-gradient(145deg, #0F172A 0%, #0C4A6E 100%)",
              color: "#FFFFFF",
              borderRadius: "20px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.16)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(56, 189, 248, 0.2)",
                  color: "#7DD3FC",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.85rem",
                }}
              >
                Documento Ejecutivo · 7 Páginas A4
              </span>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  marginBottom: "0.65rem",
                  lineHeight: 1.25,
                }}
              >
                Carta de Presentación y Propuesta Comercial CIGO
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#E2E8F0",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                Documento formal dirigido a Gerencia General, Operaciones y Contabilidad. Incluye los 5 problemas en ruta, control Km/galón, casos reales, tabla de inversión por volumen (IGV incluido) y formato de aceptación.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={CARTA_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: "140px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  background: "#38BDF8",
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "0.875rem",
                  padding: "0.75rem 1.1rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                📄 Ver Carta (PDF)
              </a>
              <a
                href={CARTA_PDF_URL}
                download="Carta_Presentacion_CIGO_Devorq.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  background: "rgba(255,255,255,0.12)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                ⬇ Descargar
              </a>
            </div>
          </div>

          {/* Card 2: Brochure Comercial + QR */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "2rem",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#E0F2FE",
                      color: "#0284C7",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      marginBottom: "0.65rem",
                    }}
                  >
                    Resumen Visual
                  </span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.25 }}>
                    Brochure Comercial CIGO
                  </h3>
                </div>
                <img
                  src="/cigo/qr_brochure.png"
                  alt="Código QR del Brochure Comercial CIGO"
                  style={{
                    width: "76px",
                    height: "76px",
                    objectFit: "contain",
                    border: "1px solid #E2E8F0",
                    borderRadius: "10px",
                    padding: "4px",
                    flexShrink: 0,
                  }}
                />
              </div>
              <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Resumen gráfico del funcionamiento en carretera por WhatsApp, lectura de tickets y odómetros, control de viáticos y módulos del panel web gerencial.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={BROCHURE_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  background: "#0EA5E9",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.875rem",
                  padding: "0.75rem 1.1rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                📘 Ver Brochure (PDF)
              </a>
              <a
                href={BROCHURE_PDF_URL}
                download="Brochure_Comercial_CIGO.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  background: "#F8FAFC",
                  color: "#0F172A",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  border: "1px solid #CBD5E1",
                }}
              >
                ⬇ Descargar
              </a>
            </div>
          </div>

          {/* Card 3: Video Demostrativo + QR */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "2rem",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#DCFCE7",
                      color: "#15803D",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      marginBottom: "0.65rem",
                    }}
                  >
                    Demostración Práctica
                  </span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.25 }}>
                    Video Demostrativo en Ruta
                  </h3>
                </div>
                <img
                  src="/cigo/qr_video.png"
                  alt="Código QR del Video Demostrativo CIGO"
                  style={{
                    width: "76px",
                    height: "76px",
                    objectFit: "contain",
                    border: "1px solid #E2E8F0",
                    borderRadius: "10px",
                    padding: "4px",
                    flexShrink: 0,
                  }}
                />
              </div>
              <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Observa en pocos minutos cómo el conductor envía sus comprobantes desde WhatsApp y cómo se refleja la liquidación en el panel web de la empresa.
              </p>
            </div>

            <a
              href={DEMO_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "#16A34A",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.875rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              ▶ Ver Video Demostrativo
            </a>
          </div>
        </div>

        {/* Part 3: Real 7-Day Free Trial Banner */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "1.75rem 2rem",
            border: "1.5px solid #BAE6FD",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
              <span
                style={{
                  background: "#10B981",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "0.2rem 0.65rem",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                }}
              >
                Prueba Gratis · 7 Días (1 Semana)
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0284C7" }}>
                Hasta 5 unidades en ruta activa · Activación inmediata sin tarjeta
              </span>
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0F172A", marginBottom: "0.25rem" }}>
              Registra tu flota y evalúa CIGO durante 7 días gratis
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
              Crea tu cuenta en 1 minuto y comienza a recibir comprobantes desde WhatsApp. Si prefieres acompañamiento directo escríbenos al{" "}
              <strong style={{ color: "#0F172A" }}>+51 929 222 980</strong> /{" "}
              <strong style={{ color: "#0F172A" }}>+51 935 351 768</strong> o{" "}
              <strong style={{ color: "#0F172A" }}>contacto@devorq.com</strong>.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.92rem",
                padding: "0.85rem 1.65rem",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.32)",
                whiteSpace: "nowrap",
              }}
            >
              Comenzar Prueba Gratis Ahora →
            </a>
            <a
              href={WSP_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#F8FAFC",
                color: "#0F172A",
                fontWeight: 700,
                fontSize: "0.88rem",
                padding: "0.85rem 1.3rem",
                borderRadius: "100px",
                border: "1px solid #CBD5E1",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Agendar Demo (WhatsApp)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
