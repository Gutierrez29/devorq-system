"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import RoiCalculator from "@/components/RoiCalculator";
import CigoPricing from "@/components/CigoPricing";

const REGISTER_URL = "https://cigo.devorq.com/registro";
const WSP_DEMO_URL =
  "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quiero%20agendar%20una%20demostraci%C3%B3n%20gratuita%20de%2015%20minutos%20de%20CIGO%20para%20mi%20flota.";
const GMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@devorq.com&su=Solicitud%20de%20Demostraci%C3%B3n%20CIGO%20-%20Devorq%20Systems";

const PROBLEMS = [
  {
    num: "01",
    title: "Boletas térmicas perdidas o borradas",
    desc: "Los recibos de grifo y peaje en papel térmico se borran por el calor o se extravían en ruta, provocando pérdida directa de crédito fiscal (IGV) y gasto deducible.",
    tag: "Pérdida tributaria",
  },
  {
    num: "02",
    title: "Demoras al liquidar viáticos y caja chica",
    desc: "Administración espera días o semanas hasta que el camión regrese a base con un sobre de recibos físicos para cuadrar saldos pendientes.",
    tag: "Cuello de botella",
  },
  {
    num: "03",
    title: "Sobreconsumos en combustible y peajes",
    desc: "Cuando las facturas se revisan recién a fin de mes es tarde para detectar fugas, cobros alterados o caídas en el rendimiento Km/galón de cada tracto.",
    tag: "Fugas en ruta",
  },
  {
    num: "04",
    title: "Cero visibilidad mientras el camión viaja",
    desc: "Sin herramientas simples para el chofer, gerencia opera a ciegas respecto al dinero entregado frente al gasto realmente ejecutado en carretera.",
    tag: "Sin trazabilidad",
  },
];

const METHODOLOGY_STEPS = [
  {
    phase: "Fase 1 · 5 minutos",
    title: "Registro directo y carga de flota",
    desc: "Creas tu cuenta gratuita en cigo.devorq.com/registro sin tarjeta de crédito y registras las placas de tus camiones y números de WhatsApp de tus choferes.",
  },
  {
    phase: "Fase 2 · Día 1 en carretera",
    title: "Tus conductores reportan por WhatsApp",
    desc: "Sin descargar aplicaciones ni recordar contraseñas. Envían fotos de comprobantes, tablero de odómetro o notas de voz al chat de CIGO incluso en rutas con poca señal.",
  },
  {
    phase: "Fase 3 · Continuo en oficina",
    title: "Auditoría SUNAT y liquidación inmediata",
    desc: "Operaciones monitorea consumo Km/galón y saldos en tiempo real; Contabilidad exporta Excel, planillas de liquidación, archivo TXT SIRE y carpeta ZIP de evidencias.",
  },
];

const KEY_BENEFITS = [
  {
    accent: "#0EA5E9",
    bg: "#E0F2FE",
    kpi: "Tiempo Real",
    title: "Control de viáticos, combustible y peajes en ruta",
    desc: "Visualiza saldos entregados frente a gastos rendidos por viaje, chofer y placa mientras la unidad sigue en carretera.",
  },
  {
    accent: "#10B981",
    bg: "#DCFCE7",
    kpi: "Menos Fugas",
    title: "Validación SUNAT y alerta de duplicados",
    desc: "Consulta automática de RUC (Activo/Habido), detección de boletas repetidas y alertas ante desvíos en combustible Km/galón.",
  },
  {
    accent: "#7C3AED",
    bg: "#F3E8FF",
    kpi: "Cierre Ágil",
    title: "Ahorro de horas administrativas y contables",
    desc: "Elimina la digitación manual desde sobres de papel. Descarga reportes Excel, liquidaciones de viaje, TXT SIRE y fotos en ZIP.",
  },
  {
    accent: "#0284C7",
    bg: "#E0F2FE",
    kpi: "0 Apps Extra",
    title: "Adopción inmediata por tus conductores",
    desc: "Opera 100% desde el WhatsApp habitual del chofer con lectura por IA de tickets térmicos, tableros y notas de voz.",
  },
];

