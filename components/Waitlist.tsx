"use client";

import { useRef, useEffect, useState, useId } from "react";

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

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState<"cigo" | "asys" | "ambos">("cigo");
  const [note, setNote] = useState("");

  const nameId = useId();
  const companyId = useId();
  const phoneId = useId();
  const noteId = useId();

  const emailAddress = "contacto@devorq.com";

  const getProductLabel = () => {
    if (product === "cigo") return "CIGO (Control de Flotas, Combustible y Viáticos)";
    if (product === "asys") return "ASYS IA (Agente de Ventas y Atención 24/7 por WhatsApp)";
    return "Ecosistema Devorq (CIGO / ASYS IA / Solución a Medida)";
  };

  const buildMessage = () => {
    let msg = `Hola Devorq Systems, deseo coordinar una demostración:\n`;
    if (name) msg += `· Nombre: ${name}\n`;
    if (company) msg += `· Empresa: ${company}\n`;
    if (phone) msg += `· WhatsApp de contacto: ${phone}\n`;
    msg += `· Solución de Interés: ${getProductLabel()}\n`;
    if (note) msg += `· Detalle del requerimiento: ${note}\n`;
    return msg;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/51929222980?text=${text}`, "_blank");
  };

  const handleGmailSubmit = () => {
    const subject = encodeURIComponent(`Solicitud de Demostración - ${company || name || "Devorq Systems"}`);
    const body = encodeURIComponent(buildMessage());
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`, "_blank");
  };

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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(91,78,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          transition: "all 0.7s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label" style={{ margin: "0 auto 1rem" }}>
            <span className="radar-live" />
            Contacto & Pilotos B2B
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.85rem)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: "1rem",
              color: "var(--fg)",
            }}
          >
            Hablemos sobre <span className="gradient-text">tu Operación</span>
          </h2>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Cuéntanos qué proceso deseas mejorar con CIGO, ASYS IA o una solución a medida y coordinamos una demostración en vivo con tu equipo.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#0284C7", fontWeight: 700, marginTop: "0.6rem" }}>
            Atención directa: +51 929 222 980 · +51 935 351 768 · contacto@devorq.com
          </p>
        </div>

        {/* Interactive Form Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 16px 48px rgba(15, 23, 42, 0.06)",
            padding: "2.5rem 2rem",
          }}
        >
          <form onSubmit={handleWhatsAppSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Row 1: Name and Company */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label htmlFor={nameId} style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, color: "#334155", marginBottom: "0.4rem" }}>
                  Tu Nombre y Cargo *
                </label>
                <input
                  id={nameId}
                  type="text"
                  required
                  placeholder="Ej: Carlos Silva - Gerente de Operaciones"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1.5px solid #E2E8F0",
                    fontSize: "0.9375rem",
                    outline: "none",
                    background: "#F8FAFC",
                    transition: "border-color 0.2s ease, background 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5B4EFF";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.background = "#F8FAFC";
                  }}
                />
              </div>

              <div>
                <label htmlFor={companyId} style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, color: "#334155", marginBottom: "0.4rem" }}>
                  Empresa / Rubro *
                </label>
                <input
                  id={companyId}
                  type="text"
                  required
                  placeholder="Ej: Inversiones del Norte S.A.C."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1.5px solid #E2E8F0",
                    fontSize: "0.9375rem",
                    outline: "none",
                    background: "#F8FAFC",
                    transition: "border-color 0.2s ease, background 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5B4EFF";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.background = "#F8FAFC";
                  }}
                />
              </div>
            </div>

            {/* Row 2: WhatsApp phone and Product selection */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label htmlFor={phoneId} style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, color: "#334155", marginBottom: "0.4rem" }}>
                  Teléfono / WhatsApp *
                </label>
                <input
                  id={phoneId}
                  type="tel"
                  required
                  placeholder="+51 987 654 321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1.5px solid #E2E8F0",
                    fontSize: "0.9375rem",
                    outline: "none",
                    background: "#F8FAFC",
                    transition: "border-color 0.2s ease, background 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5B4EFF";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.background = "#F8FAFC";
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, color: "#334155", marginBottom: "0.4rem" }}>
                  Solución de Interés
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setProduct("cigo")}
                    style={{
                      flex: 1,
                      padding: "0.65rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: product === "cigo" ? "1.5px solid #0EA5E9" : "1.5px solid #E2E8F0",
                      background: product === "cigo" ? "#E0F2FE" : "#F8FAFC",
                      color: product === "cigo" ? "#0284C7" : "#64748B",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ⛽ CIGO Flota
                  </button>

                  <button
                    type="button"
                    onClick={() => setProduct("asys")}
                    style={{
                      flex: 1,
                      padding: "0.65rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: product === "asys" ? "1.5px solid #5B4EFF" : "1.5px solid #E2E8F0",
                      background: product === "asys" ? "rgba(91, 78, 255, 0.08)" : "#F8FAFC",
                      color: product === "asys" ? "#5B4EFF" : "#64748B",
                      transition: "all 0.2s ease",
                    }}
                  >
                    🤖 ASYS IA
                  </button>

                  <button
                    type="button"
                    onClick={() => setProduct("ambos")}
                    style={{
                      flex: 1,
                      padding: "0.65rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: product === "ambos" ? "1.5px solid #10B981" : "1.5px solid #E2E8F0",
                      background: product === "ambos" ? "rgba(16, 185, 129, 0.08)" : "#F8FAFC",
                      color: product === "ambos" ? "#059669" : "#64748B",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ✨ Ambas
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Notes / Message */}
            <div>
              <label htmlFor={noteId} style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, color: "#334155", marginBottom: "0.4rem" }}>
                Mensaje o Requerimiento (Opcional)
              </label>
              <textarea
                id={noteId}
                rows={3}
                placeholder="Cuéntanos brevemente sobre tu operación, canal de WhatsApp o qué proceso deseas automatizar..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px solid #E2E8F0",
                  fontSize: "0.9375rem",
                  outline: "none",
                  background: "#F8FAFC",
                  resize: "vertical",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#5B4EFF";
                  e.currentTarget.style.background = "#FFFFFF";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.background = "#F8FAFC";
                }}
              />
            </div>

            {/* Actions Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "0.5rem" }}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem 1.75rem",
                  borderRadius: "14px",
                  background: "#25D366",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "1.0625rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(37, 211, 102, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.35)";
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.08-2.008-.466-1.545-.644-2.529-2.22-2.607-2.324-.076-.104-.633-.842-.633-1.608 0-.766.4-1.144.542-1.301.143-.158.312-.198.416-.198.104 0 .208.002.299.006.096.004.225-.036.352.269.13.313.443 1.077.481 1.156.039.078.065.17.013.273-.052.104-.078.17-.156.26-.078.092-.163.204-.234.274-.078.078-.16.163-.069.319.091.156.404.667.868 1.08 1.026.914 1.35 1.026 1.542 1.104.192.078.305.068.418-.063.113-.13.484-.564.614-.757.13-.193.26-.16.437-.095.177.065 1.12.528 1.315.626.195.097.325.146.372.228.047.081.047.47-.097.876z"/>
                </svg>
                Solicitar Demostración por WhatsApp
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                <button
                  type="button"
                  onClick={handleGmailSubmit}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#EA4335",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  Prefiero enviar por Gmail
                </button>

                <span style={{ color: "#CBD5E1" }}>·</span>

                <button
                  type="button"
                  onClick={copyEmail}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: copied ? "#10B981" : "#64748B",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {copied ? "✓ contacto@devorq.com copiado" : `Copiar correo (${emailAddress})`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
