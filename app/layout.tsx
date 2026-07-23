import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shipper — Declarative Deployments for Laravel",
  description: "Provider-agnostic deployments from a single YAML file. Plan, review, apply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var saved=localStorage.getItem("shipper-theme");var systemDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var theme=(saved==="dark"||saved==="light")?saved:(systemDark?"dark":"light");document.documentElement.dataset.theme=theme;document.documentElement.classList.toggle("dark",theme==="dark");}catch(e){}})();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-foreground">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
