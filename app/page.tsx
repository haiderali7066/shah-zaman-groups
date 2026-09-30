'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight, ArrowUpRight, Building2, ChevronDown, ChevronLeft, ChevronRight,
  Download, FileText, Handshake, ImageIcon, Leaf, LineChart, Quote, ShieldCheck, Star, Truck,
} from 'lucide-react'

/* ───────── HERO CONFIG ─────────
   Paste up to 5 DIRECT .mp4 / .webm links (not YouTube / page URLs). Empty ones are skipped.
   Each clip shows for HERO_SLIDE_MS, then crossfades to the next. */
const HERO_VIDEOS = [
  'https://www.pexels.com/download/video/4417681/',
  'https://www.pexels.com/download/video/19018143/', // video 2
  'https://www.pexels.com/download/video/7455619/', // video 3
  'https://www.pexels.com/download/video/4498111/', // video 4
  'https://www.pexels.com/download/video/15756882/', // video 5



].filter(Boolean)
const HERO_SLIDE_MS = 3000
const HERO_POSTER = ''

/* Put your logo in /public (e.g. /logo.png) and set the path here. Leave '' to show the placeholder. */
const LOGO_SRC = '/logo.png'

/* Palette: green #0b4f3c | deep #06271f | orange #f59a23 (fills) | #ffb347 (text on dark) | #b45309 (text on light) | cream #fff6ea */

const businesses = [
  { title: 'General Trading', icon: Truck, cta: 'Get in touch', href: '#contact', external: false,
    text: 'Connecting quality products, reliable partners, and new markets across Pakistan and beyond.',
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Live Stock', icon: Leaf, cta: 'albarbarigoatfarming.com', href: 'https://albarbarigoatfarming.com', external: true,
    text: 'Albar Bari Goat Farming champions healthy livestock, responsible care, and sustainable agriculture.',
    img: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Construction', icon: Building2, cta: 'shahzamanconstructions.com', href: 'https://shahzamanconstructions.com', external: true,
    text: 'Shah Zaman Construction creates durable spaces with quality craftsmanship and purpose.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80' },
]

