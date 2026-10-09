import ProductCard from "@/components/ProductCard";
import productApi from "@/lib/api";
import type { Product } from "@/types/product";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  sobji: "সবজি",
  mach: "মাছ",
  mangsho: "মাংস",
  dim: "ডিম",
  mosla: "মসলা",
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const categoryName = categoryNames[slug];

  if (!categoryName) {
    notFound();
  }

  let products: Product[] = [];

  try {
    products = await productApi.getProductsByCategory(slug);
  } catch (error) {
    console.error("Category products load failed:", error);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-emerald-700 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <div className="mb-6 mt-5">
        <h1 className="text-2xl font-extrabold text-[#27332b] sm:text-3xl">
          {categoryName}র বাজারদর
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          এই ক্যাটাগরির পণ্যের বর্তমান দাম দেখুন।
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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
    </main>
  );
};

export default CategoryPage;

