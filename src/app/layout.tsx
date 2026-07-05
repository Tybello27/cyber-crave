import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ClientInit } from "./client-init";
import InstallPopup from "@/components/pwa/InstallPopup";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#F0A199",
};

export const metadata: Metadata = {
  title: "CycleCrave — Track Your Cycle, Nourish Your Body",
  description:
    "Track your cycle, nourish your body, empower your days. Personalized craving & symptom companion.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CycleCrave",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/icon-192.png" },
      { rel: "icon", type: "image/svg+xml", url: "/icon.svg" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F0A199" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CycleCrave" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#FAF5EB] text-[#3D2E2E] antialiased selection:bg-[#FADEDE] selection:text-[#B85952]">
        <ClientInit />
        <InstallPopup />
        {children}
      </body>
    </html>
  );
}
