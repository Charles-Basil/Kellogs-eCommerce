"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { updateQuantityLocal, removeItemLocal } from "@/store/slices/cartSlice";

export default function CartPage() {
  const { items, totalAmount } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-heading font-black tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          You haven&apos;t added any items to your cart yet. Discover our latest collection and find something you love.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-100 dark:border-zinc-800"
              >
                <div className="relative w-32 h-40 bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product?.image || "/images/product-1.jpg"}
                    alt={item.product?.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                      <p className="text-gray-500 mt-1">
                        {item.color} | {item.size}
                      </p>
                    </div>
                    <p className="font-medium text-lg">₦{item.product?.price}</p>
                  </div>

                  <div className="mt-auto pt-4 flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-lg">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantityLocal({
                              productId: item.product.id,
                              size: item.size,
                              color: item.color,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantityLocal({
                              productId: item.product.id,
                              size: item.size,
                              color: item.color,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        dispatch(
                          removeItemLocal({
                            productId: item.product.id,
                            size: item.size,
                            color: item.color,
                          })
                        )
                      }
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₦{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₦{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-black dark:bg-white text-white dark:text-black flex justify-center items-center gap-2 py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

