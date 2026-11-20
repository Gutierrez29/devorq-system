"use client";

import { useState } from "react";
import { ArrowRight, BadgePercent, Check, Headphones, Minus, Plus } from "lucide-react";

const REGISTER_URL = "https://cigo.devorq.com/registro";

type BillingMode = "regular" | "anual";

interface PlanDefinition {
  id: "micro" | "flota" | "corporativo";
  name: string;
  rangeLabel: string;
  badge?: string;
  paymentModality: string;
  supportLevel: string;
  regularExIgv: string;
  regularIncIgv: string;
  annualExIgv: string;
  annualIncIgv: string;
  annualNote: string;
  featured?: boolean;
  ctaLabel: string;
  ctaType: "register" | "whatsapp";
}

const PLANS: PlanDefinition[] = [
  {
    id: "micro",
    name: "Plan Micro",
    rangeLabel: "1 a 4 cupos",
    paymentModality: "Trimestral o Anual adelantado",
    supportLevel: "100% Autoservicio (tutoriales en video + ticket asíncrono)",
    regularExIgv: "S/ 100.00",
    regularIncIgv: "S/ 118.00 / mes (fijo inc. IGV)",
    annualExIgv: "S/ 83.33",
    annualIncIgv: "S/ 98.33 / mes efectivo (S/ 1,180.00 / año inc. IGV)",
    annualNote: "Paga 10 meses y lleva 12 · Ahorras 2 meses",
    ctaLabel: "Probar 7 días gratis",
    ctaType: "register",
  },
  {
    id: "flota",
    name: "Plan Flota",
    rangeLabel: "5 a 50 cupos",
    badge: "Más elegido",
    paymentModality: "Mensual, Trimestral o Anual adelantado",
    supportLevel:
      "Autoservicio + WhatsApp de soporte para 1 administrador (horario de oficina)",
    regularExIgv: "S/ 25.00",
    regularIncIgv: "S/ 29.50 / cupo (inc. IGV)",
    annualExIgv: "S/ 20.83",
    annualIncIgv: "S/ 24.58 / cupo (inc. IGV · S/ 0.69 + IGV diarios)",
    annualNote: "Baja de S/ 25.00 a S/ 20.83 + IGV sin esperar a tener 50 camiones",
    featured: true,
    ctaLabel: "Probar 7 días gratis",
    ctaType: "register",
  },
  {
    id: "corporativo",
    name: "Plan Corporativo",
    rangeLabel: "Más de 50 cupos",
    paymentModality: "Semestral o Anual adelantado",
    supportLevel: "Onboarding guiado remoto + canal dedicado para jefe de flota",
    regularExIgv: "Desde S/ 21.00",
    regularIncIgv: "Desde S/ 24.78 / cupo (inc. IGV)",
    annualExIgv: "Desde S/ 21.00",
    annualIncIgv: "Desde S/ 24.78 / cupo (tarifa corporativa a medida)",
    annualNote: "Cotización personalizada según volumen y multi-empresa",
    ctaLabel: "Solicitar cotización",
    ctaType: "whatsapp",
  },
];

const INCLUDED_ITEMS = [
  "Conductores ilimitados por WhatsApp (sin instalar aplicaciones)",
  "Validación SUNAT en vivo, control de duplicados y Bancarización Ley 28194",
  "Lectura IA de comprobantes, tableros de odómetro y rendimiento Km/galón",
  "Exportación: Liquidación Choferes, Libro de Compras Excel, SIRE 8.4 y ZIP",
  "Factura electrónica emitida en el Perú (+18% IGV desglosado)",
  "Prueba gratuita de 7 días para hasta 5 camiones sin tarjeta de crédito",
];

