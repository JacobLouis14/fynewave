import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/storeProvider";
import ToastProvider from "@/lib/toastify/toastProvider";
import SessionWrapper from "@/lib/next-auth/sessionWrapper";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "FyneWave",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider>
          <StoreProvider>
            <SessionWrapper>{children}</SessionWrapper>
          </StoreProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
