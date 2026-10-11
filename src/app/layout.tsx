import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import type { Metadata } from "next";
import {  Noto_Serif_Bengali} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { Toaster } from "react-hot-toast";
import Footer from '@/components/Footer';

const   NotoSerifBengali =   Noto_Serif_Bengali({
  subsets: ["latin","bengali"],
});



export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপণ্যের বাজারমূল্য",
  description:  "বাজার দর — চাল, ডাল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${ NotoSerifBengali.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <PriceTicker></PriceTicker>
        {children}
        <Footer></Footer>
        <Toaster position="top-right"></Toaster>
        
        
        </body>
    </html>
  );
}
