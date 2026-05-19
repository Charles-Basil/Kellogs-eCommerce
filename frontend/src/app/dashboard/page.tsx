"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, Package, User, Heart, MapPin, Settings } from "lucide-react";
import Link from "next/link";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");

  // If there's no Redux state populated (because we haven't wired login), use a mock user
  const currentUser = user || { firstName: "John", lastName: "Doe", email: "john@example.com" };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const tabs = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-100 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-black mb-2">My Account</h1>
          <p className="text-gray-500">Welcome back, {currentUser.firstName}!</p>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === tab.id ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900'}`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              
              {/* Mock Order */}
              <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-zinc-900 p-4 flex flex-wrap justify-between items-center border-b border-gray-200 dark:border-zinc-800">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order Placed</p>
                      <p className="text-sm font-medium">May 19, 2026</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total</p>
                      <p className="text-sm font-medium">$129.99</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order #</p>
                    <p className="text-sm font-medium">ORD-987654321</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-green-600 dark:text-green-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Delivered
                    </h3>
                    <button className="text-sm border border-gray-300 dark:border-zinc-700 px-4 py-2 rounded font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      View Invoice
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 h-24 bg-gray-100 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-[url('/images/product-1.jpg')] bg-cover bg-center" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Minimalist Urban Jacket</h4>
                      <p className="text-sm text-gray-500 mt-1">Black | M</p>
                      <div className="mt-4 flex gap-4">
                        <Link href="/product/1" className="text-sm font-medium underline text-black dark:text-white">Buy it again</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6 max-w-xl">
              <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
                  <input type="text" defaultValue={currentUser.firstName} className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
                  <input type="text" defaultValue={currentUser.lastName} className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                <input type="email" defaultValue={currentUser.email} disabled className="w-full bg-gray-100 dark:bg-zinc-900 text-gray-500 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2.5 cursor-not-allowed" />
              </div>
              <button className="bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
              <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
                <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-medium mb-2">No items saved yet</h3>
                <p className="text-gray-500">Items added to your wishlist will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
