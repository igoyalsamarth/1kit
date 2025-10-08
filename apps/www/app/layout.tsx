import type { Metadata } from "next";
import { bricolage, geistSans, geistMono } from "@/utils/fonts";
import "./globals.css";
import { metadata as metadataConfig } from "@/utils/metadata";

export const metadata: Metadata = metadataConfig;

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
