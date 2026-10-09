"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortBy]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-products"
            className="text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="sort-products"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;

