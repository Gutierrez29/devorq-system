"use client";

import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  Empresa: [
    { label: "Nosotros", href: "/#por-que-devor" },
    { label: "Servicios", href: "/#cigo" },
    { label: "Contacto", href: "/#contacto" },
  ],
  Productos: [
    { label: "CIGO - Transporte & SUNAT", href: "/cigo" },
    { label: "ASYS IA - Agentes WhatsApp", href: "/asys-ia" },
    { label: "Desarrollo a Medida", href: "/#contacto" },
  ],
  Legal: [
    { label: "Términos de uso", href: "#" },
    { label: "Privacidad de datos", href: "#" },
    { label: "Seguridad Cloud", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 relative overflow-hidden border-t border-slate-900">
      {/* Background ambient subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/devorq-logo.png"
                  alt="Devorq Logo"
                  width={34}
                  height={34}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Devorq
                <span className="text-sky-400 text-xs px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800 font-semibold">
                  Systems
                </span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Ingeniería de software de alta fidelidad, plataformas empresariales y agentes de inteligencia artificial para acelerar el crecimiento corporativo en Latinoamérica.
            </p>

            {/* Social Icons (Clean inline SVGs) */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Categories */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-sky-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Devorq Systems. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5">
            <span>Diseñado y construido con precisión técnica en</span>
            <span className="text-slate-300 font-medium">Perú 🇵🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
