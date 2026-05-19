"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { clearCart } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      const defaultOrders = [
        { id: "#ORD-001", customer: "Sarah Jenkins", date: "Today, 10:24 AM", amount: "₦129.99", status: "Processing" },
        { id: "#ORD-002", customer: "Michael Chen", date: "Yesterday", amount: "₦349.50", status: "Shipped" },
        { id: "#ORD-003", customer: "Emma Wilson", date: "May 17, 2026", amount: "₦89.00", status: "Delivered" },
        { id: "#ORD-004", customer: "James Rodriguez", date: "May 16, 2026", amount: "₦210.00", status: "Delivered" },
      ];

      const existingOrdersStr = localStorage.getItem("kellog_orders");
      const currentOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : defaultOrders;

      const newOrder = {
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: `${firstName || "Guest"} ${lastName || "User"}`,
        date: "Just now",
        amount: `₦${totalAmount.toFixed(2)}`,
        status: "Processing",
      };

      localStorage.setItem("kellog_orders", JSON.stringify([newOrder, ...currentOrders]));

      dispatch(clearCart());
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-4xl font-heading font-black mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. We&apos;ve received your order and will begin processing it right away. You will receive an email confirmation shortly.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          View Order Status
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8">
        <ArrowLeft size={16} /> Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-black tracking-tight mb-2">Checkout</h1>
            <div className="flex gap-2 text-sm font-medium">
              <span className={step === 1 ? "text-black dark:text-white" : "text-gray-400"}>1. Shipping</span>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className={step === 2 ? "text-black dark:text-white" : "text-gray-400"}>2. Payment</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <h2 className="text-xl font-semibold pt-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold">Payment Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-transparent border border-gray-300 dark:border-zinc-700 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 h-fit lg:sticky lg:top-28">
            <h2 className="text-xl font-semibold mb-6">In your cart</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-gray-200 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product?.image || "/images/product-1.jpg"}
                      alt={item.product?.name || "Product"}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-medium text-sm line-clamp-1">{item.product?.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div className="flex items-center font-medium text-sm">₦{(item.product?.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 space-y-3 mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₦{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>₦0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>₦{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

