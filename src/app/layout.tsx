import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://happy-birthday-mansoor.vercel.app"),
  title: {
    default: "Happy Birthday Dr. Mansoor Ahmed 🎉",
    template: "%s | Dr. Mansoor Ahmed",
  },
  description:
    "A joyful celebration for Dr. Mansoor Ahmed — wishes of health, happiness, and bright moments from all who admire you.",
  keywords: [
    "Happy Birthday",
    "Dr. Mansoor Ahmed",
    "Birthday Wishes",
    "Celebration",
    "Anniversary",
  ],
  openGraph: {
    title: "Happy Birthday Dr. Mansoor Ahmed 🎉",
    description:
      "A joyful celebration for Dr. Mansoor Ahmed — wishes of health, happiness, and bright moments from all who admire you.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-portrait.jpg",
        width: 1080,
        height: 1080,
        alt: "Dr. Mansoor Ahmed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Dr. Mansoor Ahmed 🎉",
    description:
      "A joyful celebration for Dr. Mansoor Ahmed — wishes of health, happiness, and bright moments from all who admire you.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1128",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2 focus:font-bold focus:text-navy-950"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
