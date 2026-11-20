"use client";

import { useState, useRef, useEffect } from "react";

const REGISTER_URL = "https://cigo.devorq.com/registro";

interface PricingTier {
  id: string;
  rangeLabel: string;
  minTrucks: number;
  maxTrucks: number | null;
  category: string;
  pricePerTruck: number;
  highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "t1",
    rangeLabel: "5–10 camiones",
    minTrucks: 5,
    maxTrucks: 10,
    category: "Entrada al sistema",
    pricePerTruck: 29,
  },
  {
    id: "t2",
    rangeLabel: "11–20 camiones",
    minTrucks: 11,
    maxTrucks: 20,
    category: "Descuento por volumen",
    pricePerTruck: 27,
  },
  {
    id: "t3",
    rangeLabel: "21–50 camiones",
    minTrucks: 21,
    maxTrucks: 50,
    category: "Flota en expansión",
    pricePerTruck: 25,
    highlight: true,
  },
  {
    id: "t4",
    rangeLabel: "51–100 camiones",
    minTrucks: 51,
    maxTrucks: 100,
    category: "Operación de escala",
    pricePerTruck: 23,
  },
  {
    id: "t5",
    rangeLabel: "101+ camiones",
    minTrucks: 101,
    maxTrucks: null,
    category: "Volumen estratégico",
    pricePerTruck: 20,
  },
];

const INCLUDED_ITEMS = [
  "Conductores ilimitados por WhatsApp (sin instalar aplicaciones)",
  "Validación SUNAT en vivo (RUC activo/habido y control de duplicados)",
  "Cálculo de rendimiento Km/galón y registro fotográfico de odómetros",
  "Exportación contable Excel, Liquidación por viaje, TXT SIRE y ZIP",
  "Factura electrónica con IGV incluido en Perú y soporte directo",
  "Puesta en marcha en 24–48 h · Sin permanencia forzosa",
];

