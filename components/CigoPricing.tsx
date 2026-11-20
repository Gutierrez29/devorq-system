"use client";

import { useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";

const REGISTER_URL = "https://cigo.devorq.com/registro";

interface PricingTier {
  id: string;
  rangeLabel: string;
  minTrucks: number;
  maxTrucks: number | null;
  category: string;
  pricePerTruck: number;
  highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "t1",
    rangeLabel: "5–10 camiones",
    minTrucks: 5,
    maxTrucks: 10,
    category: "Entrada al sistema",
    pricePerTruck: 29,
  },
  {
    id: "t2",
    rangeLabel: "11–20 camiones",
    minTrucks: 11,
    maxTrucks: 20,
    category: "Descuento por volumen",
    pricePerTruck: 27,
  },
  {
    id: "t3",
    rangeLabel: "21–50 camiones",
    minTrucks: 21,
    maxTrucks: 50,
    category: "Flota en expansión",
    pricePerTruck: 25,
    highlight: true,
  },
  {
    id: "t4",
    rangeLabel: "51–100 camiones",
    minTrucks: 51,
    maxTrucks: 100,
    category: "Operación de escala",
    pricePerTruck: 23,
  },
  {
    id: "t5",
    rangeLabel: "101+ camiones",
    minTrucks: 101,
    maxTrucks: null,
    category: "Volumen estratégico",
    pricePerTruck: 20,
  },
];

const INCLUDED_ITEMS = [
  "Conductores ilimitados por WhatsApp (sin instalar aplicaciones)",
  "Validación SUNAT en vivo (RUC activo/habido y control de duplicados)",
  "Cálculo de rendimiento Km/galón y registro fotográfico de odómetros",
  "Exportación contable Excel, liquidación por viaje, TXT SIRE y ZIP",
  "Factura electrónica con IGV incluido en Perú y soporte directo",
  "Puesta en marcha en 24–48 horas y sin permanencia forzosa",
];

function resolveTier(trucks: number): PricingTier {
  return (
    PRICING_TIERS.find(
      (t) => trucks >= t.minTrucks && (t.maxTrucks === null || trucks <= t.maxTrucks)
    ) || PRICING_TIERS[0]
  );
}

