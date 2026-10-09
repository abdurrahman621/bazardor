
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface AllProductsProps {
    products: Product[];
}

const AllProducts = ({ products }: AllProductsProps) => {
    return (
        <section id="সব-পণ্য" className="mt-10 scroll-mt-40">
            <div className="mb-5">
                <h2 className="text-xl font-extrabold text-[#27332b]">
                    সব পণ্য
                </h2>

                <p className="mt-1 text-sm text-[#758078]">
                    মোট ৩৩টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="rounded-xl border border-[#e0e9e1] bg-white p-5 text-sm text-gray-500">
                    কোনো পণ্যের তথ্য পাওয়া যায়নি।
                </p>
            )}
        </section>
    );
};

export default AllProducts;

