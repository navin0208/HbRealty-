import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import GlobalCursorProvider from "@/components/animations/GlobalCursorProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HB Realty India — Land Development & Industrial Sheds in Nashik, Maharashtra",
    template: "%s | HB Realty India",
  },
  description:
    "HB Realty India is a trusted land development company, industrial shed consultant, and land clearance expert in Nashik, Maharashtra. We offer Grade-A industrial shed construction, industrial plot development, land clearance services, legal liaisoning, and real estate consultancy services across Maharashtra.",
  keywords: [
    "land development in Nashik",
    "warehousing in Nashik",
    "land clearance in Nashik",
    "industrial development in Nashik",
    "land development company Maharashtra",
    "warehouse construction Nashik",
    "industrial shed construction Nashik",
    "Grade A industrial shed Nashik",
    "industrial plots Nashik",
    "land for sale in Nashik",
    "warehouse land for lease Nashik",
    "industrial shed for lease Nashik",
    "real estate consultant Nashik",
    "cold storage Nashik",
    "logistics park Maharashtra",
    "land legal services Nashik",
    "land clearance services Maharashtra",
    "land title clearance Nashik",
    "commercial land Nashik",
    "HB Realty India",
    "Osiyan Warehousing Nashik",
  ],
  authors: [{ name: "HB Realty India" }],
  creator: "HB Realty India",
  publisher: "HB Realty India",
  metadataBase: new URL("https://hbrealtyindia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hbrealtyindia.com",
    siteName: "HB Realty India",
    title: "HB Realty India — Land Development & Industrial Shed Experts in Nashik",
    description:
      "Nashik's most trusted land development company and industrial shed consultant. Grade-A industrial shed construction, industrial plot development, legal liaisoning, and end-to-end real estate solutions across Maharashtra.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "HB Realty India — Land Development & Industrial Sheds in Nashik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HB Realty India — Land Development & Industrial Sheds in Nashik",
    description:
      "Trusted land development company and industrial shed consultant in Nashik, Maharashtra. Grade-A industrial shed construction, industrial plots, and real estate legal services.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  },
};

// Structured Data — LocalBusiness + RealEstateAgent schema
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      name: "HB Realty India",
      url: "https://hbrealtyindia.com",
      logo: "https://hbrealtyindia.com/logo.png",
      image: "https://hbrealtyindia.com/logo.png",
      description:
        "HB Realty India is a trusted land development company, industrial shed consultant, and land clearance expert in Nashik, Maharashtra offering Grade-A industrial shed construction, industrial plot development, land clearance services, legal liaisoning, and real estate consultancy.",
      knowsAbout: [
        "Warehousing in Nashik",
        "Land Development in Nashik",
        "Land Clearance in Nashik",
        "Industrial Shed Construction",
        "Warehouse Construction",
        "Cold Storage Development",
        "Industrial Plot Development",
        "Legal Liaisoning",
        "Logistics Park Development",
      ],
      telephone: "+91-91758-48355",
      email: "info@hbrealtyindia.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Office no 501, Samrat Qubism, Gangapur Road, near Veg Aroma Hotel",
        addressLocality: "Nashik",
        addressRegion: "Maharashtra",
        postalCode: "422013",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 19.9986,
        longitude: 73.7756,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
      areaServed: [
        { "@type": "City", name: "Nashik" },
        { "@type": "State", name: "Maharashtra" },
      ],
      priceRange: "$$",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "HB Realty India",
      url: "https://hbrealtyindia.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://hbrealtyindia.com/properties?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Preconnect to font CDN */}
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* 🚀 ANTIGRAVITY — Custom luxury cursor */}
        <GlobalCursorProvider />
        {children}
        
        {/* Floating Inquire Now Button - Side Tab */}
        <a 
          href="/contact" 
          className="fixed top-1/2 right-0 z-[90] -translate-y-1/2 bg-[#A98B55] text-[#041D34] font-bold uppercase tracking-widest text-[10px] sm:text-xs py-6 px-2 rounded-l-xl shadow-[-5px_0_20px_rgba(169,139,85,0.4)] hover:bg-white hover:pr-4 transition-all duration-300 flex items-center justify-center group"
        >
          <span className="[writing-mode:vertical-rl] rotate-180 group-hover:scale-105 transition-transform">
            INQUIRE NOW
          </span>
        </a>

        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
