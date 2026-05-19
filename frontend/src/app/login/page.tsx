"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { setUser } from "@/store/slices/authSlice";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let userProfile = {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: isLogin ? "John" : firstName,
      lastName: isLogin ? "Doe" : lastName,
      email: email || "john@example.com",
      role: (email || "").toLowerCase().includes("admin") ? "ADMIN" : "USER"
    };

    if (!isLogin) {
      // Register
      const existingStr = localStorage.getItem("kellog_registered_users");
      const users = existingStr ? JSON.parse(existingStr) : [];
      users.push(userProfile);
      localStorage.setItem("kellog_registered_users", JSON.stringify(users));
    } else {
      // Login - look up user
      const existingStr = localStorage.getItem("kellog_registered_users");
      if (existingStr) {
        const users = JSON.parse(existingStr);
        const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (matched) {
          userProfile = matched;
        }
      }
    }

    dispatch(setUser(userProfile));
    const next = searchParams?.get("next");
    router.push(next || "/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-black tracking-tight mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-500">
            {isLogin ? "Sign in to your Kellog account" : "Get started with premium benefits"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              {isLogin && (
                <button type="button" className="text-xs text-gray-500 hover:text-black dark:hover:text-white underline">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg pl-4 pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-500">
            {isLogin ? "New to Kellog? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-black dark:text-white underline"
            >
              {isLogin ? "Create an account" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
