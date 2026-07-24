"use client";

import { useState, useRef, useEffect } from "react";

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [product, setProduct] = useState<"asys" | "cigo">("asys");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulated submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setEmail("");
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
            background: "linear-gradient(135deg, #5B4EFF, #E040FB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            margin: "0 auto 1.5rem",
            boxShadow: "0 12px 40px rgba(91,78,255,0.3)",
          }}
        >
          ✉️
        </div>

        <div className="section-label" style={{ margin: "0 auto 1rem" }}>
          Lista de espera y contacto
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
          Sé el primero en{" "}
          <span className="gradient-text">saber cuándo lanzamos</span>
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--fg-muted)",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
          }}
        >
          Déjanos tu correo y te avisamos con acceso anticipado a ASYS IA,
          actualizaciones de CIGO y noticias de Devorq Systems.
        </p>

        {/* Product selector */}
        <div
          style={{
            display: "flex",
            background: "var(--bg-secondary)",
            borderRadius: "100px",
            padding: "4px",
            marginBottom: "1.5rem",
            border: "1px solid rgba(91,78,255,0.1)",
          }}
        >
          {(["asys", "cigo"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setProduct(p)}
              style={{
                flex: 1,
                padding: "0.625rem 1rem",
                borderRadius: "100px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.875rem",
                transition: "all 0.25s ease",
                background: product === p ? "white" : "transparent",
                color: product === p ? "var(--primary)" : "var(--fg-muted)",
                boxShadow: product === p ? "0 2px 8px rgba(13,8,32,0.08)" : "none",
              }}
            >
              {p === "asys" ? "🤖 ASYS IA" : "📦 CIGO"}
            </button>
          ))}
        </div>

        {/* Form */}
        {status === "success" ? (
          <div
            style={{
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "1rem",
              padding: "2rem",
              animation: "bounce-in 0.5s ease both",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
            <h3 style={{ fontWeight: 700, fontSize: "1.125rem", color: "#065F46", marginBottom: "0.5rem" }}>
              ¡Estás en la lista!
            </h3>
            <p style={{ color: "#065F46", opacity: 0.8, fontSize: "0.9rem" }}>
              Te avisaremos cuando {product === "asys" ? "ASYS IA" : "CIGO"} esté disponible. ¡Gracias!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              id="waitlist-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="tu@correo.com"
              required
              style={{
                flex: "1",
                minWidth: "220px",
                padding: "0.875rem 1.25rem",
                borderRadius: "100px",
                border: `1.5px solid ${status === "error" ? "#EF4444" : "rgba(91,78,255,0.2)"}`,
                fontSize: "0.9375rem",
                outline: "none",
                background: "white",
                color: "var(--fg)",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "var(--primary)";
                (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(91,78,255,0.1)";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor =
                  status === "error" ? "#EF4444" : "rgba(91,78,255,0.2)";
                (e.target as HTMLInputElement).style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary"
              style={{ whiteSpace: "nowrap", opacity: status === "loading" ? 0.7 : 1 }}
            >
              {status === "loading" ? (
                <>
                  <svg
                    width="16" height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ animation: "spin-slow 1s linear infinite" }}
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Notifícame
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.5rem", textAlign: "left" }}>
            Por favor ingresa un correo válido.
          </p>
        )}

        <p
          style={{
            fontSize: "0.78125rem",
            color: "var(--fg-light)",
            marginTop: "1rem",
            lineHeight: 1.6,
          }}
        >
          Sin spam. Solo actualizaciones importantes. Puedes darte de baja cuando quieras.
        </p>

        {/* Social proof */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(91,78,255,0.08)",
          }}
        >
          <div style={{ display: "flex" }}>
            {["#5B4EFF", "#E040FB", "#06B6D4", "#10B981"].map((color, i) => (
              <div
                key={color}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid white",
                  marginLeft: i === 0 ? 0 : "-8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              >
                {["J", "M", "A", "R"][i]}
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
            <strong style={{ color: "var(--fg)" }}>+50 personas</strong> ya están en la lista
          </p>
        </div>
      </div>
    </section>
  );
}
