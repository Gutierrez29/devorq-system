"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import RoiCalculator from "@/components/RoiCalculator";

const WSP_URL = "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quiero%20solicitar%20la%20Prueba%20Gratis%20de%207%20d%C3%ADas%20de%20CIGO%20para%20mi%20flota.";
const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@devorq.com&su=Solicitud%20de%20Prueba%20Gratis%207%20D%C3%ADas%20CIGO%20-%20Devorq%20Systems";

const MODULES = [
  {
    id: "01",
    shortName: "Rutas & Combustible",
    badge: "CONTROL DE CONSUMO EN RUTA",
    title: "Control de Rutas & Combustible (Km/Galón)",
    desc: "Asignación de viajes con origen y destino, registro de lecturas de odómetro y cálculo del rendimiento en Km/galón u Horas/galón en cada abastecimiento.",
    logro: "Seguimiento oportuno del consumo de combustible y avance de rendición durante el viaje sin esperar el retorno a base.",
    auto: "Cálculo automático del ratio de Km/galón contra el kilometraje reportado y verificación de consistencia en importes.",
    img: "/cigo/02-dashboard.webp"
  },
  {
    id: "02",
    shortName: "Dashboard Flota",
    badge: "VISIBILIDAD OPERATIVA GERENCIAL",
    title: "Panel Operativo de Flota y Gastos",
    desc: "Consolidado visual de egresos, abastecimientos de combustible, comprobantes registrados y saldos por viaje en una sola vista gerencial.",
    logro: "Visibilidad clara de los costos operativos por viaje, conductor y unidad antes del cierre de fin de mes.",
    auto: "Consolidación continua de los gastos reportados desde carretera y alertas ante variaciones de consumo.",
    img: "/cigo/02-dashboard.webp"
  },
  {
    id: "03",
    shortName: "Choferes & Viáticos",
    badge: "CONTROL DE SALDO ENTREGADO VS RENDIDO",
    title: "Padrón de Choferes & Rendición de Viáticos",
    desc: "Directorio de conductores habilitados en WhatsApp, asignación de unidades y seguimiento de transferencias de viáticos por viaje.",
    logro: "Control ordenado del dinero entregado a cada conductor para peajes, combustible, alimentación y gastos de ruta.",
    auto: "Cálculo continuo de saldo entregado frente a gastos sustentados, identificando liquidaciones pendientes.",
    img: "/cigo/03-choferes.webp"
  },
  {
    id: "04",
    shortName: "Revisión SUNAT",
    badge: "CONSULTA TRIBUTARIA Y CONTROL DE DUPLICADOS",
    title: "Revisión de Comprobantes & Consulta SUNAT",
    desc: "Recepción de fotos de boletas y facturas por WhatsApp con consulta de RUC emisor (Activo/Habido), estado del comprobante electrónico y alerta de documentos repetidos.",
    logro: "Ordenamiento fiscal previo al cierre contable y prevención de doble registro de un mismo comprobante.",
    auto: "Consulta automatizada del estado del comprobante electrónico y detección de duplicidades por serie y correlativo.",
    img: "/cigo/04-comprobantes.webp"
  },
  {
    id: "05",
    shortName: "Reportes & SIRE",
    badge: "EXPORTACIÓN CONTABLE EN EXCEL, SIRE Y ZIP",
    title: "Reportes Contables, Liquidación Excel & SIRE SUNAT",
    desc: "Descarga de reportes operativos en Excel, planillas de liquidación por viaje, archivo TXT estructurado para el Registro de Compras Electrónico (SIRE) y paquete ZIP de evidencias.",
    logro: "Reducción de horas de digitación manual para el equipo contable con respaldos fotográficos ordenados por periodo.",
    auto: "Generación estructurada de hojas de cálculo Excel, archivo TXT SIRE Compras y carpeta comprimida ZIP de comprobantes.",
    img: "/cigo/05-reportes.webp"
  },
  {
    id: "06",
    shortName: "Tractos & Carretas",
    badge: "PADRÓN DE UNIDADES Y TABLEROS",
    title: "Gestión de Flota, Tractos y Semirremolques",
    desc: "Padrón de tractocamiones y carretas/semirremolques con registro fotográfico de tableros de kilometraje (odómetro) y horas de motor (horómetro).",
    logro: "Historial ordenado de kilometraje y abastecimientos asociado a cada placa vehicular y viaje.",
    auto: "Extracción asistida por IA de la lectura del odómetro u horómetro desde la fotografía enviada por el conductor.",
    img: "/cigo/06-usuarios.webp"
  },
  {
    id: "07",
    shortName: "Reglas & Topes",
    badge: "PARÁMETROS OPERATIVOS Y TOPES",
    title: "Configuración de Topes & Categorías de Gasto",
    desc: "Definición de parámetros operativos, categorías de gasto y topes referenciales para peajes, alimentación, hospedaje y combustible.",
    logro: "Mayor control sobre los límites presupuestados para cada categoría de gasto en carretera.",
    auto: "Marcado automático de gastos con observaciones cuando superan los parámetros configurados por la empresa.",
    img: "/cigo/07-configuracion.webp"
  },
  {
    id: "08",
    shortName: "Seguridad & Roles",
    badge: "ENTORNO PRIVADO MULTI-ROL",
    title: "Privacidad por Empresa & Perfiles de Acceso",
    desc: "Entorno independiente por empresa con perfiles diferenciados para Gerencia General, Jefatura de Operaciones y Contabilidad.",
    logro: "Reserva comercial conforme a la Ley N° 29733 donde cada área accede a las funciones que le corresponden.",
    auto: "Registro de actividad operativa y almacenamiento organizado de evidencias digitales en la nube.",
    img: "/cigo/01-login.webp"
  }
];

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

