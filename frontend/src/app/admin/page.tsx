"use client";

import { useState } from "react";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

export default function AdminDashboard() {
  const [orders] = useState(() => {
    const stored = localStorage.getItem("kellog_orders");
    if (stored) return JSON.parse(stored);

    const defaultOrders = [
      { id: "#ORD-001", customer: "Sarah Jenkins", date: "Today, 10:24 AM", amount: "₦129.99", status: "Processing" },
      { id: "#ORD-002", customer: "Michael Chen", date: "Yesterday", amount: "₦349.50", status: "Shipped" },
      { id: "#ORD-003", customer: "Emma Wilson", date: "May 17, 2026", amount: "₦89.00", status: "Delivered" },
      { id: "#ORD-004", customer: "James Rodriguez", date: "May 16, 2026", amount: "₦210.00", status: "Delivered" },
    ];

    localStorage.setItem("kellog_orders", JSON.stringify(defaultOrders));
    return defaultOrders;
  });

  const stats = [
    {
      name: "Total Revenue",
      value: `₦${(45231.89 + orders.reduce((sum: number, o: any) => sum + parseFloat(String(o.amount).replace(/[₦$]/g, "")), 0) - 778.49).toFixed(2)}`,
      icon: DollarSign,
      trend: "+20.1% from last month",
    },
    { name: "Orders", value: (356 + (orders.length - 4)).toString(), icon: Package, trend: "+12.5% from last month" },
    { name: "Active Users", value: "2,304", icon: Users, trend: "+5.2% from last month" },
    { name: "Products", value: "142", icon: ShoppingBag, trend: "+4 new this week" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the Kellog admin control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                  <Icon size={20} className="text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-zinc-800">
          <h3 className="font-bold text-lg">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-zinc-900 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 font-medium">{String(order.amount).replace("$", "₦")}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                        ${order.status === "Processing"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