const MODULES = [
  {
    id: "01",
    shortName: "Dashboard Flota",
    badge: "VISIBILIDAD OPERATIVA GERENCIAL",
    title: "Panel Operativo de Flota, Combustible y Gastos",
    desc: "Consolidado visual de egresos, abastecimientos de combustible (Km/galón), comprobantes registrados y saldos por viaje en una sola vista gerencial.",
    logro: "Visibilidad clara de los costos operativos por viaje, conductor y unidad antes del cierre de fin de mes.",
    auto: "Consolidación continua de gastos reportados desde carretera y alertas ante variaciones de rendimiento.",
    img: "/cigo/02-dashboard.webp",
  },
  {
    id: "02",
    shortName: "Choferes & Flota",
    badge: "TRACTOS, CARRETAS Y VIÁTICOS",
    title: "Padrón de Choferes, Tractos, Carretas & Viáticos",
    desc: "Directorio de conductores habilitados en WhatsApp, asignación de tractocamiones y semirremolques, lecturas de odómetro y control de viáticos entregados.",
    logro: "Control ordenado de unidades activas y del dinero entregado a cada conductor para peajes, diésel y gastos de ruta.",
    auto: "Cálculo continuo de saldo entregado frente a gastos sustentados, identificando liquidaciones pendientes.",
    img: "/cigo/03-choferes.webp",
  },
  {
    id: "03",
    shortName: "Revisión SUNAT",
    badge: "CONSULTA TRIBUTARIA Y DUPLICADOS",
    title: "Revisión de Comprobantes & Consulta SUNAT",
    desc: "Recepción de fotos de boletas y facturas por WhatsApp con consulta de RUC emisor (Activo/Habido), estado del comprobante electrónico y alerta de documentos repetidos.",
    logro: "Ordenamiento fiscal previo al cierre contable y prevención de doble registro de un mismo comprobante.",
    auto: "Consulta automatizada del estado del comprobante electrónico y detección de duplicidades por serie y correlativo.",
    img: "/cigo/04-comprobantes.webp",
  },
  {
    id: "04",
    shortName: "Reportes & SIRE",
    badge: "EXPORTACIÓN EXCEL, SIRE Y ZIP",
    title: "Reportes Contables, Liquidación Excel & SIRE SUNAT",
    desc: "Descarga de reportes operativos en Excel, planillas de liquidación por viaje, archivo TXT estructurado para el Registro de Compras Electrónico (SIRE) y paquete ZIP de evidencias.",
    logro: "Reducción de horas de digitación manual para el equipo contable con respaldos fotográficos ordenados por periodo.",
    auto: "Generación estructurada de hojas Excel, archivo TXT SIRE Compras y carpeta comprimida ZIP de comprobantes.",
    img: "/cigo/05-reportes.webp",
  },
  {
    id: "05",
    shortName: "Políticas & Topes",
    badge: "REGLAS DE VIÁTICOS Y COMBUSTIBLE",
    title: "Configuración de Topes, Bancarización y Reglas",
    desc: "Definición de parámetros operativos, metodología de combustible (Tanque lleno, Nivel de tablero, Cuota por ruta), bancarización SUNAT y topes de alimentación y hospedaje.",
    logro: "Mayor control sobre los límites presupuestados y reglas fiscales para cada categoría de gasto en carretera.",
    auto: "Observación automática de gastos cuando superan los topes o umbrales de bancarización definidos por tu empresa.",
    img: "/cigo/07-configuracion.webp",
  },
  {
    id: "06",
    shortName: "Usuarios & Roles",
    badge: "PERMISOS POR ÁREA",
    title: "Gestión de Usuarios, Roles y Permisos Granulares",
    desc: "Perfiles diferenciados para Gerencia General, Jefatura de Operaciones, Auditoría y Contabilidad con permisos específicos por módulo.",
    logro: "Cada área accede exactamente a las funciones y reportes que le corresponden, con control centralizado.",
    auto: "Control de accesos y límites de cuentas web desde el panel administrativo.",
    img: "/cigo/06-usuarios.webp",
  },
  {
    id: "07",
    shortName: "Trazabilidad",
    badge: "EXPEDIENTE Y AUDITORÍA",
    title: "Expediente de Usuario y Trazabilidad Operativa",
    desc: "Vista detallada de permisos asignados, seguridad de credenciales y actividad registrada por cada integrante del equipo administrativo.",
    logro: "Respaldo interno y control de cambios en las liquidaciones y parámetros de la empresa.",
    auto: "Registro continuo de auditoría sobre aprobaciones, ajustes y cambios de configuración.",
    img: "/cigo/08-perfil.webp",
  },
  {
    id: "08",
    shortName: "Acceso Privado",
    badge: "ENTORNO PRIVADO LEY N° 29733",
    title: "Entorno Privado por Empresa & Seguridad Cloud",
    desc: "Acceso autenticado con aislamiento por empresa y resguardo en la nube de comprobantes y evidencia fotográfica.",
    logro: "Reserva comercial conforme a la Ley N° 29733: tu información operativa es de titularidad exclusiva de tu empresa.",
    auto: "Almacenamiento cifrado y acceso permanente desde oficina o dispositivo móvil.",
    img: "/cigo/01-login.webp",
  },
];