const values = [
  { title: 'Integrity first', text: 'Transparent decisions and dependable partnerships.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
  { title: 'Long-term thinking', text: 'Lasting value and responsible growth in every investment.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
  { title: 'Local understanding', text: 'Deep knowledge of Pakistan’s markets and communities.', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80' },
  { title: 'Positive impact', text: 'Opportunity for people, communities and our country.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
]

const audience = [
  { title: 'Trade partners', text: 'Suppliers and buyers who want dependable sourcing and distribution.' },
  { title: 'Livestock customers', text: 'Families and businesses looking for healthy, responsibly raised goats.' },
  { title: 'Property and project owners', text: 'Clients who need durable construction delivered with quality.' },
]

const highlights = [
  { title: 'Integrity', text: 'Dependable partnerships.', icon: ShieldCheck },
  { title: 'Growth', text: 'Responsible, long-term investment.', icon: LineChart },
  { title: 'Impact', text: 'Opportunity for communities.', icon: Leaf },
]

/* Edit this list: only show organisations you actually work with. Logos load from each domain. */
const logos = [
  { name: 'SMEDA', domain: 'smeda.org' }, { name: 'FBR', domain: 'fbr.gov.pk' },
  { name: 'SECP', domain: 'secp.gov.pk' }, { name: 'TDAP', domain: 'tdap.gov.pk' },
  { name: 'NADRA', domain: 'nadra.gov.pk' }, { name: 'PSQCA', domain: 'psqca.com.pk' },
  { name: 'Pakistan Customs', domain: 'customs.gov.pk' }, { name: 'NEPRA', domain: 'nepra.org.pk' },
]

/* Replace with real testimonials. `business` tags which part of the group the review is about. */
const reviews = [
  { quote: 'Shah Zaman Groups brings integrity, ambition, and real care to every project.', name: 'Ahsan Malik', role: 'Business Partner', business: 'General Trading' },
  { quote: 'Their farming and construction businesses show what responsible growth looks like.', name: 'Sana Riaz', role: 'Community Partner', business: 'Live Stock' },
  { quote: 'Professional people, thoughtful work, and a clear vision for Pakistan’s future.', name: 'Faisal Khan', role: 'Industry Associate', business: 'Construction' },
]
const REVIEW_MS = 6000

const faqs = [
  { q: 'What is Shah Zaman Groups?', a: 'The parent group behind three separate businesses: General Trading, Live Stock (Albar Bari Goat Farming) and Construction (Shah Zaman Construction).' },
  { q: 'Are the businesses connected?', a: 'Each one runs independently with its own operations and website. They share the same group values.' },
  { q: 'How do I contact a business?', a: 'Visit the livestock or construction website from the Our Businesses section, or contact us for General Trading.' },
  { q: 'How can I become a partner?', a: 'Send us your details and area of interest and our team will follow up.' },
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

function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`inline-block rounded-full px-3.5 py-1 text-xs font-semibold ${dark ? 'bg-white/15 text-white' : 'bg-emerald-100 text-[#0b4f3c]'}`}>{children}</span>
}

function LogoTile({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="group mx-3 flex h-20 w-48 shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition duration-300 hover:-translate-y-1 hover:border-[#f59a23] hover:bg-[#0b4f3c] hover:shadow-lg">
      {failed ? (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-[#0b4f3c]">{name.slice(0, 2)}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={`${name} logo`} loading="lazy"
          onError={() => setFailed(true)} className="h-10 w-10 rounded-lg bg-white object-contain p-1" />
      )}
      <span className="text-sm font-semibold text-slate-800 transition group-hover:text-white">{name}</span>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState(1)
  const [open, setOpen] = useState<number | null>(0)

  /* testimonials */
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const next = useCallback(() => setSlide((i) => (i + 1) % reviews.length), [])
  const prev = useCallback(() => setSlide((i) => (i - 1 + reviews.length) % reviews.length), [])
  useEffect(() => {
    if (paused) return
    const t = setTimeout(next, REVIEW_MS)
    return () => clearTimeout(t)
  }, [paused, slide, next])

  /* hero video rotation */
  const [clip, setClip] = useState(0)
  const [failedClips, setFailedClips] = useState<Record<number, boolean>>({})
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const multi = HERO_VIDEOS.length > 1

  useEffect(() => {
    if (!multi) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setClip((c) => (c + 1) % HERO_VIDEOS.length), HERO_SLIDE_MS)
    return () => clearTimeout(t)
  }, [clip, multi])

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === clip) { v.currentTime = 0; v.play().catch(() => {}) } else { v.pause() }
    })
  }, [clip])

  return (
    <main className="bg-white text-slate-800 antialiased">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes fillbar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      `}</style>

      {/* HERO */}
      <section id="home" aria-labelledby="hero-title"
        className="relative overflow-hidden bg-[#06271f] bg-cover bg-center pb-44 pt-36 text-white md:pb-60 md:pt-48"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}>
        {HERO_VIDEOS.map((src, i) => !failedClips[i] && (
          <video key={src + i} ref={(el) => { videoRefs.current[i] = el }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${i === clip ? 'opacity-100' : 'opacity-0'}`}
            src={src} poster={HERO_POSTER} autoPlay={i === 0} muted loop playsInline preload={i === 0 ? 'auto' : 'metadata'}
            aria-hidden onError={() => setFailedClips((f) => ({ ...f, [i]: true }))} />
        ))}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#041c15]/90 via-[#041c15]/65 to-black/30" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.3fr_1fr] lg:px-10">
          <div>
            <h1 id="hero-title" className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
              Building the <span className="text-[#ffb347]">future</span> with purpose.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
              Shah Zaman Groups is the home of three separate businesses in trading, livestock and construction, united by one shared vision.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#businesses" className="group inline-flex items-center gap-2 rounded-full bg-[#f59a23] px-7 py-3.5 text-sm font-bold text-[#06271f] shadow-lg shadow-black/30 outline-none transition hover:-translate-y-0.5 hover:bg-[#ffb347] hover:shadow-xl focus-visible:ring-4 focus-visible:ring-white/70">
                Explore our businesses <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="inline-flex items-center rounded-full border border-white/60 px-7 py-3.5 text-sm font-semibold text-white outline-none transition hover:border-[#ffb347] hover:bg-[#ffb347] hover:text-[#06271f] focus-visible:ring-4 focus-visible:ring-white/70">
                Contact us
              </a>
            </div>
          </div>

          {/* Logo slot */}
          <div className="hidden justify-end lg:flex">
            <div className="flex h-64 w-64 items-center justify-centerxl:h-72 xl:w-72">
              {LOGO_SRC ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={LOGO_SRC} alt="Shah Zaman Groups logo" className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/40 text-center text-white/80">
                  <ImageIcon size={36} />
                  <span className="text-sm font-semibold">Your logo here</span>
                  <span className="text-xs text-white/60">Set LOGO_SRC at the top of the file</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clip progress */}
        {multi && (
          <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-32 lg:left-10 lg:translate-x-0 xl:left-[max(2.5rem,calc(50%-40rem+2.5rem))]" role="group" aria-label="Hero video">
            {HERO_VIDEOS.map((_, i) => (
              <button key={i} onClick={() => setClip(i)} aria-label={`Show video ${i + 1}`} aria-current={i === clip}
                className="group relative h-1.5 w-10 overflow-hidden rounded-full bg-white/30 outline-none transition hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-white md:w-14">
                {i < clip && <span className="absolute inset-0 bg-white" />}
                {i === clip && (
                  <span key={clip} className="absolute inset-0 origin-left bg-[#f59a23] motion-reduce:scale-x-100"
                    style={{ animation: `fillbar ${HERO_SLIDE_MS}ms linear forwards` }} />
                )}
              </button>
            ))}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-[3rem] bg-white" />
      </section>

      {/* ABOUT: value cards */}
      <section id="about" className="bg-white pb-24 pt-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:px-10">
          <Reveal className="lg:w-1/4">
            <Pill>About the group</Pill>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0b4f3c] md:text-4xl">Why Shah Zaman Groups?</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">Rooted in trust and driven by progress. Whatever the business, the same values guide how we work.</p>
          </Reveal>
          <div className="-mx-6 flex flex-1 snap-x gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {values.map((c, i) => (
              <Reveal key={c.title} delay={i * 90} className="group w-60 shrink-0 snap-start">
                <div className="relative h-60 overflow-hidden rounded-2xl ring-0 ring-[#f59a23] transition duration-300 group-hover:ring-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#0b4f3c]/0 transition duration-300 group-hover:bg-[#0b4f3c]/20" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 transition group-hover:text-[#b45309]">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK PANEL */}
      <section className="bg-white px-4 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#06271f] via-[#0a3a2d] to-[#0b4f3c] p-8 text-white md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#f59a23]/15 blur-3xl" />
            <div className="relative text-center">
              <Pill dark>Who is this for?</Pill>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">One group, three businesses</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">Each business serves its own customers and runs on its own. Shah Zaman Groups is the shared foundation behind all three.</p>
            </div>
            <div className="relative mt-12 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="mb-5 text-xl font-semibold">Who do we work with?</h3>
                <div className="space-y-3">
                  {audience.map((a) => (
                    <div key={a.title} className="rounded-xl border border-white/20 bg-white/10 p-4 transition duration-300 hover:translate-x-1 hover:border-[#ffb347] hover:bg-white/20">
                      <h4 className="text-base font-semibold">{a.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/80">{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden h-80 overflow-hidden rounded-2xl lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" alt="Team collaborating" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="relative mt-12 grid gap-6 border-t border-white/20 pt-6 md:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.title} className="group">
                  <h4 className="flex items-center gap-2 text-base font-bold text-[#ffb347] transition group-hover:text-white"><h.icon size={18} />{h.title}</h4>
                  <p className="mt-1 text-sm text-white/80">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* BUSINESSES: expanding gallery */}
      <section id="businesses" className="bg-[#fff6ea] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-[#0b4f3c] md:text-4xl">Our businesses</h2>
            <p className="mt-2 text-base text-slate-700">Hover or tap a card to see what each business offers.</p>
          </Reveal>
          <div className="mt-10 flex h-[34rem] flex-col gap-3 md:h-[30rem] md:flex-row">
            {businesses.map((b, i) => {
              const on = i === active
              return (
                <a key={b.title} href={b.href} {...(b.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }}
                  onFocus={() => setActive(i)}
                  onClick={(e) => {
                    /* on touch: first tap expands, second tap opens the link */
                    if (!on && window.matchMedia('(hover: none)').matches) e.preventDefault()
                    setActive(i)
                  }}
                  className={`group relative overflow-hidden rounded-3xl outline-none ring-[#f59a23] transition-all duration-500 ease-out focus-visible:ring-4 ${on ? 'flex-[4]' : 'flex-1'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.img} alt={b.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className={`absolute inset-0 transition duration-500 ${on ? 'bg-gradient-to-t from-black/90 via-black/40 to-black/5' : 'bg-gradient-to-t from-[#06271f]/95 via-[#06271f]/60 to-[#06271f]/30 group-hover:from-[#0b4f3c]/95'}`} />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition ${on ? 'bg-[#f59a23] text-[#06271f]' : 'bg-white/20 text-white group-hover:bg-[#f59a23] group-hover:text-[#06271f]'}`}><b.icon size={20} /></span>
                        <h3 className="text-xl font-bold">{b.title}</h3>
                        <div className={`overflow-hidden transition-all duration-500 ${on ? 'max-h-44 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-white">{b.text}</p>
                          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#ffb347] underline-offset-4 group-hover:underline">{b.cta}</span>
                        </div>
                      </div>
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f59a23] text-[#06271f] transition duration-300 group-hover:rotate-45 group-hover:bg-white ${on ? 'opacity-100' : 'opacity-0'}`}><ArrowUpRight size={18} /></span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* LOGOS: auto-scrolling marquee */}
      <section className="overflow-hidden bg-white py-20">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <Pill>Our network</Pill>
          <h2 className="mt-4 text-3xl font-bold text-[#0b4f3c] md:text-4xl">Institutions and partners we work with</h2>
          <p className="mt-3 text-base text-slate-600">The organisations we deal with across trade, agriculture and construction.</p>
        </Reveal>
        <div className="group/marquee relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_35s_linear_infinite] motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
            {[...logos, ...logos].map((l, i) => <LogoTile key={`${l.name}-${i}`} {...l} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS: featured quote + selectable people */}
      <section className="bg-gradient-to-b from-[#fff6ea] to-white py-24" aria-roledescription="carousel" aria-label="Testimonials"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl">
            <Pill>Testimonials</Pill>
            <h2 className="mt-4 text-3xl font-bold text-[#0b4f3c] md:text-4xl">What people say about us</h2>
            <p className="mt-3 text-base text-slate-600">Partners and customers across our three businesses.</p>
          </Reveal>

          <Reveal className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
            {/* people list */}
            <div className="order-2 flex gap-3 overflow-x-auto pb-2 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Choose a testimonial">
              {reviews.map((r, i) => {
                const on = i === slide
                return (
                  <button key={r.name} role="tab" aria-selected={on} onClick={() => setSlide(i)}
                    className={`group relative min-w-[16rem] overflow-hidden rounded-2xl border p-4 text-left outline-none transition duration-300 focus-visible:ring-4 focus-visible:ring-[#f59a23]/60 lg:min-w-0 ${on ? 'border-[#0b4f3c] bg-white shadow-lg' : 'border-slate-200 bg-white/60 hover:-translate-y-0.5 hover:border-[#f59a23] hover:bg-white hover:shadow-md'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold transition ${on ? 'bg-[#0b4f3c] text-white' : 'bg-emerald-100 text-[#0b4f3c] group-hover:bg-[#f59a23] group-hover:text-[#06271f]'}`}>{r.name[0]}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-base font-bold text-slate-900">{r.name}</span>
                        <span className="block truncate text-sm text-slate-600">{r.role}</span>
                      </span>
                    </div>
                    {/* autoplay progress */}
                    {on && (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-slate-100">
                        <span key={slide} className="block h-full origin-left bg-[#f59a23] motion-reduce:scale-x-100"
                          style={{ animation: `fillbar ${REVIEW_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* featured quote: all slides stacked so height never jumps */}
            <div className="relative order-1 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#06271f] via-[#0a3a2d] to-[#0b4f3c] p-8 text-white shadow-xl shadow-emerald-950/20 md:p-12 lg:order-2">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#f59a23]/20 blur-3xl" />
              <Quote className="absolute right-8 top-8 h-20 w-20 text-white/10" aria-hidden />
              <div className="relative grid">
                {reviews.map((r, i) => {
                  const on = i === slide
                  return (
                    <figure key={r.name} role="group" aria-roledescription="slide" aria-hidden={!on}
                      className={`col-start-1 row-start-1 flex flex-col justify-between transition duration-500 motion-reduce:transition-none ${on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5 text-[#ffb347]" aria-label="5 out of 5 stars">
                            {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={16} fill="currentColor" />)}
                          </div>
                          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">{r.business}</span>
                        </div>
                        <blockquote className="mt-8 max-w-2xl text-2xl font-medium leading-snug md:text-3xl">{r.quote}</blockquote>
                      </div>
                      <figcaption className="mt-10 flex items-center gap-3 border-t border-white/20 pt-6">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f59a23] text-base font-bold text-[#06271f]">{r.name[0]}</span>
                        <span><span className="block text-base font-bold">{r.name}</span><span className="block text-sm text-white/75">{r.role}</span></span>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
              <div className="relative mt-8 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/70">{slide + 1} of {reviews.length}</span>
                <div className="flex gap-2">
                  <button onClick={prev} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white outline-none transition hover:border-[#f59a23] hover:bg-[#f59a23] hover:text-[#06271f] focus-visible:ring-4 focus-visible:ring-white/60"><ChevronLeft size={20} /></button>
                  <button onClick={next} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white outline-none transition hover:border-[#f59a23] hover:bg-[#f59a23] hover:text-[#06271f] focus-visible:ring-4 focus-visible:ring-white/60"><ChevronRight size={20} /></button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section className="bg-white px-6 pb-20">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-[#0b4f3c] p-8 text-white shadow-xl md:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f59a23] text-[#06271f]"><FileText size={38} /></div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold">Company profile</h3>
              <p className="mt-1 text-base text-white/85">An overview of the group, its three businesses, and how to work with us.</p>
            </div>
            <a href="/company-profile.pdf" download className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0b4f3c] outline-none transition hover:-translate-y-0.5 hover:bg-[#f59a23] hover:text-[#06271f] focus-visible:ring-4 focus-visible:ring-white/60">
              <Download size={16} /> Download file
            </a>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="contact" className="bg-white pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-[#0b4f3c] md:text-4xl">Frequently asked questions</h2>
          <p className="mt-2 text-base text-slate-600">Quick answers about the group and its businesses.</p>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={`rounded-2xl border transition ${isOpen ? 'border-[#0b4f3c] bg-emerald-50/60' : 'border-slate-200 hover:border-[#f59a23] hover:bg-orange-50/50'}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left text-base font-semibold text-slate-900 outline-none transition hover:text-[#0b4f3c] focus-visible:ring-4 focus-visible:ring-[#f59a23]/60">
                    {f.q}
                    <ChevronDown size={18} className={`shrink-0 text-[#0b4f3c] transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
                    <p className="overflow-hidden px-5 text-base leading-relaxed text-slate-700">{f.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <a href="mailto:info@shahzamangroups.com" className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-teal-800 transition hover:text-[#b45309]">
            <Handshake size={16} /> Contact us
          </a>
        </div>
      </section>
    </main>
  )
}