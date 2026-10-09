"use client";

import { useEffect, useState } from "react";
import productApi from "@/lib/api";
import type { Product } from "@/types/product";

const PriceTicker = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productApi.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Price ticker load failed:", error);
      }
    };

    loadProducts();
  }, []);

  const formatPrice = (price: number) =>
    (price ?? 0).toLocaleString("bn-BD");

  const getUnit = (unit?: string) => {
    if (!unit) return "";
    const units: Record<string, string> = {
      kg: "কেজি",
      liter: "লিটার",
      l: "লিটার",
      piece: "পিস",
      pcs: "পিস",
      dozen: "ডজন",
    };

    return units[unit.toLowerCase()] ?? unit;
  };

  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-b border-emerald-900 bg-emerald-950 text-white">
      <div className="flex items-center">
        <div className="z-10 shrink-0 bg-emerald-700 px-4 py-4 text-sm font-bold">
          বাজারদর
        </div>

        <div className="ticker-window min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max">
            {[...products, ...products].map((product, index) => {
              const direction = product.change?.dir;

              const changeColor =
                direction === "up"
                  ? "text-green-300"
                  : direction === "down"
                    ? "text-red-300"
                    : "text-gray-300";

              const arrow =
                direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "—";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex shrink-0 items-center gap-2 px-5 py-4 text-sm"
                >
                  <span>{product.image}</span>

                  <span className="whitespace-nowrap font-medium">
                    {product.nameBn}
                  </span>

                  <span className="whitespace-nowrap text-emerald-200">
                    {formatPrice(product.today)} টাকা/
                    {getUnit(product.unit)}
                  </span>

                  <span className={`whitespace-nowrap font-bold ${changeColor}`}>
                    {arrow} {formatPrice(Math.abs(product.change?.pct ?? 0))}%
                  </span>

                  <span className="ml-3 text-emerald-700">●</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 35s linear infinite;
        }

        .ticker-window:hover .ticker-track {
          animation-play-state: paused;
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceTicker;