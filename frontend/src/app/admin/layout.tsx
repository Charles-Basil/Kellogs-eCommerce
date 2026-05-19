"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, FolderTree, Settings, Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, isAdmin } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // In a real app, this effect would protect the route
  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.push("/");
  //   }
  // }, [isAdmin, router]);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: FolderTree },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800 hidden md:block">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
          <Link href="/admin" className="font-heading font-black text-2xl tracking-tighter">
            KELLOG <span className="text-sm font-normal text-gray-500 tracking-normal ml-2">ADMIN</span>
          </Link>
        </div>
        <div className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:hidden">
            <button className="p-2 text-gray-600">
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Admin User</span>
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