export default function CigoPricing() {
  const [trucks, setTrucks] = useState<number>(15);

  const activeTier = resolveTier(trucks);
  const monthlyTotal = trucks * activeTier.pricePerTruck;
  const savingsVsEntry = Math.max(0, (29 - activeTier.pricePerTruck) * trucks);

  const wspQuoteUrl = `https://wa.me/51929222980?text=${encodeURIComponent(
    `Hola Devorq, quiero cotizar CIGO para mi flota de ${trucks} camiones (${activeTier.rangeLabel} · S/ ${activeTier.pricePerTruck}/vehículo con IGV incluido) y coordinar una demostración de 15 minutos.`
  )}`;

  return (
    <section id="planes" className="py-20 sm:py-24 px-5 sm:px-8 bg-[#0B1320] text-white">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 mb-10 border-b border-[#1E2D45]">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white leading-[1.12]">
              CIGO — Pricing de expansión
            </h2>
            <p className="text-base text-[#CBD5E1] mt-3 leading-relaxed max-w-[60ch]">
              Precio mensual por vehículo con{" "}
              <strong className="text-white font-semibold">IGV incluido en Perú</strong>. Empiezas gratis durante 7 días y pagas únicamente por las unidades activas de tu flota.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <span className="font-cigo-mono text-xs text-[#2DD4BF]">
              Factura electrónica deducible · Sin costos de implementación
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Exact 5-Tier Schedule + Interactive Fleet Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6 cols: Volume Pricing Table */}
          <div className="lg:col-span-6 border border-[#1E2D45] rounded-2xl bg-[#111C2F] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1E2D45] flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-white">
                  Escala mensual por tamaño de flota
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Precio mensual por vehículo · IGV incluido en Perú
                </div>
              </div>
              <span className="font-cigo-mono text-[11px] text-[#94A3B8]">
                PEN / mes
              </span>
            </div>

            <div className="divide-y divide-[#1E2D45]">
              {PRICING_TIERS.map((tier) => {
                const isSelected = activeTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setTrucks(tier.minTrucks)}
                    className={`w-full px-6 py-4 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#14B8A6]/15"
                        : "hover:bg-[#17253D]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-cigo-display text-base font-bold ${
                            isSelected ? "text-[#2DD4BF]" : "text-white"
                          }`}
                        >
                          {tier.rangeLabel}
                        </span>
                        {tier.highlight && (
                          <span className="text-[11px] font-semibold text-[#2DD4BF] border border-[#14B8A6]/45 px-2 py-0.5 rounded">
                            Tramo frecuente
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">
                        {tier.category}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`font-cigo-mono text-xl font-bold ${
                          isSelected ? "text-[#2DD4BF]" : "text-white"
                        }`}
                      >
                        S/ {tier.pricePerTruck}
                      </div>
                      <div className="text-[11px] text-[#94A3B8]">por camión</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-6 py-3.5 bg-[#0D1626] border-t border-[#1E2D45] text-xs text-[#94A3B8]">
              Mínimo operativo de entrada: 5 camiones. Haz clic en cualquier tramo para calcular tu inversión mensual.
            </div>
          </div>

          {/* Right 6 cols: Interactive Estimator & Included Scope */}
          <div className="lg:col-span-6 border border-[#1E2D45] rounded-2xl bg-[#111C2F] p-6 sm:p-8 space-y-6">
            {/* Stepper + Range */}
            <div className="pb-6 border-b border-[#1E2D45]">
              <div className="flex items-center justify-between gap-4 mb-4">
                <label
                  htmlFor="cigo-fleet-range"
                  className="text-sm font-semibold text-white"
                >
                  ¿Cuántos camiones operas?
                </label>

                <div className="inline-flex items-center border border-[#2C3E5A] rounded-lg overflow-hidden bg-[#0B1320]">
                  <button
                    type="button"
                    aria-label="Reducir camiones"
                    onClick={() => setTrucks((prev) => Math.max(5, prev - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#CBD5E1] hover:bg-[#17253D] cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <span className="font-cigo-mono text-base font-bold text-[#2DD4BF] px-4 min-w-[60px] text-center">
                    {trucks}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar camiones"
                    onClick={() => setTrucks((prev) => Math.min(250, prev + 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#CBD5E1] hover:bg-[#17253D] cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <input
                id="cigo-fleet-range"
                type="range"
                min={5}
                max={130}
                step={1}
                value={Math.min(130, trucks)}
                onChange={(e) => setTrucks(Number(e.target.value) || 5)}
                className="w-full cursor-pointer cigo-range"
              />

              <div className="flex justify-between font-cigo-mono text-[11px] text-[#94A3B8] mt-2">
                <span>5</span>
                <span>25</span>
                <span>60</span>
                <span>101+ unid.</span>
              </div>
            </div>

            {/* Monthly Output */}
            <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[#1E2D45]">
              <div>
                <div className="text-xs text-[#94A3B8]">
                  Inversión mensual estimada (IGV incluido)
                </div>
                <div className="font-cigo-mono text-3xl sm:text-4xl font-bold text-white mt-1">
                  S/ {monthlyTotal.toLocaleString("es-PE")}
                  <span className="text-sm font-normal text-[#94A3B8]"> / mes</span>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="font-cigo-mono text-sm font-bold text-[#2DD4BF]">
                  S/ {activeTier.pricePerTruck} × {trucks} camiones
                </div>
                {savingsVsEntry > 0 ? (
                  <div className="font-cigo-mono text-xs text-[#5EEAD4] mt-0.5">
                    Ahorro por volumen: S/ {savingsVsEntry.toLocaleString("es-PE")}/mes
                  </div>
                ) : (
                  <div className="text-xs text-[#94A3B8] mt-0.5">
                    Tramo: {activeTier.rangeLabel}
                  </div>
                )}
              </div>
            </div>

            {/* Included Scope */}
            <div>
              <div className="text-xs font-bold text-white mb-3">
                Incluido en todos los tramos
              </div>
              <ul className="space-y-2">
                {INCLUDED_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                    <Check
                      className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5"
                      strokeWidth={2.25}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conversion CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
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
                Cotizar {trucks} camiones
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
