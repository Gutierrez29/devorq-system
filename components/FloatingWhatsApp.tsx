"use client";

import { useState, useEffect } from "react";

const WSP_URL = "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20CIGO%20y%20la%20Prueba%20Gratis%20de%207%20d%C3%ADas.";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [closedManually, setClosedManually] = useState(false);

  useEffect(() => {
    // Show tooltip after 4 seconds of reading
    const timer = setTimeout(() => {
      if (!closedManually) {
        setShowTooltip(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [closedManually]);

  return (
    <aside
      aria-label="Atención directa por WhatsApp"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      {/* Speech bubble */}
      {showTooltip && (
        <div
          style={{
            background: "#FFFFFF",
            color: "#0F172A",
            padding: "0.85rem 1.15rem",
            borderRadius: "16px 16px 2px 16px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.16)",
            border: "1px solid #E2E8F0",
            maxWidth: "260px",
            fontSize: "0.82rem",
            lineHeight: 1.45,
            position: "relative",
            animation: "bounce-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <button
            onClick={() => {
              setShowTooltip(false);
              setClosedManually(true);
            }}
            aria-label="Cerrar sugerencia"
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: "0.75rem",
              padding: "2px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            <strong style={{ color: "#0F172A", fontSize: "0.8rem" }}>Asesoría en Línea</strong>
          </div>
          <p style={{ margin: 0, color: "#475569" }}>
            ¿Consultas sobre CIGO o ASYS IA? Escríbenos directamente por WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={WSP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a Devorq Systems"
        title="Contactar por WhatsApp"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          position: "relative",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(37, 211, 102, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            animation: "pulse-ring 2.5s infinite",
            pointerEvents: "none",
          }}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.08-2.008-.466-1.545-.644-2.529-2.22-2.607-2.324-.076-.104-.633-.842-.633-1.608 0-.766.4-1.144.542-1.301.143-.158.312-.198.416-.198.104 0 .208.002.299.006.096.004.225-.036.352.269.13.313.443 1.077.481 1.156.039.078.065.17.013.273-.052.104-.078.17-.156.26-.078.092-.163.204-.234.274-.078.078-.16.163-.069.319.091.156.404.667.868 1.08 1.026.914 1.35 1.026 1.542 1.104.192.078.305.068.418-.063.113-.13.484-.564.614-.757.13-.193.26-.16.437-.095.177.065 1.12.528 1.315.626.195.097.325.146.372.228.047.081.047.47-.097.876z"/>
        </svg>
      </a>
    </aside>
  );
}
