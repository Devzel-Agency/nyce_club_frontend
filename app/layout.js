import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/userContext";

// Overused Grotesk
const overusedGrotesk = localFont({
  src: [
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-Book.woff2",
      weight: "450",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "/fonts/OverusedGrotesk/OverusedGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-overused-grotesk",
});

// PolySans Trial
const polySans = localFont({
  src: [
    {
      path: "/fonts/PolySans/PolySansTrial-Bulky.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-BulkyItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-Median.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-MedianItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-Neutral.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-NeutralItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-Slim.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/PolySans/PolySansTrial-SlimItalic.woff",
      weight: "300",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-polysans",
});

export const metadata = {
  title: "Nyce Club | 100% Transparent Donations",
  description:
    "Join Nyce Club to make every donation count. Track where your money goes and support verified NGOs with complete transparency and impact.",
  keywords: [
    "donation transparency",
    "NGOs",
    "charity platform",
    "donate online",
    "Nyce Club",
    "transparent charity",
  ],
  openGraph: {
    title: "Nyce Club | Track Every Donation",
    description:
      "At Nyce Club, 100% of your donations go directly to verified NGOs. Track every penny and see your impact in real time.",
    url: "https://www.nyce.club",
    siteName: "Nyce Club",
    images: [
      {
        url: "/hero-children.jpg",
        width: 1200,
        height: 630,
        alt: "Happy children making peace signs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${overusedGrotesk.variable} ${polySans.variable}`}
    >
      <body>
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
