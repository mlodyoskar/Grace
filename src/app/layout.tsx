import { Providers } from "@/components/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dialogs } from "./(main-layout)/dialogs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Grace. Your personal assistant",
 description: "Grace is your personal assistant.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="en">
   <Providers>
    <Dialogs />
    <body className={inter.className}>{children}</body>
   </Providers>
  </html>
 );
}
