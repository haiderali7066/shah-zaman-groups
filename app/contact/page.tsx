'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight, Building2, Clock, Leaf, Mail, MapPin, Phone, Send, Truck } from 'lucide-react'

/* Palette: green #0b4f3c | deep #06271f | orange #f59a23 (fills) | #ffb347 (text on dark) | #b45309 (text on light) | cream #fff6ea */

/* EDIT THESE with your real details */
const CONTACT = {
  email: 'info@shahzamangroups.com',
  phone: '+92 300 0000000',
  address: 'Your office address, City, Pakistan',
  hours: 'Mon to Sat, 9:00 am to 6:00 pm',
}

const HERO_IMG = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85'



const info = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
  { label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, icon: Phone },
  { label: 'Office', value: CONTACT.address, href: undefined, icon: MapPin },
  { label: 'Hours', value: CONTACT.hours, href: undefined, icon: Clock },
]

const businesses = [
  { title: 'General Trading', icon: Truck, note: 'Contact us using the form', href: undefined },
  { title: 'Live Stock', icon: Leaf, note: 'albarbarigoatfarming.com', href: 'https://albarbarigoatfarming.com' },
  { title: 'Construction', icon: Building2, note: 'shahzamanconstructions.com', href: 'https://shahzamanconstructions.com' },
]

const topics = ['General Trading', 'Live Stock', 'Construction', 'Partnership', 'Something else']

const field = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-[#f59a23] focus:border-[#0b4f3c] focus:ring-4 focus:ring-emerald-100'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: topics[0], message: '' })
  const [sent, setSent] = useState(false)

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  /* Opens the visitor's email app with the message filled in (no backend needed).
     To send from your server instead, replace this with a fetch('/api/contact', ...) call. */
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${form.topic} enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nTopic: ${form.topic}\n\n${form.message}`)
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main className="bg-white text-slate-800 antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#06271f] bg-cover bg-center pb-36 pt-36 text-white md:pb-44 md:pt-44" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c15]/95 via-[#041c15]/80 to-[#041c15]/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <a href="/" className="transition hover:text-[#ffb347]">Home</a> <span className="mx-2">/</span> <span className="text-white">Contact</span>
          </nav>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Let’s start a <span className="text-[#ffb347]">conversation.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Tell us which business you are interested in and our team will reply as soon as possible.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-[3rem] bg-white" />
      </section>

      {/* INFO + FORM */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-6 lg:grid-cols-[1fr_1.3fr] lg:px-10">
        <div>
          <h2 className="text-2xl font-bold text-[#0b4f3c] md:text-3xl">Get in touch</h2>
          <p className="mt-2 text-base text-slate-600">Reach the group office directly, or use the form.</p>
          <ul className="mt-8 space-y-4">
            {info.map((i) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f59a23] text-[#06271f] transition group-hover:bg-white"><i.icon size={20} /></span>
                  <span>
                    <span className="block text-sm font-semibold text-[#b45309] transition group-hover:text-[#ffb347]">{i.label}</span>
                    <span className="block text-base font-medium text-slate-900 transition group-hover:text-white">{i.value}</span>
                  </span>
                </>
              )
              const cls = 'group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition duration-300 hover:border-[#0b4f3c] hover:bg-[#0b4f3c]'
              return <li key={i.label}>{i.href ? <a href={i.href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}</li>
            })}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-emerald-900/5 md:p-10">
          <h2 className="text-2xl font-bold text-[#0b4f3c] md:text-3xl">Send a message</h2>
          <form onSubmit={submit} className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-800">Full name
              <input required name="name" value={form.name} onChange={update} placeholder="Your name" className={`${field} mt-1.5 font-normal`} />
            </label>
            <label className="block text-sm font-semibold text-slate-800">Email
              <input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" className={`${field} mt-1.5 font-normal`} />
            </label>
            <label className="block text-sm font-semibold text-slate-800">Phone
              <input name="phone" value={form.phone} onChange={update} placeholder="+92 300 0000000" className={`${field} mt-1.5 font-normal`} />
            </label>
            <label className="block text-sm font-semibold text-slate-800">I’m interested in
              <select name="topic" value={form.topic} onChange={update} className={`${field} mt-1.5 font-normal`}>
                {topics.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold text-slate-800 sm:col-span-2">Message
              <textarea required name="message" rows={5} value={form.message} onChange={update} placeholder="How can we help?" className={`${field} mt-1.5 resize-y font-normal`} />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-[#0b4f3c] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#f59a23] hover:text-[#06271f] focus-visible:ring-4 focus-visible:ring-[#f59a23]/50">
                Send message <Send size={16} className="transition group-hover:translate-x-1" />
              </button>
              {sent && <p role="status" className="mt-4 text-sm font-semibold text-emerald-800">Your email app should open with the message ready to send.</p>}
            </div>
          </form>
        </div>
      </section>

      {/* BUSINESSES (cream) */}
      <section className="bg-[#fff6ea] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-[#0b4f3c]">Looking for a specific business?</h2>
          <p className="mt-2 text-center text-base text-slate-700">Each one has its own team and website.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {businesses.map((b) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59a23] text-[#06271f] transition group-hover:bg-white"><b.icon size={22} /></span>
                  <h3 className="mt-4 text-xl font-bold text-[#0b4f3c] transition group-hover:text-white">{b.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[#b45309] transition group-hover:text-[#ffb347]">
                    {b.note} {b.href && <ArrowUpRight size={15} />}
                  </p>
                </>
              )
              const cls = 'group block rounded-3xl border border-orange-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0b4f3c] hover:bg-[#0b4f3c] hover:shadow-xl'
              return b.href
                ? <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                : <div key={b.title} className={cls}>{inner}</div>
            })}
          </div>
        </div>
      </section>
    </main>
  )
}