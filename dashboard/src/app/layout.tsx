import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolyTrends Terminal",
  description: "Polymarket 套利信号 · 聪明钱追踪 · 实时行情",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
