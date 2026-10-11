import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import productApi from "@/lib/api";
import type { Product } from "@/types/product";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD");

const ProductDetailsPage = async ({
  params,
}: ProductDetailsPageProps) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signin")
  }
  const { slug } = await params;

  let products: Product[];

  try {
    products = await productApi.getProducts();
  } catch (error) {
    console.error("Product details load failed:", error);

    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-red-600">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করো।
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
  const marketPrices = product.markets;

  // দামের পার্থক্যের হিসাব (টাকায়)
  const priceDiff = Math.abs(product.today - product.yesterday);

  const minPrice =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((market) => market.min))
      : product.today;

  const maxPrice =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((market) => market.max))
      : product.today;

  const averagePrice =
    marketPrices.length > 0
      ? Math.round(
          marketPrices.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / marketPrices.length,
        )
      : product.today;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-emerald-700 hover:underline"
      >
        ← সব পণ্যে ফিরে যাও
      </Link>

      {/* ওপরের প্রধান কার্ড */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-5xl">
            <span role="img" aria-label={product.nameBn}>
              {product.image}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-700">
              {product.categoryIcon} {product.categoryNameBn}
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {product.nameBn}
            </h1>
            
            {/* এখানে দ্বিতীয় ছবির স্টাইলে ইউনিট ও পরিবর্তনশীল টেক্সট যোগ করা হয়েছে */}
            <p className="mt-1 text-sm text-gray-500">
              প্রতি {product.unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              গতকালকের তুলনায় আজ{" "}
              <span className="font-semibold text-gray-900">
                {isUp ? "দাম বেড়েছে" : isDown ? "দাম কমেছে" : "দাম অপরিবর্তিত"}
              </span>{" "}
              · {formatPrice(priceDiff)} টাকা
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-5 text-right w-full md:w-auto min-w-[200px]">
          <p className="text-sm text-gray-500">বাজারের দর</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {formatPrice(product.today)} <span className="text-base font-normal">টাকা/{product.unit}</span>
          </p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              isUp
                ? "bg-emerald-50 text-emerald-700"
                : isDown
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"} {formatPrice(product.change.pct)}%
          </span>
        </div>
      </section>

      {/* দামের সারসংক্ষেপ সেকশন */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-xl font-bold text-emerald-700">
              {formatPrice(minPrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-2 text-xl font-bold text-red-600">
              {formatPrice(maxPrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-2 text-xl font-bold text-gray-900">
              {formatPrice(averagePrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">প্রতি কেজি-এর হিসাবে</p>
          </div>
        </div>
      </section>

      {/* বাজারভিত্তিক আজকের দাম টেবিল */}
      <section className="mt-8">
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
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
                  className="border-t border-gray-100 hover:bg-gray-50/50"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {market.market}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {market.division}
                  </td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">
                    {formatPrice(market.min)} টাকা
                  </td>
                  <td className="px-4 py-3 text-red-600 font-semibold">
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