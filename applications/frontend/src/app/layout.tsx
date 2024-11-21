import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import LoggedOut from "./components/LoggedOut";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frontera Control Panel",
  description: "Frontera Control Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

<ClerkProvider >
  <Analytics />
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SignedOut>
            <div className="flex justify-end p-4">
              <SignInButton fallbackRedirectUrl={"/dashboard"}/>
              </div>
              <LoggedOut />
          </SignedOut>
          <SignedIn>
            <div className="flex justify-end p-4">
              <UserButton />
              </div>
              {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
