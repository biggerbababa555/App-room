import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin", "thai"],
  variable: "--font-press-start-2p",
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
    <html lang="en" className={`${pressStart2P.variable} dark`}>
      <body className="font-pixel antialiased bg-zinc-900 text-zinc-100 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
