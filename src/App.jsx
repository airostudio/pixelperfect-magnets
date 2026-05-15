import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Download,
  Heart,
  Image as ImageIcon,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Package,
  PartyPopper,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Upload,
  User,
  X,
} from "lucide-react";

const brand = {
  name: "MomentNest",
  tagline: "Every guest. Every angle. One private gallery.",
  email: "hello@momentnest.example",
};

const packages = [
  {
    id: "starter",
    name: "Starter Gallery",
    price: 59,
    badge: "Best for small parties",
    uploads: "300 uploads",
    description: "A private QR gallery for birthdays, showers, graduations and intimate celebrations.",
    features: ["Private QR code", "Photo uploads", "Guestbook messages", "30-day hosting", "One-click ZIP export"],
  },
  {
    id: "signature",
    name: "Signature Event",
    price: 129,
    badge: "Most popular",
    uploads: "2,000 uploads",
    description: "A polished event gallery with video, RSVP capture, moderation and beautiful themes.",
    features: ["Photos + videos", "RSVP collection", "Live slideshow", "Moderation queue", "12-month hosting"],
  },
  {
    id: "studio",
    name: "Studio Pro",
    price: 299,
    badge: "For brands & planners",
    uploads: "Unlimited uploads",
    description: "A white-label experience for conferences, venues, agencies and recurring events.",
    features: ["Custom branding", "Lead capture CSV", "Multiple albums", "Marketing consent", "Priority support"],
  },
];