const CIGO_FAQS = [
  {
    q: "¿Cómo funciona la prueba gratis de 7 días y cómo me registro?",
    a: "Solo ingresa directamente a cigo.devorq.com/registro, completa los datos básicos de tu empresa y en menos de 1 minuto queda activa tu cuenta gratuita por 7 días para hasta 5 camiones en ruta, sin tarjeta de crédito y sin compromiso de permanencia.",
  },
  {
    q: "¿Cómo funciona el pricing por volumen y los precios incluyen IGV?",
    a: "Sí. Todos nuestros precios mensuales por vehículo incluyen IGV en el Perú y emitimos Factura Electrónica: S/ 29 (5–10 camiones), S/ 27 (11–20), S/ 25 (21–50), S/ 23 (51–100) y S/ 20 (101+ camiones). Todos los tramos incluyen conductores ilimitados por WhatsApp.",
  },
  {
    q: "¿Cómo asiste CIGO en la revisión de comprobantes ante SUNAT?",
    a: "CIGO consulta el estado del RUC emisor (Activo y Habido) y el estado del comprobante electrónico mediante conectores de consulta tributaria. Si un establecimiento aún no ha enviado su resumen diario a SUNAT, el documento queda pendiente para revalidación y se alerta cualquier intento de registrar una serie y número duplicados.",
  },
  {
    q: "¿Qué archivos y reportes descarga el área de contabilidad?",
    a: "Desde el panel web puedes exportar el reporte operativo en Excel, las planillas de liquidación por viaje (viáticos entregados vs. gastos rendidos), el archivo TXT estructurado para el Registro de Compras Electrónico (SIRE) de SUNAT y un archivo ZIP con todas las fotografías de respaldo ordenadas.",
  },
  {
    q: "¿Necesito que mis choferes descarguen alguna aplicación especial?",
    a: "No. Los choferes no instalan aplicaciones adicionales ni manejan contraseñas. Todo el envío de fotos de boletas/facturas, lecturas de odómetro o notas de voz para gastos menores se realiza desde su número habitual de WhatsApp.",
  },
  {
    q: "¿Qué sucede si el conductor pasa por un tramo de carretera sin señal?",
    a: "El conductor toma la foto del comprobante o del tablero y la envía al chat de WhatsApp. En cuanto la unidad retoma cobertura móvil o Wi-Fi en ruta, WhatsApp transmite el mensaje y CIGO lo procesa conservando la fecha de emisión del documento.",
  },
];

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

