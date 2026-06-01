"use client";
// 🚀 ANTIGRAVITY — Enhanced Footer with staggered reveal

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpStagger, EASE_CINEMATIC } from "@/lib/animation-variants";

export default function Footer() {
  return (
    // 🚀 ANTIGRAVITY — motion.footer with fadeUp reveal
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUpStagger}
      className="relative bg-[#031525] border-t border-white/5 pt-24 pb-10 px-6 md:px-12"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="HB Realty India — Land Development Company in Nashik"
                width={140}
                height={46}
                className="brightness-0 invert mb-6"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Nashik&apos;s trusted land development company and warehousing consultant. Delivering Grade-A infrastructure and real estate solutions across Maharashtra since inception.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav variants={fadeUp} aria-label="Footer Navigation">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Company</h4>
            {/* 🚀 ANTIGRAVITY — Animated underline below heading */}
            <div className="w-8 h-px bg-white/20 mb-6 animate-underline" />
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Our Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/warehousing-2", label: "Warehousing" },
                { href: "/blog", label: "Blog & Insights" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-sm hover:text-[#A98B55] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services Links */}
          <motion.nav variants={fadeUp} aria-label="Services">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Services</h4>
            <div className="w-8 h-px bg-white/20 mb-6 animate-underline" />
            <ul className="space-y-3">
              {[
                "Warehouse Construction in Nashik",
                "Land Development in Nashik",
                "Industrial Plot Development",
                "Warehouse Lease Advisory",
                "Cold Storage Solutions",
                "Land Legal Liaisoning",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-white/40 text-sm hover:text-[#A98B55] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact Info — NAP for local SEO */}
          <motion.address variants={fadeUp} className="not-italic">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Head Office</h4>
            <div className="w-8 h-px bg-white/20 mb-6 animate-underline" />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-white/30 shrink-0 mt-1" />
                <span className="text-white/40 text-sm leading-relaxed">
                  Office no 501, Samrat Qubism, Gangapur Road, near Veg Aroma Hotel, Nashik, Maharashtra 422013
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/30 shrink-0" />
                <a href="tel:+919175848355" className="text-white/40 text-sm hover:text-[#A98B55] transition-colors">
                  +91 91758 48355
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/30 shrink-0" />
                <a href="mailto:info@hbrealtyindia.com" className="text-white/40 text-sm hover:text-[#A98B55] transition-colors">
                  info@hbrealtyindia.com
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <h5 className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Osiyan Warehousing</h5>
              <p className="text-white/30 text-xs leading-relaxed">
                Gat.No-179/3, Kathwad Phata, Talegaon Dindori, Tal. Dindori, Dist. Nashik, Maharashtra
              </p>
            </div>
          </motion.address>
        </div>

        {/* Partners */}
        <motion.div variants={fadeUp} className="border-t border-white/5 pt-10 mb-10">
          <h4 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Our Partners</h4>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-white/30 text-xs">
            <span>Adv. Manoj Bafana</span>
            <span>Sanghavi & Bafana (Dubai)</span>
            <span>Everliveindia</span>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div variants={fadeUp} className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} HB Realty India. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/30 text-xs">
            <Link href="/contact" className="hover:text-[#A98B55] transition-colors">Privacy Policy</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A98B55] transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A98B55] transition-colors">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A98B55] transition-colors">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A98B55] transition-colors">YouTube</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
