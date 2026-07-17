import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { PremiumButton } from "@/components/PremiumButton";
import { PremiumCard } from "@/components/PremiumCard";
import { QRExample } from "@/components/QRExamples";
import { TemplateMockup } from "@/components/TemplateMockup";
import { QLogo } from "@/components/QLogo";
import { api } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-24"
    >
      {children}
    </motion.section>
  );
}

const STATS = [
  { value: "100%", label: "Free forever" },
  { value: "No login", label: "Required" },
  { value: "Instant", label: "Generation" },
  { value: "PNG / JPG / SVG", label: "Download formats" },
];

const DESIGN_FEATURES = [
  "Solid, gradient, and multi-color palettes",
  "Square, rounded, dot, diamond, and star styles",
  "Square, circle, rounded, and premium eye templates",
  "Business, social, promo, and custom frames",
];

const TEMPLATES = [
  { name: "Restaurant Menu", color: "#b87333", bg: "#f5f0eb", shape: "rounded" as const, logo: false },
  { name: "Business Card", color: "#8b5a2b", bg: "#faf7f4", shape: "square" as const, logo: true },
  { name: "Event Ticket", color: "#c68b59", bg: "#f7f3ee", shape: "diamond" as const, logo: false },
  { name: "Product Packaging", color: "#d4a574", bg: "#f8f5f1", shape: "rounded" as const, logo: true },
  { name: "Real Estate", color: "#a0522d", bg: "#f5f1ec", shape: "square" as const, logo: false },
  { name: "Social Media", color: "#e8a87c", bg: "#1a0f0a", shape: "circle" as const, logo: true },
  { name: "Wedding Invitation", color: "#d4a574", bg: "#faf7f4", shape: "rounded" as const, logo: false },
  { name: "Payment QR", color: "#b87333", bg: "#f5f0eb", shape: "square" as const, logo: true },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  function validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("www.");
    }
  }

  async function generatePublic(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setIsGenerating(true);
    setError(null);
    setDataUrl(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const res = await api.post("/qr/render", {
        type: "URL",
        value: url,
        foregroundColor: "#000000",
        backgroundColor: "#FFFFFF",
        margin: 4,
        errorCorrection: "M",
      });
      setDataUrl(res.data.data.dataUrl);
    } catch {
      setError("Couldn't generate the QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleUrlChange(newUrl: string) {
    setUrl(newUrl);
    setIsValidUrl(validateUrl(newUrl));
  }

  return (
    <div className="relative min-h-screen scroll-smooth text-neutral-100">
      <AnimatedBackground />

      <section className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 shadow-[0_0_10px_rgba(200,200,200,0.5)]" />
              100% free forever · no login required · no watermark
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Create Beautiful <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">QR Codes</span> in Seconds
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              Generate, customize, and download professional QR codes for free with a premium, beginner-friendly experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PremiumButton variant="primary" className="!px-7 !py-3.5 text-base shadow-[0_0_15px_rgba(255,255,255,0.1)]" onClick={() => navigate("/builder")}>
                Generate QR Code
              </PremiumButton>
              <PremiumButton variant="secondary" className="!px-7 !py-3.5 text-base" onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}>
                View Examples
              </PremiumButton>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-2 xl:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex aspect-square flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center backdrop-blur-xl">
                  <div className="text-lg font-semibold text-white sm:text-xl">{stat.value}</div>
                  <div className="mt-1 text-[11px] text-neutral-400 sm:text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <PremiumCard glow className="!p-6 sm:!p-8">
              <div className="mb-5">
                <p className="text-base font-medium text-neutral-200 sm:text-lg">Quick QR</p>
                <p className="text-xs text-neutral-500">Instant rendering for your next campaign</p>
              </div>

              <div className="relative rounded-2xl border border-white/10 bg-black/40 p-4">
                {isGenerating && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-600 border-t-[#b87333]"></div>
                      <p className="text-sm text-neutral-300">Generating QR...</p>
                    </div>
                  </div>
                )}

                <div className={`relative rounded-xl border-2 transition-all duration-500 ${
                  dataUrl ? "border-[#b87333]/50 shadow-[0_0_30px_rgba(184,115,51,0.3)]" : "border-white/10"
                } bg-white p-4`}>
                  {dataUrl ? (
                    <div className="flex flex-col items-center gap-3">
                      <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        src={dataUrl}
                        alt="Generated QR"
                        className="h-56 w-56 sm:h-64 sm:w-64"
                      />
                      <motion.a
                        href={dataUrl}
                        download="qrcode.png"
                        className="rounded-xl bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] px-4 py-2 text-sm font-medium text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)] hover:brightness-110 active:scale-95 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download PNG
                      </motion.a>
                    </div>
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                          <div className="grid h-24 w-24 grid-cols-6 gap-[3px]">
                            {[...Array(36)].map((_, i) => (
                              <div key={i} className={`rounded-[2px] ${Math.random() > 0.5 ? "bg-gray-800" : "bg-transparent"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-neutral-400">Paste a URL to see a live preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={generatePublic} className="mt-5 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="url"
                    required
                    placeholder="https://your-website.com"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className={`h-11 w-full rounded-xl border bg-black/40 px-4 pr-20 text-sm text-neutral-100 outline-none transition ${
                      url && !isValidUrl
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-gray-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        handleUrlChange(text);
                      } catch {
                        alert("Unable to paste. Please paste manually.");
                      }
                    }}
                    className="absolute inset-y-0 right-2 flex items-center rounded-lg bg-white/5 px-3 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1"/></svg>
                    Paste
                  </button>
                </div>
                <PremiumButton
                  type="submit"
                  variant="primary"
                  disabled={loading || !url.trim() || !isValidUrl}
                  className="!h-11 !px-5"
                >
                  {loading || isGenerating ? "Generating…" : "Generate"}
                </PremiumButton>
              </form>
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              {url && !isValidUrl && (
                <p className="mt-2 text-xs text-red-400">Please enter a valid URL</p>
              )}
            </PremiumCard>
          </motion.div>
        </div>
      </section>

      <Section id="showcase">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">Customization Studio</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Make every QR feel like your brand.</h2>
            <p className="mt-4 text-neutral-400">
              Fine-tune colors, styles, eye shapes, logo placement, frames, and export options without any login or watermark.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              {DESIGN_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-neutral-400">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <QRExample color="#888888" bg="#0a0a0a" shape="rounded" />
            <QRExample color="#888888" bg="#0a0a0a" shape="rounded" logo />
            <QRExample color="#888888" bg="#0f0f0f" shape="circle" />
            <QRExample color="#888888" bg="#0a0a0a" shape="diamond" logo />
          </div>
        </div>
      </Section>

      <Section id="templates">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">QR EXAMPLES</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">use everywhere</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {TEMPLATES.map((template) => (
            <motion.div
              key={template.name}
              onMouseEnter={() => setHoveredTemplate(template.name)}
              onMouseLeave={() => setHoveredTemplate(null)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <PremiumCard glow={hoveredTemplate === template.name} className="!p-3 cursor-pointer relative">
                <div className="flex items-center justify-between">
                  <h3 className="truncate text-xs font-semibold text-white sm:text-sm">{template.name}</h3>
                  <span className="text-[10px] text-neutral-400 sm:text-xs">✦</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[10px] text-neutral-400 sm:text-xs">Ready to customize for your brand, event, or campaign.</p>

                {hoveredTemplate === template.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative mt-2 rounded-xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    <TemplateMockup template={template} />
                  </motion.div>
                )}
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="types">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">QR TYPES</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">One tool, every QR type</h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">From simple links to complex data, we support every QR code type you need.</p>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
          {["URL", "TEXT", "WIFI", "VCARD", "SMS", "WHATSAPP", "EMAIL", "SOCIAL"].map((type) => (
            <Link key={type} to={`/builder?type=${type}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#b87333]/40 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(184,115,51,0.15)]">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b87333]/20">
                <span className="text-sm font-bold text-[#b87333]">{type[0]}</span>
              </div>
              <span className="text-sm font-medium text-white">{type}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <PremiumCard glow className="mx-auto max-w-4xl !p-8 sm:!p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">LIVE BUILDER</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">See it in action</h2>
              <p className="mt-4 text-neutral-400">Watch how easy it is to create a beautiful, branded QR code in seconds. No design skills required.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PremiumButton variant="primary" className="!px-6 !py-3 shadow-[0_0_15px_rgba(255,255,255,0.1)]" onClick={() => navigate("/builder")}>
                  Try the builder
                </PremiumButton>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#d4a574]/20 via-[#c68b59]/20 to-[#b87333]/20 blur-2xl" />
                <div className="relative aspect-square w-64 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-4 shadow-2xl">
                  <QRExample color="#d4a574" bg="#0a0a0a" shape="rounded" logo />
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </Section>

      <Section>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">TESTIMONIALS</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Loved by creators</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Sarah Chen", role: "Marketing Director", text: "The customization options are incredible. Our branded QR codes look so professional." },
            { name: "Marcus Johnson", role: "Restaurant Owner", text: "We use QRSO for our menus. The WiFi QR feature alone saved us hours of explanation." },
            { name: "Elena Rodriguez", role: "Event Planner", text: "Finally, a QR tool that doesn't look like it's from 2010. The design quality is unmatched." },
          ].map((review) => (
            <PremiumCard key={review.name} glow className="!p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a574] to-[#b87333]">
                  <span className="text-sm font-bold text-[#1a0f0a]">{review.name[0]}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{review.name}</h4>
                  <p className="text-xs text-neutral-400">{review.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-300">"{review.text}"</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "50K+", label: "QR codes created" },
              { value: "99.9%", label: "Uptime" },
              { value: "8+", label: "QR types" },
              { value: "Free", label: "Forever" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold sm:text-3xl bg-gradient-to-r from-[#d4a574] to-[#c68b59] bg-clip-text text-transparent">{stat.value}</div>
                <div className="mt-1 text-xs text-neutral-400 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <PremiumCard glow className="mx-auto max-w-3xl !p-8 text-center sm:!p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to create your first QR code?</h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">No account. No watermark. No credit card. Just beautiful QR codes, instantly.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PremiumButton variant="primary" className="!px-7 !py-3.5 text-base shadow-[0_0_15px_rgba(255,255,255,0.1)]" onClick={() => navigate("/builder")}>
              Generate QR Code
            </PremiumButton>
            <PremiumButton variant="secondary" className="!px-7 !py-3.5 text-base" onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}>
              Explore templates
            </PremiumButton>
          </div>
        </PremiumCard>
      </Section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <button onClick={() => navigate("/")} className="flex items-center gap-2 text-lg font-bold tracking-tight">
                <QLogo className="h-8 w-8 shadow-[0_0_15px_rgba(200,140,100,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,180,140,0.45)]" />
                <span className="bg-gradient-to-r from-[#d4a574] to-[#c68b59] bg-clip-text text-transparent">QRSO</span>
              </button>
              <p className="mt-3 text-sm text-neutral-400">Create beautiful QR codes instantly. Free forever, no login required.</p>
               <div className="mt-4 flex items-center gap-3">
                 <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#b87333] transition hover:border-[#b87333]/40 hover:text-[#d4a574] hover:shadow-[0_0_10px_rgba(184,115,51,0.3)]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                 </a>
                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#b87333] transition hover:border-[#b87333]/40 hover:text-[#d4a574] hover:shadow-[0_0_10px_rgba(184,115,51,0.3)]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                 </a>
                 <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#b87333] transition hover:border-[#b87333]/40 hover:text-[#d4a574] hover:shadow-[0_0_10px_rgba(184,115,51,0.3)]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8a4 4 0 0 0-4 4c0 1.95.95 3.3 2.4 3.9.25.1.42.15.6.15.17 0 .34-.05.6-.15C13.05 15.3 14 13.95 14 12a4 4 0 0 0-4-4z"/><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M6.5 14.5c-1.5 1-2.5 2.5-2.5 2.5"/><path d="M17.5 14.5c1.5 1 2.5 2.5 2.5 2.5s-1 1.5-2.5 2.5"/></svg>
                 </a>
                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#b87333] transition hover:border-[#b87333]/40 hover:text-[#d4a574] hover:shadow-[0_0_10px_rgba(184,115,51,0.3)]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                 </a>
                 <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#b87333] transition hover:border-[#b87333]/40 hover:text-[#d4a574] hover:shadow-[0_0_10px_rgba(184,115,51,0.3)]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.7 16h4.3l-11.7-16z"/></svg>
                 </a>
               </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">Product</h3>
              <ul className="mt-4 space-y-2.5">
                <li><Link to="/builder" className="text-sm text-neutral-400 transition hover:text-neutral-300">QR Generator</Link></li>
                <li><Link to="/history" className="text-sm text-neutral-400 transition hover:text-neutral-300">History</Link></li>
                <li><Link to="/pricing" className="text-sm text-neutral-400 transition hover:text-neutral-300">Pricing</Link></li>
                <li><Link to="/blog" className="text-sm text-neutral-400 transition hover:text-neutral-300">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">Company</h3>
              <ul className="mt-4 space-y-2.5">
                <li><span className="text-sm text-neutral-400">About</span></li>
                <li><span className="text-sm text-neutral-400">Careers</span></li>
                <li><span className="text-sm text-neutral-400">Contact</span></li>
                <li><span className="text-sm text-neutral-400">Press</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">Legal</h3>
              <ul className="mt-4 space-y-2.5">
                <li><span className="text-sm text-neutral-400">Privacy Policy</span></li>
                <li><span className="text-sm text-neutral-400">Terms of Service</span></li>
                <li><span className="text-sm text-neutral-400">Cookie Policy</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-neutral-500">© {new Date().getFullYear()} QRSO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
