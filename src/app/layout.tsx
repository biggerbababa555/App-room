import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const lanaPixel = localFont({
  src: "../../public/fonts/LanaPixel.ttf",
  variable: "--font-lana-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Virtual 8-Bit Office Dashboard",
  description: "Interactive AI Agent Office",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lanaPixel.variable} dark`}>
      <body className="font-pixel antialiased bg-zinc-900 text-zinc-100 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
