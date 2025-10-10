import type { Metadata } from "next";
import { bricolage, geistSans, geistMono } from "@/utils/fonts";
import "./globals.css";
import { metadata as metadataConfig } from "@/utils/metadata";
import { getStructuredData } from "@/utils/structured-data";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
