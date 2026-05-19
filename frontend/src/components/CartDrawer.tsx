"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { closeCart, updateQuantityLocal, removeItemLocal } from "@/store/slices/cartSlice";

export default function CartDrawer() {
  const { isOpen, items, totalQuantity, totalAmount } = useSelector(
    (state: any) => state.cart
  );

  const dispatch = useDispatch();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Framer Motion variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.3 } as any },
    exit: { x: "100%", transition: { duration: 0.3 } as any },
  } as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="text-2xl font-heading font-bold">Your Cart ({totalQuantity})</h2>
              <button
                onClick={() => dispatch(closeCart())}
                className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium">Your cart is empty</h3>
                   <p className="text-gray-500">Looks like you haven&apos;t added anything yet.</p>
                  <button
                    onClick={() => dispatch(closeCart())}
                    className="mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="relative w-24 h-32 bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product?.image || "/images/product-1.jpg"}
                        alt={item.product?.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold line-clamp-2">{item.product?.name}</h3>
                        <p className="font-medium ml-4">₦{item.product?.price}</p>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.color} | {item.size}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-md">
                          <button 
                            onClick={() => dispatch(updateQuantityLocal({ productId: item.product.id, size: item.size, color: item.color, quantity: item.quantity - 1 }))}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantityLocal({ productId: item.product.id, size: item.size, color: item.color, quantity: item.quantity + 1 }))}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => dispatch(removeItemLocal({ productId: item.product.id, size: item.size, color: item.color }))}
                          className="text-sm text-gray-400 hover:text-red-500 transition-colors underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                <div className="flex justify-between items-center mb-4 text-lg font-medium">
                  <span>Subtotal</span>
                  <span>₦{totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Shipping, taxes, and discount codes calculated at checkout.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/cart"
                    onClick={() => dispatch(closeCart())}
                    className="flex-1 text-center py-4 border border-black dark:border-white text-black dark:text-white rounded-lg font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => dispatch(closeCart())}
                    className="flex-1 text-center py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
