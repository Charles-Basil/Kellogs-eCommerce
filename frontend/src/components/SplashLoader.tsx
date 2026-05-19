"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  duration?: number;
};

export default function SplashLoader({ children, duration = 7000 }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!loading) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="text-4xl font-heading font-black tracking-widest">KELLOG</div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
          Redefine your style — loading the freshest looks for you.
        </p>
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-zinc-800 rounded-full border-t-black dark:border-t-white animate-spin" />
      </div>
    </div>
  );
}
