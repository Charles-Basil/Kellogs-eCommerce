"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2">
            <h2 className="font-heading font-black text-3xl tracking-tighter uppercase mb-6">
              Kellog
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-8">
              Premium fashion for the modern era. Join our newsletter to get updates on our latest collections and exclusive offers.
            </p>
            <form className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-50 dark:bg-zinc-900 px-4 py-3 rounded-l-md border-none focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                required
              />
              <button
                type="submit"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-r-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                 <Link href="/category/men" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                   Men&apos;s Collection
                 </Link>
              </li>
              <li>
                 <Link href="/category/women" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                   Women&apos;s Collection
                 </Link>
              </li>
              <li>
                 <Link href="/category/children" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                   Kids&apos; Collection
                 </Link>
              </li>
              <li>
                <Link href="/category/hot-deals" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-red-600 dark:text-red-500 font-medium">
                  Hot Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-gray-900">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} KELLOG. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
