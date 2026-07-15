import { useBuilderStore, QrType } from "@/store/builderStore";
import { QRPreview } from "@/components/QRPreview";

const QR_TYPES: { value: QrType; label: string; placeholder: string }[] = [
  { value: "URL", label: "Website URL", placeholder: "https://example.com" },
  { value: "TEXT", label: "Plain Text", placeholder: "Any text content" },
  { value: "EMAIL", label: "Email", placeholder: "hello@example.com" },
  { value: "PHONE", label: "Phone", placeholder: "+1 555 123 4567" },
  { value: "SMS", label: "SMS", placeholder: "+1 555 123 4567" },
  { value: "WHATSAPP", label: "WhatsApp", placeholder: "15551234567" },
  { value: "WIFI", label: "WiFi", placeholder: "WIFI:T:WPA;S:MyNetwork;P:password;;" },
  { value: "GOOGLE_MAPS", label: "Google Maps", placeholder: "Eiffel Tower, Paris" },
  { value: "UPI", label: "UPI Payment", placeholder: "upi://pay?pa=name@bank&pn=Name" },
];

export function BuilderPage() {
  const {
    type, value, foregroundColor, backgroundColor, margin, errorCorrection,
    setType, setValue, setForegroundColor, setBackgroundColor, setMargin, setErrorCorrection,
  } = useBuilderStore();

  const activeType = QR_TYPES.find((t) => t.value === type) ?? QR_TYPES[0];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_1fr_280px]">
      {/* LEFT SIDEBAR: QR type + content input */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">QR Type</h2>
        <div className="grid grid-cols-2 gap-2">
          {QR_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={`rounded-lg px-2 py-2 text-left text-xs font-medium transition ${
                type === t.value ? "bg-brand-600 text-white" : "bg-white/5 text-neutral-300 hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-400">Content</h2>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={activeType.placeholder}
          rows={4}
          className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
      </div>

      {/* CENTER: Live QR preview */}
      <div className="flex items-start justify-center">
        <QRPreview />
      </div>

      {/* RIGHT SIDEBAR: Design controls */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">Design</h2>

        <label className="mb-1 block text-xs text-neutral-400">Foreground color</label>
        <input
          type="color" value={foregroundColor}
          onChange={(e) => setForegroundColor(e.target.value)}
          className="mb-4 h-9 w-full rounded-lg border border-white/10 bg-black/30"
        />

        <label className="mb-1 block text-xs text-neutral-400">Background color</label>
        <input
          type="color" value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="mb-4 h-9 w-full rounded-lg border border-white/10 bg-black/30"
        />

        <label className="mb-1 block text-xs text-neutral-400">Margin ({margin})</label>
        <input
          type="range" min={0} max={12} value={margin}
          onChange={(e) => setMargin(Number(e.target.value))}
          className="mb-4 w-full"
        />

        <label className="mb-1 block text-xs text-neutral-400">Error correction</label>
        <select
          value={errorCorrection}
          onChange={(e) => setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>

        <p className="mt-6 text-xs leading-relaxed text-neutral-500">
          Shape, eye style, frames, and logo upload plug into this same panel — this scaffold wires the
          core pipeline end-to-end; the remaining design controls follow the same store → preview pattern.
        </p>
      </div>
    </div>
  );
}
