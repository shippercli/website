import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { themeInitializationScript } from "@/lib/theme.mjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shipper CLI — Declarative Deployments for Laravel",
  description: "Provider-agnostic deployments from a single YAML file. Plan, review, apply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitializationScript}
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
