import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import "./globals.css";
import HeaderApp from "@/components/HeaderApp";
import FooterApp from '@/components/FooterApp';
import React from "react";

export const metadata: Metadata = {
  title: "Electronics",
  description: "Siêu thị điện máy",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container-fluid padding-unset-h">
            <HeaderApp />
            {children}
            <FooterApp />
        </div>
      </body>
    </html>
  );
}
