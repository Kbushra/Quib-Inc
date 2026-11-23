import type { Metadata, Viewport } from "next";
import { DM_Sans, Pixelify_Sans } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quibinc.dpdns.org"),
  title: {
    default: "Quib Inc.",
    template: "%s | Quib Inc.",
  },
  description:
    "A website to give updates on Quib Inc. and its affiliated Mediaocre Games, providing their content.",
  openGraph: {
    type: "website",
    siteName: "Quib Inc.",
    title: "Quib Inc.",
    description: "A website to give updates on Quib Inc. and its affiliated Mediaocre Games, providing their content.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quib Inc.",
    description: "A website to give updates on Quib Inc. and its affiliated Mediaocre Games, providing their content.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.apng" },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
