'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Boxes, Building2, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardCheck, Download, Factory, FileText, Globe, Handshake, Hammer, ImageIcon, Leaf, LineChart,
  Mail, MapPin, Package, Phone, Quote, Search, ShieldCheck, Sprout, Star, Truck, Users, Wheat,
} from 'lucide-react'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' })

/* ───────── CONFIG ─────────
   Up to 5 DIRECT .mp4 / .webm links. Each clip shows for HERO_SLIDE_MS then crossfades. */
const HERO_VIDEOS = [
  'https://www.pexels.com/download/video/30899354/',
  'https://www.pexels.com/download/video/13689704/',
  'https://www.pexels.com/download/video/10810477/',
  
].filter(Boolean)
const HERO_SLIDE_MS = 3000
const HERO_POSTER = ''
const LOGO_SRC = '/logo.png' // put your logo in /public. '' shows a placeholder.
const CONTACT_EMAIL = 'info@shahzamangroups.com'
const CONTACT_PHONE = '+92 000 0000000' // edit
const CONTACT_ADDRESS = 'Karachi, Pakistan' // edit

/* Palette
   green #0b4f3c | deep #06271f | orange #f59a23 (fills) | #ffb347 (text on dark) | #9a4308 (text on light) | cream #fff6ea
   Body text: slate-700 on light, white/90 on dark. */

/* One shared container so every section lines up. Wider than before (1440px). */
const W = 'mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-16'

