import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

// Define tema global
const globalTheme =
  "bg-background dark:bg-background text-color_text dark:text-color_text"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meu Currículo",
  description: "Um currículo simples e bonito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${globalTheme} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <main className="flex-grow">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
