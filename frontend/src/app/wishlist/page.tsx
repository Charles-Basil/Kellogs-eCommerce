"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { addItemLocal, openCart } from "@/store/slices/cartSlice";
import { useRouter } from 'next/navigation';
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth?.isAuthenticated);
  const router = useRouter();

  const handleAddToCart = (product) => {
    dispatch(addItemLocal({ product, quantity: 1, size: "M", color: "Black" }));
    dispatch(openCart());
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/shop" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <div className="text-center py-24">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your wishlist</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to access your wishlist.</p>
          <Link
            href="/login"
            className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Continue Shopping
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-2">
          Your Wishlist
        </h1>
        <p className="text-gray-500">Keep track of the premium essentials you love.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
          <Heart size={48} className="mx-auto text-gray-300 dark:text-zinc-700 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore our store and add items you would like to purchase later.</p>
          <Link
            href="/shop"
            className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md"
          >
            Explore shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
