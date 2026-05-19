"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItemLocal, openCart } from "@/store/slices/cartSlice";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CategoryPage({ params }: Props) {
  const dispatch = useDispatch();
  const slugValue = typeof window === "undefined" ? "" : (window as any).__NEXT_DATA__?.query?.slug;
  const [slug, setSlug] = useState<string>("");



  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);
  const isAuthenticated = useSelector((state: any) => state.auth?.isAuthenticated);
  const router = useRouter();

  // Mock products fetching based on slug
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Keep slug updates separate to avoid complex dependency chains.
  useEffect(() => {
    if (!slug) return;
    const t = setTimeout(() => {

      setProducts([
        { id: 1, name: "Minimalist Urban Jacket", price: 129.99, image: "/images/product-1.jpg", category: slug, stock: 10 },
        { id: 2, name: "Essential Cotton Tee", price: 34.99, image: "/images/product-2.jpg", category: slug, stock: 50 },
        { id: 3, name: "Premium Leather Sneakers", price: 189.99, image: "/images/product-3.jpg", category: slug, stock: 5 },
        { id: 4, name: "Oversized Hoodie", price: 79.99, image: "/images/product-4.jpg", category: slug, stock: 20 },
        { id: 5, name: "Classic Denim Jeans", price: 89.99, image: "/images/product-5.jpg", category: slug, stock: 15 },
        { id: 6, name: "Heavyweight Sweatpants", price: 59.99, image: "/images/product-6.jpg", category: slug, stock: 30 },
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(t);
  }, [slug]);



  useEffect(() => {
    let cancelled = false;
    (async () => {
      const resolved = await params;
      if (!cancelled) setSlug(resolved.slug ?? "");
    })();
    return () => {
      cancelled = true;
    };
  }, [params]);


  const handleAddToCart = (product) => {

    dispatch(addItemLocal({ product, quantity: 1, size: "M", color: "Black" }));
    dispatch(openCart());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 dark:border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight capitalize mb-2">
            {(slugValue || slug).replaceAll('-', ' ')}
          </h1>
          <p className="text-gray-500">Explore our latest collection for {(slugValue || slug).replaceAll('-', ' ')}.</p>

        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            <SlidersHorizontal size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            Sort by <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-zinc-800 aspect-[4/5] rounded-xl mb-4" />
              <div className="bg-gray-200 dark:bg-zinc-800 h-5 w-3/4 mb-2 rounded" />
              <div className="bg-gray-200 dark:bg-zinc-800 h-4 w-1/4 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
