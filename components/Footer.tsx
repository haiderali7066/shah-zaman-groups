import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

/* EDIT with your real details (keep in sync with the contact page) */
const CONTACT = {
  email: 'info@shahzamangroups.com',
  phone: '+92 300 0000000',
  address: 'Your office address, City, Pakistan',
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our businesses', href: '/#businesses' },
  { label: 'Contact', href: '/contact' },
]

const businesses = [
  { label: 'General Trading', href: '/contact', external: false },
  { label: 'Live Stock (Albar Bari Goat Farming)', href: 'https://albarbarigoatfarming.com', external: true },
  { label: 'Construction (Shah Zaman Construction)', href: 'https://shahzamanconstructions.com', external: true },
]

const linkCls = 'inline-flex items-center gap-1 text-sm text-white/85 transition hover:text-[#ffb347]'

export default function Footer() {
  return (
    <footer className="bg-[#06271f] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="Shah Zaman Groups home">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f59a23] text-xl font-black text-[#06271f]">SZ</span>
            <span className="text-lg font-bold leading-tight">Shah Zaman<span className="block text-xs font-semibold text-[#ffb347]">Groups</span></span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            The parent group behind three separate businesses in trading, livestock and construction.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#ffb347]">Quick links</h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((l) => <li key={l.label}><Link href={l.href} className={linkCls}>{l.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#ffb347]">Our businesses</h3>
          <ul className="mt-4 space-y-3">
            {businesses.map((b) => (
              <li key={b.label}>
                {b.external
                  ? <a href={b.href} target="_blank" rel="noopener noreferrer" className={linkCls}>{b.label} <ArrowUpRight size={14} /></a>
                  : <Link href={b.href} className={linkCls}>{b.label}</Link>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#ffb347]">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2.5 transition hover:text-[#ffb347]"><Mail size={16} className="mt-0.5 shrink-0 text-[#f59a23]" />{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-start gap-2.5 transition hover:text-[#ffb347]"><Phone size={16} className="mt-0.5 shrink-0 text-[#f59a23]" />{CONTACT.phone}</a></li>
            <li className="flex items-start gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-[#f59a23]" />{CONTACT.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-white/80 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Shah Zaman Groups. All rights reserved.</p>
          <p>
            Developed by{' '}
            <a href="https://devntomsolutions.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#ffb347] underline-offset-4 transition hover:text-white hover:underline">
              Devntom Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}