const heroCards = [
  { title: 'Trade with a partner you can trust', cta: 'Get in touch', href: '#contact',
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80' },
  { title: 'Healthy livestock, responsibly raised', cta: 'Visit farm', href: 'https://albarbarigoatfarming.com', external: true,
    img: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=600&q=80' },
  { title: 'Durable construction, delivered with care', cta: 'Visit builder', href: 'https://shahzamanconstructions.com', external: true,
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
]

/* Only list organisations you actually work with. Logos load from each domain. */
const logos = [
  { name: 'SMEDA', domain: 'smeda.org' }, { name: 'FBR', domain: 'fbr.gov.pk' },
  { name: 'SECP', domain: 'secp.gov.pk' }, { name: 'TDAP', domain: 'tdap.gov.pk' },
  { name: 'NADRA', domain: 'nadra.gov.pk' }, { name: 'PSQCA', domain: 'psqca.com.pk' },
  { name: 'Pakistan Customs', domain: 'customs.gov.pk' }, { name: 'NEPRA', domain: 'nepra.org.pk' },
]

const businesses = [
  { title: 'General Trading', icon: Truck, cta: 'Get in touch', href: '#contact', external: false,
    text: 'Connecting quality products, reliable partners, and new markets across Pakistan and beyond.',
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Live Stock', icon: Leaf, cta: 'albarbarigoatfarming.com', href: 'https://albarbarigoatfarming.com', external: true,
    text: 'Albar Bari Goat Farming champions healthy livestock, responsible care, and sustainable agriculture.',
    img: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Construction', icon: Building2, cta: 'shahzamanconstructions.com', href: 'https://shahzamanconstructions.com', external: true,
    text: 'Shah Zaman Construction creates durable spaces with quality craftsmanship and purpose.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80' },
]

/* Edit these to your real numbers. */
const stats = [
  { value: '3', label: 'Independent businesses', icon: Boxes },
  { value: '3', label: 'Industries served', icon: Factory },
  { value: 'Pakistan', label: 'Nationwide reach', icon: MapPin },
]

const steps = [
  { title: 'Reach out', text: 'Tell us what you need and which business fits.', icon: Mail },
  { title: 'Discuss', text: 'We review your requirements and agree on scope.', icon: Search },
  { title: 'Confirm', text: 'Terms, timelines and pricing are made clear.', icon: ClipboardCheck },
  { title: 'Deliver', text: 'We deliver with quality and keep you updated.', icon: BadgeCheck },
]

const sectors = [
  { title: 'Traders & distributors', text: 'Dependable sourcing and distribution.', icon: Package },
  { title: 'Farms & dairies', text: 'Healthy, responsibly raised goats.', icon: Sprout },
  { title: 'Families & events', text: 'Quality livestock for every occasion.', icon: Users },
  { title: 'Food industries', text: 'Consistent supply for food businesses.', icon: Wheat },
  { title: 'Property owners', text: 'Homes and buildings made to last.', icon: Building2 },
  { title: 'Developers', text: 'Project delivery with quality craftsmanship.', icon: Hammer },
  { title: 'Manufacturers', text: 'Materials and goods for production.', icon: Factory },
  { title: 'Export partners', text: 'Connections to markets beyond Pakistan.', icon: Globe },
]

const services = [
  { title: 'Trade & Sourcing', text: 'Quality products and reliable partners connected across markets.', cta: 'Get in touch', href: '#contact', icon: Truck,
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
  { title: 'Livestock Supply', text: 'Healthy goats raised with responsible care and sustainable practice.', cta: 'Visit farm', href: 'https://albarbarigoatfarming.com', icon: Leaf,
    img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80' },
  { title: 'Construction Works', text: 'Durable structures delivered on time with quality craftsmanship.', cta: 'Visit builder', href: 'https://shahzamanconstructions.com', icon: Building2,
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
  { title: 'Partnerships', text: 'Long-term relationships built on transparent decisions.', cta: 'Become a partner', href: '#contact', icon: Handshake,
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
]

const values = [
  { title: 'Integrity first', text: 'Transparent decisions and dependable partnerships.', icon: ShieldCheck },
  { title: 'Long-term thinking', text: 'Lasting value and responsible growth in every investment.', icon: LineChart },
  { title: 'Local understanding', text: 'Deep knowledge of Pakistan’s markets and communities.', icon: MapPin },
  { title: 'Positive impact', text: 'Opportunity for people, communities and our country.', icon: Leaf },
]

/* Replace with real testimonials. */
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

/* ───────── helpers ───────── */
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

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold md:text-base ${dark ? 'text-[#ffb347]' : 'text-[#9a4308]'}`}>
      <span className={`h-0.5 w-8 rounded-full ${dark ? 'bg-[#ffb347]' : 'bg-[#f59a23]'}`} aria-hidden />{children}
    </p>
  )
}

function H2({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <h2 className={`mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-[#0b4f3c]'}`}>{children}</h2>
}

/* Button colour system. Text colour is set explicitly (with !) in BOTH the normal and hover state,
   so global CSS or link defaults can never turn the label an unreadable colour.
   - orange      : on light sections  -> hovers to deep green, white text
   - orangeDark  : on dark sections   -> hovers to white, dark text
   - green       : on light sections  -> hovers to orange, dark text
   - white       : on dark sections   -> hovers to orange, dark text
   - outline     : on dark sections   -> hovers to white, dark text */
const BTN = {
  orange: 'bg-[#f59a23] !text-[#06271f] hover:bg-[#0b4f3c] hover:!text-white',
  orangeDark: 'bg-[#f59a23] !text-[#06271f] hover:bg-white hover:!text-[#06271f]',
  green: 'bg-[#0b4f3c] !text-white hover:bg-[#f59a23] hover:!text-[#06271f]',
  white: 'bg-white !text-[#0b4f3c] hover:bg-[#f59a23] hover:!text-[#06271f]',
  outline: 'border-2 border-white bg-transparent !text-white hover:bg-white hover:!text-[#06271f]',
} as const
type Tone = keyof typeof BTN
const BTN_BASE = 'group inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-[#f59a23]/60 focus-visible:ring-offset-2'

function PillButton({ href, children, external = false, tone = 'orange' }: { href: string; children: ReactNode; external?: boolean; tone?: Tone }) {
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${BTN_BASE} px-7 py-3.5 text-base ${BTN[tone]}`}>
      {children}
    </a>
  )
}

function LogoTile({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="mx-3 flex h-20 w-56 shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
      {failed ? (
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-base font-bold text-[#0b4f3c]">{name.slice(0, 2)}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={`${name} logo`} loading="lazy"
          onError={() => setFailed(true)} className="h-11 w-11 rounded-lg object-contain p-1" />
      )}
      <span className="text-base font-semibold text-slate-900">{name}</span>
    </div>
  )
}

/* ───────── page ───────── */
export default function Page() {
  const [active, setActive] = useState(1)
  const [open, setOpen] = useState<number | null>(0)
  const [sent, setSent] = useState(false)

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

  /* inquiry form → opens the visitor's email app */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      `Name: ${f.get('name')}`, `Email: ${f.get('email')}`, `Phone: ${f.get('phone')}`,
      `Business: ${f.get('business')}`, '', `${f.get('message')}`,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Inquiry: ${f.get('business')}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#0b4f3c] focus:ring-4 focus:ring-[#f59a23]/30'

  return (
    <main className={`${poppins.className} bg-white text-lg text-slate-700 antialiased`}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes fillbar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      `}</style>

      {/* HERO */}
      <section id="home" aria-labelledby="hero-title"
        className="relative overflow-hidden bg-[#06271f] bg-cover bg-center pb-60 pt-28 text-white md:pb-72 md:pt-40"
        style={HERO_POSTER ? { backgroundImage: `url(${HERO_POSTER})` } : undefined}>
        {HERO_VIDEOS.map((src, i) => !failedClips[i] && (
          <video key={src + i} ref={(el) => { videoRefs.current[i] = el }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${i === clip ? 'opacity-100' : 'opacity-0'}`}
            src={src} poster={HERO_POSTER || undefined} autoPlay={i === 0} muted loop playsInline preload={i === 0 ? 'auto' : 'metadata'}
            aria-hidden onError={() => setFailedClips((f) => ({ ...f, [i]: true }))} />
        ))}
        {/* readable text on any clip: dark on the left, lighter on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c15]/85 via-[#041c15]/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className={`${W} relative grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]`}>
          <div>
            <p className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur md:text-base">
              Trading · Livestock · Construction
            </p>
            <h1 id="hero-title" className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Building the future with purpose.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white md:text-xl">
              Shah Zaman Groups brings three trusted businesses together under one shared vision for Pakistan.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PillButton href="#businesses" tone="orangeDark">Explore our businesses <ArrowRight size={18} className="transition group-hover:translate-x-1" /></PillButton>
              <a href="#contact" className={`${BTN_BASE} ${BTN.outline} px-7 py-3.5 text-base`}>
                Contact us
              </a>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="flex h-72 w-72 items-center justify-center xl:h-96 xl:w-96">
              {LOGO_SRC ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={LOGO_SRC} alt="Shah Zaman Groups logo" className="max-h-full max-w-full object-contain drop-shadow-2xl" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-white/50 text-center text-white">
                  <ImageIcon size={40} />
                  <span className="text-base font-semibold">Your logo here</span>
                  <span className="text-sm text-white/80">Set LOGO_SRC at the top of the file</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {multi && (
          <div className={`${W} absolute inset-x-0 bottom-44 z-10 flex gap-2 md:bottom-52`} role="group" aria-label="Hero video">
            {HERO_VIDEOS.map((_, i) => (
              <button key={i} onClick={() => setClip(i)} aria-label={`Show video ${i + 1}`} aria-current={i === clip}
                className="relative h-2 w-12 overflow-hidden rounded-full bg-white/35 outline-none transition hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-white md:w-16">
                {i < clip && <span className="absolute inset-0 bg-white" />}
                {i === clip && (
                  <span key={clip} className="absolute inset-0 origin-left bg-[#f59a23] motion-reduce:scale-x-100"
                    style={{ animation: `fillbar ${HERO_SLIDE_MS}ms linear forwards` }} />
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* HERO CARDS (overlap the hero) */}
      <section className="relative z-20 -mt-32 md:-mt-40" aria-label="Quick links">
        <div className={`${W} grid gap-5 md:grid-cols-3`}>
          {heroCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="flex h-full items-stretch justify-between gap-4 overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-black/15 transition hover:-translate-y-1 md:p-6">
                <div className="flex flex-col justify-between">
                  <h2 className="text-lg font-bold leading-snug text-slate-900 md:text-xl">{c.title}</h2>
                  <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${BTN_BASE} ${BTN.orange} mt-5 w-fit px-5 py-2.5 text-sm`}>
                    {c.cta} <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </a>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" loading="lazy" className="h-36 w-36 shrink-0 rounded-2xl object-cover md:h-40 md:w-40" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="overflow-hidden bg-white py-20" aria-label="Institutions we work with">
        <h2 className="px-6 text-center text-xl font-bold text-slate-900 md:text-2xl">Institutions and partners we work with</h2>
        <div className="group/marquee relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_35s_linear_infinite] motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
            {[...logos, ...logos].map((l, i) => <LogoTile key={`${l.name}-${i}`} {...l} />)}
          </div>
        </div>
      </section>

      {/* OUR BUSINESSES */}
      <section id="businesses" className="px-3 pb-24 md:px-6">
        <div className="mx-auto max-w-[1520px] rounded-[2.5rem] bg-gradient-to-br from-[#06271f] via-[#0a3a2d] to-[#0b4f3c] px-6 py-12 text-white md:px-12 md:py-16 xl:px-16">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow dark>Our businesses</Eyebrow>
              <H2 dark>Explore what we do</H2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">Three businesses, each serving its own customers. Hover or tap a card to see more.</p>
            </div>
            <PillButton href="#contact" tone="orangeDark">Get in touch <ArrowRight size={18} /></PillButton>
          </Reveal>
          <div className="mt-12 flex h-[38rem] flex-col gap-4 md:h-[32rem] md:flex-row xl:h-[36rem]">
            {businesses.map((b, i) => {
              const on = i === active
              return (
                <a key={b.title} href={b.href} {...(b.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }}
                  onFocus={() => setActive(i)}
                  onClick={(e) => {
                    /* touch: first tap expands, second tap opens the link */
                    if (!on && window.matchMedia('(hover: none)').matches) e.preventDefault()
                    setActive(i)
                  }}
                  className={`group relative overflow-hidden rounded-3xl outline-none ring-[#f59a23] transition-all duration-500 ease-out focus-visible:ring-4 ${on ? 'flex-[4]' : 'flex-1'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.img} alt={b.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className={`absolute inset-0 transition duration-500 ${on ? 'bg-gradient-to-t from-black/90 via-black/45 to-black/5' : 'bg-gradient-to-t from-[#06271f]/95 via-[#06271f]/65 to-[#06271f]/35'}`} />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition ${on ? 'bg-[#f59a23] text-[#06271f]' : 'bg-white/25 text-white group-hover:bg-[#f59a23] group-hover:text-[#06271f]'}`}><b.icon size={26} /></span>
                        <h3 className="text-2xl font-bold !text-white md:text-3xl">{b.title}</h3>
                        <div className={`overflow-hidden transition-all duration-500 ${on ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="mt-3 max-w-lg text-base leading-relaxed !text-white md:text-lg">{b.text}</p>
                          <span className="mt-4 inline-flex items-center gap-1 text-base font-semibold !text-[#ffb347] underline underline-offset-4 group-hover:!text-white">{b.cta}</span>
                        </div>
                      </div>
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f59a23] text-[#06271f] transition duration-300 group-hover:rotate-45 group-hover:bg-white ${on ? 'opacity-100' : 'opacity-0'}`}><ArrowUpRight size={22} /></span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT + FOUNDER QUOTE */}
      <section id="about" className="bg-white pb-28">
        <div className={`${W} grid items-center gap-14 lg:grid-cols-2`}>
          <Reveal>
            <Eyebrow>About the group</Eyebrow>
            <H2>Rooted in trust, driven by progress.</H2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
              Shah Zaman Groups is the home of three separate businesses in trading, livestock and construction. Whatever the business, the same values guide how we work.
            </p>
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-[#0b4f3c]"><v.icon size={24} /></span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate-700">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid overflow-hidden rounded-[2rem] bg-[#5a1f0e] text-white shadow-2xl sm:grid-cols-2">
              <div className="flex min-h-72 items-center justify-center bg-[#0b4f3c]">
                {/* Replace with the founder's photo: <img src="/founder.jpg" alt="" className="h-full w-full object-cover" /> */}
                <span className="flex h-32 w-32 items-center justify-center rounded-full bg-[#f59a23] text-5xl font-bold text-[#06271f]">SZ</span>
              </div>
              <figure className="flex flex-col justify-between p-8 md:p-10">
                <Quote className="h-10 w-10 text-[#ffb347]" aria-hidden />
                <blockquote className="mt-4 text-lg leading-relaxed md:text-xl">
                  We build businesses that last, and relationships that matter, for our customers and for Pakistan.
                </blockquote>
                <figcaption className="mt-8 border-t border-white/25 pt-5">
                  <span className="block text-lg font-bold">Founder name</span>
                  <span className="text-base text-white/85">Founder, Shah Zaman Groups</span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative overflow-hidden bg-[#06271f] py-24 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#f59a23]/20 blur-3xl" />
        <div className={`${W} relative`}>
          <Reveal>
            <Eyebrow dark>At a glance</Eyebrow>
            <H2 dark>Connecting markets. Building communities.</H2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="border-l-4 border-[#f59a23] pl-6">
                <s.icon className="text-[#ffb347]" size={30} aria-hidden />
                <p className="mt-4 text-5xl font-bold md:text-6xl">{s.value}</p>
                <p className="mt-2 text-lg font-medium text-white/90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white py-28">
        <div className={W}>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Work with us</Eyebrow>
              <H2>Start working with us in 4 simple steps.</H2>
            </div>
            <PillButton href="#contact" tone="orange">Get started</PillButton>
          </Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b4f3c] text-lg font-bold text-white">{i + 1}</span>
                {i < steps.length - 1 && <span className="absolute left-16 right-4 top-6 hidden h-0.5 bg-slate-200 md:block" aria-hidden />}
                <s.icon className="mt-7 text-[#9a4308]" size={32} aria-hidden />
                <h3 className="mt-4 text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTORS */}
      <section id="sectors" className="bg-[#fff6ea] py-28">
        <div className={W}>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Businesses we cater to</Eyebrow>
              <H2>Serving Pakistan’s diverse sectors.</H2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">Whether you are a small shop or a large-scale enterprise, we deliver tailored solutions.</p>
            </div>
            <PillButton href="#contact" tone="green">Get in touch</PillButton>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 70}>
                <div className="h-full rounded-3xl border border-[#f0dcc0] bg-white p-7 transition hover:-translate-y-1 hover:border-[#f59a23] hover:shadow-xl">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1da] text-[#9a4308]"><s.icon size={28} aria-hidden /></span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white py-28">
        <div className={W}>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>What we provide</Eyebrow>
              <H2>Services built for scale and trust.</H2>
            </div>
            <PillButton href="#contact" tone="orange">Contact us</PillButton>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:border-[#f59a23] hover:shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" loading="lazy" className="h-52 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-6">
                    <s.icon className="text-[#0b4f3c]" size={26} aria-hidden />
                    <h3 className="mt-3 text-xl font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 flex-1 text-base leading-relaxed text-slate-700">{s.text}</p>
                    <a href={s.href} {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`${BTN_BASE} ${BTN.green} mt-6 w-fit px-5 py-2.5 text-sm`}>{s.cta}</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="contact" className="bg-[#fff6ea] py-28">
        <div className={`${W} grid items-start gap-14 lg:grid-cols-[1fr_1.3fr]`}>
          <Reveal>
            <Eyebrow>Get in touch</Eyebrow>
            <H2>Looking for something specific?</H2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-700">Tell us what you need. We will get back to you with the right business and a clear next step.</p>
            <ul className="mt-10 space-y-5 text-lg font-medium text-slate-900">
              <li className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#9a4308] shadow-sm"><Mail size={22} /></span><a href={`mailto:${CONTACT_EMAIL}`} className="!text-slate-900 underline-offset-4 hover:!text-[#9a4308] hover:underline">{CONTACT_EMAIL}</a></li>
              <li className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#9a4308] shadow-sm"><Phone size={22} /></span>{CONTACT_PHONE}</li>
              <li className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#9a4308] shadow-sm"><MapPin size={22} /></span>{CONTACT_ADDRESS}</li>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={onSubmit} className="rounded-[2rem] bg-white p-7 shadow-2xl md:p-10">
              <h3 className="text-2xl font-bold text-slate-900">Our team is always ready to assist you</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="text-base font-semibold text-slate-800">Full name
                  <input name="name" required placeholder="Your full name" className={field} /></label>
                <label className="text-base font-semibold text-slate-800">Email
                  <input name="email" type="email" required placeholder="Your work email" className={field} /></label>
                <label className="text-base font-semibold text-slate-800">Phone
                  <input name="phone" type="tel" placeholder="Phone number" className={field} /></label>
                <label className="text-base font-semibold text-slate-800">Business
                  <select name="business" defaultValue="General Trading" className={field}>
                    <option>General Trading</option><option>Live Stock</option><option>Construction</option><option>Partnership</option>
                  </select></label>
                <label className="text-base font-semibold text-slate-800 sm:col-span-2">Message
                  <textarea name="message" required rows={4} placeholder="What do you need?" className={field} /></label>
              </div>
              <button type="submit" className={`${BTN_BASE} ${BTN.orange} mt-8 w-full px-7 py-4 text-lg`}>
                Send inquiry <ArrowRight size={20} />
              </button>
              {sent && <p role="status" className="mt-4 text-center text-base font-semibold text-[#0b4f3c]">Your email app should open with the message ready to send.</p>}
            </form>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-white py-28" aria-roledescription="carousel" aria-label="Testimonials"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className={W}>
          <Reveal className="max-w-3xl">
            <Eyebrow>Testimonials</Eyebrow>
            <H2>What people say about us</H2>
            <p className="mt-4 text-lg text-slate-700">Partners and customers across our three businesses.</p>
          </Reveal>

          <Reveal className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.8fr]">
            <div className="order-2 flex gap-3 overflow-x-auto pb-2 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Choose a testimonial">
              {reviews.map((r, i) => {
                const on = i === slide
                return (
                  <button key={r.name} role="tab" aria-selected={on} onClick={() => setSlide(i)}
                    className={`group relative min-w-[18rem] overflow-hidden rounded-2xl border-2 p-5 text-left outline-none transition duration-300 focus-visible:ring-4 focus-visible:ring-[#f59a23]/60 lg:min-w-0 ${on ? 'border-[#0b4f3c] bg-white shadow-lg' : 'border-slate-200 bg-white hover:border-[#f59a23]'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold transition ${on ? 'bg-[#0b4f3c] text-white' : 'bg-emerald-100 text-[#0b4f3c] group-hover:bg-[#f59a23] group-hover:text-[#06271f]'}`}>{r.name[0]}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-lg font-bold text-slate-900">{r.name}</span>
                        <span className="block truncate text-base text-slate-700">{r.role}</span>
                      </span>
                    </div>
                    {on && (
                      <span className="absolute inset-x-0 bottom-0 h-1.5 bg-slate-100">
                        <span key={slide} className="block h-full origin-left bg-[#f59a23] motion-reduce:scale-x-100"
                          style={{ animation: `fillbar ${REVIEW_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="relative order-1 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#06271f] via-[#0a3a2d] to-[#0b4f3c] p-8 text-white shadow-2xl shadow-emerald-950/20 md:p-14 lg:order-2">
              <Quote className="absolute right-8 top-8 h-24 w-24 text-white/10" aria-hidden />
              <div className="relative grid">
                {reviews.map((r, i) => {
                  const on = i === slide
                  return (
                    <figure key={r.name} role="group" aria-roledescription="slide" aria-hidden={!on}
                      className={`col-start-1 row-start-1 flex flex-col justify-between transition duration-500 motion-reduce:transition-none ${on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
                      <div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex gap-1 text-[#ffb347]" aria-label="5 out of 5 stars">
                            {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={20} fill="currentColor" />)}
                          </div>
                          <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold">{r.business}</span>
                        </div>
                        <blockquote className="mt-8 max-w-3xl text-2xl font-medium leading-snug md:text-4xl">{r.quote}</blockquote>
                      </div>
                      <figcaption className="mt-10 flex items-center gap-4 border-t border-white/25 pt-6">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f59a23] text-lg font-bold text-[#06271f]">{r.name[0]}</span>
                        <span><span className="block text-lg font-bold">{r.name}</span><span className="block text-base text-white/85">{r.role}</span></span>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
              <div className="relative mt-8 flex items-center justify-between">
                <span className="text-base font-semibold text-white/85">{slide + 1} of {reviews.length}</span>
                <div className="flex gap-3">
                  <button onClick={prev} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-transparent !text-white outline-none transition hover:border-[#f59a23] hover:bg-[#f59a23] hover:!text-[#06271f] focus-visible:ring-4 focus-visible:ring-white/60"><ChevronLeft size={22} /></button>
                  <button onClick={next} aria-label="Next testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-transparent !text-white outline-none transition hover:border-[#f59a23] hover:bg-[#f59a23] hover:!text-[#06271f] focus-visible:ring-4 focus-visible:ring-white/60"><ChevronRight size={22} /></button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section className="bg-white pb-24">
        <Reveal>
          <div className={W}>
            <div className="flex flex-col items-center gap-8 rounded-[2rem] bg-[#0b4f3c] p-8 text-white shadow-xl md:flex-row md:p-12">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#f59a23] text-[#06271f]"><FileText size={44} /></div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold">Company profile</h3>
                <p className="mt-2 text-lg text-white/90">An overview of the group, its three businesses, and how to work with us.</p>
              </div>
              <a href="/company-profile.pdf" download className={`${BTN_BASE} ${BTN.white} px-7 py-3.5 text-base`}>
                <Download size={18} /> Download file
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow>FAQ</Eyebrow>
          <H2>Frequently asked questions</H2>
          <p className="mt-4 text-lg text-slate-700">Quick answers about the group and its businesses.</p>
          <div className="mt-10 space-y-4">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={`rounded-2xl border-2 transition ${isOpen ? 'border-[#0b4f3c] bg-emerald-50' : 'border-slate-200 hover:border-[#f59a23]'}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-6 text-left text-lg font-semibold !text-slate-900 outline-none transition hover:!text-[#0b4f3c] focus-visible:ring-4 focus-visible:ring-[#f59a23]/60 md:text-xl">
                    {f.q}
                    <ChevronDown size={22} className={`shrink-0 text-[#0b4f3c] transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
                    <p className="overflow-hidden px-6 text-base leading-relaxed text-slate-700 md:text-lg">{f.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}