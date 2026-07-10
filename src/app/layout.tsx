import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AppPromoKit — AI App Launch Material Generator",
  description:
    "Enter your app name and positioning. Get landing page copy, App Store description, tweets, a Reddit post, and a cold email — all AI-generated and tailored to your app.",
};

// Runs before hydration / first paint: sets data-theme on <html> from
// localStorage, falling back to prefers-color-scheme. Prevents FOUC.
const themeInit = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?(s==='dark'):m;document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
