"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=diego.gutierrez2911@gmail.com&su=Solicitud%20de%20Demo%20CIGO%20-%20Devorq%20Systems";

const MODULES = [
  {
    id: "01",
    shortName: "Inicio de Sesión",
    badge: "ACCESO & SEGURIDAD MULTI-EMPRESA",
    title: "Inicio de Sesión & Autenticación",
    desc: "Autenticación centralizada por empresa con encriptación de datos y aislamiento estricto de sesiones operativas.",
    logro: "Protección total de la información contable y prevención de accesos no autorizados.",
    auto: "Validación instantánea de credenciales y asignación automática de permisos según el nivel del usuario.",
    img: "/cigo/01-login.webp"
  },
  {
    id: "02",
    shortName: "Dashboard",
    badge: "VISIBILIDAD FINANCIERA EN TIEMPO REAL",
    title: "Dashboard Operativo & Métricas",
    desc: "Consolidado visual de egresos, totales auditados y resumen de gastos por vehículo y ruta en una sola vista gerencial.",
    logro: "Toma de decisiones gerenciales respaldada por números reales actualizados en tiempo real.",
    auto: "Consolidación automática de métricas diarias, gráficas de tendencias y alertas presupuestales.",
    img: "/cigo/02-dashboard.webp"
  },
  {
    id: "03",
    shortName: "Choferes & Flotas",
    badge: "CONTROL DE VIÁTICOS POR CONDUCTOR",
    title: "Módulo de Choferes & Flotas",
    desc: "Directorio de la planilla de choferes, asignación de placas vehiculares y trazabilidad completa de licencias y viáticos por viaje.",
    logro: "Orden absoluto sobre el dinero asignado a cada conductor para peajes, combustible y viáticos.",
    auto: "Cálculo en vivo de saldo entregado vs. rendido, identificando liquidaciones pendientes sin errores.",
    img: "/cigo/03-choferes.webp"
  },
  {
    id: "04",
    shortName: "Auditoría SUNAT",
    badge: "AUDITORÍA TRIBUTARIA AUTOMÁTICA",
    title: "Auditoría SUNAT & Comprobantes",
    desc: "Recepción y filtrado automático de gastos operativos con verificación oficial de Constancia de Recepción (CDR) ante SUNAT.",
    logro: "Eliminación total de gastos no deducibles por comprobantes falsos, anulados o fuera de fecha.",
    auto: "Consulta automática de CDR en SUNAT y bloqueo inmediato de comprobantes duplicados por serie/número.",
    img: "/cigo/04-comprobantes.webp"
  },
  {
    id: "05",
    shortName: "Reportes SIRE",
    badge: "INTEGRACIÓN CONTABLE DIRECTA",
    title: "Reportes & Exportación SIRE",
    desc: "Generación de archivos estructurados para la integración inmediata con SUNAT SIRE y exportación en Excel en 1 clic.",
    logro: "Cierre contable mensual sin requerir digitación manual ni revisión hoja por hoja.",
    auto: "Formateo de archivos compatibles con SIRE y exportaciones automáticas organizadas.",
    img: "/cigo/05-reportes.webp"
  },
  {
    id: "06",
    shortName: "Usuarios & Permisos",
    badge: "ADMINISTRACIÓN DE ROLES & PERMISOS",
    title: "Gestión de Usuarios & Permisos",
    desc: "Administración jerárquica de roles (Administrador Maestro, Auditor, Conductor, Contador) para una delegación de tareas 100% segura.",
    logro: "Delegación segura de responsabilidades donde cada colaborador accede únicamente a sus funciones correspondientes.",
    auto: "Aplicación automática de restricciones por perfil impidiendo modificaciones no autorizadas.",
    img: "/cigo/06-usuarios.webp"
  },
  {
    id: "07",
    shortName: "Configuración",
    badge: "REGLAS DE NEGOCIO & PARÁMETROS",
    title: "Configuración del Sistema",
    desc: "Personalización de categorías contables de gasto, centros de costos, reglas de negocio y topes presupuestarios de la empresa.",
    logro: "Alineación exacta de la plataforma CIGO a los requerimientos contables específicos de tu empresa.",
    auto: "Aplicación continua de topes máximos de gasto y validación automática de reglas de negocio en cada registro.",
    img: "/cigo/07-configuracion.webp"
  },
  {
    id: "08",
    shortName: "Perfil de Usuario",
    badge: "SEGURIDAD & BITÁCORA INDIVIDUAL",
    title: "Perfil de Usuario",
    desc: "Gestión individual de credenciales de acceso, cambio de contraseña y seguimiento de la bitácora de actividad de cada usuario.",
    logro: "Trazabilidad y responsabilidad total sobre las operaciones y aprobaciones realizadas por cada usuario.",
    auto: "Registro automático en la bitácora de auditoría de cada acción ejecutada en el sistema.",
    img: "/cigo/08-perfil.webp"
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

  // Auto-play timer every 10 seconds (10000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      nextModule();
    }, 10000);
    return () => clearInterval(timer);
  }, [nextModule, activeModuleIndex]);

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
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #5B4EFF, #E040FB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(91,78,255,0.25)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span style={{ fontSize: "1.125rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>
            Devorq <span style={{ color: "#5B4EFF" }}>Systems</span>
          </span>
        </Link>

        {/* Back Link */}
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
      </nav>

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.14) 0%, #FFFFFF 80%)",
          padding: "5.5rem 1.5rem 4.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* CIGO LOGO IN LARGE FIRST ITEM */}
          <div style={{ marginBottom: "1.75rem" }}>
            <img
              src="/cigo-logo.webp"
              alt="CIGO Logo"
              style={{
                height: "82px",
                width: "auto",
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
                filter: "drop-shadow(0 6px 20px rgba(14, 165, 233, 0.18))",
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
              border: "1px solid rgba(14, 165, 233, 0.25)",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0EA5E9" }} />
            Plataforma SaaS + Chatbot de WhatsApp para Choferes
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
            Control Inteligente de Gastos &{" "}
            <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Auditoría Tributaria SUNAT
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "#64748B",
              lineHeight: 1.75,
              maxWidth: "760px",
              margin: "0 auto 2.5rem",
            }}
          >
            Los choferes rinden enviando una foto por WhatsApp. CIGO registra los datos automáticamente en la plataforma y audita la validez tributaria ante SUNAT en la web oficial. Cero digitación manual y cero multas.
          </p>

          {/* Circular Down Arrow Scroll Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button
              onClick={scrollToContent}
              aria-label="Conocer el Chatbot de WhatsApp"
              title="Conocer el Chatbot de WhatsApp"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1.5px solid rgba(14, 165, 233, 0.35)",
                boxShadow: "0 6px 20px rgba(14, 165, 233, 0.2)",
                color: "#0EA5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                animation: "bounce-down 2s infinite",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(14, 165, 233, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(14, 165, 233, 0.2)";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURE SPOTLIGHT: RENDICIÓN POR CHATBOT DE WHATSAPP ── */}
      <section
        id="whatsapp-feature"
        ref={wspRef}
        style={{
          padding: "3.25rem 1.5rem 3rem",
          background: "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)",
          borderTop: "1px solid #DCFCE7",
          borderBottom: "1px solid #E2E8F0",
          opacity: wspInView ? 1 : 0,
          transform: wspInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 2.25rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.06em", background: "#DCFCE7", padding: "0.3rem 0.85rem", borderRadius: "100px" }}>
              TECNOLOGÍA DE RENDICIÓN VÍA WHATSAPP
            </span>
            <h2 style={{ fontSize: "clamp(1.65rem, 3.5vw, 2.25rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.035em", marginTop: "0.75rem", marginBottom: "0.6rem" }}>
              Envío de Foto por WhatsApp → Confirmación e Ingreso a CIGO
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#475569", lineHeight: 1.65 }}>
              Los números telefónicos de tus choferes están autorizados en CIGO. Durante sus viajes, el chofer solo envía la foto del peaje o factura por WhatsApp y recibe la confirmación con los datos clave. La validación CDR ante SUNAT se consolida automáticamente en el panel web.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "center" }}>
            {/* Left: 3 Step Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "#FFFFFF", padding: "1.15rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 1: ENVÍO DE FOTO VÍA WHATSAPP
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  El chofer envía la foto por WhatsApp
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                  Sin escribir textos complejos ni llenar formularios. El chofer solo envía la imagen del peaje o ticket de combustible al bot de CIGO.
                </p>
              </div>

              <div style={{ background: "#FFFFFF", padding: "1.15rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 2: MENSAJE DE CONFIRMACIÓN CON DATOS CLAVE
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Respuesta instantánea del Chatbot
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                  El Chatbot le responde de inmediato al chofer confirmando la recepción y mostrando los datos procesados (Proveedor, Serie, Número y Monto).
                </p>
              </div>

              <div style={{ background: "#FFFFFF", padding: "1.15rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 3: AUDITORÍA SUNAT EN PANEL CIGO
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Verificación de CDR en la plataforma web
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>
                  El sistema CIGO realiza la consulta oficial de CDR en SUNAT en segundo plano, reflejando el estado tributario en el dashboard administrativo.
                </p>
              </div>
            </div>

            {/* Right: WhatsApp Simulated Interface Window */}
            <div
              style={{
                background: "#0B141A",
                borderRadius: "24px",
                padding: "1.5rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                border: "1px solid #16A34A",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid #202C33", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "0.9rem" }}>
                  CIGO
                </div>
                <div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#E9EDEF" }}>CIGO Chatbot Choferes</div>
                  <div style={{ fontSize: "0.75rem", color: "#25D366", fontWeight: 600 }}>● En línea · Registro de Gastos</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.84rem" }}>
                <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.75rem 1rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                  <div style={{ fontSize: "0.72rem", color: "#7AE3B5", fontWeight: 700, marginBottom: "0.2rem" }}>Diego Gutierrez (Chofer Placa ABC-123)</div>
                  📷 [Foto de Boleta de Peaje]
                </div>

                <div style={{ background: "#202C33", color: "#E9EDEF", padding: "0.85rem 1rem", borderRadius: "12px 12px 12px 2px", alignSelf: "flex-start", maxWidth: "90%", borderLeft: "3px solid #25D366" }}>
                  <div style={{ fontWeight: 800, color: "#25D366", marginBottom: "0.4rem" }}>✓ Comprobante Registrado Exitosamente</div>
                  <div style={{ lineHeight: 1.5 }}>
                    • <strong>Proveedor:</strong> Autopista del Norte S.A.C.<br />
                    • <strong>Comprobante:</strong> B001-004892<br />
                    • <strong>Monto:</strong> S/. 45.00<br />
                    • <strong>Tipo:</strong> Peaje
                  </div>
                  <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#94A3B8" }}>
                    Los datos han sido ingresados a tu rendición de viáticos en CIGO.
                  </div>
                </div>
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
                0% Reparos Tributarios
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Validación automática del CDR ante SUNAT. Cero facturas falsas, anuladas o no habidas.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", padding: "2.25rem 1.75rem", borderRadius: "20px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(16,185,129,0.12)", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 4px 12px rgba(16,185,129,0.15)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.6rem" }}>
                Ahorro de 15 Horas/Semana
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Eliminación total de la digitación manual de facturas y la revisión hoja por hoja.
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
                Transparencia en Choferes
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Control exacto del saldo entregado vs. rendido por conductor, placa vehicular y ruta.
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
                Cierre Contable SIRE en 1 Clic
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748B", lineHeight: 1.65 }}>
                Exportación automática de archivos en formato estructurado para SUNAT SIRE y Excel.
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
          <p style={{ fontSize: "1rem", color: "#64748B", marginTop: "0.4rem" }}>
            Avance automático cada 10 segundos o selecciona un módulo.
          </p>
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

      {/* ── Single Clean Conversion Footer CTA ── */}
      <section style={{ padding: "5.5rem 1.5rem", background: "#FFFFFF", textAlign: "center", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.035em", marginBottom: "1rem" }}>
            Revoluciona el control de gastos de tu empresa
          </h2>

          <p style={{ fontSize: "1.0625rem", color: "#64748B", lineHeight: 1.75, marginBottom: "2.25rem" }}>
            Solicita una presentación guiada para conocer CIGO funcionando en vivo con la estructura de tu empresa.
          </p>

          <a
            href={GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "1rem 2.5rem",
              borderRadius: "100px",
              background: "linear-gradient(135deg, #EA4335 0%, #C5221F 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(234, 67, 53, 0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
            Enviar correo desde Gmail
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "1.5rem", textAlign: "center", background: "#F8FAFC" }}>
        <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          © {new Date().getFullYear()} Devorq Systems · CIGO Control Inteligente de Gastos · <Link href="/" style={{ color: "#0EA5E9", textDecoration: "none", fontWeight: 600 }}>Volver a Devorq</Link>
        </p>
      </footer>
    </div>
  );
}