export default function CigoPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState<"combustible" | "audio" | "peaje">("combustible");
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const scrollToContent = () => {
    const el = document.getElementById("whatsapp-feature");
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const nextModule = useCallback(() => {
    setActiveModuleIndex((prev) => (prev + 1) % MODULES.length);
  }, []);

  const prevModule = useCallback(() => {
    setActiveModuleIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  }, []);

  // Auto-play timer every 9 seconds; pauses when user hovers or touches
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextModule();
    }, 9000);
    return () => clearInterval(timer);
  }, [nextModule, isPaused, activeModuleIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX < -50) nextModule();
      else if (deltaX > 50) prevModule();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: wspRef, inView: wspInView } = useInView();
  const { ref: ventajasRef, inView: ventajasInView } = useInView();
  const { ref: sliderRef, inView: sliderInView } = useInView();

  const currentMod = MODULES[activeModuleIndex];

  return (
    <div style={{ background: "#FAFAFC", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A" }}>
      {/* ── Navbar Top ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(91, 78, 255, 0.08)",
          padding: "0.85rem 1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Devorq Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <img
            src="/devorq-isotype.png"
            alt="Devorq Logo"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
          <span style={{ fontSize: "1.125rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>
            Devorq <span style={{ color: "#5B4EFF" }}>Systems</span>
          </span>
        </Link>

        {/* Top Right Links: Carta, Brochure & Back */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href="/cigo/carta-presentacion-cigo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#0284C7",
              background: "#E0F2FE",
              padding: "0.4rem 0.9rem",
              borderRadius: "100px",
              textDecoration: "none",
              border: "1px solid rgba(14,165,233,0.3)",
            }}
          >
            📄 Carta de Presentación (PDF)
          </a>
          <a
            href="/cigo/brochure-cigo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#334155",
              background: "#F8FAFC",
              padding: "0.4rem 0.9rem",
              borderRadius: "100px",
              textDecoration: "none",
              border: "1px solid #E2E8F0",
            }}
          >
            📘 Brochure (PDF)
          </a>
          <Link
            href="/"
            style={{
              fontSize: "0.875rem",
              color: "#64748B",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.16) 0%, #FFFFFF 80%)",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* CIGO LOGO IN LARGE FIRST ITEM */}
          <div style={{ marginBottom: "1.5rem" }}>
            <img
              src="/cigo-logo.webp"
              alt="CIGO Logo"
              style={{
                height: "82px",
                width: "auto",
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
                filter: "drop-shadow(0 8px 24px rgba(14, 165, 233, 0.22))",
              }}
            />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#E0F2FE",
              color: "#0284C7",
              fontWeight: 700,
              fontSize: "0.8125rem",
              padding: "0.4rem 1.15rem",
              borderRadius: "100px",
              marginBottom: "1.5rem",
              border: "1px solid rgba(14, 165, 233, 0.3)",
            }}
          >
            <span className="radar-live" />
            Control de Flotas B2B · WhatsApp Habitual sin instalar aplicaciones
          </div>

          <h1
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 3.85rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              color: "#0F172A",
            }}
          >
            Control Total de tu Flota &{" "}
            <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Combustible desde WhatsApp
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: "760px",
              margin: "0 auto 2.5rem",
            }}
          >
            Control inteligente de combustible (Km/galón), viáticos de viaje y pre-liquidación contable desde carretera. Los conductores reportan por su WhatsApp habitual enviando fotos o notas de voz; la plataforma organiza cada gasto, consulta datos ante SUNAT y agiliza el cierre en oficina.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <a
              href={WSP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "#25D366",
                color: "white",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.85rem 1.85rem",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.08-2.008-.466-1.545-.644-2.529-2.22-2.607-2.324-.076-.104-.633-.842-.633-1.608 0-.766.4-1.144.542-1.301.143-.158.312-.198.416-.198.104 0 .208.002.299.006.096.004.225-.036.352.269.13.313.443 1.077.481 1.156.039.078.065.17.013.273-.052.104-.078.17-.156.26-.078.092-.163.204-.234.274-.078.078-.16.163-.069.319.091.156.404.667.868 1.08 1.026.914 1.35 1.026 1.542 1.104.192.078.305.068.418-.063.113-.13.484-.564.614-.757.13-.193.26-.16.437-.095.177.065 1.12.528 1.315.626.195.097.325.146.372.228.047.081.047.47-.097.876z"/>
              </svg>
              Solicitar Prueba Gratis de 7 Días
            </a>
            <a
              href="/cigo/carta-presentacion-cigo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.92rem",
                padding: "0.85rem 1.55rem",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(15,23,42,0.18)",
                transition: "all 0.2s ease",
              }}
            >
              📄 Ver Carta de Presentación (PDF)
            </a>
            <a
              href="/cigo/brochure-cigo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#FFFFFF",
                color: "#0284C7",
                fontWeight: 700,
                fontSize: "0.92rem",
                padding: "0.85rem 1.5rem",
                borderRadius: "100px",
                border: "1.5px solid #BAE6FD",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              📘 Brochure Comercial (PDF)
            </a>
            <button
              onClick={scrollToContent}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#FFFFFF",
                color: "#0F172A",
                fontWeight: 700,
                fontSize: "0.92rem",
                padding: "0.85rem 1.45rem",
                borderRadius: "100px",
                border: "1.5px solid #E2E8F0",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Ver Flujo en WhatsApp ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── PILARES DE VALOR PARA LA OPERACIÓN DE TRANSPORTE ── */}
      <section
        style={{
          padding: "3.5rem 1.5rem",
          background: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 2.5rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0284C7", textTransform: "uppercase", letterSpacing: "0.06em", background: "#E0F2FE", padding: "0.3rem 0.85rem", borderRadius: "100px" }}>
              PILARES DE VALOR EN CARRETERA
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.35rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.035em", marginTop: "0.75rem", marginBottom: "0.5rem" }}>
              Orden Operativo y Administrativo en Cada Viaje
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.65 }}>
              Cuatro mejoras prácticas para la operación diaria de flotas de carga pesada:
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {/* Card 1 */}
            <div className="card-hover-glow" style={{ background: "#F8FAFC", padding: "1.75rem", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0EA5E9", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                Digitalización en Ruta
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem" }}>
                Respaldo Fotográfico de Comprobantes
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                Disminuye la pérdida de información por tickets térmicos borrados por el calor o extraviados, conservando la imagen digital desde la carretera.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-hover-glow" style={{ background: "#F8FAFC", padding: "1.75rem", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#10B981", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                Km / Galón
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem" }}>
                Seguimiento de Galones y Odómetro
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                Permite contrastar el volumen de combustible reportado en las facturas de grifo frente a la lectura del tablero (odómetro u horómetro) del vehículo.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-hover-glow" style={{ background: "#F8FAFC", padding: "1.75rem", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#7C3AED", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                Liquidación Ágil
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem" }}>
                Avance Continuo de Rendiciones
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                El registro de viáticos entregados frente a los gastos reportados se actualiza durante el trayecto, acortando los tiempos de cierre en oficina.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card-hover-glow" style={{ background: "#F8FAFC", padding: "1.75rem", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0284C7", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                Soporte Contable
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem" }}>
                Ordenamiento Fiscal y Pre-Auditoría
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                Centraliza RUC, serie y montos de cada documento con consulta ante SUNAT y alerta de comprobantes duplicados para facilitar la revisión tributaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE SPOTLIGHT: RENDICIÓN POR CHATBOT DE WHATSAPP ── */}
      <section
        id="whatsapp-feature"
        ref={wspRef}
        style={{
          padding: "3.5rem 1.5rem",
          background: "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)",
          borderBottom: "1px solid #E2E8F0",
          opacity: wspInView ? 1 : 0,
          transform: wspInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 2.25rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.06em", background: "#DCFCE7", padding: "0.3rem 0.85rem", borderRadius: "100px" }}>
              REPORTE EN RUTA VÍA WHATSAPP
            </span>
            <h2 style={{ fontSize: "clamp(1.65rem, 3.5vw, 2.25rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.035em", marginTop: "0.75rem", marginBottom: "0.6rem" }}>
              El Conductor Envía Foto o Nota de Voz → CIGO Registra y Organiza
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#475569", lineHeight: 1.65 }}>
              Sin descargar aplicaciones adicionales ni recordar contraseñas. El conductor reporta desde su WhatsApp habitual.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "center" }}>
            {/* Left: 3 Step Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "#FFFFFF", padding: "1.15rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 1: FOTO O NOTA DE VOZ POR WHATSAPP
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Toma foto del comprobante y odómetro
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                  Al abastecer combustible o pagar un gasto de viaje, el conductor envía la foto. Si pasa por un tramo sin señal, WhatsApp transmite el reporte al recuperar cobertura.
                </p>
              </div>

              <div style={{ background: "#FFFFFF", padding: "1.15rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 2: CÁLCULO DE KM/GALÓN Y CONSULTA SUNAT
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Extracción asistida y cálculo de consumo
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                  CIGO extrae proveedor, RUC, galones, importes y kilometraje, respondiendo al conductor con la confirmación del registro y el rendimiento referencial del vehículo.
                </p>
              </div>

              <div style={{ background: "#FFFFFF", padding: "1.15rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 3: CONTROL CENTRAL EN EL PANEL WEB
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Operaciones y Contabilidad supervisan en oficina
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                  Seguimiento del avance de liquidación durante la ruta, alertas ante variaciones y exportación en Excel, planilla de viaje, archivo TXT para SIRE y paquete ZIP.
                </p>
              </div>
            </div>

            {/* Right: WhatsApp Simulated Interactive Window */}
            <div
              style={{
                background: "#0B141A",
                borderRadius: "24px",
                padding: "1.25rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                border: "1px solid #16A34A",
              }}
            >
              {/* WhatsApp Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #202C33", paddingBottom: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "0.9rem" }}>
                    CIGO
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#E9EDEF" }}>CIGO Flotas Bot</div>
                    <div style={{ fontSize: "0.75rem", color: "#25D366", fontWeight: 600 }}>● En línea · Rendición en Ruta</div>
                  </div>
                </div>
                <span style={{ fontSize: "0.68rem", color: "#8696A0", background: "#1F2C34", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  Verificado Meta
                </span>
              </div>

              {/* Chat Mode Switcher Tabs */}
              <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1rem", background: "#111B21", padding: "0.3rem", borderRadius: "8px" }}>
                <button
                  onClick={() => setActiveChatTab("combustible")}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: activeChatTab === "combustible" ? "#202C33" : "transparent",
                    color: activeChatTab === "combustible" ? "#25D366" : "#8696A0",
                    transition: "all 0.2s ease",
                  }}
                >
                  ⛽ Combustible
                </button>
                <button
                  onClick={() => setActiveChatTab("audio")}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: activeChatTab === "audio" ? "#202C33" : "transparent",
                    color: activeChatTab === "audio" ? "#25D366" : "#8696A0",
                    transition: "all 0.2s ease",
                  }}
                >
                  🎙️ Audio Movilidad
                </button>
                <button
                  onClick={() => setActiveChatTab("peaje")}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: activeChatTab === "peaje" ? "#202C33" : "transparent",
                    color: activeChatTab === "peaje" ? "#25D366" : "#8696A0",
                    transition: "all 0.2s ease",
                  }}
                >
                  📄 Peaje
                </button>
              </div>

              {/* Dynamic Simulated Messages */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.82rem", minHeight: "230px" }}>
                {activeChatTab === "combustible" && (
                  <>
                    <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.65rem 0.95rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#7AE3B5", fontWeight: 700, marginBottom: "0.2rem" }}>Chofer Carlos M. (Tracto V1A-892)</div>
                      📷 [Foto Ticket Repsol: 78.4 gal]<br />
                      📷 [Foto Odómetro: 142,500 km]
                    </div>
                    <div style={{ background: "#202C33", color: "#E9EDEF", padding: "0.75rem 0.95rem", borderRadius: "12px 12px 12px 2px", alignSelf: "flex-start", maxWidth: "92%", borderLeft: "3px solid #25D366" }}>
                      <div style={{ fontWeight: 800, color: "#25D366", marginBottom: "0.3rem" }}>✓ Carga Auditada & Válida SUNAT</div>
                      <div style={{ lineHeight: 1.5, fontSize: "0.78rem" }}>
                        • <strong>Proveedor:</strong> Repsol Combustible S.A.<br />
                        • <strong>Carga:</strong> 78.4 gal DIESEL B5 (S/. 1,420.00)<br />
                        • <strong>Odómetro:</strong> 142,500 km<br />
                        • <strong>Rendimiento:</strong> <span style={{ color: "#38BDF8", fontWeight: 700 }}>3.84 km/gal (Óptimo)</span><br />
                        • <strong>Saldo Restante Caja:</strong> S/. 1,280.00
                      </div>
                    </div>
                  </>
                )}

                {activeChatTab === "audio" && (
                  <>
                    <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.65rem 0.95rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#7AE3B5", fontWeight: 700, marginBottom: "0.2rem" }}>Chofer Carlos M. (Tracto V1A-892)</div>
                      🎙️ <em>&quot;Pagué 15 soles de cochera en Chimbote para pernoctar&quot;</em>
                    </div>
                    <div style={{ background: "#202C33", color: "#E9EDEF", padding: "0.75rem 0.95rem", borderRadius: "12px 12px 12px 2px", alignSelf: "flex-start", maxWidth: "92%", borderLeft: "3px solid #7C3AED" }}>
                      <div style={{ fontWeight: 800, color: "#A855F7", marginBottom: "0.3rem" }}>✓ Gasto Informal Transcrito por IA</div>
                      <div style={{ lineHeight: 1.5, fontSize: "0.78rem" }}>
                        • <strong>Concepto:</strong> Cochera / Pernocte en Ruta<br />
                        • <strong>Monto Extraído:</strong> S/. 15.00<br />
                        • <strong>Destino:</strong> Planilla de Movilidad CIGO<br />
                        • <strong>Estado:</strong> Declaración Jurada Generada
                      </div>
                    </div>
                  </>
                )}

                {activeChatTab === "peaje" && (
                  <>
                    <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.65rem 0.95rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#7AE3B5", fontWeight: 700, marginBottom: "0.2rem" }}>Chofer Carlos M. (Tracto V1A-892)</div>
                      📷 [Foto Boleta de Peaje Autopista del Norte]
                    </div>
                    <div style={{ background: "#202C33", color: "#E9EDEF", padding: "0.75rem 0.95rem", borderRadius: "12px 12px 12px 2px", alignSelf: "flex-start", maxWidth: "92%", borderLeft: "3px solid #0EA5E9" }}>
                      <div style={{ fontWeight: 800, color: "#38BDF8", marginBottom: "0.3rem" }}>✓ Comprobante Consultando en SUNAT</div>
                      <div style={{ lineHeight: 1.5, fontSize: "0.78rem" }}>
                        • <strong>Comprobante:</strong> B001-004892<br />
                        • <strong>Monto:</strong> S/. 45.00 (IGV S/. 6.86)<br />
                        • <strong>Estado SUNAT:</strong> ACEPTADO (RUC Activo y Habido)<br />
                        • <strong>Control Duplicado:</strong> Único en base
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VENTAJAS OPERATIVAS ── */}
      <section
        id="ventajas"
        ref={ventajasRef}
        style={{
          padding: "5rem 1.5rem 4.5rem",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          opacity: ventajasInView ? 1 : 0,
          transform: ventajasInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 3.5rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#0EA5E9", textTransform: "uppercase", letterSpacing: "0.06em", background: "#E0F2FE", padding: "0.35rem 0.9rem", borderRadius: "100px" }}>
              VENTAJA OPERATIVA PARA TU EMPRESA
            </span>
            <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 2.65rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.035em", marginTop: "1rem", marginBottom: "1rem" }}>
              Por qué adquirir CIGO es una ventaja en vez de una carga
            </h2>
            <p style={{ fontSize: "1.0625rem", color: "#475569", lineHeight: 1.75 }}>
              CIGO no añade burocracia: elimina las tareas manuales, protege tu patrimonio ante SUNAT y le da tranquilidad total al área contable y administrativa.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
            <div style={{ background: "#F8FAFC", padding: "2.25rem 1.75rem", borderRadius: "20px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#E0F2FE", color: "#0EA5E9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 4px 12px rgba(14,165,233,0.15)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                Revisión Fiscal Previa
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Consulta del estado del RUC y comprobante electrónico ante SUNAT, detectando documentos con observaciones o duplicados antes del cierre.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", padding: "2.25rem 1.75rem", borderRadius: "20px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(16,185,129,0.12)", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 4px 12px rgba(16,185,129,0.15)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                Menos Digitación Manual
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Reduce el tiempo invertido en transcribir recibos físicos hoja por hoja al centralizar los datos extraídos desde la ruta.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", padding: "2.25rem 1.75rem", borderRadius: "20px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#F0F9FF", color: "#0284C7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 4px 12px rgba(2,132,199,0.15)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                Transparencia en Viáticos
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Seguimiento claro del dinero entregado frente a los gastos sustentados por cada conductor, placa vehicular y viaje.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", padding: "2.25rem 1.75rem", borderRadius: "20px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(91,78,255,0.1)", color: "#5B4EFF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 4px 12px rgba(91,78,255,0.15)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                Exportación en Excel, SIRE y ZIP
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Descarga de reportes operativos en Excel, planillas de liquidación de viaje, archivo TXT para SIRE Compras y carpeta ZIP de evidencias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELEGANT SIDE-BY-SIDE SLIDER FOR THE 8 MODULES (COMPACT HEIGHT & FITTED VIEW) ── */}
      <section
        id="modulos-carousel"
        ref={sliderRef}
        style={{
          padding: "4.5rem 1.5rem 5.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
          opacity: sliderInView ? 1 : 0,
          transform: sliderInView ? "translateY(0)" : "translateY(35px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#0EA5E9", textTransform: "uppercase", letterSpacing: "0.06em", background: "#E0F2FE", padding: "0.35rem 0.9rem", borderRadius: "100px" }}>
            RECORRIDO INTERACTIVO · MÓDULOS CIGO
          </span>
          <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A", marginTop: "0.75rem" }}>
            Explora los 8 Módulos de la Plataforma
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.95rem", color: "#64748B" }}>
              Desliza en móvil o usa las flechas para navegar
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                background: isPaused ? "#FEF3C7" : "#E0F2FE",
                color: isPaused ? "#B45309" : "#0284C7",
                padding: "0.2rem 0.65rem",
                borderRadius: "100px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {isPaused ? "⏸ En pausa para lectura" : "▶ Rotación activa (9s)"}
            </span>
          </div>
        </div>

        {/* Horizontal Scrollable Tabs Header */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            overflowX: "auto",
            paddingBottom: "0.75rem",
            marginBottom: "1.75rem",
            scrollbarWidth: "none",
            justifyContent: "flex-start",
          }}
        >
          {MODULES.map((mod, idx) => {
            const isActive = idx === activeModuleIndex;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleIndex(idx)}
                style={{
                  padding: "0.55rem 1rem",
                  borderRadius: "100px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: isActive ? "1.5px solid #0EA5E9" : "1.5px solid #E2E8F0",
                  background: isActive ? "#E0F2FE" : "#FFFFFF",
                  color: isActive ? "#0284C7" : "#64748B",
                  boxShadow: isActive ? "0 4px 14px rgba(14,165,233,0.18)" : "none",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>{mod.id}.</span>
                {mod.shortName}
              </button>
            );
          })}
        </div>

        {/* Balanced 2-Column Carousel Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "2.5rem",
            boxShadow: "0 12px 48px rgba(0,0,0,0.05)",
            border: "1px solid #E2E8F0",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
            {/* Left Column: Text Content & Navigation */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ background: "#E0F2FE", color: "#0284C7", fontWeight: 700, fontSize: "0.75rem", padding: "0.35rem 0.85rem", borderRadius: "100px" }}>
                  {currentMod.badge}
                </span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#94A3B8" }}>
                  Módulo <strong style={{ color: "#0F172A" }}>{activeModuleIndex + 1}</strong> de {MODULES.length}
                </span>
              </div>

              <h3 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
                {currentMod.title}
              </h3>

              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                {currentMod.desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                <div style={{ background: "#F0F9FF", borderLeft: "4px solid #0EA5E9", padding: "0.85rem 1.15rem", borderRadius: "0 10px 10px 0" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0284C7", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>Lo que logrará tu empresa</div>
                  <div style={{ fontSize: "0.875rem", color: "#0F172A", fontWeight: 600 }}>{currentMod.logro}</div>
                </div>
                <div style={{ background: "rgba(16,185,129,0.06)", borderLeft: "4px solid #10B981", padding: "0.85rem 1.15rem", borderRadius: "0 10px 10px 0" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>Proceso que se automatiza</div>
                  <div style={{ fontSize: "0.875rem", color: "#0F172A", fontWeight: 600 }}>{currentMod.auto}</div>
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={prevModule}
                  style={{
                    padding: "0.65rem 1.25rem",
                    borderRadius: "100px",
                    border: "1.5px solid #E2E8F0",
                    background: "#FFFFFF",
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0EA5E9";
                    e.currentTarget.style.color = "#0EA5E9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#0F172A";
                  }}
                >
                  ← Anterior
                </button>

                <button
                  onClick={nextModule}
                  style={{
                    padding: "0.65rem 1.25rem",
                    borderRadius: "100px",
                    border: "1.5px solid #0EA5E9",
                    background: "#0EA5E9",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    boxShadow: "0 4px 14px rgba(14,165,233,0.25)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Siguiente →
                </button>
              </div>
            </div>

            {/* Right Column: Perfectly Proportioned Screenshot Container */}
            <div style={{ borderRadius: "18px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 12px 32px rgba(0,0,0,0.06)", background: "#F8FAFC" }}>
              <img
                src={currentMod.img}
                alt={currentMod.title}
                style={{ width: "100%", height: "auto", maxHeight: "440px", objectFit: "contain", display: "block" }}
                onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Direct ROI Calculator for Fleet Owners ── */}
      <RoiCalculator />

      {/* ── High-Conversion Footer CTA ── */}
      <section style={{ padding: "5.5rem 1.5rem", background: "#FFFFFF", textAlign: "center", borderTop: "1px solid #E2E8F0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#DCFCE7",
              color: "#16A34A",
              fontWeight: 800,
              fontSize: "0.8125rem",
              padding: "0.4rem 1.25rem",
              borderRadius: "100px",
              marginBottom: "1.25rem",
            }}
          >
            <span className="radar-live" />
            PRUEBA DE CONCEPTO B2B
          </div>

          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 2.85rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Prueba Gratis de 7 Días (1 Semana) para tu Flota
          </h2>

          <p style={{ fontSize: "1.08rem", color: "#475569", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Habilitamos CIGO sin costo durante 7 días para hasta 10 unidades de tu empresa en ruta activa, con inducción para tus conductores y sin compromiso de permanencia.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#0284C7", fontWeight: 700, marginBottom: "2.25rem" }}>
            WhatsApp / Teléfonos: +51 929 222 980 · +51 935 351 768 · Correo: contacto@devorq.com
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a
              href={WSP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "1rem 2.25rem",
                borderRadius: "100px",
                background: "#25D366",
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(37, 211, 102, 0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.08-2.008-.466-1.545-.644-2.529-2.22-2.607-2.324-.076-.104-.633-.842-.633-1.608 0-.766.4-1.144.542-1.301.143-.158.312-.198.416-.198.104 0 .208.002.299.006.096.004.225-.036.352.269.13.313.443 1.077.481 1.156.039.078.065.17.013.273-.052.104-.078.17-.156.26-.078.092-.163.204-.234.274-.078.078-.16.163-.069.319.091.156.404.667.868 1.08 1.026.914 1.35 1.026 1.542 1.104.192.078.305.068.418-.063.113-.13.484-.564.614-.757.13-.193.26-.16.437-.095.177.065 1.12.528 1.315.626.195.097.325.146.372.228.047.081.047.47-.097.876z"/>
              </svg>
              Solicitar 7 Días Gratis por WhatsApp
            </a>

            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "1rem 2.25rem",
                borderRadius: "100px",
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1.5px solid #E2E8F0",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              Contactar por Correo
            </a>
          </div>

          {/* Real Exports Badges */}
          <div style={{ paddingTop: "1.75rem", borderTop: "1px solid #F1F5F9" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Formatos de Exportación Disponibles en el Panel Web:
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>
              <span>• Reporte Operativo Excel (.xlsx)</span>
              <span>• Planilla de Liquidación por Viaje (.xlsx)</span>
              <span style={{ color: "#0EA5E9" }}>• Archivo TXT SIRE Compras SUNAT</span>
              <span>• Paquete ZIP de Evidencias Fotográficas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Términos y Condiciones (Oculto por defecto) ── */}
      {showTerms && (
        <section id="terminos" style={{ padding: "4rem 1.5rem", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "880px", margin: "0 auto", color: "#334155", fontSize: "0.9375rem", lineHeight: "1.7", position: "relative" }}>
            <button
              onClick={() => setShowTerms(false)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "#E2E8F0",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontWeight: 700,
                color: "#475569",
              }}
              title="Cerrar"
            >
              ✕
            </button>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
              TÉRMINOS Y CONDICIONES DEL SERVICIO &quot;CIGO&quot;
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem", fontWeight: 600 }}>
              Última actualización: Noviembre 2026
            </p>

            <p style={{ marginBottom: "1rem" }}>
              El presente documento establece los Términos y Condiciones de Uso del software y servicio digital denominado &quot;CIGO&quot;, comercializado y operado bajo la marca comercial Devorq Systems por el prestador debidamente registrado y facultado ante la SUNAT (en adelante, &quot;EL PRESTADOR&quot;).
            </p>

            <p style={{ marginBottom: "1.75rem" }}>
              Al contratar, registrarse o hacer uso de los servicios de CIGO a través de WhatsApp, la plataforma web o cualquier canal habilitado, la empresa o persona contratante (en adelante, &quot;EL CLIENTE&quot;) acepta de forma plena y sin reservas los siguientes términos:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  1. NATURALEZA Y ALCANCE DEL SERVICIO
                </h3>
                <p>
                  1.1. CIGO es un software as a service (SaaS) de asistencia tecnológica que utiliza inteligencia artificial y procesamiento de datos para la lectura, extracción automatizada y consolidación de comprobantes de pago de viáticos y transporte. 1.2. EL PRESTADOR opera legalmente bajo el régimen tributario de Persona Natural con Negocio amparado por la legislación de la República del Perú, emitiendo comprobantes de pago electrónicos (Facturas y Boletas Electrónicas) totalmente válidos y deducibles para EL CLIENTE.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  2. DESLINDE DE RESPONSABILIDAD CONTABLE Y TRIBUTARIA (CLÁUSULA BLINDADA)
                </h3>
                <p>
                  2.1. CIGO es una herramienta tecnológica de automatización y auditoría preliminar. En ningún caso EL PRESTADOR actúa como estudio contable, auditor tributario ni asesor fiscal de EL CLIENTE. 2.2. La responsabilidad legal, fiscal y tributaria sobre la veracidad, sustento, declaración de IGV, impuesto a la renta y presentación final de libros contables ante la SUNAT recae exclusiva e inderogablemente sobre EL CLIENTE y sus contadores designados. 2.3. EL PRESTADOR no se hace responsable por multas, sanciones, reparos tributarios ni inconsistencias emitidas por la SUNAT u otros organismos públicos derivados de comprobantes falsos, ilegibles, clonados o mal emitidos por proveedores terceros de EL CLIENTE.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  3. DISPONIBILIDAD DEL SERVICIO (SLA Y PROVEEDORES TERCEROS)
                </h3>
                <p style={{ marginBottom: "0.5rem" }}>
                  3.1. El servicio se presta bajo la modalidad &quot;Tal cual&quot; (As Is) y &quot;Según disponibilidad&quot;. 3.2. EL PRESTADOR realiza sus mejores esfuerzos para garantizar una disponibilidad del 99% del servicio. Sin embargo, no asumirá responsabilidad por interrupciones temporales, caídas o demoras causadas por fallas en servicios de terceros ajenos a su control, tales como:
                </p>
                <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
                  <li>Caídas o suspensiones del servicio global de la plataforma Meta / WhatsApp Cloud API.</li>
                  <li>Mantenimientos, caídas o lentitud de la plataforma SUNAT / Servicios Migo.</li>
                  <li>Interrupciones de conectividad a internet de las empresas de telecomunicaciones en el Perú.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  4. PROTECCIÓN DE DATOS PERSONALES (LEY N° 29733)
                </h3>
                <p>
                  4.1. De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), EL PRESTADOR se compromete a tratar la información, fotos de comprobantes, números de teléfono y datos recibidos de EL CLIENTE con absoluta confidencialidad y reserva. 4.2. Los datos e imágenes procesados serán utilizados única y exclusivamente para la prestación del servicio de consolidación contable contratado. EL PRESTADOR garantiza que nunca venderá, cederá ni comercializará la información de EL CLIENTE a terceros.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  5. PAGOS, FACTURACIÓN Y SUSPENSIÓN DEL SERVICIO
                </h3>
                <p>
                  5.1. El servicio se factura de forma mensual según la cantidad de choferes/usuarios activos contratados. 5.2. Las facturas emitidas por EL PRESTADOR cuentan con un plazo máximo de pago de cinco (5) días calendario desde su emisión. 5.3. El incumplimiento del pago dentro del plazo otorgará a EL PRESTADOR la facultad de suspender temporalmente el procesamiento de comprobantes en el bot de WhatsApp hasta la regularización del saldo adeudado, sin que ello genere derecho a indemnización ni reclamo alguno por parte de EL CLIENTE.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  6. JURISDICCIÓN Y LEY APLICABLE
                </h3>
                <p>
                  6.1. Para todos los efectos del presente contrato, las partes se someten a la legislación vigente de la República del Perú y a la competencia de los jueces y tribunales de la ciudad de Lima, Perú.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "1.5rem", textAlign: "center", background: "#FFFFFF" }}>
        <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          © {new Date().getFullYear()} Devorq Systems · CIGO Control Inteligente de Gastos ·{" "}
          <button
            onClick={() => {
              setShowTerms((prev) => !prev);
              if (!showTerms) {
                setTimeout(() => {
                  document.getElementById("terminos")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
            style={{
              background: "none",
              border: "none",
              color: "#0EA5E9",
              fontWeight: 600,
              cursor: "pointer",
              padding: 0,
              font: "inherit",
              textDecoration: "underline",
            }}
          >
            {showTerms ? "Ocultar Términos y Condiciones" : "Términos y Condiciones"}
          </button>{" "}
          · <Link href="/" style={{ color: "#0EA5E9", textDecoration: "none", fontWeight: 600 }}>Volver a Devorq</Link>
        </p>
      </footer>
    </div>
  );
}
