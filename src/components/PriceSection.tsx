import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface PriceSectionProps {
  title: string;
  products: Product[];
  trend: "up" | "down";
}

const PriceSection = ({
  title,
  products,
  trend,
}: PriceSectionProps) => {
  const filteredProducts = products
    .filter((product) => product.change.dir === trend)
    .slice(0, 6);

  const isUp = trend === "up";

  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#27332b]">
        <span className={isUp ? "text-red-500" : "text-emerald-600"}>
          {isUp ? "▲" : "▼"}
        </span>

        {title}
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-[#e0e9e1] bg-white p-5 text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default PriceSection;