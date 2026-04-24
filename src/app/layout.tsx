import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dev Atlas",
    template: "%s | Dev Atlas",
  },
  description:
    "Internal React and React Native coding standards, examples, recipes, and pull request criteria.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
  >
    <body className="min-h-full bg-slate-50 font-sans text-slate-950">
      {children}
    </body>
  </html>
);

export default RootLayout;
