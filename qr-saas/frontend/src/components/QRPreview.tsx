import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useBuilderStore } from "@/store/builderStore";

export function QRPreview() {
  const { type, value, foregroundColor, backgroundColor, margin, errorCorrection } = useBuilderStore();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value.trim()) {
      setDataUrl(null);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.post("/qr/render", {
          type, value, foregroundColor, backgroundColor, margin, errorCorrection,
        });
        setDataUrl(res.data.data.dataUrl);
        setError(null);
      } catch {
        setError("Couldn't render preview. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }, 300); // debounce live typing

    return () => clearTimeout(timer);
  }, [type, value, foregroundColor, backgroundColor, margin, errorCorrection]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="flex h-72 w-72 items-center justify-center rounded-xl bg-white">
        {dataUrl ? (
          <img src={dataUrl} alt="QR code preview" className="h-64 w-64" />
        ) : (
          <span className="px-6 text-center text-sm text-neutral-500">
            {error ?? (loading ? "Rendering…" : "Enter content on the left to generate your QR code")}
          </span>
        )}
      </div>
      <a
        href={dataUrl ?? undefined}
        download="qrcode.png"
        aria-disabled={!dataUrl}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          dataUrl ? "bg-brand-600 hover:bg-brand-700" : "cursor-not-allowed bg-neutral-800 text-neutral-500"
        }`}
      >
        Download PNG
      </a>
    </div>
  );
}
