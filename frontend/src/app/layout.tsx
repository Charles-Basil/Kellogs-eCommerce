import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SplashLoader from "@/components/SplashLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "KELLOG | Premium eCommerce",
  description: "Ultra modern Gen-Z eCommerce platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hydration-safe theme bootstrap: runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (!theme && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} min-h-full flex flex-col bg-white text-black dark:bg-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black h-full antialiased`}>
        <SplashLoader duration={7000}>
          <ReduxProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
          </ReduxProvider>
        </SplashLoader>
      </body>
    </html>
  );
}
