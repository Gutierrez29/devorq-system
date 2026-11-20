"use client";

import { useState } from "react";
import { ArrowRight, BadgePercent, Check, Headphones, Minus, Plus } from "lucide-react";

const REGISTER_URL = "https://cigo.devorq.com/registro";

type BillingMode = "regular" | "anual";
type PlanId = "micro" | "flota" | "corporativo";

interface PlanDefinition {
  id: PlanId;
  name: string;
  rangeLabel: string;
  defaultCupos: number;
  isRecommended?: boolean;
  paymentModality: string;
  supportLevel: string;
  regularCaption: string;
  regularExIgv: string;
  regularIncIgv: string;
  annualExIgv: string;
  annualIncIgv: string;
  unitRegular: string;
  unitAnnual: string;
  ctaLabel: string;
  ctaType: "register" | "whatsapp";
}

const PLANS: PlanDefinition[] = [
  {
    id: "micro",
    name: "Plan Micro",
    rangeLabel: "1 a 4 cupos",
    defaultCupos: 3,
    paymentModality: "Trimestral o Anual adelantado",
    supportLevel: "100% Autoservicio (tutoriales en video + ticket asíncrono)",
    regularCaption: "Tarifa fija mensual",
    regularExIgv: "S/ 100.00",
    regularIncIgv: "S/ 118.00 / mes (fijo inc. IGV)",
    annualExIgv: "S/ 83.33",
    annualIncIgv: "S/ 98.33 / mes inc. IGV · S/ 1,180.00/año",
    unitRegular: "+ IGV / mes (fijo)",
    unitAnnual: "+ IGV / mes eq.",
    ctaLabel: "Probar 7 días gratis",
    ctaType: "register",
  },
  {
    id: "flota",
    name: "Plan Flota",
    rangeLabel: "5 a 50 cupos",
    defaultCupos: 15,
    isRecommended: true,
    paymentModality: "Mensual, Trimestral o Anual adelantado",
    supportLevel:
      "Autoservicio + WhatsApp de soporte para 1 administrador (horario de oficina)",
    regularCaption: "Tarifa por unidad activa",
    regularExIgv: "S/ 25.00",
    regularIncIgv: "S/ 29.50 / cupo (inc. IGV)",
    annualExIgv: "S/ 20.83",
    annualIncIgv: "S/ 24.58 / cupo inc. IGV · S/ 0.69 + IGV/día",
    unitRegular: "+ IGV / cupo",
    unitAnnual: "+ IGV / cupo",
    ctaLabel: "Probar 7 días gratis",
    ctaType: "register",
  },
  {
    id: "corporativo",
    name: "Plan Corporativo",
    rangeLabel: "Más de 50 cupos",
    defaultCupos: 60,
    paymentModality: "Semestral o Anual adelantado",
    supportLevel: "Onboarding guiado remoto + canal dedicado para jefe de flota",
    regularCaption: "A medida · desde",
    regularExIgv: "S/ 21.00",
    regularIncIgv: "Desde S/ 24.78 / cupo (inc. IGV)",
    annualExIgv: "S/ 21.00",
    annualIncIgv: "Desde S/ 24.78 / cupo (tarifa a medida)",
    unitRegular: "+ IGV / cupo",
    unitAnnual: "+ IGV / cupo",
    ctaLabel: "Solicitar cotización",
    ctaType: "whatsapp",
  },
];

const FLEET_PRESETS = [
  { cupos: 3, label: "3" },
  { cupos: 10, label: "10" },
  { cupos: 25, label: "25" },
  { cupos: 60, label: "60" },
] as const;

const INCLUDED_ITEMS = [
  "Conductores ilimitados por WhatsApp (sin apps)",
  "Validación SUNAT en vivo y Bancarización Ley 28194",
  "OCR de comprobantes, odómetros y Km/galón",
  "Exportación Excel, Liquidaciones, SIRE 8.4 y ZIP",
  "Factura electrónica Perú (+18% IGV desglosado)",
  "7 días gratis (hasta 5 camiones, sin tarjeta)",
];

