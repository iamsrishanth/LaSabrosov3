import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Providers } from "@/components/site/providers";
import { FloatingIsland } from "@/components/site/floating-island";
import { neon } from "@/data/palette";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { LaSabrosoSchema } from "@/components/seo/schema";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const histerm = localFont({
  src: "../../public/fonts/Histerm.woff2",
  variable: "--font-histerm",
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "LaSabroso · Boho Café in Madhapur, Hyderabad",
    template: "%s · LaSabroso",
  },
  description:
    "A hybrid-boho café in Madhapur, Hyderabad. Handcrafted coffee, signature momos, wood-fired pizzas and dessert labs. Open 11 AM to 11 PM. Reserve your table.",
  keywords: [
    "LaSabroso",
    "cafe in Madhapur",
    "Hyderabad cafe",
    "boho cafe",
    "momos",
    "wood-fired pizza",
    "specialty coffee",
    "dessert lab",
  ],
  authors: [{ name: "LaSabroso" }],
  openGraph: {
    title: "LaSabroso · Boho Café in Madhapur, Hyderabad",
    description:
      "Handcrafted coffee, signature momos and dessert labs. Open 11 AM to 11 PM. Reserve your table.",
    url: SITE_URL,
    siteName: "LaSabroso",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "LaSabroso — Boho Café in Madhapur, Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaSabroso · Boho Café in Madhapur, Hyderabad",
    description:
      "Handcrafted coffee, signature momos and dessert labs. Open 11 AM to 11 PM.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: neon.cream,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          outfit.variable,
          playfair.variable,
          dancing.variable,
          histerm.variable,
          "font-sans antialiased bg-cream text-ink"
        )}
      >
        <LaSabrosoSchema />
        <div className="page-shell">
          <a
            href="#top"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-cream"
          >
            Skip to content
          </a>
          <Nav />
          <Providers>
            <main className="page-main">{children}</main>
            <FloatingIsland />
          </Providers>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
