import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Knowledge from PDF with AI",
  description: "Get knowledge from your PDF with AI",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontSans, "antialiased bg-gray-100")}>
        <div className="flex flex-col p-4 md:p-12 h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
