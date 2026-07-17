import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearchParams } from "react-router-dom";
import { useBuilderStore, QrType } from "@/store/builderStore";
import { QRPreview } from "@/components/QRPreview";
import { PremiumButton } from "@/components/PremiumButton";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { QrTypeNavigation } from "@/components/QrTypeNavigation";
import { ContentPanel } from "@/components/ContentPanel";
import QRCodeStyling from "qr-code-styling";

const TEMPLATES = [
  { name: "Brand Dark", fg: "#888888", bg: "#0a0a0a", dotShape: "rounded" as const, eyeStyle: "rounded" as const },
  { name: "Brand Light", fg: "#888888", bg: "#ffffff", dotShape: "rounded" as const, eyeStyle: "rounded" as const },
  { name: "Neon Cyan", fg: "#aaaaaa", bg: "#0a0a0a", dotShape: "circle" as const, eyeStyle: "rounded" as const },
  { name: "Gold", fg: "#888888", bg: "#111111", dotShape: "square" as const, eyeStyle: "square" as const },
  { name: "Emerald", fg: "#888888", bg: "#0a0a0a", dotShape: "rounded" as const, eyeStyle: "circle" as const },
  { name: "Minimal", fg: "#444444", bg: "#f8f8f8", dotShape: "square" as const, eyeStyle: "square" as const },
];

function detectContentType(content: string): QrType {
  if (!content) return "TEXT";
  const urlPattern = /^(https?:\/\/|www\.)/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[\+\d\-\s\(\)]{7,}$/;
  if (urlPattern.test(content)) return "URL";
  if (emailPattern.test(content)) return "EMAIL";
  if (phonePattern.test(content)) return "PHONE";
  return "TEXT";
}

