"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const serviceLinks = [
  { label: "General Trading", href: "/#general-trading", id: "general-trading" },
  { label: "Livestock Farming", href: "/#livestock-farming", id: "livestock-farming" },
  { label: "General Construction", href: "/#general-construction", id: "general-construction" },
];

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Solid header after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Highlight the service link for the section currently in view (home page only)
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = serviceLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));

    // Clear highlight when back at the top (hero)
    const onTop = () => {
      if (window.scrollY < 200) setActiveSection(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  const isPageActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Right-side pill links (Home / About)
  const pageLinkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      solid
        ? active
          ? "bg-emerald-100 text-[#0b4f3c]"
          : "text-slate-700 hover:bg-emerald-50 hover:text-[#0b4f3c]"
        : active
          ? "bg-white/20 !text-white"
          : "!text-white hover:bg-white/15 hover:!text-white"
    }`;

  // Center service links: underline indicator instead of a pill
  const serviceLinkClass = (active: boolean) =>
    `relative whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-300 ${
      solid
        ? `${
            active ? "text-[#0b4f3c]" : "text-slate-700 hover:text-[#0b4f3c]"
          } after:bg-[#f59a23]`
        : "!text-white hover:!text-white after:bg-[#ffb347]"
    } ${
      active
        ? "after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      {/* Soft top scrim keeps white text readable over bright hero images */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-300 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="relative mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-6 lg:px-10 xl:grid-cols-[1fr_auto_1fr]">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 justify-self-start"
          aria-label="Shah Zaman Groups home"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
            <img
              src="/logo.png"
              alt="Shah Zaman Groups logo"
              className="h-full w-full object-contain"
            />
          </span>

          <span
            className={`text-lg font-bold leading-tight transition-colors ${
              solid ? "text-[#0b4f3c]" : "text-white"
            }`}
          >
            Shah Zaman
            <span
              className={`block text-xs font-semibold tracking-wide ${
                solid ? "text-[#b45309]" : "text-white"
              }`}
            >
              Groups
            </span>
          </span>
        </Link>

        {/* Center: Services */}
        <nav
          aria-label="Services"
          className="hidden items-center gap-2 xl:flex"
        >
          {serviceLinks.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              aria-current={activeSection === l.id ? "location" : undefined}
              className={serviceLinkClass(activeSection === l.id)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: Home, About, Contact CTA */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 justify-self-end xl:flex"
        >
          {pageLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={isPageActive(l.href) ? "page" : undefined}
              className={pageLinkClass(isPageActive(l.href))}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className={`group ml-3 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition ${
              solid
                ? "bg-[#f59a23] !text-[#06271f] hover:bg-[#0b4f3c] hover:!text-white"
                : "bg-[#0b4f3c] !text-white hover:bg-white hover:!text-[#0b4f3c]"
            }`}
          >
            Contact Us
            <ArrowUpRight
              size={15}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`flex h-11 w-11 items-center justify-center justify-self-end rounded-full border transition xl:hidden ${
            solid
              ? "border-[#0b4f3c] text-[#0b4f3c]"
              : "border-white/70 text-white"
          }`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={`relative grid transition-all duration-300 xl:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="overflow-hidden bg-white px-6"
          // `inert` keeps hidden links out of the tab order when collapsed
          {...(!open ? { inert: true } : {})}
        >
          <div className="space-y-1 pb-6 pt-2">
            {pageLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                  isPageActive(l.href)
                    ? "bg-emerald-100 text-[#0b4f3c]"
                    : "text-slate-800 hover:bg-emerald-50 hover:text-[#0b4f3c]"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-slate-200" role="separator" />

            {serviceLinks.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                  activeSection === l.id
                    ? "bg-emerald-100 text-[#0b4f3c]"
                    : "text-slate-800 hover:bg-emerald-50 hover:text-[#0b4f3c]"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#f59a23] px-5 py-3 text-center text-sm font-bold !text-[#06271f] transition hover:bg-[#0b4f3c] hover:!text-white"
            >
              Contact Us
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}