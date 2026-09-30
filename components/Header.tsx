"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Businesses", href: "/#businesses" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Solid white bar once scrolled or when the mobile menu is open; transparent over the dark hero otherwise
  const solid = scrolled || open;
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Shah Zaman Groups home"
        >
          {/* Logo */}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
            <img
              src="/logo.png"
              alt="Shah Zaman Groups logo"
              className="h-full w-full object-contain"
            />
          </span>

          {/* Brand Name */}
          <span
            className={`text-lg font-bold leading-tight transition-colors ${
              solid ? "text-[#0b4f3c]" : "text-white"
            }`}
          >
            Shah Zaman
            <span
              className={`block text-xs font-semibold tracking-wide ${
                solid ? "text-[#b45309]" : "text-[#ffb347]"
              }`}
            >
              Groups
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                solid
                  ? isActive(l.href)
                    ? "bg-emerald-100 text-[#0b4f3c]"
                    : "text-slate-700 hover:bg-emerald-50 hover:text-[#0b4f3c]"
                  : isActive(l.href)
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="group ml-3 inline-flex items-center gap-1.5 rounded-full bg-[#f59a23] px-5 py-2.5 text-sm font-bold text-[#06271f] transition hover:bg-[#0b4f3c] hover:text-white"
          >
            Get in touch{" "}
            <ArrowUpRight
              size={15}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition md:hidden ${solid ? "border-[#0b4f3c] text-[#0b4f3c]" : "border-white/70 text-white"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`grid transition-all duration-300 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav aria-label="Mobile" className="overflow-hidden bg-white px-6">
          <div className="space-y-1 pb-6 pt-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${isActive(l.href) ? "bg-emerald-100 text-[#0b4f3c]" : "text-slate-800 hover:bg-emerald-50 hover:text-[#0b4f3c]"}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 block rounded-full bg-[#f59a23] px-5 py-3 text-center text-sm font-bold text-[#06271f] transition hover:bg-[#0b4f3c] hover:text-white"
            >
              Get in touch
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
