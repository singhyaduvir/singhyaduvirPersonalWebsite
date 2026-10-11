import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { site } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getOpenGraphUrl } from "@/lib/links";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const metadataUrl = getOpenGraphUrl();

export const metadata: Metadata = {
  metadataBase: new URL(metadataUrl ?? "http://localhost:3000"),
  title: {
    default: site.metadata.title,
    template: `%s · ${site.name}`,
  },
  description: site.metadata.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    ...(metadataUrl ? { url: metadataUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.title,
    description: site.metadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
