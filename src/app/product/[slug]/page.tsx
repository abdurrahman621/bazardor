import Link from "next/link";
import { notFound } from "next/navigation";
import productApi from "@/lib/api";
import type { Product } from "@/types/product";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD");

const ProductDetailsPage = async ({
  params,
}: ProductDetailsPageProps) => {
  const { slug } = await params;

  let products: Product[];

  try {
    products = await productApi.getProducts();
  } catch (error) {
    console.error("Product details load failed:", error);

    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-red-600">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করো।
        </p>
        <Link href="/" className="mt-4 inline-block text-emerald-700">
          ← হোম পেজে ফিরে যাও
        </Link>
      </main>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-emerald-700 hover:underline"
      >
        ← সব পণ্যে ফিরে যাও
      </Link>

      <div className="mt-6 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <section className="flex min-h-64 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
          <span className="text-8xl" role="img" aria-label={product.nameBn}>
            {product.image}
          </span>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-medium text-emerald-700">
            {product.categoryIcon} {product.categoryNameBn}
          </p>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {product.nameBn}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            একক: {product.unit}
          </p>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-3xl font-extrabold text-gray-900">
              {formatPrice(product.today)} টাকা
            </p>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1.5 text-sm font-semibold ${
                isUp
                  ? "bg-red-50 text-red-600"
                  : isDown
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatPrice(product.change.pct)}%
            </span>
          </div>

          <h2 className="mt-7 text-lg font-bold text-gray-900">
            দামের তুলনা
          </h2>

          <div className="mt-3 space-y-3">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">গতকাল</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(product.yesterday)} টাকা
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">গত সপ্তাহে</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(product.lastWeek)} টাকা
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">গত মাসে</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(product.lastMonth)} টাকা
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-extrabold text-gray-900">
          বিভিন্ন বাজারে দাম
        </h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">বাজার</th>
                <th className="px-4 py-3 font-semibold">বিভাগ</th>
                <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                <th className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="border-t border-gray-100"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {market.market}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {market.division}
                  </td>
                  <td className="px-4 py-3 text-emerald-700">
                    {formatPrice(market.min)} টাকা
                  </td>
                  <td className="px-4 py-3 text-red-600">
                    {formatPrice(market.max)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;