function formatPen(amount: number): string {
  return amount.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function clampCupos(value: number): number {
  return Math.max(1, Math.min(500, Math.round(value)));
}

export default function CigoPricing() {
  const [billing, setBilling] = useState<BillingMode>("anual");
  const [cupos, setCupos] = useState<number>(15);
  const [cuposInput, setCuposInput] = useState<string>("15");

  const isAnnual = billing === "anual";

  const activePlanId: PlanId =
    cupos <= 4 ? "micro" : cupos <= 50 ? "flota" : "corporativo";

  const activePlan = PLANS.find((p) => p.id === activePlanId) ?? PLANS[1];

  const updateCupos = (nextValue: number) => {
    const safe = clampCupos(nextValue);
    setCupos(safe);
    setCuposInput(String(safe));
  };

  const handleSelectPlan = (planId: PlanId) => {
    const target = PLANS.find((p) => p.id === planId);
    if (!target) return;
    if (planId === "micro" && cupos > 4) {
      updateCupos(target.defaultCupos);
    } else if (planId === "flota" && (cupos < 5 || cupos > 50)) {
      updateCupos(target.defaultCupos);
    } else if (planId === "corporativo" && cupos <= 50) {
      updateCupos(target.defaultCupos);
    }
  };

  // Cálculos exactos sin IGV y con IGV (18%) según estructura oficial
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
    <section id="planes" className="py-12 sm:py-14 px-5 sm:px-8 bg-[#0B1320] text-white">
      <div className="max-w-[1240px] mx-auto">
        {/* Compact Header + Billing Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 mb-5 border-b border-[#1E2D45]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-white leading-tight">
              Estructura de planes transparente por cupo
            </h2>
            <p className="text-sm text-[#CBD5E1] mt-1.5">
              Precios claros <strong className="text-white font-semibold">sin IGV y con IGV (18%)</strong>. Inicia con 7 días gratis para hasta 5 camiones.
            </p>
          </div>

          <div
            role="group"
            aria-label="Modalidad de facturación"
            className="inline-flex items-center self-start lg:self-auto bg-[#111C2F] border border-[#24344D] p-1 rounded-xl shrink-0"
          >
            <button
              type="button"
              onClick={() => setBilling("regular")}
              aria-pressed={!isAnnual}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
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
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
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

        {/* Unified Horizontal Fleet Calculator Strip (always visible alongside plans) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center rounded-xl bg-[#111C2F] border border-[#24344D] px-4 py-3.5 sm:px-5 mb-5">
          {/* Left 6 cols: Cupos selector (presets + direct numeric input + stepper + slider) */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="cigo-cupos-input"
                className="text-xs sm:text-sm font-semibold text-white"
              >
                ¿Cuántos cupos (camiones) operas?
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex items-center gap-1"
                  role="group"
                  aria-label="Accesos rápidos de flota"
                >
                  {FLEET_PRESETS.map((preset) => {
                    const isExact = cupos === preset.cupos;
                    return (
                      <button
                        key={preset.cupos}
                        type="button"
                        onClick={() => updateCupos(preset.cupos)}
                        aria-pressed={isExact}
                        className={`font-cigo-mono text-[11px] font-semibold px-2 py-1 rounded border transition-colors cursor-pointer ${
                          isExact
                            ? "bg-[#14B8A6]/20 border-[#14B8A6] text-[#5EEAD4]"
                            : "bg-[#0B1320] border-[#24344D] text-[#94A3B8] hover:text-white hover:border-[#3A5174]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <div className="inline-flex items-center border border-[#2C3E5A] rounded-lg overflow-hidden bg-[#0B1320]">
                  <button
                    type="button"
                    aria-label="Reducir cupos"
                    onClick={() => updateCupos(cupos - 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#CBD5E1] hover:bg-[#17253D] cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                  <input
                    id="cigo-cupos-input"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={500}
                    value={cuposInput}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setCuposInput(raw);
                      const parsed = Number.parseInt(raw, 10);
                      if (!Number.isNaN(parsed) && parsed >= 1) {
                        setCupos(clampCupos(parsed));
                      }
                    }}
                    onBlur={() => setCuposInput(String(cupos))}
                    aria-label="Cantidad de cupos o camiones"
                    className="cigo-number-input w-12 h-7 bg-transparent text-center font-cigo-mono text-sm font-bold text-[#2DD4BF] focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Aumentar cupos"
                    onClick={() => updateCupos(cupos + 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#CBD5E1] hover:bg-[#17253D] cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="cigo-fleet-range"
                aria-label="Deslizador de cupos de flota"
                type="range"
                min={1}
                max={80}
                step={1}
                value={Math.min(80, cupos)}
                onChange={(e) => updateCupos(Number(e.target.value) || 1)}
                className="w-full h-1.5 cursor-pointer cigo-range"
              />
            </div>

            <div className="flex items-center justify-between font-cigo-mono text-[10px] text-[#94A3B8]">
              <span>1–4 Micro</span>
              <span>5–50 Flota</span>
              <span>51+ Corporativo</span>
            </div>
          </div>

          {/* Right 6 cols: Instant Live Price Calculation + Direct Quote CTA */}
          <div className="lg:col-span-6 lg:border-l lg:border-[#1E2D45] lg:pl-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-cigo-mono text-[11px] font-bold text-[#0B1320] bg-[#14B8A6] px-2 py-0.5 rounded">
                  {activePlan.name}
                </span>
                <span className="font-cigo-mono text-xs text-[#94A3B8]">
                  {cupos} {cupos === 1 ? "cupo" : "cupos"}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-2 mt-1">
                <span className="font-cigo-mono text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
                  {activePlanId === "corporativo" ? "Desde " : ""}S/ {formatPen(monthlyEffectiveExIgv)}
                </span>
                <span className="text-xs text-[#94A3B8] whitespace-nowrap">
                  + IGV / mes{isAnnual && activePlanId !== "corporativo" ? " eq." : ""}
                </span>
              </div>

              <div className="font-cigo-mono text-[11px] text-[#5EEAD4] mt-0.5">
                {isAnnual && activePlanId !== "corporativo" ? (
                  <>
                    S/ {formatPen(monthlyEffectiveIncIgv)} inc. IGV · Anual S/ {formatPen(annualTotalIncIgv)}{" "}
                    <span className="text-[#CBD5E1]">
                      (ahorras S/ {formatPen(annualSavingsIncIgv)})
                    </span>
                  </>
                ) : (
                  <>
                    {activePlanId === "corporativo" ? "Desde " : ""}S/ {formatPen(monthlyEffectiveIncIgv)} inc. IGV / mes
                  </>
                )}
              </div>
            </div>

            <a
              href={wspQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] text-white text-xs font-bold whitespace-nowrap transition-colors shrink-0"
            >
              Cotizar {cupos} {cupos === 1 ? "cupo" : "cupos"}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* 3 Synchronized Official Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {PLANS.map((plan) => {
            const isSelected = activePlanId === plan.id;
            const showAnnualDiscount = isAnnual && plan.id !== "corporativo";

            return (
              <article
                key={plan.id}
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest("a, button")) {
                    handleSelectPlan(plan.id);
                  }
                }}
                className={`rounded-xl p-5 flex flex-col justify-between gap-4 border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#112236] border-[#14B8A6] shadow-[0_0_0_1px_rgba(20,184,166,0.35)]"
                    : "bg-[#111C2F] border-[#1E2D45] hover:border-[#334B6B]"
                }`}
              >
                <div className="space-y-3.5">
                  {/* Title, Range & Selection State */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-[-0.015em] leading-tight">
                        {plan.name}
                      </h3>
                      <div className="font-cigo-mono text-xs font-semibold text-[#2DD4BF] mt-0.5">
                        {plan.rangeLabel}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan.id)}
                      aria-pressed={isSelected}
                      className={`font-cigo-mono text-[11px] font-bold px-2.5 py-0.5 rounded transition-colors cursor-pointer shrink-0 ${
                        isSelected
                          ? "bg-[#14B8A6] text-[#0B1320]"
                          : plan.isRecommended
                          ? "bg-[#14B8A6]/15 text-[#2DD4BF] border border-[#14B8A6]/40 hover:bg-[#14B8A6]/25"
                          : "bg-[#0B1320] text-[#94A3B8] border border-[#24344D] hover:text-white"
                      }`}
                    >
                      {isSelected
                        ? plan.isRecommended
                          ? "Seleccionado · Popular"
                          : "Seleccionado"
                        : plan.isRecommended
                        ? "Más elegido"
                        : "Elegir"}
                    </button>
                  </div>

                  {/* Uniformly Aligned Price Block (Sin IGV + Con IGV) */}
                  <div className="pb-3.5 border-b border-[#1E2D45]">
                    <div className="font-cigo-mono text-[11px] h-4 flex items-center">
                      {showAnnualDiscount ? (
                        <span className="text-[#94A3B8] line-through">
                          Regular: {plan.regularExIgv} + IGV
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">{plan.regularCaption}</span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1.5 whitespace-nowrap mt-0.5">
                      <span className="font-cigo-mono text-[26px] xl:text-[28px] leading-tight font-bold text-white">
                        {showAnnualDiscount ? plan.annualExIgv : plan.regularExIgv}
                      </span>
                      <span className="text-xs font-medium text-[#94A3B8]">
                        {showAnnualDiscount ? plan.unitAnnual : plan.unitRegular}
                      </span>
                    </div>

                    <div className="font-cigo-mono text-xs font-semibold text-[#5EEAD4] mt-1">
                      {showAnnualDiscount ? plan.annualIncIgv : plan.regularIncIgv}
                    </div>
                  </div>

                  {/* Payment Modality & Support */}
                  <dl className="space-y-2.5 text-xs">
                    <div>
                      <dt className="text-[#94A3B8] font-medium">Modalidad de pago</dt>
                      <dd className="text-[13px] font-semibold text-white mt-0.5">
                        {plan.paymentModality}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#14B8A6]" strokeWidth={2} />
                        Nivel de soporte
                      </dt>
                      <dd className="text-[13px] text-[#CBD5E1] leading-snug mt-0.5">
                        {plan.supportLevel}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Single Clear Plan CTA */}
                <div className="pt-1">
                  {plan.ctaType === "register" ? (
                    <a
                      href={REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-colors ${
                        isSelected
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
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-colors ${
                        isSelected
                          ? "bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1320]"
                          : "bg-[#162236] hover:bg-[#1E2E48] border border-[#2C3E5A] text-white"
                      }`}
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

        {/* Slim Annual Payment Benefit Strip */}
        <div className="rounded-xl bg-[#0F242A] border border-[#14B8A6]/45 px-4 py-3 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <BadgePercent
              className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <p className="text-xs sm:text-[13px] text-[#E2E8F0] leading-relaxed">
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
              className="px-3.5 py-1.5 rounded-lg bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1320] text-xs font-extrabold cursor-pointer shrink-0 transition-colors self-start md:self-auto"
            >
              Activar Pago Anual
            </button>
          )}
        </div>

        {/* Compact Included Features Row (fits cleanly without vertical bloat) */}
        <div className="pt-3.5 border-t border-[#1E2D45]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            <span className="font-cigo-mono text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] shrink-0">
              Incluido en todos los planes:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-1.5 flex-1">
              {INCLUDED_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-[#CBD5E1]"
                >
                  <Check
                    className="w-3.5 h-3.5 text-[#14B8A6] shrink-0"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
