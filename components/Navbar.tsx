"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const WSP_URL = "https://wa.me/51929222980?text=Hola%20Devorq%2C%20quisiera%20conversar%20con%20un%20asesor%20sobre%20CIGO.";

function scrollToHash(href: string, e: React.MouseEvent) {
  if (!href.includes("#")) return;
  const hash = href.split("#")[1];
  if (!hash) return;
  const el = document.getElementById(hash);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(14,165,233,0.12)" : "1px solid rgba(226,232,240,0.6)",
        boxShadow: scrolled ? "0 4px 24px rgba(15,23,42,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <img
            src="/devorq-isotype.png"
            alt="Devorq Logo"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#0F172A",
            }}
          >
            Devorq <span style={{ color: "#0EA5E9" }}>Systems</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            listStyle: "none",
          }}
          className="hidden-mobile"
        >
          {/* Dropdown: Productos */}
          <li
            ref={dropdownRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: dropdownOpen ? "#0EA5E9" : "#475569",
                background: dropdownOpen ? "rgba(14,165,233,0.08)" : "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.55rem 0.95rem",
                borderRadius: "100px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "all 0.2s ease",
              }}
            >
              Productos
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "310px",
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  padding: "0.75rem",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  animation: "bounce-in 0.25s ease both",
                  zIndex: 200,
                }}
              >
                <Link
                  href="/cigo"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F0F9FF"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#E0F2FE", color: "#0EA5E9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                    ⛽
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>CIGO Flotas</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", lineHeight: 1.4, marginTop: "2px" }}>
                      Control de combustible, odómetros, viáticos y SUNAT por WhatsApp.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/asys-ia"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAF5FF"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F3E8FF", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                    🤖
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>ASYS IA</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", lineHeight: 1.4, marginTop: "2px" }}>
                      Agente conversacional de ventas, pedidos y atención 24/7.
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link
              href="/#documentacion-cigo"
              onClick={(e) => scrollToHash("/#documentacion-cigo", e)}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#475569",
                textDecoration: "none",
                padding: "0.55rem 0.95rem",
                borderRadius: "100px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#0EA5E9";
                (e.currentTarget as HTMLElement).style.background = "rgba(14,165,233,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#475569";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Clientes & Documentos
            </Link>
          </li>

          <li>
            <a
              href="/cigo/carta-presentacion-cigo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#0284C7",
                textDecoration: "none",
                padding: "0.55rem 0.95rem",
                borderRadius: "100px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(14,165,233,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              📄 Carta CIGO
            </a>
          </li>

          <li>
            <Link
              href="/#como-funciona"
              onClick={(e) => scrollToHash("/#como-funciona", e)}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#475569",
                textDecoration: "none",
                padding: "0.55rem 0.95rem",
                borderRadius: "100px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#0EA5E9";
                (e.currentTarget as HTMLElement).style.background = "rgba(14,165,233,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#475569";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              ¿Cómo funciona?
            </Link>
          </li>

          <li>
            <Link
              href="/#por-que-devor"
              onClick={(e) => scrollToHash("/#por-que-devor", e)}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#475569",
                textDecoration: "none",
                padding: "0.55rem 0.95rem",
                borderRadius: "100px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#0EA5E9";
                (e.currentTarget as HTMLElement).style.background = "rgba(14,165,233,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#475569";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              ¿Por qué Devorq?
            </Link>
          </li>

          <li>
            <Link
              href="/#contacto"
              onClick={(e) => scrollToHash("/#contacto", e)}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#475569",
                textDecoration: "none",
                padding: "0.55rem 0.95rem",
                borderRadius: "100px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#0EA5E9";
                (e.currentTarget as HTMLElement).style.background = "rgba(14,165,233,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#475569";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Contacto
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href={WSP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden-mobile"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.35rem" }}
          >
            Hablar con Asesor
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "#0F172A",
              display: "none",
            }}
            className="show-mobile"
            aria-label="Abrir menú"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid #E2E8F0",
            padding: "1.25rem 1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.25rem" }}>
            Nuestros Productos
          </div>
          <Link
            href="/cigo"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#0EA5E9",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ⛽ CIGO (Control de Flotas & Combustible)
          </Link>
          <Link
            href="/asys-ia"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#7C3AED",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderBottom: "1px solid #F1F5F9",
              paddingBottom: "0.85rem",
            }}
          >
            🤖 ASYS IA (Ventas & Atención WhatsApp)
          </Link>

          <a
            href="/#documentacion-cigo"
            onClick={(e) => {
              scrollToHash("/#documentacion-cigo", e);
              setMenuOpen(false);
            }}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#334155",
              textDecoration: "none",
            }}
          >
            Clientes y Documentación CIGO
          </a>

          <a
            href="/cigo/carta-presentacion-cigo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#0284C7",
              textDecoration: "none",
            }}
          >
            📄 Carta de Presentación CIGO (PDF)
          </a>

          <a
            href="/cigo/brochure-cigo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#0EA5E9",
              textDecoration: "none",
            }}
          >
            📘 Brochure Comercial CIGO (PDF)
          </a>

          <a
            href="/#como-funciona"
            onClick={(e) => {
              scrollToHash("/#como-funciona", e);
              setMenuOpen(false);
            }}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#334155",
              textDecoration: "none",
            }}
          >
            ¿Cómo funciona?
          </a>

          <a
            href="/#contacto"
            onClick={(e) => {
              scrollToHash("/#contacto", e);
              setMenuOpen(false);
            }}
            style={{
              padding: "0.65rem 0",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#334155",
              textDecoration: "none",
            }}
          >
            Contacto Directo
          </a>

          <a
            href={WSP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: "0.75rem", width: "100%", justifyContent: "center" }}
          >
            Hablar por WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 859px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

