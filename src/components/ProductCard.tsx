import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => price.toLocaleString("bn-BD");

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  l: "প্রতি লিটার",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  dozen: "প্রতি ডজন",
  gram: "প্রতি গ্রাম",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const trendColor = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-emerald-50 text-emerald-700"
      : "bg-gray-100 text-gray-600";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  const unitLabel =
    unitLabels[product.unit.toLowerCase()] ?? `প্রতি ${product.unit}`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-[#e0e9e1] bg-[#fbfdfb] p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#27332b] group-hover:text-emerald-800">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-[#758078]">{unitLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-[#7a847d]">আজকের দাম</p>
          <p className="mt-1 text-lg font-bold text-[#27332b]">
            {formatPrice(product.today)} টাকা
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${trendColor}`}
        >
          {arrow} {formatPrice(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;