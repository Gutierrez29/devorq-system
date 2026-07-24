"use client";

import { useRef, useEffect, useState } from "react";

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

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: "user",
    text: "Hola, quisiera reservar una mesa para 4 personas el sábado a las 8pm 🙏",
    time: "19:20",
  },
  {
    id: "2",
    type: "bot",
    text: "¡Hola! Con gusto te ayudo. Tenemos disponibilidad para el sábado 26 a las 8:00pm. ¿A qué nombre hago la reserva?",
    time: "19:20",
  },
  {
    id: "3",
    type: "user",
    text: "A nombre de Martínez, por favor",
    time: "19:21",
  },
  {
    id: "4",
    type: "bot",
    text: "✅ Listo, Martínez. Tu reserva está confirmada:\n📅 Sábado 26 | 🕗 8:00pm | 👥 4 personas\n¿Necesitas algo más?",
    time: "19:21",
  },
];

const PRESETS = [
  {
    label: "📦 Consultar pedido #409",
    userText: "Hola, ¿cuándo llega mi pedido #409?",
    botText: "🔍 Revisando pedido #409...\n🚚 ¡Tu paquete está en camino! El chofer asignado es Carlos M. Llega hoy entre 4:00pm y 5:30pm.",
  },
  {
    label: "💰 Precios de menú empresarial",
    userText: "Quisiera información de los combos corporativos",
    botText: "📋 ¡Con gusto! Nuestros combos corporativos incluyen:\n• Menú Ejecutivo (S/ 25)\n• Combo Gourmet (S/ 38)\n¿Deseas que te envíe el catálogo completo en PDF?",
  },
  {
    label: "📅 Agendar cita médica",
    userText: "Necesito una cita para odontología el lunes",
    botText: "👨‍⚕️ Disponibilidad para Odontología (Lunes):\n1) 09:00 AM\n2) 03:30 PM\nResponde con el número de tu preferencia para confirmarla.",
  },
];

function WhatsAppMockup() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (userText: string, botResponse?: string) => {
    if (!userText.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: userText,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text:
          botResponse ||
          `¡Entendido! Como ASYS IA, procesé tu mensaje ("${userText}") al instante. ¿En qué más puedo asistirte?`,
        time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", width: "100%", maxWidth: "380px" }}>
      {/* Interactive preset trigger buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--fg-muted)", width: "100%", marginBottom: "0.125rem" }}>
          Prueba enviar un mensaje a la IA:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handleSend(p.userText, p.botText)}
            disabled={isTyping}
            style={{
              background: "white",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "100px",
              padding: "0.35rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#7C3AED",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#7C3AED";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "white";
              (e.currentTarget as HTMLElement).style.color = "#7C3AED";
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Mockup Container */}
      <div
        style={{
          width: "100%",
          background: "#ECE5DD",
          borderRadius: "1.5rem",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(91,78,255,0.2), 0 8px 24px rgba(13,8,32,0.1)",
        }}
      >
        {/* WhatsApp header */}
        <div
          style={{
            background: "#128C7E",
            padding: "0.875rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #E040FB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
              flexShrink: 0,
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.2 }}>ASYS IA (Demostración)</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#25D366" }} />
              en línea · responde al instante
            </div>
          </div>
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            title="Reiniciar chat"
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "white",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            ↺
          </button>
        </div>

        {/* Messages body */}
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
            height: "320px",
            overflowY: "auto",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                animation: "fade-in 0.25s ease both",
              }}
            >
              <div
                style={{
                  background: msg.type === "user" ? "#DCF8C6" : "white",
                  padding: "0.625rem 0.875rem",
                  borderRadius: msg.type === "user" ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
                  fontSize: "0.8125rem",
                  lineHeight: 1.5,
                  color: "#1a1a1a",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#888",
                  textAlign: msg.type === "user" ? "right" : "left",
                  marginTop: "2px",
                  paddingInline: "4px",
                }}
              >
                {msg.type === "bot" ? "ASYS IA · " : ""}{msg.time}
                {msg.type === "user" && <span style={{ marginLeft: "4px", color: "#34B7F1" }}>✓✓</span>}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ alignSelf: "flex-start" }}>
              <div
                style={{
                  background: "white",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "2px 12px 12px 12px",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "#888", marginRight: "4px" }}>escribiendo...</span>
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#888",
                      display: "inline-block",
                      animation: `typing-dot 1.2s ${dot * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          style={{
            background: "#F0F2F5",
            padding: "0.625rem 0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Escribe un mensaje de prueba..."
            disabled={isTyping}
            style={{
              flex: 1,
              background: "white",
              border: "none",
              borderRadius: "24px",
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              color: "#1a1a1a",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !inputVal.trim()}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: inputVal.trim() ? "#128C7E" : "#B0BEC5",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: inputVal.trim() ? "pointer" : "default",
              transition: "background 0.2s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

const ASYS_USECASES = [
  { icon: "🛒", title: "Ventas", desc: "Toma pedidos y cierra ventas automáticamente" },
  { icon: "📅", title: "Reservas", desc: "Agenda citas sin que nadie las gestione" },
  { icon: "🎧", title: "Soporte", desc: "Resuelve dudas frecuentes en segundos" },
  { icon: "📢", title: "Marketing", desc: "Campañas y seguimiento por WhatsApp" },
];

export default function AsysSpotlight() {
  const { ref: sectionRef, inView } = useInView(0.08);

  return (
    <section
      id="asys-ia"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "blob-morph 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(224,64,251,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "blob-morph 10s ease-in-out infinite reverse",
        }}
      />

      <div
        ref={sectionRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          transition: "all 0.8s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
        }}
        className="asys-grid"
      >
        {/* Left: Text content */}
        <div>
          <div className="section-label" style={{ color: "#7C3AED", background: "rgba(124,58,237,0.06)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Próximamente — ASYS IA
          </div>

          <h2
            style={{
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Tu negocio,{" "}
            <span className="gradient-text-asys">atendiendo solo</span>
            <br />
            las 24 horas.
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--fg-muted)",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: "480px",
            }}
          >
            ASYS IA es un agente conversacional que vive en WhatsApp y actúa como
            un empleado virtual para tu negocio — inteligente, disponible siempre y
            configurable en minutos.
          </p>

          {/* Use case grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.875rem",
              marginBottom: "2rem",
            }}
          >
            {ASYS_USECASES.map((uc) => (
              <div
                key={uc.title}
                style={{
                  background: "white",
                  border: "1px solid rgba(124,58,237,0.1)",
                  borderRadius: "0.875rem",
                  padding: "1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "1.375rem", marginBottom: "0.375rem" }}>{uc.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--fg)", marginBottom: "0.25rem" }}>
                  {uc.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>{uc.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <a
              href="#contacto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "linear-gradient(135deg, #7C3AED, #E040FB)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9375rem",
                padding: "0.875rem 1.75rem",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(124,58,237,0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(124,58,237,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(124,58,237,0.35)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.06-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Quiero acceso anticipado
            </a>
          </div>
        </div>

        {/* Right: WhatsApp mockup */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Decorative ring */}
          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              border: "1px dashed rgba(124,58,237,0.2)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "spin-slow 30s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1px dashed rgba(224,64,251,0.15)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "spin-slow 20s linear infinite reverse",
            }}
          />

          <div className="floating" style={{ position: "relative", zIndex: 1 }}>
            <WhatsAppMockup />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .asys-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
