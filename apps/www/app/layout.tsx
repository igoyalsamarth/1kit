import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '1kit - Launch Production-Ready SaaS in Days',
  description: '1kit provides scalable & secure SaaS starter kits to accelerate your development. Save time, money & hassle with our production-grade templates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
