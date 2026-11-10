"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Productos", href: "/#cigo" },
  { label: "¿Por qué Devorq?", href: "/#por-que-devor" },
  { label: "¿Cómo funciona?", href: "/#como-funciona" },
  { label: "Preguntas Frecuentes", href: "/#faq" },
  { label: "Contacto", href: "/#contacto" },
];

function scrollToHash(href: string, e: React.MouseEvent) {
  if (!href.includes("#")) return;
  e.preventDefault();
  const id = href.split("#")[1];
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#030712]/90 backdrop-blur-xl border-b border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-[#030712]/75 backdrop-blur-md border-b border-slate-900"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white group transition-transform duration-200 active:scale-95"
        >
          <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/devorq-logo.png"
              alt="Devorq Logo"
              width={38}
              height={38}
              priority
              className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(14,165,233,0.5)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Devorq
              <span className="text-sky-400 text-xs px-2 py-0.5 rounded-full bg-sky-950/80 font-semibold border border-sky-800/80 hidden sm:inline-block">
                Systems
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 list-none bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => scrollToHash(link.href, e)}
                className="text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800 px-3.5 py-1.5 rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/#contacto"
            onClick={(e) => scrollToHash("/#contacto", e)}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 px-4 py-2 rounded-full shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-pulse" />
            <span>Iniciar Proyecto</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Alternar menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-t border-slate-800 px-6 py-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  scrollToHash(link.href, e);
                  setMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-lg text-base font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-850 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 mt-2">
              <a
                href="#contacto"
                onClick={(e) => {
                  scrollToHash("/#contacto", e);
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-500/25 active:scale-98 transition-all"
              >
                <span>Solicitar Asesoría</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
