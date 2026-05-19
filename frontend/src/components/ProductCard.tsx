"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { addItemLocal, openCart } from "@/store/slices/cartSlice";

type Props = {
  product: any;
  className?: string;
};

export default function ProductCard({ product, className = "" }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth?.isAuthenticated);
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);

  const handleProductClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      const dest = `/product/${product.id}`;
      router.push(`/login?next=${encodeURIComponent(dest)}`);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      const dest = `/product/${product.id}`;
      router.push(`/login?next=${encodeURIComponent(dest)}`);
      return;
    }
    dispatch(addItemLocal({ product, quantity: 1, size: "M", color: "Black" }));
    dispatch(openCart());
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      const dest = `/product/${product.id}`;
      router.push(`/login?next=${encodeURIComponent(dest)}`);
      return;
    }
    dispatch(toggleWishlist(product));
  };

  const isSaved = wishlistItems.some((i: any) => i.id === product.id);

  return (
    <div className={`group ${className}`}>
      <div className="relative aspect-[4/5] bg-gray-100 dark:bg-zinc-800 mb-4 overflow-hidden rounded-xl">
        <Link href={`/product/${product.id}`} onClick={handleProductClick}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
        </Link>

        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 p-2.5 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-sm rounded-full shadow-md z-20 hover:scale-110 active:scale-95 transition-all"
          aria-label="Toggle wishlist"
        >
          <Heart size={16} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"} />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-0 opacity-100 sm:translate-y-12 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white/90 dark:bg-black/90 backdrop-blur-sm text-black dark:text-white py-3 rounded-lg font-medium hover:bg-white dark:hover:bg-black shadow-lg transition-all"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-start mb-1">
          <Link href={`/product/${product.id}`} className="hover:underline" onClick={handleProductClick}>
            <h3 className="font-semibold text-lg">{product.name}</h3>
          </Link>
        </div>
        <p className="text-gray-500 text-sm mb-2 capitalize">{product.category}</p>
        <p className="font-medium">₦{product.price}</p>
      </div>
    </div>
  );
}
