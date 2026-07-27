"use client";

import Link from "next/link";
import Image from "next/image";
import AsysSpotlight from "@/components/AsysSpotlight";

const ASYS_COLOR = "#7C3AED";
const ASYS_GRADIENT = "linear-gradient(135deg, #7C3AED, #E040FB)";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Atención 24/7",
    desc: "Responde a tus clientes en segundos, cualquier día a cualquier hora, sin intervención humana constante.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "Pedidos automáticos",
    desc: "Los clientes hacen sus pedidos directamente por WhatsApp y el sistema los registra automáticamente.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Reservas y citas",
    desc: "Agenda citas, mesas o turnos mediante conversación natural. Sin formularios ni apps adicionales.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
    title: "Soporte inteligente",
    desc: "Resuelve preguntas frecuentes, estado de pedidos y reclamos sin que intervenga un agente humano.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: "Integración flexible",
    desc: "Conecta ASYS IA con tu sistema de inventario, CRM o base de datos existente.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    title: "Multi-negocio",
    desc: "Administra varios locales o negocios desde un único panel con métricas por canal.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: "Analytics en vivo",
    desc: "Monitorea conversaciones, tasas de resolución y satisfacción del cliente en tiempo real.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z"/>
        <line x1="12" y1="16" x2="12" y2="22"/>
        <line x1="8" y1="19" x2="16" y2="19"/>
      </svg>
    ),
    title: "IA conversacional",
    desc: "Entiende el lenguaje natural, contexto y emojis. Se adapta al tono de tu marca.",
  },
];

const USE_CASES = [
  {
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    industry: "Restaurantes",
    desc: "Toma de pedidos, consulta de menú, reservas de mesa y estado de delivery.",
    color: "#F97316",
  },
  {
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    industry: "Salud",
    desc: "Agendamiento de citas, resultados de exámenes y recordatorios automáticos.",
    color: "#10B981",
  },
  {
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    industry: "Tiendas online",
    desc: "Consultas de productos, seguimiento de pedidos y soporte post-venta.",
    color: "#8B5CF6",
  },
  {
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    industry: "Hoteles y hospedajes",
    desc: "Reservas, check-in virtual, servicios y recomendaciones para huéspedes.",
    color: "#0EA5E9",
  },
];

function FeatureIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: "14px", marginBottom: "1.25rem",
        background: ASYS_GRADIENT,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 6px 20px ${ASYS_COLOR}35`,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
}

function UseCaseIcon({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        width: 48, height: 48, borderRadius: "12px", marginBottom: "1rem",
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {icon}
    </div>
  );
}

const HOW_IT_WORKS = [
  { step: "01", title: "Conectamos tu WhatsApp Business", desc: "Vinculamos ASYS IA a tu número de WhatsApp Business en menos de 24 horas." },
  { step: "02", title: "Configuramos tu agente", desc: "Definimos los flujos de atención según tu negocio: pedidos, citas, soporte o lo que necesites." },
  { step: "03", title: "Atiende solo, tú supervisas", desc: "ASYS IA atiende a tus clientes automáticamente. Tú monitoreas y escalas solo cuando es necesario." },
];

export default function AsysIaPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* ── Navbar simple ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(124,58,237,0.1)",
        padding: "0 1.5rem", display: "flex", alignItems: "center", height: "64px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#E040FB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "0.875rem" }}>🤖</span>
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "#0D0820", letterSpacing: "-0.03em" }}>ASYS IA</span>
          <span style={{ fontSize: "0.75rem", color: "#64748b", marginLeft: 4 }}>por Devorq</span>
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "0.875rem", color: "#64748b", textDecoration: "none" }}>← Volver</Link>
          <a href="#contacto" style={{
            background: "linear-gradient(135deg,#7C3AED,#E040FB)", color: "white",
            padding: "0.5rem 1.25rem", borderRadius: "100px", fontWeight: 600,
            fontSize: "0.875rem", textDecoration: "none",
          }}>Quiero probarlo</a>
        </div>
      </nav>

      {/* ── Spotlight / Demo Interactivo ASYS IA ── */}
      <AsysSpotlight />

      {/* ── Dashboard mockup ── */}
      <section style={{ padding: "4rem 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            borderRadius: "1.5rem", overflow: "hidden",
            boxShadow: "0 32px 80px rgba(124,58,237,0.18), 0 8px 24px rgba(13,8,32,0.08)",
            border: "1px solid rgba(124,58,237,0.12)",
          }}>
            <div style={{ background: "#1e1b4b", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {["#ef4444","#f59e0b","#22c55e"].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
              <div style={{ marginLeft: "1rem", background: "#312e81", borderRadius: 6, padding: "0.25rem 1rem", fontSize: "0.75rem", color: "#a5b4fc" }}>
                app.asys.devorq.com
              </div>
            </div>
            <Image
              src="/asys-dashboard.webp"
              alt="Panel de control de ASYS IA — Chatbot para WhatsApp"
              width={1100}
              height={620}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Casos de uso ── */}
      <section id="casos" style={{ padding: "5rem 1.5rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0D0820" }}>
              Funciona para tu tipo de negocio
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", marginTop: "0.75rem" }}>
              ASYS IA se adapta a cualquier industria que atienda clientes.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {USE_CASES.map(uc => (
              <div key={uc.industry} style={{
                background: "white", borderRadius: "1.25rem", padding: "1.75rem",
                border: "1px solid rgba(124,58,237,0.08)",
                boxShadow: "0 2px 12px rgba(13,8,32,0.04)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${uc.color}25`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(13,8,32,0.04)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <UseCaseIcon icon={uc.icon(uc.color)} color={uc.color} />
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#0D0820", marginBottom: "0.5rem" }}>{uc.industry}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0D0820" }}>
              ¿Cómo funciona?
            </h2>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {HOW_IT_WORKS.map(s => (
              <div key={s.step} style={{ flex: "1", minWidth: "240px", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "1rem", flexShrink: 0,
                  background: "linear-gradient(135deg,#7C3AED,#E040FB)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.875rem", fontWeight: 800, color: "white",
                }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#0D0820", marginBottom: "0.375rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Funcionalidades ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0D0820" }}>
              Funcionalidades de ASYS IA
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: "white", borderRadius: "1rem", padding: "1.5rem",
                border: "1px solid rgba(124,58,237,0.1)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(124,58,237,0.15)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <FeatureIcon icon={f.icon} />
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0D0820", marginBottom: "0.375rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contacto" style={{ padding: "5rem 1.5rem", background: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg,#7C3AED,#E040FB)",
            borderRadius: "2rem", padding: "3rem 2rem",
            boxShadow: "0 24px 60px rgba(124,58,237,0.3)",
          }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "white", letterSpacing: "-0.035em", marginBottom: "1rem" }}>
              Automatiza tu atención hoy
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Cuéntanos de tu negocio y te mostramos cómo ASYS IA puede atender a tus clientes desde el primer día.
            </p>
            <a href="mailto:contacto@devorq.com" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "white", color: "#7C3AED", fontWeight: 700,
              padding: "0.875rem 2rem", borderRadius: "100px", textDecoration: "none",
              fontSize: "1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}>
              Escribirnos al correo →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(124,58,237,0.1)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
          © {new Date().getFullYear()} Devorq Systems · <Link href="/" style={{ color: "#7C3AED", textDecoration: "none" }}>Volver al inicio</Link>
        </p>
      </footer>
    </div>
  );
}
