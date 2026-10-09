import { Product } from "@/types/product";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

const getProducts = async (): Promise<Product[]> => {

    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি")
    }
    const data = await res.json()
    return Array.isArray(data) ? data : data.products

}

const getProductsByCategory = async (category: string): Promise<Product[]> => {

    const res = await fetch(
        `${BASE_URL}/products?category=${encodeURIComponent(category)}`
    )
    if (!res.ok) {
        throw new Error("ক্যাটাগরির পণ্য লোড করা যায়নি");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : data.products;
}

const productApi = {
  getProducts,
  getProductsByCategory,
};
export default productApi