import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceSection from "@/components/PriceSection";

import productApi from "@/lib/api";
import type { Product } from "@/types/product";

const HomePage = async () => {
  let products: Product[] = [];

  try {
    products = await productApi.getProducts();
  } catch (error) {
    console.error("Products load failed:", error);
  }

  const upProducts = products.filter((p) => p.change.dir === "up");
  const downProducts = products.filter((p) => p.change.dir === "down");

  return (
    <div>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <Hero />

        <PriceSection
          title="আজ দাম বেড়েছে"
          products={upProducts}
          trend="up"
        />
       

        <PriceSection
          title="আজ দাম কমেছে"
          products={downProducts}
          trend="down"
        />
        <AllProducts products={products}></AllProducts>

      </main>
    </div>
  );
};

export default HomePage;