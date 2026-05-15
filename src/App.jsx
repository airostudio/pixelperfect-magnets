import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Gift,
  Heart,
  Image as ImageIcon,
  Leaf,
  Mail,
  Magnet,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Palette,
  Plus,
  Ruler,
  Search,
  Sparkles,
  Square,
  Star,
  Truck,
  Upload,
  X,
} from "lucide-react";

const brand = {
  name: "PixelPerfect Magnets",
  tagline: "Personalised fridge magnets for every guest.",
  email: "hello@pixelperfectmagnets.example",
};

const heartMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29.6'%3E%3Cpath d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z' fill='%23000'/%3E%3C/svg%3E\")";

const magnetShapes = [
  { id: "rectangle", label: "Rectangle", aspect: "4 / 3", radius: "0.5rem" },
  { id: "square", label: "Square", aspect: "1 / 1", radius: "0.5rem" },
  { id: "circle", label: "Circle", aspect: "1 / 1", radius: "9999px" },
  { id: "heart", label: "Heart", aspect: "1 / 1", mask: heartMask },
];

const magnetSizes = [
  { id: "mini", label: "Mini", dimension: "5 cm", price: 4 },
  { id: "standard", label: "Standard", dimension: "7 cm", price: 6 },
  { id: "large", label: "Large", dimension: "10 cm", price: 9 },
];

const magnetFinishes = ["Glossy White", "Matte Black", "Vintage Linen", "Kraft Paper", "Bold Colour Pop", "Minimal Frame"];

const presetPhotos = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80",
];

const bundles = [
  {
    id: "starter",
    name: "Starter Set",
    price: 39,
    badge: "Best for small parties",
    quantity: "20 magnets",
    description: "A keepsake magnet for every guest at birthdays, showers, graduations and intimate celebrations.",
    features: ["20 personalised magnets", "Standard 7 cm size", "Glossy or matte finish", "1 photo design", "Ships in 5 business days"],
  },
  {
    id: "signature",
    name: "Signature Set",
    price: 89,
    badge: "Most popular",
    quantity: "60 magnets",
    description: "A polished mix of shapes and sizes with multiple photo designs for weddings and big events.",
    features: ["60 personalised magnets", "Mixed shapes & sizes", "Up to 6 photo designs", "Premium gift packaging", "Priority 3-day printing"],
  },
  {
    id: "studio",
    name: "Studio Pro",
    price: 199,
    badge: "For brands & planners",
    quantity: "150 magnets",
    description: "A white-label magnet run for conferences, venues, agencies and recurring events.",
    features: ["150 personalised magnets", "Custom die-cut shapes", "Branded packaging inserts", "Bulk reorder pricing", "Dedicated account manager"],
  },
];