const products = [
  { id: "sign", name: "Acrylic QR Welcome Sign", price: 48, category: "Print", rating: 4.9, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", description: "Tabletop or welcome-table sign with your private gallery QR code." },
  { id: "cards", name: "Take-Home QR Cards", price: 34, category: "Print", rating: 4.8, image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80", description: "A 50-pack of keepsake cards guests can scan after the event." },
  { id: "moderation", name: "Moderation Add-On", price: 79, category: "Service", rating: 5.0, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80", description: "Our team helps review uploads before they appear in your slideshow." },
  { id: "slideshow", name: "Live Slideshow Kit", price: 89, category: "Digital", rating: 4.7, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80", description: "Project a real-time gallery wall during your event with branded overlays." },
  { id: "concierge", name: "Setup Concierge", price: 149, category: "Service", rating: 5.0, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80", description: "We configure your theme, RSVP form, albums, QR assets and guest instructions." },
  { id: "archive", name: "Lifetime Archive", price: 69, category: "Digital", rating: 4.9, image: "https://images.unsplash.com/photo-1495435229349-e86db7bfa013?auto=format&fit=crop&w=900&q=80", description: "Keep your private gallery hosted permanently with full-resolution downloads." },
];

const themes = ["Blush Wedding", "Black Tie", "Garden Party", "Modern Corporate", "Kids Confetti", "Memorial Linen"];

const gallerySeed = [
  { id: 1, guest: "Mia", type: "photo", caption: "The dancefloor finally opened!", approved: true, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80" },
  { id: 2, guest: "James", type: "message", caption: "Wishing you a lifetime of tiny ordinary moments that feel this magical.", approved: true, url: "" },
  { id: 3, guest: "Ava", type: "photo", caption: "Golden hour with the whole crew.", approved: true, url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80" },
  { id: 4, guest: "Noah", type: "photo", caption: "Caught the confetti cannon perfectly.", approved: false, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80" },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value);
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

function Header({ cartCount, setCartOpen }) {
  const [open, setOpen] = useState(false);
  const links = ["How it works", "Packages", "Store", "Booking", "Demo gallery"];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-100 text-rose-700 shadow-sm">
            <QrCode size={22} />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-stone-950">{brand.name}</div>
            <div className="hidden text-xs font-medium text-stone-500 sm:block">Private event galleries</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="text-sm font-semibold text-stone-600 transition hover:text-rose-700">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setCartOpen(true)} className="relative rounded-2xl border border-stone-200 bg-white p-3 text-stone-700 shadow-sm transition hover:border-rose-200 hover:text-rose-700">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">{cartCount}</span>}
          </button>
          <a href="#booking" className="hidden rounded-2xl bg-stone-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-stone-950/10 transition hover:bg-rose-700 sm:inline-flex">
            Book a demo
          </a>
          <button onClick={() => setOpen(!open)} className="rounded-2xl border border-stone-200 p-3 lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-stone-200 bg-white lg:hidden">
            <div className="grid gap-1 px-4 py-4">
              {links.map((link) => (
                <a onClick={() => setOpen(false)} key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="rounded-xl px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-rose-50">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="absolute left-1/2 top-16 h-64 w-64 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="absolute bottom-12 right-12 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-bold text-rose-800 shadow-sm">
            <Sparkles size={16} /> App-free guest uploads in seconds
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            Capture the memories your photographer misses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-650">
            {brand.name} gives every event a private QR code, real-time gallery, digital guestbook, RSVP page and beautiful keepsake store—no app downloads, no guest accounts, no chasing photos later.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#packages" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-rose-600/20 transition hover:-translate-y-0.5 hover:bg-rose-700">
              Start your gallery <ChevronRight size={19} />
            </a>
            <a href="#demo-gallery" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-6 py-4 text-base font-black text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200">
              View live demo <ImageIcon size={19} />
            </a>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
            {["2 min setup", "Private link", "Full-res export"].map((item) => (
              <div key={item} className="rounded-2xl border border-white bg-white/65 p-4 shadow-sm backdrop-blur">
                <Check className="mx-auto mb-2 text-rose-600" size={18} />
                <div className="text-sm font-extrabold text-stone-800">{item}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative z-10">
          <div className="rounded-[2rem] border border-white bg-white/75 p-4 shadow-2xl shadow-rose-900/10 backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.5rem] bg-stone-950 text-white">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <div className="text-sm font-bold text-white/60">Gallery preview</div>
                  <div className="text-lg font-black">Emma & Kai</div>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-stone-950">
                  <QrCode size={30} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                {["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80"].map((src, index) => (
                  <motion.img whileHover={{ scale: 1.03 }} key={src} src={src} alt="Event memory preview" className={`h-40 w-full rounded-2xl object-cover ${index === 0 ? "col-span-2 h-52" : ""}`} />
                ))}
              </div>
              <div className="mx-4 mb-4 rounded-2xl bg-white/10 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white/70"><MessageCircle size={16} /> Guestbook</div>
                <p className="text-sm leading-6 text-white/90">“The most joyful night. We uploaded 47 photos before dessert.”</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: CalendarDays, title: "Create your event", text: "Pick a theme, date, upload limit, RSVP fields and whether uploads need approval." },
    { icon: QrCode, title: "Share your QR code", text: "Add the QR to signs, invitations, table cards, emails or your venue screens." },
    { icon: Upload, title: "Guests upload instantly", text: "Guests scan, upload photos or videos, and leave messages without making an account." },
    { icon: Download, title: "Relive & export", text: "Moderate, download the ZIP, run a slideshow and keep the gallery hosted." },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">How it works</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Your event memories, organized from the first scan.</h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">Built for weddings, parties, conferences, memorials, launches and venue teams that want the photos guests actually take.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} key={step.title} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6 shadow-sm">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white text-rose-600 shadow-sm"><Icon size={24} /></div>
                <div className="mb-2 text-sm font-black text-stone-400">0{index + 1}</div>
                <h3 className="text-xl font-black text-stone-950">{step.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Packages({ addToCart }) {
  return (
    <section id="packages" className="bg-stone-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-300">Packages</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Choose a gallery package, then add keepsakes in the store.</h2>
          </div>
          <a href="#booking" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-stone-950 transition hover:bg-rose-100">Need help choosing? Book a consult <ChevronRight size={18} /></a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`rounded-[2rem] border p-7 ${pkg.id === "signature" ? "border-rose-300 bg-white text-stone-950 shadow-2xl shadow-rose-500/20" : "border-white/10 bg-white/5"}`}>
              <div className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-black ${pkg.id === "signature" ? "bg-rose-100 text-rose-700" : "bg-white/10 text-white"}`}>{pkg.badge}</div>
              <h3 className="text-2xl font-black">{pkg.name}</h3>
              <p className={`mt-3 leading-7 ${pkg.id === "signature" ? "text-stone-600" : "text-white/65"}`}>{pkg.description}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-black">{formatCurrency(pkg.price)}</span>
                <span className={`pb-2 text-sm font-bold ${pkg.id === "signature" ? "text-stone-500" : "text-white/50"}`}>one-off</span>
              </div>
              <div className={`mt-4 text-sm font-black ${pkg.id === "signature" ? "text-rose-700" : "text-rose-200"}`}>{pkg.uploads}</div>
              <div className="mt-7 grid gap-3">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-semibold"><Check size={18} className="text-rose-500" /> {feature}</div>
                ))}
              </div>
              <button onClick={() => addToCart(pkg)} className={`mt-8 w-full rounded-2xl px-5 py-4 font-black transition ${pkg.id === "signature" ? "bg-stone-950 text-white hover:bg-rose-700" : "bg-white text-stone-950 hover:bg-rose-100"}`}>Add package</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Store({ addToCart }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter((p) => (category === "All" || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="store" className="bg-amber-50/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Store</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">QR signs, digital add-ons and done-for-you setup.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">The store cart is fully interactive: add items, change quantities, remove products and complete a demo checkout.</p>
          </div>
          <div className="rounded-[1.25rem] border border-stone-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2">
              <Search size={18} className="text-stone-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search store" className="w-52 bg-transparent text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === cat ? "bg-rose-600 text-white" : "bg-white text-stone-700 hover:bg-rose-50"}`}>{cat}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <motion.div layout key={product.id} className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
              <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-black text-stone-600">{product.category}</span>
                  <span className="flex items-center gap-1 text-sm font-bold text-stone-600"><Star size={15} className="fill-current text-amber-500" /> {product.rating}</span>
                </div>
                <h3 className="text-xl font-black text-stone-950">{product.name}</h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-stone-600">{product.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-950">{formatCurrency(product.price)}</span>
                  <button onClick={() => addToCart(product)} className="rounded-2xl bg-stone-950 px-4 py-3 text-sm font-black text-white transition hover:bg-rose-700">Add to cart</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSystem() {
  const [bookings, setBookings] = useLocalStorage("momentnest-bookings", []);
  const [form, setForm] = useState({ name: "", email: "", eventType: "Wedding", date: "", time: "10:00", theme: themes[0], guests: "100", notes: "" });
  const [confirmed, setConfirmed] = useState(null);

  const availableTimes = ["09:00", "10:00", "11:30", "13:00", "15:00", "16:30"];
  const isTaken = (date, time) => bookings.some((b) => b.date === date && b.time === time);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || isTaken(form.date, form.time)) return;
    const booking = { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setBookings([booking, ...bookings]);
    setConfirmed(booking);
    setForm({ name: "", email: "", eventType: "Wedding", date: "", time: "10:00", theme: themes[0], guests: "100", notes: "" });
  }

  return (
    <section id="booking" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Booking system</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Book a setup call or event tech consult.</h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">This scheduler prevents duplicate slots on the same date and stores booking requests locally in the browser for demo purposes.</p>
          <div className="mt-8 grid gap-4">
            {[
              [ShieldCheck, "Private gallery planning"],
              [Camera, "QR signs and upload flow"],
              [Lock, "Moderation, privacy and downloads"],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 font-bold text-stone-800"><Icon className="text-rose-600" size={22} /> {text}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-4 shadow-sm sm:p-6">
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-stone-700">Name<input className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-rose-300" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">Email<input type="email" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-rose-300" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-bold text-stone-700">Event type<select className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>{["Wedding", "Party", "Corporate", "Memorial", "Venue", "Other"].map((x) => <option key={x}>{x}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">Date<input type="date" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">Guests<input type="number" min="1" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} /></label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-stone-700">Preferred time<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{availableTimes.map((time) => { const taken = form.date && isTaken(form.date, time); return <button type="button" disabled={taken} onClick={() => setForm({ ...form, time })} key={time} className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${form.time === time ? "border-rose-600 bg-rose-600 text-white" : taken ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 line-through" : "border-stone-200 bg-white text-stone-700 hover:border-rose-200"}`}>{time}</button>; })}</div></label>
            <label className="grid gap-2 text-sm font-bold text-stone-700">Gallery theme<select className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}>{themes.map((x) => <option key={x}>{x}</option>)}</select></label>
            <label className="grid gap-2 text-sm font-bold text-stone-700">Notes<textarea rows={4} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-rose-300" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Tell us about the event, venue, goals or special requirements." /></label>
            {form.date && isTaken(form.date, form.time) && <div className="rounded-2xl bg-amber-100 p-4 text-sm font-bold text-amber-900">That slot is already booked. Choose another time.</div>}
            <button className="rounded-2xl bg-rose-600 px-6 py-4 font-black text-white shadow-xl shadow-rose-600/20 transition hover:bg-rose-700">Confirm booking request</button>
          </form>

          <AnimatePresence>
            {confirmed && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
                <div className="flex items-start gap-3"><Check className="mt-1" /> <div><div className="font-black">Booking request confirmed</div><p className="mt-1 text-sm leading-6">{confirmed.name}, your {confirmed.eventType.toLowerCase()} consult is saved for {confirmed.date} at {confirmed.time}. A production version would email you and add this to a calendar.</p></div></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DemoGallery() {
  const [items, setItems] = useLocalStorage("momentnest-gallery", gallerySeed);
  const [upload, setUpload] = useState({ guest: "", caption: "", type: "photo" });
  const approved = items.filter((item) => item.approved);
  const pending = items.filter((item) => !item.approved);

  function addUpload(e) {
    e.preventDefault();
    if (!upload.guest || !upload.caption) return;
    const fallback = [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    ];
    setItems([{ id: Date.now(), guest: upload.guest, caption: upload.caption, type: upload.type, approved: false, url: upload.type === "photo" ? fallback[Math.floor(Math.random() * fallback.length)] : "" }, ...items]);
    setUpload({ guest: "", caption: "", type: "photo" });
  }

  function approve(id) { setItems(items.map((item) => item.id === id ? { ...item, approved: true } : item)); }
  function remove(id) { setItems(items.filter((item) => item.id !== id)); }

  return (
    <section id="demo-gallery" className="bg-stone-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-300">Demo gallery</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Try the guest upload and moderation flow.</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">Guests submit memories into a pending queue. Hosts approve or delete before the public gallery and slideshow update.</p>
            <form onSubmit={addUpload} className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="grid gap-3">
                <input value={upload.guest} onChange={(e) => setUpload({ ...upload, guest: e.target.value })} placeholder="Guest name" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40" />
                <textarea value={upload.caption} onChange={(e) => setUpload({ ...upload, caption: e.target.value })} placeholder="Photo caption or guestbook message" rows={4} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40" />
                <div className="grid grid-cols-2 gap-2">
                  {["photo", "message"].map((type) => <button type="button" key={type} onClick={() => setUpload({ ...upload, type })} className={`rounded-2xl px-4 py-3 text-sm font-black capitalize ${upload.type === type ? "bg-rose-600 text-white" : "bg-white/10 text-white/70"}`}>{type}</button>)}
                </div>
                <button className="rounded-2xl bg-white px-5 py-4 font-black text-stone-950 hover:bg-rose-100">Submit to queue</button>
              </div>
            </form>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Approved gallery</h3><span className="rounded-full bg-white/10 px-3 py-1 text-sm font-black">{approved.length} live</span></div>
              <div className="grid gap-4 sm:grid-cols-2">
                {approved.map((item) => <GalleryCard key={item.id} item={item} onRemove={remove} />)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Moderation queue</h3><span className="rounded-full bg-amber-400/20 px-3 py-1 text-sm font-black text-amber-200">{pending.length} pending</span></div>
              <div className="grid gap-3">
                {pending.length === 0 && <p className="text-sm text-white/50">No pending uploads.</p>}
                {pending.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3">
                    <div><div className="font-black">{item.guest}</div><div className="line-clamp-1 text-sm text-white/60">{item.caption}</div></div>
                    <div className="flex gap-2"><button onClick={() => approve(item.id)} className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-black">Approve</button><button onClick={() => remove(item.id)} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-black">Delete</button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, onRemove }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white/10">
      {item.type === "photo" && item.url ? <img src={item.url} alt={item.caption} className="h-44 w-full object-cover" /> : <div className="grid h-44 place-items-center bg-rose-500/20 p-6 text-center text-lg font-black"><MessageCircle /> Guestbook message</div>}
      <div className="p-4">
        <div className="mb-1 text-sm font-black text-rose-200">{item.guest}</div>
        <p className="text-sm leading-6 text-white/80">{item.caption}</p>
        <button onClick={() => onRemove(item.id)} className="mt-3 text-xs font-black text-white/50 hover:text-white">Remove</button>
      </div>
    </div>
  );
}

function CartDrawer({ open, setOpen, cart, setCart }) {
  const [checkout, setCheckout] = useState({ name: "", email: "", eventDate: "" });
  const [paid, setPaid] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  function updateQty(id, delta) {
    setCart(cart.flatMap((item) => item.id === id ? [{ ...item, qty: Math.max(0, item.qty + delta) }] : [item]).filter((item) => item.qty > 0));
  }

  function complete(e) {
    e.preventDefault();
    if (!cart.length || !checkout.name || !checkout.email) return;
    setPaid(true);
    setCart([]);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 220 }} className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 p-5"><div><h2 className="text-xl font-black text-stone-950">Your cart</h2><p className="text-sm text-stone-500">Packages and add-ons</p></div><button onClick={() => setOpen(false)} className="rounded-2xl border border-stone-200 p-2"><X size={20} /></button></div>
            <div className="flex-1 overflow-auto p-5">
              {paid ? <div className="rounded-2xl bg-emerald-50 p-5 text-emerald-950"><Check className="mb-3" /><div className="font-black">Demo order complete</div><p className="mt-1 text-sm leading-6">In production, this would connect to Stripe, create the gallery, generate QR assets and email the customer.</p></div> : null}
              {!cart.length && !paid ? <div className="grid h-64 place-items-center rounded-2xl border border-dashed border-stone-300 text-center"><div><ShoppingBag className="mx-auto mb-3 text-stone-400" /><p className="font-bold text-stone-600">Your cart is empty.</p></div></div> : null}
              <div className="grid gap-3">
                {cart.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-stone-200 p-4">
                    <div className="flex justify-between gap-3"><div><div className="font-black text-stone-950">{item.name}</div><div className="mt-1 text-sm text-stone-500">{formatCurrency(item.price)} each</div></div><div className="font-black">{formatCurrency(item.price * item.qty)}</div></div>
                    <div className="mt-4 flex items-center gap-2"><button onClick={() => updateQty(item.id, -1)} className="rounded-xl border border-stone-200 p-2"><Minus size={16} /></button><span className="w-8 text-center font-black">{item.qty}</span><button onClick={() => updateQty(item.id, 1)} className="rounded-xl border border-stone-200 p-2"><Plus size={16} /></button></div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={complete} className="border-t border-stone-200 p-5">
              <div className="mb-4 grid gap-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between"><span>GST estimate</span><span className="font-bold">{formatCurrency(tax)}</span></div>
                <div className="flex justify-between text-lg font-black"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>
              <div className="grid gap-2">
                <input value={checkout.name} onChange={(e) => setCheckout({ ...checkout, name: e.target.value })} placeholder="Billing name" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none" />
                <input type="email" value={checkout.email} onChange={(e) => setCheckout({ ...checkout, email: e.target.value })} placeholder="Email" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none" />
                <input type="date" value={checkout.eventDate} onChange={(e) => setCheckout({ ...checkout, eventDate: e.target.value })} className="rounded-2xl border border-stone-200 px-4 py-3 outline-none" />
                <button disabled={!cart.length} className="rounded-2xl bg-stone-950 px-5 py-4 font-black text-white disabled:cursor-not-allowed disabled:bg-stone-300">Complete demo checkout</button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function FeatureBand() {
  const features = [
    [QrCode, "Private QR code"], [Lock, "No guest accounts"], [MessageCircle, "Digital guestbook"], [CalendarDays, "RSVP forms"], [ShieldCheck, "Host moderation"], [Download, "ZIP export"], [PartyPopper, "Live slideshow"], [Package, "Keepsake store"],
  ];
  return <section className="bg-white py-12"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4 lg:px-8">{features.map(([Icon, label]) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 font-black text-stone-800"><Icon size={20} className="text-rose-600" />{label}</div>)}</div></section>;
}

function Footer() {
  return (
    <footer className="bg-stone-100 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-100 text-rose-700"><QrCode size={22} /></div><div className="text-xl font-black text-stone-950">{brand.name}</div></div><p className="mt-4 max-w-sm leading-7 text-stone-600">An original event memory platform concept with store, booking, cart, uploads and moderation.</p></div>
        <div><h4 className="font-black text-stone-950">Contact</h4><div className="mt-4 grid gap-2 text-sm text-stone-600"><span className="flex items-center gap-2"><Mail size={16} /> {brand.email}</span><span className="flex items-center gap-2"><Clock size={16} /> Mon–Fri, 9am–5pm</span></div></div>
        <div><h4 className="font-black text-stone-950">Launch checklist</h4><ul className="mt-4 grid gap-2 text-sm text-stone-600"><li>Connect Stripe for real payments</li><li>Connect Cal.com or Google Calendar</li><li>Add storage for real media uploads</li><li>Deploy to Vercel, Netlify or Shopify Hydrogen</li></ul></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [cart, setCart] = useLocalStorage("momentnest-cart", []);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900">
      <Header cartCount={cartCount} setCartOpen={setCartOpen} />
      <Hero />
      <FeatureBand />
      <HowItWorks />
      <Packages addToCart={addToCart} />
      <Store addToCart={addToCart} />
      <BookingSystem />
      <DemoGallery />
      <Footer />
      <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} setCart={setCart} />
    </div>
  );
}