function formatPen(amount: number): string {
  return amount.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CigoPricing() {
  const [billing, setBilling] = useState<BillingMode>("anual");
  const [cupos, setCupos] = useState<number>(15);

  const isAnnual = billing === "anual";

  const activePlanId: PlanDefinition["id"] =
    cupos <= 4 ? "micro" : cupos <= 50 ? "flota" : "corporativo";

  const activePlan = PLANS.find((p) => p.id === activePlanId) ?? PLANS[1];

  // Cálculos exactos sin IGV y con IGV (18%) según tabla oficial
  let monthlyRegularExIgv = 0;
  let monthlyEffectiveExIgv = 0;
  let annualTotalExIgv = 0;

  if (activePlanId === "micro") {
    monthlyRegularExIgv = 100;
    annualTotalExIgv = 100 * 10; // Paga 10 meses, lleva 12
    monthlyEffectiveExIgv = isAnnual ? annualTotalExIgv / 12 : 100;
  } else if (activePlanId === "flota") {
    monthlyRegularExIgv = cupos * 25;
    annualTotalExIgv = cupos * 25 * 10; // Paga 10 meses, lleva 12
    monthlyEffectiveExIgv = isAnnual ? annualTotalExIgv / 12 : monthlyRegularExIgv;
  } else {
    monthlyRegularExIgv = cupos * 21;
    annualTotalExIgv = monthlyRegularExIgv * 12;
    monthlyEffectiveExIgv = monthlyRegularExIgv;
  }

  const monthlyEffectiveIncIgv = monthlyEffectiveExIgv * 1.18;
  const annualTotalIncIgv = annualTotalExIgv * 1.18;
  const annualSavingsExIgv =
    activePlanId === "corporativo" ? 0 : monthlyRegularExIgv * 2;
  const annualSavingsIncIgv = annualSavingsExIgv * 1.18;

  const wspCorporateUrl = `https://wa.me/51929222980?text=${encodeURIComponent(
    `Hola Devorq, quiero cotizar el Plan Corporativo de CIGO para mi flota de más de 50 cupos (actualmente ${Math.max(
      51,
      cupos
    )} unidades) y coordinar una demostración de 15 minutos.`
  )}`;

  const wspQuoteUrl = `https://wa.me/51929222980?text=${encodeURIComponent(
    `Hola Devorq, quiero cotizar CIGO en ${activePlan.name} (${cupos} ${
      cupos === 1 ? "cupo" : "cupos"
    }, modalidad ${
      isAnnual ? "Pago Anual 10x12 (-16.7%)" : "Tarifa Regular"
    }) y coordinar una demostración de 15 minutos.`
  )}`;

  return (
    <section id="planes" className="py-20 sm:py-24 px-5 sm:px-8 bg-[#0B1320] text-white">
      <div className="max-w-[1240px] mx-auto">
        {/* Header + Billing Mode Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-9 mb-9 border-b border-[#1E2D45]">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white leading-[1.12]">
              Estructura de planes transparente por cupo
            </h2>
            <p className="text-base text-[#CBD5E1] mt-3 leading-relaxed max-w-[62ch]">
              Precios claros <strong className="text-white font-semibold">sin IGV y con IGV (18%)</strong>. Empiezas con 7 días gratis para hasta 5 camiones y eliges la modalidad que mejor encaje con tu flota.
            </p>
          </div>

          {/* Billing Switch */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <div
              role="group"
              aria-label="Modalidad de facturación"
              className="inline-flex items-center bg-[#111C2F] border border-[#24344D] p-1 rounded-xl"
            >
              <button
                type="button"
                onClick={() => setBilling("regular")}
                aria-pressed={!isAnnual}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  !isAnnual
                    ? "bg-white text-[#0B1320] font-bold"
                    : "text-[#CBD5E1] hover:text-white"
                }`}
              >
                Tarifa regular
              </button>
              <button
                type="button"
                onClick={() => setBilling("anual")}
                aria-pressed={isAnnual}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isAnnual
                    ? "bg-[#14B8A6] text-[#0B1320]"
                    : "text-[#CBD5E1] hover:text-white"
                }`}
              >
                <span>Pago Anual (10×12)</span>
                <span
                  className={`font-cigo-mono text-[10px] px-1.5 py-0.5 rounded ${
                    isAnnual
                      ? "bg-[#0B1320]/15 text-[#0B1320]"
                      : "bg-[#14B8A6]/20 text-[#2DD4BF]"
                  }`}
                >
                  -16.7%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Official Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {PLANS.map((plan) => {
            const isHighlighted = plan.featured;
            const showAnnualDiscount = isAnnual && plan.id !== "corporativo";
            const unitSuffix =
              plan.id === "micro" ? "/ mes (fijo)" : "/ cupo / mes";

            return (
              <article
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 border transition-colors ${
                  isHighlighted
                    ? "bg-[#112236] border-[#14B8A6] shadow-lg"
                    : "bg-[#111C2F] border-[#1E2D45]"
                }`}
              >
                <div className="space-y-5">
                  {/* Plan Title & Range */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-[-0.015em]">
                        {plan.name}
                      </h3>
                      <div className="font-cigo-mono text-xs font-semibold text-[#2DD4BF] mt-1">
                        {plan.rangeLabel}
                      </div>
                    </div>
                    {plan.badge && (
                      <span className="font-cigo-mono text-[11px] font-bold bg-[#14B8A6] text-[#0B1320] px-2.5 py-0.5 rounded">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Block: Explicit Sin IGV + Con IGV */}
                  <div className="pb-5 border-b border-[#1E2D45] space-y-1.5">
                    {showAnnualDiscount && (
                      <div className="font-cigo-mono text-xs text-[#94A3B8] line-through">
                        Regular: {plan.regularExIgv} + IGV
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-cigo-mono text-3xl font-bold text-white">
                        {showAnnualDiscount ? plan.annualExIgv : plan.regularExIgv}
                      </span>
                      <span className="text-xs font-medium text-[#94A3B8]">
                        + IGV {unitSuffix}
                      </span>
                    </div>
                    <div className="font-cigo-mono text-xs font-semibold text-[#5EEAD4]">
                      {showAnnualDiscount ? plan.annualIncIgv : plan.regularIncIgv}
                    </div>
                    {isAnnual && (
                      <p className="text-[11px] text-[#CBD5E1] pt-1 leading-snug">
                        {plan.annualNote}
                      </p>
                    )}
                  </div>

                  {/* Modality & Support */}
                  <dl className="space-y-3.5 text-xs">
                    <div>
                      <dt className="text-[#94A3B8] font-medium mb-0.5">
                        Modalidad de pago
                      </dt>
                      <dd className="text-sm font-semibold text-white">
                        {plan.paymentModality}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#94A3B8] font-medium mb-0.5 flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#14B8A6]" strokeWidth={2} />
                        Nivel de soporte
                      </dt>
                      <dd className="text-sm text-[#CBD5E1] leading-relaxed">
                        {plan.supportLevel}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Plan CTA */}
                <div className="pt-2">
                  {plan.ctaType === "register" ? (
                    <a
                      href={REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-extrabold transition-colors ${
                        isHighlighted
                          ? "bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1320]"
                          : "bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] text-white"
                      }`}
                    >
                      {plan.ctaLabel}
                      <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                    </a>
                  ) : (
                    <a
                      href={wspCorporateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] text-white transition-colors"
                    >
                      {plan.ctaLabel}
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Official Annual Payment Benefit Highlight */}
        <div className="rounded-2xl bg-[#0F242A] border border-[#14B8A6]/45 p-5 sm:p-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-4xl">
            <span className="w-9 h-9 rounded-lg bg-[#14B8A6]/20 text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
              <BadgePercent className="w-4 h-4" strokeWidth={2} />
            </span>
            <p className="text-sm text-[#E2E8F0] leading-relaxed">
              <strong className="text-white font-bold">
                Beneficio único por Pago Anual (aplica a Micro y Flota):
              </strong>{" "}
              Paga 10 meses y lleva 12 (<strong className="text-[#2DD4BF]">16.7% de descuento</strong>). Reduce el costo efectivo del Plan Flota de{" "}
              <span className="font-cigo-mono">S/ 25.00</span> a{" "}
              <strong className="font-cigo-mono text-white">S/ 20.83 + IGV</strong> por camión al mes (
              <strong className="font-cigo-mono text-[#5EEAD4]">S/ 24.58 inc. IGV</strong>, equivalente a{" "}
              <span className="font-cigo-mono">S/ 0.69 + IGV</span> diarios), sin esperar a tener 50 camiones.
            </p>
          </div>
          {!isAnnual && (
            <button
              type="button"
              onClick={() => setBilling("anual")}
              className="px-4 py-2 rounded-lg bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1320] text-xs font-extrabold cursor-pointer shrink-0 transition-colors"
            >
              Ver con Pago Anual
            </button>
          )}
        </div>

        {/* Bottom 12-Col Simulator + Included Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 cols: Interactive Fleet Estimator */}
          <div className="lg:col-span-7 border border-[#1E2D45] rounded-2xl bg-[#111C2F] p-6 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#1E2D45]">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Simulador por tamaño de flota
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Calcula al instante tu plan recomendado en tarifa regular o pago anual.
                </p>
              </div>
              <span className="font-cigo-mono text-xs font-bold text-[#0B1320] bg-[#14B8A6] px-3 py-1 rounded">
                {activePlan.name} ({activePlan.rangeLabel})
              </span>
            </div>

            {/* Fleet Slider & Stepper */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-3.5">
                <label htmlFor="cigo-fleet-range" className="text-sm font-semibold text-white">
                  ¿Cuántos cupos (camiones) operas?
                </label>
                <div className="inline-flex items-center border border-[#2C3E5A] rounded-lg overflow-hidden bg-[#0B1320]">
                  <button
                    type="button"
                    aria-label="Reducir cupos"
                    onClick={() => setCupos((prev) => Math.max(1, prev - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#CBD5E1] hover:bg-[#17253D] cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <span className="font-cigo-mono text-base font-bold text-[#2DD4BF] px-4 min-w-[60px] text-center">
                    {cupos}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar cupos"
                    onClick={() => setCupos((prev) => Math.min(200, prev + 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#CBD5E1] hover:bg-[#17253D] cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <input
                id="cigo-fleet-range"
                type="range"
                min={1}
                max={80}
                step={1}
                value={Math.min(80, cupos)}
                onChange={(e) => setCupos(Number(e.target.value) || 1)}
                className="w-full cursor-pointer cigo-range"
              />
              <div className="flex justify-between font-cigo-mono text-[11px] text-[#94A3B8] mt-2">
                <span>1–4 (Micro)</span>
                <span>5–50 (Flota)</span>
                <span>51+ (Corporativo)</span>
              </div>
            </div>

            {/* Output Numbers (Both Sin IGV & Con IGV) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0B1320] border border-[#1E2D45]">
              <div>
                <div className="text-[11px] text-[#94A3B8]">
                  {activePlanId === "corporativo"
                    ? "Referencia mensual desde (Sin IGV)"
                    : isAnnual
                    ? "Costo mensual efectivo (Sin IGV)"
                    : "Tarifa mensual (Sin IGV)"}
                </div>
                <div className="font-cigo-mono text-2xl sm:text-3xl font-bold text-white mt-1">
                  {activePlanId === "corporativo" ? "Desde " : ""}S/ {formatPen(monthlyEffectiveExIgv)}
                </div>
                <div className="font-cigo-mono text-[11px] text-[#94A3B8] mt-0.5">
                  {activePlanId === "micro"
                    ? "Tarifa fija por 1 a 4 cupos"
                    : activePlanId === "flota"
                    ? `${cupos} cupos × S/ ${isAnnual ? "20.83" : "25.00"} + IGV`
                    : `${cupos} cupos × desde S/ 21.00 + IGV`}
                </div>
              </div>

              <div className="sm:border-l sm:border-[#1E2D45] sm:pl-4">
                <div className="text-[11px] text-[#94A3B8]">
                  {activePlanId === "corporativo"
                    ? "Referencia mensual desde (Con IGV)"
                    : isAnnual
                    ? "Costo mensual efectivo (Con IGV)"
                    : "Total mensual (Con IGV 18%)"}
                </div>
                <div className="font-cigo-mono text-2xl sm:text-3xl font-bold text-[#2DD4BF] mt-1">
                  {activePlanId === "corporativo" ? "Desde " : ""}S/ {formatPen(monthlyEffectiveIncIgv)}
                </div>
                {isAnnual && activePlanId !== "corporativo" ? (
                  <div className="font-cigo-mono text-[11px] text-[#5EEAD4] mt-0.5">
                    Pago anual: S/ {formatPen(annualTotalIncIgv)} inc. IGV (ahorras S/ {formatPen(annualSavingsIncIgv)})
                  </div>
                ) : (
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">
                    Modalidad: {activePlan.paymentModality}
                  </div>
                )}
              </div>
            </div>

            {isAnnual && activePlanId !== "corporativo" && (
              <div className="text-xs text-[#CBD5E1] flex flex-wrap items-center justify-between gap-2">
                <span>
                  Ahorro anual directo (2 meses gratis):{" "}
                  <strong className="font-cigo-mono text-[#5EEAD4]">
                    S/ {formatPen(annualSavingsExIgv)} + IGV
                  </strong>
                </span>
                <span className="font-cigo-mono text-[11px] text-[#94A3B8]">
                  Total anual sin IGV: S/ {formatPen(annualTotalExIgv)}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1320] text-sm font-extrabold transition-colors"
              >
                Probar 7 días gratis (S/ 0 hoy)
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </a>
              <a
                href={wspQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] text-white text-sm font-semibold transition-colors"
              >
                Cotizar {cupos} {cupos === 1 ? "cupo" : "cupos"}
              </a>
            </div>
          </div>

          {/* Right 5 cols: Included in All Plans */}
          <div className="lg:col-span-5 border border-[#1E2D45] rounded-2xl bg-[#111C2F] p-6 sm:p-7 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white">
                Incluido en todos los planes
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                Sin costos ocultos ni cobros por cantidad de choferes o comprobantes diarios.
              </p>
            </div>

            <ul className="space-y-3">
              {INCLUDED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#CBD5E1] leading-snug">
                  <Check
                    className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5"
                    strokeWidth={2.25}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#1E2D45] text-xs text-[#94A3B8] leading-relaxed">
              ¿Necesitas una propuesta formal con RUC y cotización anual para gerencia? Escríbenos por WhatsApp al{" "}
              <strong className="font-cigo-mono text-white">+51 929 222 980</strong> o descarga la Carta Comercial arriba.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