const products = [
  { id: "stand", name: "Acrylic Magnet Display Stand", price: 28, category: "Display", rating: 4.9, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", description: "A tabletop stand to showcase magnet designs on your welcome table." },
  { id: "giftbox", name: "Gift Box Packaging — 25 pack", price: 34, category: "Packaging", rating: 4.8, image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80", description: "Individual keepsake gift boxes so guests can take their magnet home in style." },
  { id: "rush", name: "Same-Day Rush Printing", price: 79, category: "Service", rating: 5.0, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80", description: "Skip the queue — your magnet order is printed and shipped the same day." },
  { id: "diecut", name: "Custom Die-Cut Shape Add-On", price: 49, category: "Service", rating: 4.7, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80", description: "Cut your magnets to any custom outline — logos, monograms or props." },
  { id: "retouch", name: "Photo Retouching Service", price: 39, category: "Service", rating: 5.0, image: "https://images.unsplash.com/photo-1495435229349-e86db7bfa013?auto=format&fit=crop&w=900&q=80", description: "Our designers colour-correct and retouch every photo before printing." },
  { id: "savethedate", name: "Magnetic Save-the-Date Cards", price: 59, category: "Print", rating: 4.9, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80", description: "A 50-pack of magnetic save-the-date cards personalised with your photo and details." },
];

const gallerySeed = [
  { id: 1, guest: "Mia & Theo's Wedding", type: "photo", caption: "Heart magnets for all 80 guests — they were gone before dessert!", approved: true, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80" },
  { id: 2, guest: "The Patel Family", type: "message", caption: "We turned our reunion photos into fridge magnets and everyone teared up. Thank you!", approved: true, url: "" },
  { id: 3, guest: "Ava's 21st", type: "photo", caption: "Circle magnets with the photobooth shots — such a hit.", approved: true, url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80" },
  { id: 4, guest: "Northwind Conference", type: "photo", caption: "Branded square magnets as our delegate giveaway.", approved: false, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80" },
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

function shapeStyle(shape) {
  if (shape.mask) {
    return {
      aspectRatio: shape.aspect,
      WebkitMaskImage: shape.mask,
      maskImage: shape.mask,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    };
  }
  return { aspectRatio: shape.aspect, borderRadius: shape.radius };
}

function Header({ cartCount, setCartOpen }) {
  const [open, setOpen] = useState(false);
  const links = ["How it works", "Bundles", "Customiser", "Store", "Booking", "Gallery"];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-100 text-rose-700 shadow-sm">
            <Magnet size={22} />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-stone-950">{brand.name}</div>
            <div className="hidden text-xs font-medium text-stone-500 sm:block">Personalised fridge magnets</div>
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
            <Package size={19} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">{cartCount}</span>}
          </button>
          <a href="#customiser" className="hidden rounded-2xl bg-stone-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-stone-950/10 transition hover:bg-rose-700 sm:inline-flex">
            Design a magnet
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
            <Sparkles size={16} /> A keepsake magnet for every single guest
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            Turn your favourite photos into fridge magnets guests adore.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-650">
            {brand.name} designs, prints and hand-finishes personalised photo magnets for weddings, parties and corporate events—upload a photo, pick a shape and finish, and we ship a magnet for every guest to take home.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#customiser" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-rose-600/20 transition hover:-translate-y-0.5 hover:bg-rose-700">
              Design your magnet <ChevronRight size={19} />
            </a>
            <a href="#gallery" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-6 py-4 text-base font-black text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200">
              See guest designs <ImageIcon size={19} />
            </a>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
            {["Photo-quality print", "Strong magnet backing", "Fast turnaround"].map((item) => (
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
                  <div className="text-sm font-bold text-white/60">Magnet preview</div>
                  <div className="text-lg font-black">Emma & Kai</div>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-stone-950">
                  <Magnet size={30} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                {presetPhotos.map((src, index) => (
                  <motion.img
                    whileHover={{ scale: 1.05, rotate: index % 2 ? 2 : -2 }}
                    key={src}
                    src={src}
                    alt="Personalised magnet preview"
                    className="h-40 w-full object-cover shadow-lg"
                    style={{ borderRadius: index === 2 ? "9999px" : "0.75rem" }}
                  />
                ))}
              </div>
              <div className="mx-4 mb-4 rounded-2xl bg-white/10 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white/70"><Heart size={16} /> Guest favourites</div>
                <p className="text-sm leading-6 text-white/90">“Everyone left with a little piece of the night on their fridge.”</p>
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
    { icon: Upload, title: "Upload your photos", text: "Send us the photos you love—event shots, portraits, logos or hand-drawn art." },
    { icon: Palette, title: "Customise every detail", text: "Pick the shape, size and finish, then preview your magnet live before ordering." },
    { icon: Magnet, title: "We print & hand-finish", text: "Photo-quality printing on durable stock with a strong, fridge-ready magnet backing." },
    { icon: Truck, title: "Delivered or event-ready", text: "Shipped to your door or packed in keepsake gift boxes for your guest favour table." },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">How it works</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">From favourite photo to fridge magnet in four steps.</h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">Made for weddings, parties, reunions, conferences and venue teams that want a keepsake every guest will actually keep.</p>
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

function Bundles({ addToCart }) {
  return (
    <section id="bundles" className="bg-stone-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-300">Magnet bundles</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Pick a guest bundle, then fine-tune in the customiser.</h2>
          </div>
          <a href="#booking" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-stone-950 transition hover:bg-rose-100">Not sure how many you need? Book a consult <ChevronRight size={18} /></a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <div key={bundle.id} className={`rounded-[2rem] border p-7 ${bundle.id === "signature" ? "border-rose-300 bg-white text-stone-950 shadow-2xl shadow-rose-500/20" : "border-white/10 bg-white/5"}`}>
              <div className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-black ${bundle.id === "signature" ? "bg-rose-100 text-rose-700" : "bg-white/10 text-white"}`}>{bundle.badge}</div>
              <h3 className="text-2xl font-black">{bundle.name}</h3>
              <p className={`mt-3 leading-7 ${bundle.id === "signature" ? "text-stone-600" : "text-white/65"}`}>{bundle.description}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-black">{formatCurrency(bundle.price)}</span>
                <span className={`pb-2 text-sm font-bold ${bundle.id === "signature" ? "text-stone-500" : "text-white/50"}`}>per set</span>
              </div>
              <div className={`mt-4 text-sm font-black ${bundle.id === "signature" ? "text-rose-700" : "text-rose-200"}`}>{bundle.quantity}</div>
              <div className="mt-7 grid gap-3">
                {bundle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-semibold"><Check size={18} className="text-rose-500" /> {feature}</div>
                ))}
              </div>
              <button onClick={() => addToCart(bundle)} className={`mt-8 w-full rounded-2xl px-5 py-4 font-black transition ${bundle.id === "signature" ? "bg-stone-950 text-white hover:bg-rose-700" : "bg-white text-stone-950 hover:bg-rose-100"}`}>Add bundle</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Customiser({ addToCart }) {
  const [photo, setPhoto] = useState(presetPhotos[0]);
  const [uploadedName, setUploadedName] = useState("");
  const [shapeId, setShapeId] = useState(magnetShapes[0].id);
  const [sizeId, setSizeId] = useState(magnetSizes[1].id);
  const [finish, setFinish] = useState(magnetFinishes[0]);
  const [quantity, setQuantity] = useState(20);
  const [added, setAdded] = useState(false);

  const shape = magnetShapes.find((s) => s.id === shapeId);
  const size = magnetSizes.find((s) => s.id === sizeId);
  const safeQty = Math.max(1, Number(quantity) || 1);
  const unitPrice = size.price;
  const total = unitPrice * safeQty;

  function onUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    setUploadedName(file.name);
  }

  function addDesign() {
    addToCart(
      {
        id: `custom-${Date.now()}`,
        name: `Custom ${shape.label.toLowerCase()} magnet · ${size.label} ${size.dimension} · ${finish}`,
        price: unitPrice,
      },
      safeQty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <section id="customiser" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Magnet customiser</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Design your magnet and watch it come to life.</h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">Choose a photo, shape, size and finish—the live preview and pricing update instantly.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6 shadow-sm">
            <div className="grid place-items-center rounded-[1.5rem] bg-gradient-to-br from-rose-100 via-white to-amber-100 p-8">
              <motion.div
                key={`${shapeId}-${photo}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-xs shadow-2xl shadow-stone-900/20"
                style={shapeStyle(shape)}
              >
                <img src={photo} alt="Your magnet preview" className="h-full w-full object-cover" style={{ aspectRatio: shape.aspect }} />
              </motion.div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-stone-500">
              <Ruler size={16} /> {shape.label} · {size.label} {size.dimension} · {finish}
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-wide text-stone-500">1 · Choose a photo</div>
              <div className="flex flex-wrap gap-3">
                {presetPhotos.map((src) => (
                  <button
                    key={src}
                    onClick={() => {
                      setPhoto(src);
                      setUploadedName("");
                    }}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition ${photo === src ? "border-rose-600" : "border-stone-200 hover:border-rose-300"}`}
                  >
                    <img src={src} alt="Preset" className="h-full w-full object-cover" />
                  </button>
                ))}
                <label className="grid h-16 w-16 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-stone-300 text-stone-400 transition hover:border-rose-300 hover:text-rose-500">
                  <Upload size={20} />
                  <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                </label>
              </div>
              {uploadedName && <div className="mt-2 text-xs font-semibold text-stone-500">Uploaded: {uploadedName}</div>}
            </div>

            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-wide text-stone-500">2 · Shape</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {magnetShapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShapeId(s.id)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${shapeId === s.id ? "border-rose-600 bg-rose-600 text-white" : "border-stone-200 bg-white text-stone-700 hover:border-rose-200"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-wide text-stone-500">3 · Size</div>
              <div className="grid grid-cols-3 gap-2">
                {magnetSizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSizeId(s.id)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${sizeId === s.id ? "border-rose-600 bg-rose-600 text-white" : "border-stone-200 bg-white text-stone-700 hover:border-rose-200"}`}
                  >
                    <div>{s.label}</div>
                    <div className={`text-xs font-bold ${sizeId === s.id ? "text-rose-100" : "text-stone-400"}`}>{s.dimension} · {formatCurrency(s.price)} ea</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-stone-500">
                4 · Finish
                <select value={finish} onChange={(e) => setFinish(e.target.value)} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal text-stone-800 outline-none focus:border-rose-300">
                  {magnetFinishes.map((f) => <option key={f}>{f}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-stone-500">
                5 · Quantity
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal text-stone-800 outline-none focus:border-rose-300"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-bold text-stone-500">{safeQty} magnets × {formatCurrency(unitPrice)}</div>
                <div className="text-3xl font-black text-stone-950">{formatCurrency(total)}</div>
              </div>
              <button onClick={addDesign} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 py-4 font-black text-white shadow-xl shadow-rose-600/20 transition hover:bg-rose-700">
                {added ? <><Check size={19} /> Added to cart</> : <>Add design to cart <ChevronRight size={19} /></>}
              </button>
            </div>
          </div>
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
            <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Add-ons, packaging and done-for-you services.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">The cart is fully interactive: add items, change quantities, remove products and complete a demo checkout.</p>
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
  const [bookings, setBookings] = useLocalStorage("ppm-bookings", []);
  const [form, setForm] = useState({ name: "", email: "", eventType: "Wedding", date: "", time: "10:00", finish: magnetFinishes[0], guests: "100", notes: "" });
  const [confirmed, setConfirmed] = useState(null);

  const availableTimes = ["09:00", "10:00", "11:30", "13:00", "15:00", "16:30"];
  const isTaken = (date, time) => bookings.some((b) => b.date === date && b.time === time);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || isTaken(form.date, form.time)) return;
    const booking = { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setBookings([booking, ...bookings]);
    setConfirmed(booking);
    setForm({ name: "", email: "", eventType: "Wedding", date: "", time: "10:00", finish: magnetFinishes[0], guests: "100", notes: "" });
  }

  return (
    <section id="booking" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Booking system</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Book a magnet design consult for your event.</h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">This scheduler prevents duplicate slots on the same date and stores booking requests locally in the browser for demo purposes.</p>
          <div className="mt-8 grid gap-4">
            {[
              [Palette, "Photo selection & design help"],
              [Ruler, "Shape, size & finish guidance"],
              [Gift, "Guest packaging & favour tables"],
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
              <label className="grid gap-2 text-sm font-bold text-stone-700">Event type<select className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>{["Wedding", "Party", "Corporate", "Reunion", "Memorial", "Other"].map((x) => <option key={x}>{x}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">Date<input type="date" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
              <label className="grid gap-2 text-sm font-bold text-stone-700">Guests<input type="number" min="1" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} /></label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-stone-700">Preferred time<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{availableTimes.map((time) => { const taken = form.date && isTaken(form.date, time); return <button type="button" disabled={taken} onClick={() => setForm({ ...form, time })} key={time} className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${form.time === time ? "border-rose-600 bg-rose-600 text-white" : taken ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 line-through" : "border-stone-200 bg-white text-stone-700 hover:border-rose-200"}`}>{time}</button>; })}</div></label>
            <label className="grid gap-2 text-sm font-bold text-stone-700">Preferred finish<select className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" value={form.finish} onChange={(e) => setForm({ ...form, finish: e.target.value })}>{magnetFinishes.map((x) => <option key={x}>{x}</option>)}</select></label>
            <label className="grid gap-2 text-sm font-bold text-stone-700">Notes<textarea rows={4} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-rose-300" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Tell us about the event, photos, shapes, quantities or deadlines." /></label>
            {form.date && isTaken(form.date, form.time) && <div className="rounded-2xl bg-amber-100 p-4 text-sm font-bold text-amber-900">That slot is already booked. Choose another time.</div>}
            <button className="rounded-2xl bg-rose-600 px-6 py-4 font-black text-white shadow-xl shadow-rose-600/20 transition hover:bg-rose-700">Confirm booking request</button>
          </form>

          <AnimatePresence>
            {confirmed && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
                <div className="flex items-start gap-3"><Check className="mt-1" /> <div><div className="font-black">Booking request confirmed</div><p className="mt-1 text-sm leading-6">{confirmed.name}, your {confirmed.eventType.toLowerCase()} magnet consult is saved for {confirmed.date} at {confirmed.time}. A production version would email you and add this to a calendar.</p></div></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DesignGallery() {
  const [items, setItems] = useLocalStorage("ppm-gallery", gallerySeed);
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
    <section id="gallery" className="bg-stone-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-300">Design gallery</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Real magnet designs from real events.</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">Customers share photos and reviews of their finished magnets. Submissions land in a queue, and our team approves them before they appear in the public gallery.</p>
            <form onSubmit={addUpload} className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="grid gap-3">
                <input value={upload.guest} onChange={(e) => setUpload({ ...upload, guest: e.target.value })} placeholder="Your name or event" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40" />
                <textarea value={upload.caption} onChange={(e) => setUpload({ ...upload, caption: e.target.value })} placeholder="Share a photo caption or a review of your magnets" rows={4} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40" />
                <div className="grid grid-cols-2 gap-2">
                  {["photo", "message"].map((type) => <button type="button" key={type} onClick={() => setUpload({ ...upload, type })} className={`rounded-2xl px-4 py-3 text-sm font-black capitalize ${upload.type === type ? "bg-rose-600 text-white" : "bg-white/10 text-white/70"}`}>{type === "photo" ? "Photo" : "Review"}</button>)}
                </div>
                <button className="rounded-2xl bg-white px-5 py-4 font-black text-stone-950 hover:bg-rose-100">Submit to queue</button>
              </div>
            </form>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Featured designs</h3><span className="rounded-full bg-white/10 px-3 py-1 text-sm font-black">{approved.length} live</span></div>
              <div className="grid gap-4 sm:grid-cols-2">
                {approved.map((item) => <GalleryCard key={item.id} item={item} onRemove={remove} />)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Moderation queue</h3><span className="rounded-full bg-amber-400/20 px-3 py-1 text-sm font-black text-amber-200">{pending.length} pending</span></div>
              <div className="grid gap-3">
                {pending.length === 0 && <p className="text-sm text-white/50">No pending submissions.</p>}
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
      {item.type === "photo" && item.url ? <img src={item.url} alt={item.caption} className="h-44 w-full object-cover" /> : <div className="grid h-44 place-items-center bg-rose-500/20 p-6 text-center text-lg font-black"><MessageCircle /> Customer review</div>}
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
            <div className="flex items-center justify-between border-b border-stone-200 p-5"><div><h2 className="text-xl font-black text-stone-950">Your cart</h2><p className="text-sm text-stone-500">Bundles, custom designs and add-ons</p></div><button onClick={() => setOpen(false)} className="rounded-2xl border border-stone-200 p-2"><X size={20} /></button></div>
            <div className="flex-1 overflow-auto p-5">
              {paid ? <div className="rounded-2xl bg-emerald-50 p-5 text-emerald-950"><Check className="mb-3" /><div className="font-black">Demo order complete</div><p className="mt-1 text-sm leading-6">In production, this would connect to Stripe, send your photos to the print queue, generate a proof and email you a confirmation.</p></div> : null}
              {!cart.length && !paid ? <div className="grid h-64 place-items-center rounded-2xl border border-dashed border-stone-300 text-center"><div><Package className="mx-auto mb-3 text-stone-400" /><p className="font-bold text-stone-600">Your cart is empty.</p></div></div> : null}
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
    [Camera, "Photo-quality print"], [Magnet, "Strong magnet backing"], [Square, "Custom shapes"], [Palette, "Matte & glossy finishes"], [Package, "Bulk event pricing"], [Truck, "Fast turnaround"], [Gift, "Keepsake gift packaging"], [Leaf, "Eco-friendly inks"],
  ];
  return <section className="bg-white py-12"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4 lg:px-8">{features.map(([Icon, label]) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 font-black text-stone-800"><Icon size={20} className="text-rose-600" />{label}</div>)}</div></section>;
}

function Footer() {
  return (
    <footer className="bg-stone-100 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-100 text-rose-700"><Magnet size={22} /></div><div className="text-xl font-black text-stone-950">{brand.name}</div></div><p className="mt-4 max-w-sm leading-7 text-stone-600">Personalised photo fridge magnets for weddings, parties and events—with a live customiser, store, booking and design gallery.</p></div>
        <div><h4 className="font-black text-stone-950">Contact</h4><div className="mt-4 grid gap-2 text-sm text-stone-600"><span className="flex items-center gap-2"><Mail size={16} /> {brand.email}</span><span className="flex items-center gap-2"><Clock size={16} /> Mon–Fri, 9am–5pm</span></div></div>
        <div><h4 className="font-black text-stone-950">Launch checklist</h4><ul className="mt-4 grid gap-2 text-sm text-stone-600"><li>Connect Stripe for real payments</li><li>Connect Cal.com or Google Calendar</li><li>Add upload storage & print-proof workflow</li><li>Deploy to Vercel, Netlify or Shopify Hydrogen</li></ul></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [cart, setCart] = useLocalStorage("ppm-cart", []);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  function addToCart(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      return [...current, { ...product, qty: quantity }];
    });
    setCartOpen(true);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900">
      <Header cartCount={cartCount} setCartOpen={setCartOpen} />
      <Hero />
      <FeatureBand />
      <HowItWorks />
      <Bundles addToCart={addToCart} />
      <Customiser addToCart={addToCart} />
      <Store addToCart={addToCart} />
      <BookingSystem />
      <DesignGallery />
      <Footer />
      <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} setCart={setCart} />
    </div>
  );
}
