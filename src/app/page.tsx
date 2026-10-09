import api from "@/lib/api";

export default async function HomePage() {
  const products = await api.getProducts();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        বাজার দর — সব পণ্য
      </h1>

      <p className="mb-4">
        মোট পণ্য: {products.length}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border p-4 shadow-sm"
          >
            <div className="text-4xl">{product.image}</div>

            <h2 className="mt-2 text-xl font-semibold">
              {product.nameBn}
            </h2>

            <p className="text-gray-500">
              {product.categoryNameBn}
            </p>

            <p className="mt-2 font-bold">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}