function resolveTier(trucks: number): PricingTier {
  return (
    PRICING_TIERS.find(
      (t) => trucks >= t.minTrucks && (t.maxTrucks === null || trucks <= t.maxTrucks)
    ) || PRICING_TIERS[0]
  );
}

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function CigoPricing() {
  const { ref, inView } = useInView();
  const [trucks, setTrucks] = useState<number>(15);

  const activeTier = resolveTier(trucks);
  const monthlyTotal = trucks * activeTier.pricePerTruck;
  const savingsVsEntry = Math.max(0, (29 - activeTier.pricePerTruck) * trucks);

  const wspQuoteUrl = `https://wa.me/51929222980?text=${encodeURIComponent(
    `Hola Devorq, quiero cotizar CIGO para mi flota de ${trucks} camiones (${activeTier.rangeLabel} · S/ ${activeTier.pricePerTruck}/vehículo con IGV incluido) y coordinar una demostración de 15 minutos.`
  )}`;

  return (
    <section
      id="planes"
      style={{
        padding: "5.5rem 1.5rem",
        background: "linear-gradient(180deg, #090D16 0%, #0F172A 100%)",
        color: "#F8FAFC",
        borderTop: "1px solid rgba(56, 189, 248, 0.16)",
        borderBottom: "1px solid rgba(56, 189, 248, 0.16)",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.76rem",
              fontWeight: 800,
              color: "#38BDF8",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              background: "rgba(56, 189, 248, 0.12)",
              padding: "0.35rem 0.95rem",
              borderRadius: "100px",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              marginBottom: "1rem",
            }}
          >
            INVERSIÓN TRANSPARENTE POR VOLUMEN
          </span>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            CIGO — Pricing de expansión
          </h2>
          <p
            style={{
              fontSize: "1.02rem",
              color: "#94A3B8",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Precio mensual por vehículo · <strong style={{ color: "#E2E8F0" }}>IGV incluido en Perú</strong>. Empieza gratis 7 días y paga solo por las unidades activas de tu flota.
          </p>
        </div>

        {/* 2-Column Layout: Pricing Table + Interactive Estimator */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
            alignItems: "stretch",
          }}
        >
          {/* Left: Escalated Pricing Table (Exact 5 Tiers) */}
          <div
            style={{
              background: "#0B1120",
              borderRadius: "22px",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              padding: "1.5rem 1.75rem",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "1rem",
                  marginBottom: "0.5rem",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
                }}
              >
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF" }}>
                    Escala por tamaño de flota
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#94A3B8", marginTop: "0.15rem" }}>
                    Precio mensual por vehículo · IGV incluido en Perú
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#34D399",
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "100px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Factura electrónica
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {PRICING_TIERS.map((tier, idx) => {
                  const isSelected = activeTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setTrucks(tier.minTrucks)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "1.05rem 0.9rem",
                        background: isSelected
                          ? "rgba(14, 165, 233, 0.14)"
                          : "transparent",
                        border: "none",
                        borderBottom:
                          idx < PRICING_TIERS.length - 1
                            ? "1px solid rgba(148, 163, 184, 0.14)"
                            : "none",
                        borderRadius: isSelected ? "12px" : "0",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "1.02rem",
                            fontWeight: 800,
                            color: isSelected ? "#38BDF8" : "#F8FAFC",
                          }}
                        >
                          <span>{tier.rangeLabel}</span>
                          {tier.highlight && (
                            <span
                              style={{
                                fontSize: "0.66rem",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                background: "rgba(56, 189, 248, 0.2)",
                                color: "#7DD3FC",
                                padding: "0.12rem 0.5rem",
                                borderRadius: "100px",
                              }}
                            >
                              Más elegido
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            color: "#94A3B8",
                            marginTop: "0.18rem",
                          }}
                        >
                          {tier.category}
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span
                          style={{
                            fontSize: "1.35rem",
                            fontWeight: 900,
                            color: isSelected ? "#38BDF8" : "#FFFFFF",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          S/ {tier.pricePerTruck}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            color: "#94A3B8",
                          }}
                        >
                          / vehículo / mes
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <p
              style={{
                fontSize: "0.76rem",
                color: "#64748B",
                marginTop: "1rem",
                marginBottom: 0,
              }}
            >
              * Mínimo operativo de entrada: 5 camiones. Haz clic en cualquier tramo para simular tu inversión mensual.
            </p>
          </div>

          {/* Right: Interactive Estimator & Included Features */}
          <div
            style={{
              background: "linear-gradient(155deg, #0F172A 0%, #0C2D48 100%)",
              borderRadius: "22px",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "1.75rem",
              boxShadow: "0 20px 50px rgba(14, 165, 233, 0.14)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 800,
                    color: "#7DD3FC",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Simulador de Flota
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#38BDF8",
                    background: "rgba(56, 189, 248, 0.14)",
                    padding: "0.2rem 0.65rem",
                    borderRadius: "100px",
                  }}
                >
                  Tramo: {activeTier.rangeLabel}
                </span>
              </div>

              {/* Fleet Size Controls */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.65)",
                  borderRadius: "16px",
                  padding: "1.15rem 1.25rem",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                    gap: "1rem",
                  }}
                >
                  <label
                    htmlFor="cigo-fleet-range"
                    style={{ fontSize: "0.88rem", fontWeight: 700, color: "#E2E8F0" }}
                  >
                    ¿Cuántos camiones operas?
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <button
                      type="button"
                      aria-label="Reducir camiones"
                      onClick={() => setTrucks((prev) => Math.max(5, prev - 1))}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        border: "1px solid rgba(148, 163, 184, 0.35)",
                        background: "rgba(255,255,255,0.06)",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: "62px",
                        textAlign: "center",
                        fontSize: "1.25rem",
                        fontWeight: 900,
                        color: "#38BDF8",
                      }}
                    >
                      {trucks}
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar camiones"
                      onClick={() => setTrucks((prev) => Math.min(250, prev + 1))}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        border: "1px solid rgba(148, 163, 184, 0.35)",
                        background: "rgba(255,255,255,0.06)",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  id="cigo-fleet-range"
                  type="range"
                  min={5}
                  max={130}
                  step={1}
                  value={Math.min(130, trucks)}
                  onChange={(e) => setTrucks(Number(e.target.value) || 5)}
                  style={{
                    width: "100%",
                    accentColor: "#38BDF8",
                    cursor: "pointer",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.7rem",
                    color: "#94A3B8",
                    marginTop: "0.3rem",
                  }}
                >
                  <span>5 unid.</span>
                  <span>25 unid.</span>
                  <span>60 unid.</span>
                  <span>101+ unid.</span>
                </div>
              </div>

              {/* Estimated Monthly Summary */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                  paddingBottom: "1.25rem",
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.18)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 600 }}>
                    Inversión mensual estimada (IGV incluido)
                  </div>
                  <div
                    style={{
                      fontSize: "2.25rem",
                      fontWeight: 900,
                      color: "#FFFFFF",
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      marginTop: "0.2rem",
                    }}
                  >
                    S/ {monthlyTotal.toLocaleString("es-PE")}
                    <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#94A3B8" }}>
                      {" "}/ mes
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#38BDF8" }}>
                    S/ {activeTier.pricePerTruck} × {trucks} camiones
                  </div>
                  {savingsVsEntry > 0 ? (
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#34D399" }}>
                      Ahorro por volumen: S/ {savingsVsEntry.toLocaleString("es-PE")}/mes
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                      {activeTier.category}
                    </div>
                  )}
                </div>
              </div>

              {/* Included List */}
              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#E2E8F0", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.65rem" }}>
                Incluido en todos los planes:
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {INCLUDED_ITEMS.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.55rem",
                      fontSize: "0.84rem",
                      color: "#CBD5E1",
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: "#34D399", fontWeight: 900, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.55rem",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  padding: "0.95rem 1.5rem",
                  borderRadius: "14px",
                  textDecoration: "none",
                  boxShadow: "0 10px 28px rgba(16, 185, 129, 0.35)",
                }}
              >
                Comenzar Prueba Gratis de 7 Días (S/ 0 hoy) →
              </a>
              <a
                href={wspQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#E2E8F0",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  textDecoration: "none",
                }}
              >
                Solicitar Propuesta Formal por WhatsApp ({trucks} camiones)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
