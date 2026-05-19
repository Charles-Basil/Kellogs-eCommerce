"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addItemLocal, openCart } from "@/store/slices/cartSlice";
import ProductCard from '@/components/ProductCard';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth?.isAuthenticated);
  const router = useRouter();
  
  const handleAddToCart = (product) => {
    dispatch(addItemLocal({ product, quantity: 1, size: "M", color: "Black" }));
    dispatch(openCart());
  };

  // Mock data for initial render. In a real app, this would come from Redux/API
  const trendingProducts = [
    { id: 1, name: "Minimalist Urban Jacket", price: 129.99, image: "/images/product-1.jpg", category: "Men" },
    { id: 2, name: "Essential Cotton Tee", price: 34.99, image: "/images/product-2.jpg", category: "Women" },
    { id: 3, name: "Premium Leather Sneakers", price: 189.99, image: "/images/product-3.jpg", category: "Unisex" },
    { id: 4, name: "Oversized Hoodie", price: 79.99, image: "/images/product-4.jpg", category: "Men" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 dark:bg-zinc-900">
          {/* We will replace this with a generated image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <Image
            src="/images/hero-banner.jpg"
            alt="New Collection"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="max-w-xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.span variants={fadeIn} className="block text-white text-sm font-bold tracking-widest uppercase mb-4">
              Summer Collection 2026
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-tight mb-6">
              REDEFINE YOUR <br/> STYLE.
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg text-gray-200 mb-8 max-w-md">
              Discover the latest trends with our premium collection. Minimalist, modern, and made for you.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link href="/category/men" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center inline-flex justify-center items-center group">
                Shop Men <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/category/women" className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-center">
                Shop Women
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Logos/Trust Section */}
      <section className="py-12 border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
            Trusted by modern minimalists
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-50 grayscale">
            <h3 className="text-2xl font-black font-heading tracking-tighter">ZARA</h3>
            <h3 className="text-2xl font-black font-heading tracking-widest">NIKE</h3>
            <h3 className="text-2xl font-black font-heading italic">VOGUE</h3>
            <h3 className="text-2xl font-black font-heading uppercase">Balenciaga</h3>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Trending Now</h2>
              <p className="text-gray-600 dark:text-gray-400">Our most popular items this week.</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center text-sm font-semibold hover:underline">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative aspect-[4/5] bg-gray-100 dark:bg-zinc-800 mb-4 overflow-hidden rounded-xl">
                  <Link
                    href={`/product/${product.id}`}
                    onClick={(e) => {
                      if (!isAuthenticated) {
                        e.preventDefault();
                        router.push(`/login?next=${encodeURIComponent(`/product/${product.id}`)}`);
                      }
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                  </Link>
                  
                  {/* Quick Add Button Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-0 opacity-100 sm:translate-y-12 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 z-20">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black/90 dark:bg-zinc-950/90 backdrop-blur-sm text-white dark:text-white py-3 rounded-lg font-medium hover:bg-black dark:hover:bg-zinc-900 transition-colors shadow-lg"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <Link
                      href={`/product/${product.id}`}
                      className="hover:underline"
                      onClick={(e) => {
                          if (!isAuthenticated) {
                            e.preventDefault();
                            router.push(`/login?next=${encodeURIComponent(`/product/${product.id}`)}`);
                          }
                        }}
                    >
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                    </Link>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                  <p className="font-medium">₦{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Banners */}
      <section className="py-12 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="group"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <p className="mb-4 text-gray-200">The new urban collection</p>
        </div>
      </section>

    </div>
  );
}
