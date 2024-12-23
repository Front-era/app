// Global layout

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend App",
  description: "A sample app with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-900 text-white p-4">Global Header</header>
        {children}
        <footer className="bg-gray-900 text-white p-4">Global Footer</footer>
      </body>
    </html>
  );
}
