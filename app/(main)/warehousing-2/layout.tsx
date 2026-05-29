import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warehousing Development Services in Nashik — Warehouse Construction, Cold Storage & Logistics Parks",
  description:
    "HB Realty India offers end-to-end warehousing development services in Nashik including warehouse construction, cold storage warehouse building, logistics park development in Maharashtra, warehouse land for lease in Nashik, and complete legal liaisoning. Trusted by businesses across Nashik, Pune, and Maharashtra.",
  keywords: [
    "warehousing development services Nashik",
    "warehouse construction Nashik",
    "cold storage warehouse Nashik",
    "logistics park development Maharashtra",
    "warehouse land for lease Nashik",
    "warehousing company Nashik",
    "industrial warehouse Nashik",
    "Grade A warehousing Nashik",
    "warehouse legal clearance Maharashtra",
    "Osiyan warehousing Nashik",
  ],
  alternates: { canonical: "/warehousing-2" },
  openGraph: {
    title: "Warehousing Development Services in Nashik — HB Realty India",
    description: "End-to-end warehouse construction, cold storage, logistics parks, and warehouse land for lease in Nashik, Maharashtra.",
    url: "https://hbrealtyindia.com/warehousing-2",
  },
};

export default function WarehousingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