export default function CigoPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeChatTab, setActiveChatTab] = useState<"combustible" | "audio" | "peaje">("combustible");
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#terminos") {
      setShowTerms(true);
      setTimeout(() => {
        document.getElementById("terminos")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const nextModule = useCallback(() => {
    setActiveModuleIndex((prev) => (prev + 1) % MODULES.length);
  }, []);

  const prevModule = useCallback(() => {
    setActiveModuleIndex((prev) => (prev - 1 + MODULES.length) % MODULES.length);
  }, []);

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
  const { ref: problemRef, inView: problemInView } = useInView();
  const { ref: wspRef, inView: wspInView } = useInView();
  const { ref: benefitsRef, inView: benefitsInView } = useInView();
  const { ref: sliderRef, inView: sliderInView } = useInView();

  const currentMod = MODULES[activeModuleIndex];

  return (
    <div style={{ background: "#FAFAFC", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A" }}>
      {/* ── Navbar Top ── */}
      <nav
        aria-label="Navegación principal CIGO"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(14, 165, 233, 0.12)",
          padding: "0.8rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <img
            src="/devorq-isotype.png"
            alt="Devorq Systems Logo"
            style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "contain" }}
          />
          <span style={{ fontSize: "1.125rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>
            Devorq <span style={{ color: "#0EA5E9" }}>Systems</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => scrollToSection("problema")}
            style={{
              background: "none",
              border: "none",
              fontSize: "0.84rem",
              fontWeight: 600,
              color: "#475569",
              cursor: "pointer",
              padding: "0.35rem 0.6rem",
            }}
          >
            El Problema
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("whatsapp-feature")}
            style={{
              background: "none",
              border: "none",
              fontSize: "0.84rem",
              fontWeight: 600,
              color: "#475569",
              cursor: "pointer",
              padding: "0.35rem 0.6rem",
            }}
          >
            Cómo Funciona
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("planes")}
            style={{
              background: "none",
              border: "none",
              fontSize: "0.84rem",
              fontWeight: 700,
              color: "#0284C7",
              cursor: "pointer",
              padding: "0.35rem 0.6rem",
            }}
          >
            Planes
          </button>
          <a
            href="/cigo/carta-presentacion-cigo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#334155",
              background: "#F8FAFC",
              padding: "0.4rem 0.85rem",
              borderRadius: "100px",
              textDecoration: "none",
              border: "1px solid #E2E8F0",
            }}
          >
            📄 Dossier PDF
          </a>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.82rem",
              fontWeight: 800,
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              padding: "0.45rem 1rem",
              borderRadius: "100px",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(16,185,129,0.28)",
            }}
          >
            Prueba Gratis →
          </a>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "#64748B",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← Inicio
          </Link>
        </div>
      </nav>

      {/* ── 1. PORTADA Y GANCHO INICIAL (HERO / RESUMEN EJECUTIVO) ── */}
      <section
        ref={heroRef}
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.16) 0%, #FFFFFF 80%)",
          padding: "4.75rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "1.35rem" }}>
            <img
              src="/cigo-logo.webp"
              alt="CIGO Logo"
              style={{
                height: "80px",
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
              marginBottom: "1.4rem",
              border: "1px solid rgba(14, 165, 233, 0.3)",
            }}
          >
            <span className="radar-live" />
            Devorq Systems · Control de Flotas B2B vía WhatsApp sin Instalar Apps
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5.2vw, 3.75rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              marginBottom: "1.2rem",
              color: "#0F172A",
            }}
          >
            Frena las fugas en ruta y{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              liquida viáticos y combustible en tiempo real
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              lineHeight: 1.72,
              maxWidth: "740px",
              margin: "0 auto 2.25rem",
            }}
          >
            Tus conductores envían fotos de comprobantes, odómetro o notas de voz desde su <strong>WhatsApp habitual</strong>; administración valida ante <strong>SUNAT</strong>, controla el consumo <strong>Km/galón</strong> y cierra liquidaciones en minutos.
          </p>

          {/* Primary + Secondary CTAs */}
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.4rem" }}>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.98rem",
                padding: "0.92rem 2rem",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 10px 26px rgba(16, 185, 129, 0.35)",
              }}
            >
              Comenzar Prueba Gratis de 7 Días →
            </a>

            <a
              href={WSP_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.92rem",
                padding: "0.92rem 1.65rem",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(15,23,42,0.16)",
              }}
            >
              Agendar Demo de 15 min (WhatsApp)
            </a>

            <button
              type="button"
              onClick={() => scrollToSection("planes")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#FFFFFF",
                color: "#0284C7",
                fontWeight: 700,
                fontSize: "0.92rem",
                padding: "0.92rem 1.5rem",
                borderRadius: "100px",
                border: "1.5px solid #BAE6FD",
                cursor: "pointer",
              }}
            >
              Ver Pricing por Volumen ↓
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#64748B",
            }}
          >
            <span>✓ Activación inmediata en cigo.devorq.com/registro</span>
            <span>✓ Hasta 5 camiones gratis · Sin tarjeta</span>
            <span>
              <a
                href="/cigo/brochure-cigo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0284C7", textDecoration: "underline", fontWeight: 700 }}
              >
                📘 Descargar Brochure PDF
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. EL PROBLEMA ACTUAL (CONTEXTO Y DOLORES DEL CLIENTE) ── */}
      <section
        id="problema"
        ref={problemRef}
        style={{
          padding: "4.5rem 1.5rem",
          background: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
          opacity: problemInView ? 1 : 0,
          transform: problemInView ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
            <span
              style={{
                fontSize: "0.76rem",
                fontWeight: 800,
                color: "#DC2626",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "#FEE2E2",
                padding: "0.3rem 0.9rem",
                borderRadius: "100px",
              }}
            >
              EL PROBLEMA ACTUAL EN CARRETERA
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 2.4rem)",
                fontWeight: 900,
                color: "#0F172A",
                letterSpacing: "-0.035em",
                marginTop: "0.8rem",
                marginBottom: "0.6rem",
              }}
            >
              Lo que hoy le cuesta dinero y horas a tu flota
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.65 }}>
              Gestionar viajes con sobres de papel, hojas sueltas y rendiciones tardías abre cuatro frentes críticos cada mes:
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.35rem" }}>
            {PROBLEMS.map((p) => (
              <article
                key={p.num}
                style={{
                  background: "#FFFBFB",
                  border: "1px solid #FECACA",
                  borderTop: "4px solid #EF4444",
                  borderRadius: "18px",
                  padding: "1.6rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#DC2626" }}>
                    PROBLEMA {p.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#991B1B",
                      background: "#FEE2E2",
                      padding: "0.18rem 0.6rem",
                      borderRadius: "100px",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.87rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LA SOLUCIÓN Y METODOLOGÍA: RENDICIÓN POR WHATSAPP + PUESTA EN MARCHA ── */}
      <section
        id="whatsapp-feature"
        ref={wspRef}
        style={{
          padding: "4.5rem 1.5rem",
          background: "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)",
          borderBottom: "1px solid #E2E8F0",
          opacity: wspInView ? 1 : 0,
          transform: wspInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 2.5rem" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#16A34A",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "#DCFCE7",
                padding: "0.3rem 0.9rem",
                borderRadius: "100px",
              }}
            >
              LA SOLUCIÓN · REPORTE EN RUTA VÍA WHATSAPP
            </span>
            <h2
              style={{
                fontSize: "clamp(1.7rem, 3.6vw, 2.35rem)",
                fontWeight: 900,
                color: "#0F172A",
                letterSpacing: "-0.035em",
                marginTop: "0.75rem",
                marginBottom: "0.6rem",
              }}
            >
              El Conductor Envía Foto o Audio → CIGO Valida y Liquida al Instante
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#475569", lineHeight: 1.65 }}>
              Sin descargar aplicaciones adicionales ni recordar contraseñas. El chofer reporta desde su WhatsApp habitual y tu equipo valida en tiempo real desde la oficina.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "center", marginBottom: "3rem" }}>
            {/* Left: 3 Step Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "#FFFFFF", padding: "1.2rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 1: FOTO O NOTA DE VOZ EN RUTA
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Toma foto del comprobante y del tablero (odómetro)
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  Al cargar combustible o pagar un peaje/viático, el conductor envía la foto por WhatsApp. Si está sin señal, WhatsApp transmite el reporte al recuperar cobertura.
                </p>
              </div>

              <div style={{ background: "#FFFFFF", padding: "1.2rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 2: EXTRACCIÓN IA, KM/GALÓN Y CONSULTA SUNAT
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Lectura automática y cálculo de consumo
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  CIGO extrae proveedor, RUC, galones, importes y kilometraje, valida datos en SUNAT y responde al conductor con confirmación inmediata y saldo restante.
                </p>
              </div>

              <div style={{ background: "#FFFFFF", padding: "1.2rem 1.35rem", borderRadius: "14px", border: "1px solid #DCFCE7", boxShadow: "0 4px 16px rgba(22,163,74,0.05)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PASO 3: VALIDACIÓN Y EXPORTACIÓN EN PANEL WEB
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
                  Operaciones y Contabilidad supervisan al instante
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  Seguimiento continuo de rendiciones durante el viaje, alertas por Telegram/web ante desvíos y descarga en Excel, liquidación de viaje, TXT SIRE y carpeta ZIP.
                </p>
              </div>
            </div>

            {/* Right: WhatsApp Simulated Interactive Window */}
            <div
              style={{
                background: "#0B141A",
                borderRadius: "24px",
                padding: "1.25rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.32)",
                border: "1px solid #16A34A",
              }}
            >
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
                  WhatsApp Oficial
                </span>
              </div>

              <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1rem", background: "#111B21", padding: "0.3rem", borderRadius: "8px" }}>
                <button
                  type="button"
                  onClick={() => setActiveChatTab("combustible")}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: activeChatTab === "combustible" ? "#202C33" : "transparent",
                    color: activeChatTab === "combustible" ? "#25D366" : "#8696A0",
                  }}
                >
                  ⛽ Combustible
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChatTab("audio")}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: activeChatTab === "audio" ? "#202C33" : "transparent",
                    color: activeChatTab === "audio" ? "#25D366" : "#8696A0",
                  }}
                >
                  🎙️ Audio Movilidad
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChatTab("peaje")}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: activeChatTab === "peaje" ? "#202C33" : "transparent",
                    color: activeChatTab === "peaje" ? "#25D366" : "#8696A0",
                  }}
                >
                  📄 Peaje
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.82rem", minHeight: "230px" }}>
                {activeChatTab === "combustible" && (
                  <>
                    <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.65rem 0.95rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%" }}>
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
                    <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.65rem 0.95rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%" }}>
                      <div style={{ fontSize: "0.7rem", color: "#7AE3B5", fontWeight: 700, marginBottom: "0.2rem" }}>Chofer Carlos M. (Tracto V1A-892)</div>
                      🎙️ <em>&quot;Pagué 20 soles de cochera en Chimbote para pernoctar&quot;</em>
                    </div>
                    <div style={{ background: "#202C33", color: "#E9EDEF", padding: "0.75rem 0.95rem", borderRadius: "12px 12px 12px 2px", alignSelf: "flex-start", maxWidth: "92%", borderLeft: "3px solid #7C3AED" }}>
                      <div style={{ fontWeight: 800, color: "#A855F7", marginBottom: "0.3rem" }}>✓ Gasto Menor Transcrito por IA</div>
                      <div style={{ lineHeight: 1.5, fontSize: "0.78rem" }}>
                        • <strong>Concepto:</strong> Cochera / Pernocte en Ruta<br />
                        • <strong>Monto Extraído:</strong> S/. 20.00<br />
                        • <strong>Destino:</strong> Planilla de Movilidad CIGO<br />
                        • <strong>Estado:</strong> Registrado para Liquidación
                      </div>
                    </div>
                  </>
                )}

                {activeChatTab === "peaje" && (
                  <>
                    <div style={{ background: "#005C4B", color: "#E9EDEF", padding: "0.65rem 0.95rem", borderRadius: "12px 12px 2px 12px", alignSelf: "flex-end", maxWidth: "85%" }}>
                      <div style={{ fontSize: "0.7rem", color: "#7AE3B5", fontWeight: 700, marginBottom: "0.2rem" }}>Chofer Carlos M. (Tracto V1A-892)</div>
                      📷 [Foto Boleta de Peaje Autopista del Norte]
                    </div>
                    <div style={{ background: "#202C33", color: "#E9EDEF", padding: "0.75rem 0.95rem", borderRadius: "12px 12px 12px 2px", alignSelf: "flex-start", maxWidth: "92%", borderLeft: "3px solid #0EA5E9" }}>
                      <div style={{ fontWeight: 800, color: "#38BDF8", marginBottom: "0.3rem" }}>✓ Comprobante Validado en SUNAT</div>
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

          {/* Metodología y Plazos de Puesta en Marcha */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #CBD5E1",
              padding: "1.75rem 2rem",
              boxShadow: "0 8px 28px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.35rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0284C7", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  METODOLOGÍA DE PUESTA EN MARCHA
                </span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0.2rem 0 0" }}>
                  Tu flota operando en menos de 48 horas
                </h3>
              </div>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 800,
                  color: "#059669",
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  padding: "0.45rem 1rem",
                  borderRadius: "100px",
                  textDecoration: "none",
                }}
              >
                Activar Fase 1 Gratis ahora →
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
              {METHODOLOGY_STEPS.map((step) => (
                <div
                  key={step.phase}
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "14px",
                    padding: "1.15rem 1.25rem",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0284C7", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    {step.phase}
                  </div>
                  <div style={{ fontSize: "0.96rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.35rem" }}>
                    {step.title}
                  </div>
                  <p style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BENEFICIOS CLAVE PARA LA EMPRESA (CONSOLIDADO SIN REPETICIÓN) ── */}
      <section
        id="beneficios"
        ref={benefitsRef}
        style={{
          padding: "4.5rem 1.5rem",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          opacity: benefitsInView ? 1 : 0,
          transform: benefitsInView ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#0284C7",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "#E0F2FE",
                padding: "0.3rem 0.9rem",
                borderRadius: "100px",
              }}
            >
              BENEFICIOS CLAVE PARA TU EMPRESA
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 2.45rem)",
                fontWeight: 900,
                color: "#0F172A",
                letterSpacing: "-0.035em",
                marginTop: "0.75rem",
                marginBottom: "0.6rem",
              }}
            >
              Orden operativo, control financiero y menos horas administrativas
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.65 }}>
              CIGO no añade burocracia: elimina el trabajo manual y protege tu margen en cada viaje.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.4rem" }}>
            {KEY_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="card-hover-glow"
                style={{
                  background: "#F8FAFC",
                  padding: "1.75rem",
                  borderRadius: "18px",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "fit-content",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    color: b.accent,
                    background: b.bg,
                    padding: "0.28rem 0.75rem",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                  }}
                >
                  {b.kpi}
                </span>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0F172A", margin: "0.25rem 0 0" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CAPTURAS REALES DEL SISTEMA (CARRUSEL INTERACTIVO) ── */}
      <section
        id="modulos-carousel"
        ref={sliderRef}
        style={{
          padding: "4.5rem 1.5rem 5rem",
          maxWidth: "1240px",
          margin: "0 auto",
          opacity: sliderInView ? 1 : 0,
          transform: sliderInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "#0EA5E9",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              background: "#E0F2FE",
              padding: "0.35rem 0.9rem",
              borderRadius: "100px",
            }}
          >
            CAPTURAS REALES · PANEL WEB DE ADMINISTRACIÓN
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.45rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A", marginTop: "0.75rem" }}>
            Explora los 8 Módulos de la Plataforma
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.92rem", color: "#64748B" }}>
              Desliza en móvil o selecciona cualquier módulo
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                background: isPaused ? "#FEF3C7" : "#E0F2FE",
                color: isPaused ? "#B45309" : "#0284C7",
                padding: "0.2rem 0.65rem",
                borderRadius: "100px",
                fontWeight: 700,
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
            marginBottom: "1.5rem",
            scrollbarWidth: "none",
          }}
        >
          {MODULES.map((mod, idx) => {
            const isActive = idx === activeModuleIndex;
            return (
              <button
                key={mod.id}
                type="button"
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
            padding: "2.25rem",
            boxShadow: "0 12px 48px rgba(0,0,0,0.05)",
            border: "1px solid #E2E8F0",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.25rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ background: "#E0F2FE", color: "#0284C7", fontWeight: 700, fontSize: "0.74rem", padding: "0.32rem 0.85rem", borderRadius: "100px" }}>
                  {currentMod.badge}
                </span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#94A3B8" }}>
                  Módulo <strong style={{ color: "#0F172A" }}>{activeModuleIndex + 1}</strong> de {MODULES.length}
                </span>
              </div>

              <h3 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
                {currentMod.title}
              </h3>

              <p style={{ fontSize: "0.94rem", color: "#475569", lineHeight: 1.65, marginBottom: "1.4rem" }}>
                {currentMod.desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.75rem" }}>
                <div style={{ background: "#F0F9FF", borderLeft: "4px solid #0EA5E9", padding: "0.8rem 1.1rem", borderRadius: "0 10px 10px 0" }}>
                  <div style={{ fontSize: "0.73rem", fontWeight: 800, color: "#0284C7", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>
                    Lo que logrará tu empresa
                  </div>
                  <div style={{ fontSize: "0.86rem", color: "#0F172A", fontWeight: 600 }}>{currentMod.logro}</div>
                </div>
                <div style={{ background: "rgba(16,185,129,0.06)", borderLeft: "4px solid #10B981", padding: "0.8rem 1.1rem", borderRadius: "0 10px 10px 0" }}>
                  <div style={{ fontSize: "0.73rem", fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>
                    Proceso que se automatiza
                  </div>
                  <div style={{ fontSize: "0.86rem", color: "#0F172A", fontWeight: 600 }}>{currentMod.auto}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={prevModule}
                  style={{
                    padding: "0.62rem 1.2rem",
                    borderRadius: "100px",
                    border: "1.5px solid #E2E8F0",
                    background: "#FFFFFF",
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "0.86rem",
                    cursor: "pointer",
                  }}
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  onClick={nextModule}
                  style={{
                    padding: "0.62rem 1.2rem",
                    borderRadius: "100px",
                    border: "1.5px solid #0EA5E9",
                    background: "#0EA5E9",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.86rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(14,165,233,0.25)",
                  }}
                >
                  Siguiente →
                </button>
              </div>
            </div>

            <div style={{ borderRadius: "18px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 12px 32px rgba(0,0,0,0.06)", background: "#F8FAFC" }}>
              <img
                src={currentMod.img}
                alt={currentMod.title}
                style={{ width: "100%", height: "auto", maxHeight: "440px", objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. DIFERENCIADORES, PRUEBA SOCIAL Y DOCUMENTACIÓN OFICIAL ── */}
      <RoiCalculator />

      {/* ── 7. INVERSIÓN: CIGO PRICING DE EXPANSIÓN (S/ 29 A S/ 20 · IGV INCLUIDO) ── */}
      <CigoPricing />

      {/* ── 8. PREGUNTAS FRECUENTES ── */}
      <section
        id="faq-cigo"
        style={{
          padding: "5rem 1.5rem",
          background: "#FAFAFC",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#0284C7",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "#E0F2FE",
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
              }}
            >
              PREGUNTAS FRECUENTES · CIGO
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.35rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em", marginTop: "0.9rem", marginBottom: "0.6rem" }}>
              Dudas Operativas, Planes y Prueba Gratuita
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748B", lineHeight: 1.65 }}>
              Respuestas claras sobre el registro gratuito, precios con IGV, consultas SUNAT y exportaciones SIRE.
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E2E8F0",
              padding: "0.5rem 1.75rem",
              boxShadow: "0 8px 28px rgba(15, 23, 42, 0.04)",
            }}
          >
            {CIGO_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    borderBottom: idx < CIGO_FAQS.length - 1 ? "1px solid #F1F5F9" : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: "1.2rem 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "0.98rem", fontWeight: 700, color: isOpen ? "#0284C7" : "#0F172A", lineHeight: 1.45 }}>
                      {faq.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: isOpen ? "#E0F2FE" : "#F1F5F9",
                        color: isOpen ? "#0284C7" : "#64748B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "1rem",
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, paddingBottom: "1.2rem", margin: 0 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. CIERRE Y LLAMADO A LA ACCIÓN (CTA FINAL) ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#FFFFFF", textAlign: "center", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
              marginBottom: "1.2rem",
            }}
          >
            <span className="radar-live" />
            ACTIVACIÓN INMEDIATA · SIN TARJETA DE CRÉDITO
          </div>

          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Empieza tu Prueba Gratis de 7 Días Hoy Mismo
          </h2>

          <p style={{ fontSize: "1.06rem", color: "#475569", lineHeight: 1.75, marginBottom: "1.2rem" }}>
            Registra tu empresa directamente en <strong>cigo.devorq.com/registro</strong> para probar con hasta 5 camiones en ruta, o agenda una demostración gratuita de 15 minutos con nuestro equipo.
          </p>
          <p style={{ fontSize: "0.94rem", color: "#0284C7", fontWeight: 700, marginBottom: "2.1rem" }}>
            WhatsApp / Teléfonos: +51 929 222 980 · +51 935 351 768 · Correo: contacto@devorq.com
          </p>

          <div style={{ display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.25rem" }}>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 2.2rem",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.35)",
              }}
            >
              Registrar mi Flota Gratis (7 Días) →
            </a>

            <a
              href={WSP_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 1.85rem",
                borderRadius: "100px",
                background: "#25D366",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 8px 22px rgba(37, 211, 102, 0.28)",
              }}
            >
              Agendar Demo de 15 min (WhatsApp)
            </a>

            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "1rem 1.65rem",
                borderRadius: "100px",
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1.5px solid #E2E8F0",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Contactar por Correo
            </a>
          </div>

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

      {/* ── Términos y Condiciones (Desplegable) ── */}
      {showTerms && (
        <section id="terminos" style={{ padding: "4rem 1.5rem", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "880px", margin: "0 auto", color: "#334155", fontSize: "0.9375rem", lineHeight: "1.7", position: "relative" }}>
            <button
              type="button"
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
                  1.1. CIGO es un software as a service (SaaS) de asistencia tecnológica que utiliza inteligencia artificial y procesamiento de datos para la lectura, extracción automatizada y consolidación de comprobantes de pago de viáticos y transporte. 1.2. EL PRESTADOR opera legalmente amparado por la legislación de la República del Perú, emitiendo comprobantes de pago electrónicos (Facturas y Boletas Electrónicas) válidos y deducibles para EL CLIENTE.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  2. DESLINDE DE RESPONSABILIDAD CONTABLE Y TRIBUTARIA
                </h3>
                <p>
                  2.1. CIGO es una herramienta tecnológica de automatización y auditoría preliminar. En ningún caso EL PRESTADOR actúa como estudio contable, auditor tributario ni asesor fiscal de EL CLIENTE. 2.2. La responsabilidad legal, fiscal y tributaria sobre la veracidad, sustento, declaración de IGV, impuesto a la renta y presentación final de libros contables ante la SUNAT recae exclusivamente sobre EL CLIENTE y sus contadores designados.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  3. DISPONIBILIDAD DEL SERVICIO (SLA Y PROVEEDORES TERCEROS)
                </h3>
                <p style={{ marginBottom: "0.5rem" }}>
                  3.1. El servicio se presta bajo la modalidad &quot;Tal cual&quot; (As Is) y &quot;Según disponibilidad&quot;. 3.2. EL PRESTADOR realiza sus mejores esfuerzos para garantizar una disponibilidad del 99% del servicio, sin asumir responsabilidad por interrupciones en plataformas de terceros (Meta/WhatsApp, SUNAT o telecomunicaciones).
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  4. PROTECCIÓN DE DATOS PERSONALES (LEY N° 29733)
                </h3>
                <p>
                  4.1. De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), EL PRESTADOR trata la información, comprobantes y números de teléfono con estricta confidencialidad y reserva, exclusivamente para la prestación del servicio contratado.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                  5. PAGOS, FACTURACIÓN Y SUSPENSIÓN DEL SERVICIO
                </h3>
                <p>
                  5.1. El servicio se factura de forma mensual según la cantidad de vehículos/unidades activas contratadas conforme al tramo vigente del tarifario (con IGV incluido en Perú). 5.2. Las facturas emitidas cuentan con un plazo máximo de pago de cinco (5) días calendario desde su emisión. 5.3. El incumplimiento del pago faculta a EL PRESTADOR a suspender temporalmente el procesamiento hasta regularizar el saldo adeudado.
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
            type="button"
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
          ·{" "}
          <Link href="/" style={{ color: "#0EA5E9", textDecoration: "none", fontWeight: 600 }}>
            Volver a Devorq
          </Link>
        </p>
      </footer>
    </div>
  );
}
