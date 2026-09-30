'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Building2, Eye, Leaf, LineChart, ShieldCheck, Target, Truck, Users } from 'lucide-react'

/* Palette: green #0b4f3c | deep #06271f | orange #f59a23 (fills) | #ffb347 (text on dark) | #b45309 (text on light) | cream #fff6ea */

const HERO_IMG = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85'

const businesses = [
  { title: 'General Trading', icon: Truck, text: 'Connecting quality products, reliable partners and new markets.', href: '/contact', external: false },
  { title: 'Live Stock', icon: Leaf, text: 'Albar Bari Goat Farming: healthy livestock and sustainable agriculture.', href: 'https://albarbarigoatfarming.com', external: true },
  { title: 'Construction', icon: Building2, text: 'Shah Zaman Construction: durable spaces built with craftsmanship.', href: 'https://shahzamanconstructions.com', external: true },
]

const values = [
  { title: 'Integrity first', text: 'We earn trust through transparent decisions and dependable partnerships.', icon: ShieldCheck },
  { title: 'Long-term thinking', text: 'Every investment is made with lasting value and responsible growth in mind.', icon: LineChart },
  { title: 'Positive impact', text: 'We grow by creating opportunity for people, communities and our country.', icon: Users },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${on ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold text-[#0b4f3c]">{children}</span>
}

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-800 antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#06271f] bg-cover bg-center pb-40 pt-36 text-white md:pb-52 md:pt-44" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c15]/95 via-[#041c15]/80 to-[#041c15]/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <a href="/" className="transition hover:text-[#ffb347]">Home</a> <span className="mx-2">/</span> <span className="text-white">About</span>
          </nav>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            A group built on trust, <span className="text-[#ffb347]">growing with Pakistan.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Shah Zaman Groups is the parent of three separate businesses in trading, livestock and construction.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-[3rem] bg-white" />
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <Pill>Our story</Pill>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0b4f3c] md:text-4xl">Rooted in trust. Driven by progress.</h2>
          <p className="mt-5 border-l-4 border-[#f59a23] pl-5 text-lg leading-relaxed text-slate-800">
            From the fields we nurture to the spaces we build, meaningful growth should create value for everyone.
          </p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            We bring an entrepreneurial spirit, local understanding and long-term thinking to every opportunity. Each of our businesses runs on its own, with its own team and customers, and all three share the values of the group.
          </p>
          {/* Replace with your real founding story */}
        </Reveal>
        <Reveal delay={120}>
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-[#f59a23]/30" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="The Shah Zaman Groups team" loading="lazy" className="relative h-96 w-full rounded-3xl object-cover" />
          </div>
        </Reveal>
      </section>

      {/* MISSION + VISION (dark) */}
      <section className="bg-white px-4 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#06271f] via-[#0a3a2d] to-[#0b4f3c] p-8 text-white md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#f59a23]/15 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-2">
              {[{ t: 'Our mission', i: Target, x: 'To build and run trustworthy businesses that create lasting value for customers, partners and communities.' },
                { t: 'Our vision', i: Eye, x: 'To be a respected Pakistani group known for quality, integrity and responsible growth across every field we enter.' }].map((c) => (
                <div key={c.t} className="rounded-2xl border border-white/20 bg-white/10 p-7 transition duration-300 hover:border-[#ffb347]/70 hover:bg-white/20">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59a23] text-[#06271f]"><c.i size={22} /></span>
                  <h3 className="mt-5 text-2xl font-bold">{c.t}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/85">{c.x}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* VALUES (cream) */}
      <section className="bg-[#fff6ea] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <Pill>Our values</Pill>
            <h2 className="mt-4 text-3xl font-bold text-[#0b4f3c] md:text-4xl">What guides every decision</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group h-full rounded-3xl border border-orange-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#0b4f3c] hover:bg-[#0b4f3c] hover:shadow-xl">
                  <v.icon className="h-9 w-9 text-[#b45309] transition group-hover:text-[#ffb347]" />
                  <h3 className="mt-5 text-xl font-bold text-[#0b4f3c] transition group-hover:text-white">{v.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600 transition group-hover:text-white/85">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESSES */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-[#0b4f3c] md:text-4xl">Our three businesses</h2>
            <p className="mt-2 text-base text-slate-600">Separate businesses, one shared foundation.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {businesses.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <a href={b.href} {...(b.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#f59a23] hover:shadow-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59a23] text-[#06271f]"><b.icon size={22} /></span>
                  <h3 className="mt-5 text-xl font-bold text-[#0b4f3c]">{b.title}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-slate-600">{b.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#b45309]">
                    {b.external ? 'Visit website' : 'Get in touch'} <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 pb-24">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-[#0b4f3c] p-10 text-center text-white shadow-xl md:flex-row md:text-left">
            <div className="flex-1">
              <h2 className="text-2xl font-bold md:text-3xl">Want to work with us?</h2>
              <p className="mt-2 text-base text-white/85">Tell us which business you are interested in and we will get back to you.</p>
            </div>
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#f59a23] px-7 py-3.5 text-sm font-bold text-[#06271f] transition hover:bg-white">
              Contact us <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}