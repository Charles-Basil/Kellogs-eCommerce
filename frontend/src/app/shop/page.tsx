"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { openCart } from "@/store/slices/cartSlice";
import { addItemLocal } from "@/store/slices/cartSlice";


export default function ShopPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // Mock products list showing all items in the store
  const allProducts = [
    { id: 1, name: "Minimalist Urban Jacket", price: 129.99, image: "/images/product-1.jpg", category: "men", stock: 10 },
    { id: 2, name: "Essential Cotton Tee", price: 34.99, image: "/images/product-2.jpg", category: "women", stock: 50 },
    { id: 3, name: "Premium Leather Sneakers", price: 189.99, image: "/images/product-3.jpg", category: "unisex", stock: 5 },
    { id: 4, name: "Oversized Hoodie", price: 79.99, image: "/images/product-4.jpg", category: "men", stock: 20 },
    { id: 5, name: "Classic Denim Jeans", price: 89.99, image: "/images/product-5.jpg", category: "men", stock: 15 },
    { id: 6, name: "Heavyweight Sweatpants", price: 59.99, image: "/images/product-6.jpg", category: "unisex", stock: 30 },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filters logic
  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    return 0; // Default or unsorted
  });

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      const dest = "/shop";
      router.push(`/login?next=${encodeURIComponent(dest)}`);
      return;
    }
    dispatch(addItemLocal({ product, quantity: 1, size: "M", color: "Black" }));
    dispatch(openCart());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 dark:border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-2">
            Shop All
          </h1>
          <p className="text-gray-500">Discover our complete collection of minimalist essentials.</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4 flex-wrap">
          {/* Category Filter Pills */}
          <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-lg">
            {["all", "men", "women", "unisex"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${selectedCategory === cat ? "bg-white dark:bg-black text-black dark:text-white shadow-sm" : "text-gray-500 hover:text-black dark:hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative inline-block text-left">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent border border-gray-200 dark:border-zinc-700 rounded-md px-4 py-2 pr-8 font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-gray-500 text-lg">No products found matching the criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
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
