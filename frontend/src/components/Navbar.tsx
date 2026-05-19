"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Menu, X, User, Search, Sun, Moon, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openCart } from "@/store/slices/cartSlice";
import { setUser } from "@/store/slices/authSlice";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "dark" : "light";
    }
    return "light";
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  
  const { totalQuantity } = useSelector((state: any) => state.cart);
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);
  const pathname = usePathname();

  // Protected routes that require authentication
  const protectedRoutes = ["/wishlist", "/cart", "/checkout", "/admin", "/profile"];
  
  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const navLinks = [
    { name: "Shop All", href: "/shop" },
    { name: "Men", href: "/category/men" },
    { name: "Women", href: "/category/women" },
    { name: "Kids", href: "/category/children" },
    { name: "Sale", href: "/category/hot-deals" },
  ];

  if (pathname === "/login") return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
              <Link href="/" className="font-heading font-black text-3xl tracking-tighter uppercase">
                Kellog
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors block"
                    aria-label="User Profile"
                  >
                    <User size={20} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl py-3 px-4 z-50 text-sm flex flex-col gap-2"
                      >
                        <div className="border-b border-gray-100 dark:border-zinc-800 pb-2">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full text-left py-1.5 px-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded text-gray-700 dark:text-gray-200 transition-colors block font-medium"
                        >
                          Admin Dashboard
                        </Link>
                        
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left py-1.5 px-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded transition-colors font-medium text-left"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <span className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors block">
                    <User size={20} />
                  </span>
                </Link>
              )}
              <Link href="/wishlist" className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-black dark:bg-white dark:text-black rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => dispatch(openCart())}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative"
              >
                <ShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-black dark:bg-white dark:text-black rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-20"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-2xl font-heading font-medium border-b border-gray-100 dark:border-gray-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
