import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TooltipProvider from "@/components/tooltipProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "指令生成器",
  description: "很酷的指令生成器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} id="app">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
