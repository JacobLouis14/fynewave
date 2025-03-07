import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "../lib/states/StoreProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://fynewave.com"),
  keywords: ["blog", "music", "fynewave", "music blog", "FyneWave"],
  title: {
    default: "FyneWave",
    template: "%s - FyneWave",
  },
  description:
    "Discover the latest music trends, album reviews, artist interviews, and curated playlists on our music blog. Stay updated with the best in the world of music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={process.env.G_ANALYTICS || ""} />
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