export function BuilderPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [generating, setGenerating] = useState(false);
  const [generateSuccess, setGenerateSuccess] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpg" | "svg">("png");
  const [downloading, setDownloading] = useState(false);
  const {
    type, value, formData, foregroundColor, backgroundColor,
    gradientEnabled, gradientType, gradientStart, gradientEnd,
    dotShape, eyeStyle, margin, errorCorrection, opacity,
    logoUrl, logoSize, logoPadding, logoBgShape,
    frameStyle, frameText, socialLogoEnabled,
    setType, setValue, setFormData,
    setForegroundColor, setBackgroundColor,
    setGradientEnabled, setGradientType, setGradientStart, setGradientEnd,
    setDotShape, setEyeStyle, setMargin, setErrorCorrection, setOpacity,
    setLogoUrl, setLogoSize, setLogoPadding, setLogoBgShape,
    setFrameStyle, setFrameText,
    setSocialLogoEnabled,
    reset,
  } = useBuilderStore();

  const SOCIAL_LOGOS: Record<string, string> = {
    FACEBOOK: "https://cdn.simpleicons.org/facebook/1877F2",
    INSTAGRAM: "https://cdn.simpleicons.org/instagram/E4405F",
    YOUTUBE: "https://cdn.simpleicons.org/youtube/FF0000",
    TIKTOK: "https://cdn.simpleicons.org/tiktok/000000",
    X: "https://cdn.simpleicons.org/x/000000",
    LINKEDIN: "https://cdn.simpleicons.org/linkedin/0A66C2",
    PINTEREST: "https://cdn.simpleicons.org/pinterest/E60023",
    DISCORD: "https://cdn.simpleicons.org/discord/5865F2",
    TELEGRAM: "https://cdn.simpleicons.org/telegram/26A5E4",
    WHATSAPP: "https://cdn.simpleicons.org/whatsapp/25D366",
  };

  useEffect(() => {
    if (socialLogoEnabled && SOCIAL_LOGOS[type]) {
      setLogoUrl(SOCIAL_LOGOS[type]);
    }
  }, [type, socialLogoEnabled, setLogoUrl]);

  useEffect(() => {
    if (location.pathname === "/builder") {
      reset();
      const urlType = searchParams.get("type");
      if (urlType) {
        const validTypes: QrType[] = [
          "URL", "TEXT", "EMAIL", "PHONE", "SMS", "WHATSAPP",
          "WIFI", "CONTACT", "LOCATION", "GOOGLE_MAPS", "UPI", "SOCIAL",
          "EVENT", "CALENDAR", "APP_DOWNLOAD", "INSTAGRAM", "FACEBOOK",
          "X", "LINKEDIN", "YOUTUBE", "TELEGRAM", "DISCORD", "PAYPAL",
          "STRIPE", "PDF", "IMAGE", "VIDEO", "MULTI_LINK",
          "BITCOIN", "PAYTM", "PHONEPE", "GOOGLE_PAY", "TIKTOK",
          "PINTEREST", "MECARD", "COUPON", "RESTAURANT_MENU",
          "GOOGLE_REVIEW", "CUSTOM_LANDING", "DYNAMIC",
        ];
        if (validTypes.includes(urlType as QrType)) {
          setType(urlType as QrType);
        }
      }
    }
  }, [location.pathname, searchParams, reset, setType]);

  const handleGenerateClick = () => {
    if (!value.trim()) {
      alert("Please enter content to generate a QR code");
      return;
    }
    setGenerating(true);
    setGenerateSuccess(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerateSuccess(true);
      setTimeout(() => setGenerateSuccess(false), 2000);
    }, 600);
  };

  function handleContentChange(newValue: string) {
    setValue(newValue);
    const detectedType = detectContentType(newValue);
    if (detectedType !== type) {
      setType(detectedType);
    }
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function applyTemplate(tpl: typeof TEMPLATES[0]) {
    setForegroundColor(tpl.fg);
    setBackgroundColor(tpl.bg);
    setDotShape(tpl.dotShape);
    setEyeStyle(tpl.eyeStyle);
    setGradientEnabled(false);
  }

  function handleFrameStyleChange(newFrameStyle: string) {
    setFrameStyle(newFrameStyle as any);
    if (newFrameStyle === "Custom") {
      return;
    }
    if (newFrameStyle === "none") {
      setFrameText("");
      return;
    }
    setFrameText(newFrameStyle);
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-12 sm:px-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white">QR Code Generator</h1>
          <p className="mt-2 text-neutral-400">Select type, enter content, customize design, and download instantly</p>
        </div>

        <QrTypeNavigation />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_320px]">
          {/* LEFT: Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">Content</h2>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setValue(text);
                    } catch {
                      alert("Unable to paste. Please paste manually.");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#b87333] transition hover:border-[#b87333]/40 hover:text-[#d4a574] hover:shadow-[0_0_10px_rgba(184,115,51,0.2)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1"/></svg>
                  Paste
                </button>
              </div>
              <ContentPanel />
              <div className="mt-4">
                <PremiumButton
                  className="w-full"
                  onClick={handleGenerateClick}
                  disabled={generating}
                >
                  {generating ? "Generating…" : generateSuccess ? "✓ Generated!" : "Generate QR Code"}
                </PremiumButton>
              </div>
            </div>
          </motion.div>

          {/* CENTER: QR Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="sticky top-24 w-full max-w-[520px]">
              <QRPreview />
            </div>
          </motion.div>

          {/* RIGHT: Design Panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Templates */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-300">Templates</h2>
              <div className="grid grid-cols-3 gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.name}
                    onClick={() => applyTemplate(tpl)}
                    title={tpl.name}
                    className="flex flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-[#b87333]/40 hover:bg-white/10"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md text-[10px] font-bold text-[#b87333]" style={{ backgroundColor: tpl.bg }}>
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: tpl.fg }} />
                    </span>
                    <span className="truncate text-[9px] font-medium text-neutral-300">{tpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-300">Colors</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-neutral-400">QR Code</label>
                    <input type="color" value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} className="h-10 w-full rounded-lg border border-white/10" />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-neutral-400">Background</label>
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="h-10 w-full rounded-lg border border-white/10" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <input type="checkbox" id="gradient" checked={gradientEnabled} onChange={(e) => setGradientEnabled(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-gray-600" />
                  <label htmlFor="gradient" className="text-sm text-neutral-300">Use Gradient</label>
                </div>
                {gradientEnabled && (
                  <div className="space-y-2">
                      <select value={gradientType} onChange={(e) => setGradientType(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40">
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                    <div className="flex gap-3">
                      <input type="color" value={gradientStart} onChange={(e) => setGradientStart(e.target.value)} className="h-10 flex-1 rounded-lg border border-white/10" />
                      <input type="color" value={gradientEnd} onChange={(e) => setGradientEnd(e.target.value)} className="h-10 flex-1 rounded-lg border border-white/10" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Style */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-300">Style</h2>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-400">Dot Shape</label>
                    <select value={dotShape} onChange={(e) => setDotShape(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40">
                    <option value="square">Square</option>
                    <option value="rounded">Rounded</option>
                    <option value="circle">Circle</option>
                    <option value="diamond">Diamond</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-400">Eye Corners</label>
                    <select value={eyeStyle} onChange={(e) => setEyeStyle(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40">
                    <option value="square">Square</option>
                    <option value="rounded">Rounded</option>
                    <option value="circle">Circle</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-300">Advanced Options</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-400">Margin</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={0} max={10} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="flex-1" />
                    <span className="w-10 text-right text-xs text-neutral-300">{margin}</span>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-400">Error Correction</label>
                  <select value={errorCorrection} onChange={(e) => setErrorCorrection(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40">
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-400">Opacity</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={10} max={100} value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="flex-1" />
                    <span className="w-10 text-right text-xs text-neutral-300">{Math.round(opacity * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-300">Logo</h2>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogoUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()}                className="w-full rounded-xl border border-dashed border-white/20 bg-white/5 py-3 text-sm font-medium text-neutral-300 transition hover:border-gray-500 hover:text-neutral-200">
                {logoUrl ? "Change Logo" : "Upload Logo"}
              </button>
              {(["FACEBOOK", "INSTAGRAM", "YOUTUBE", "TIKTOK", "X", "LINKEDIN", "PINTEREST", "DISCORD", "TELEGRAM", "WHATSAPP"] as const).includes(type as any) && (
                <div className="mt-3 flex items-center gap-2">
                  <input type="checkbox" id="socialLogo" checked={socialLogoEnabled} onChange={(e) => setSocialLogoEnabled(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-gray-600" />
                  <label htmlFor="socialLogo" className="text-xs text-neutral-300">Auto-apply {type.toLowerCase()} logo</label>
                </div>
              )}
              {logoUrl && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={logoUrl} alt="Logo" className="h-10 w-10 rounded-lg border border-white/10 object-contain" />
                    <button type="button" onClick={() => setLogoUrl("")} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center justify-between text-xs font-medium text-neutral-400">
                      <span>Size</span>
                       <span className="text-neutral-300">{logoSize}%</span>
                    </label>
                    <input type="range" min={10} max={60} value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-neutral-400">Background Shape</label>
                    <select value={logoBgShape} onChange={(e) => setLogoBgShape(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40">
                      <option value="none">None</option>
                      <option value="circle">Circle</option>
                      <option value="rounded">Rounded</option>
                      <option value="square">Square</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center justify-between text-xs font-medium text-neutral-400">
                      <span>Padding</span>
                       <span className="text-neutral-300">{logoPadding}px</span>
                    </label>
                    <input type="range" min={0} max={20} value={logoPadding} onChange={(e) => setLogoPadding(Number(e.target.value))} className="w-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Frame */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-300">Frame</h2>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-400">Frame Style</label>
                  <select value={frameStyle} onChange={(e) => handleFrameStyleChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40">
                    <option value="none">None</option>
                    <option value="Scan Me">Scan Me</option>
                    <option value="Follow Us">Follow Us</option>
                    <option value="Visit Website">Visit Website</option>
                    <option value="Download App">Download App</option>
                    <option value="Connect With Us">Connect With Us</option>
                    <option value="Restaurant Menu">Restaurant Menu</option>
                    <option value="Event Entry">Event Entry</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                {frameStyle === "Custom" && (
                  <div>
                    <label className="mb-1 block text-xs font-medium text-neutral-400">Custom Frame Text</label>
                    <input type="text" value={frameText} onChange={(e) => setFrameText(e.target.value)} placeholder="Enter custom text..." className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40" />
                  </div>
                )}
              </div>
            </div>

            {/* Download */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-300">Download</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value as "png" | "jpg" | "svg")}
                  className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-neutral-100 outline-none focus:border-gray-500 focus:bg-black/40"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="svg">SVG</option>
                </select>
                <PremiumButton
                  variant="download"
                  className="flex-1 !py-3"
                  onClick={async () => {
                    if (!value.trim()) {
                      alert("Please enter content first");
                      return;
                    }
                    setDownloading(true);
                    try {
                      const payload = buildDownloadPayload(type, value, formData);
                      const qr = new QRCodeStyling({
                        width: 512,
                        margin,
                        qrOptions: { errorCorrectionLevel: errorCorrection },
                        dotsOptions: {
                          type: DOT_SHAPE_MAP[dotShape] || "square",
                          color: gradientEnabled ? undefined : foregroundColor,
                        },
                        cornersSquareOptions: {
                          type: EYE_STYLE_MAP[eyeStyle] || "square",
                          color: gradientEnabled ? undefined : foregroundColor,
                        },
                        cornersDotOptions: { type: EYE_STYLE_MAP[eyeStyle] || "square" },
                        backgroundOptions: { color: backgroundColor },
                        imageOptions: { crossOrigin: "anonymous", margin: logoPadding, imageSize: logoSize / 100 },
                      });

                      const options: any = {
                        data: payload,
                        width: 512,
                        margin,
                        qrOptions: { errorCorrectionLevel: errorCorrection },
                        dotsOptions: { type: DOT_SHAPE_MAP[dotShape] || "square", color: foregroundColor },
                        cornersSquareOptions: { type: EYE_STYLE_MAP[eyeStyle] || "square", color: foregroundColor },
                        cornersDotOptions: { type: EYE_STYLE_MAP[eyeStyle] || "square" },
                        backgroundOptions: { color: backgroundColor },
                        imageOptions: { crossOrigin: "anonymous", margin: logoPadding, imageSize: logoSize / 100 },
                      };

                      if (gradientEnabled) {
                        options.dotsOptions.color = undefined;
                        options.dotsOptions.gradient = {
                          type: gradientType === "linear" ? "linear" : "radial",
                          rotation: gradientType === "linear" ? 45 : 0,
                          colorStops: [
                            { offset: 0, color: gradientStart },
                            { offset: 1, color: gradientEnd },
                          ],
                        };
                        options.cornersSquareOptions.color = undefined;
                        options.cornersSquareOptions.gradient = {
                          type: gradientType === "linear" ? "linear" : "radial",
                          rotation: gradientType === "linear" ? 45 : 0,
                          colorStops: [
                            { offset: 0, color: gradientStart },
                            { offset: 1, color: gradientEnd },
                          ],
                        };
                        options.cornersDotOptions.gradient = {
                          type: gradientType === "linear" ? "linear" : "radial",
                          rotation: gradientType === "linear" ? 45 : 0,
                          colorStops: [
                            { offset: 0, color: gradientStart },
                            { offset: 1, color: gradientEnd },
                          ],
                        };
                      } else {
                        options.dotsOptions.gradient = undefined;
                        options.cornersSquareOptions.gradient = undefined;
                        options.cornersDotOptions.gradient = undefined;
                      }

                      if (logoUrl) {
                        options.image = logoUrl;
                      }

                      qr.update(options);

                      const ext = downloadFormat === "jpg" ? "jpeg" : downloadFormat;

                      if (frameStyle !== "none" && frameText && (downloadFormat === "png" || downloadFormat === "jpg")) {
                        const qrBlob = await qr.getRawData("png");
                        if (qrBlob) {
                          const qrBitmap = await createImageBitmap(qrBlob);
                          const paddingX = 60;
                          const paddingTop = 70;
                          const paddingBottom = 70;
                          const textArea = 70;
                          const frameCanvas = document.createElement("canvas");
                          frameCanvas.width = qrBitmap.width + paddingX * 2;
                          frameCanvas.height = qrBitmap.height + paddingTop + paddingBottom + textArea;
                          const ctx = frameCanvas.getContext("2d");
                          if (ctx) {
                            ctx.fillStyle = backgroundColor;
                            ctx.fillRect(0, 0, frameCanvas.width, frameCanvas.height);
                            ctx.strokeStyle = foregroundColor;
                            ctx.lineWidth = 6;
                            ctx.rect(paddingX / 2, paddingTop / 2, qrBitmap.width + paddingX, qrBitmap.height + paddingTop + paddingBottom + textArea);
                            ctx.stroke();
                            const qrX = paddingX;
                            const qrY = paddingTop;
                            ctx.drawImage(qrBitmap, qrX, qrY);
                            ctx.font = "bold 28px Inter, sans-serif";
                            ctx.fillStyle = foregroundColor;
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            const textY = qrY + qrBitmap.height + textArea / 2;
                            ctx.fillText(frameText, frameCanvas.width / 2, textY);
                            const frameBlob = await new Promise<Blob | null>((resolve) =>
                              frameCanvas.toBlob(resolve, `image/${ext}`, 0.95)
                            );
                            if (frameBlob) {
                              const link = document.createElement("a");
                              link.href = URL.createObjectURL(frameBlob);
                              link.download = `qrcode.${ext}`;
                              link.click();
                              URL.revokeObjectURL(link.href);
                            }
                          }
                        }
                      } else {
                        await qr.download({ name: `qrcode`, extension: ext as any });
                      }
                    } catch {
                      alert("Download failed. Please try again.");
                    } finally {
                      setDownloading(false);
                    }
                  }}
                  disabled={downloading}
                >
                  {downloading ? "Preparing…" : `Download ${downloadFormat.toUpperCase()}`}
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const DOT_SHAPE_MAP: Record<string, "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded"> = {
  square: "square",
  rounded: "rounded",
  circle: "dots",
  diamond: "square",
  dot: "dots",
};

const EYE_STYLE_MAP: Record<string, "square" | "extra-rounded" | "classy" | "classy-rounded"> = {
  square: "square",
  rounded: "extra-rounded",
  circle: "extra-rounded",
  neon: "classy",
  "soft square": "classy",
  futuristic: "classy",
};

function buildDownloadPayload(type: string, value: string, formData: any): string {
  switch (type) {
    case "EMAIL":
      const emailSubject = formData.subject ? `?subject=${encodeURIComponent(formData.subject)}` : "";
      return `mailto:${value}${emailSubject}`;
    case "PHONE":
      return `tel:${value}`;
    case "SMS":
      const smsBody = formData.message ? `?body=${encodeURIComponent(formData.message)}` : "";
      return `sms:${value}${smsBody}`;
    case "WHATSAPP":
      const waText = formData.message ? `?text=${encodeURIComponent(formData.message)}` : "";
      return `https://wa.me/${value.replace(/[^\d]/g, "")}${waText}`;
    case "WIFI":
      const pwd = formData.wifiPassword || "";
      const sec = formData.wifiSecurity || "WPA";
      return `WIFI:T:${sec};S:${value};P:${pwd};;`;
    case "CONTACT":
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.contactName || value}\nTEL:${formData.contactPhone || ""}\nEMAIL:${formData.contactEmail || ""}\nORG:${formData.organization || ""}\nEND:VCARD`;
    case "LOCATION":
      return `geo:0,0?q=${encodeURIComponent(value)}`;
    case "GOOGLE_MAPS":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
    case "UPI":
      return `upi://pay?pa=${value}&pn=QRSO`;
    case "SOCIAL":
      return `https://${value.replace(/^@/, "")}`;
    case "INSTAGRAM":
      return `https://instagram.com/${value.replace(/^@/, "")}`;
    case "FACEBOOK":
      return `https://facebook.com/${value.replace(/^@/, "")}`;
    case "X":
      return `https://x.com/${value.replace(/^@/, "")}`;
    case "LINKEDIN":
      return `https://linkedin.com/in/${value}`;
    case "YOUTUBE":
      return `https://youtube.com/@${value.replace(/^@/, "")}`;
    case "TELEGRAM":
      return `https://t.me/${value.replace(/^@/, "")}`;
    case "DISCORD":
      return `https://discord.gg/${value}`;
    case "PAYPAL":
      return `https://paypal.me/${value}`;
    case "STRIPE":
      return value;
    case "PDF":
      return value;
    case "IMAGE":
      return value;
    case "VIDEO":
      return value;
    case "MULTI_LINK":
      return value;
    default:
      return value;
  }
}

