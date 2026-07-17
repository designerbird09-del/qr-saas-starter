import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface TemplateMockupProps {
  template: {
    name: string;
    color: string;
    bg: string;
    shape: string;
    logo: boolean;
  };
}

export function TemplateMockup({ template }: TemplateMockupProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const qr = new QRCodeStyling({
      width: 100,
      height: 100,
      type: "canvas",
      data: "https://qrso.app",
      margin: 3,
      qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "H" },
      imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
      dotsOptions: {
        color: "#888888",
        type: template.shape === "square" ? "square" : template.shape === "circle" ? "dots" : template.shape === "diamond" ? "square" : "rounded",
      },
      cornersSquareOptions: { color: "#888888", type: "rounded" },
      cornersDotOptions: { color: "#888888", type: "dot" },
      backgroundOptions: { color: "#f5f5f5" },
      ...(template.logo && {
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ffffff' width='100' height='100' rx='20'/%3E%3Ctext x='50' y='65' font-size='45' font-weight='bold' text-anchor='middle' fill='%23888888'%3EQ%3C/text%3E%3C/svg%3E",
      }),
    });

    qrRef.current.innerHTML = "";
    qr.append(qrRef.current);
  }, [template]);

  return (
    <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52">
      {template.name === "Restaurant Menu" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="h-2.5 w-16 rounded-full bg-gray-900/20" />
              <div className="mt-1 h-1.5 w-12 rounded-full bg-gray-900/15" />
            </div>
            <div className="h-8 w-8 rounded-full border-2 border-dashed border-gray-900/30" />
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded-full bg-gray-900/15" />
            <div className="h-1.5 w-3/4 rounded-full bg-gray-900/15" />
            <div className="h-1.5 w-1/2 rounded-full bg-gray-900/15" />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/60 p-2">
            <div>
              <div className="h-1.5 w-20 rounded-full bg-gray-900/20 mb-1" />
              <div className="h-1 w-16 rounded-full bg-gray-900/15" />
            </div>
            <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
          </div>
        </div>
      )}

      {template.name === "Business Card" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-50 to-gray-100 p-4 shadow-2xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <div>
              <div className="h-2 w-16 rounded-full bg-slate-900/20" />
              <div className="mt-1 h-1.5 w-12 rounded-full bg-slate-900/15" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-slate-900/15" />
            <div className="h-1.5 w-3/4 rounded-full bg-slate-900/15" />
          </div>
          <div className="mt-auto flex items-center justify-between rounded-xl bg-white/80 p-2">
            <div>
              <div className="h-1.5 w-16 rounded-full bg-slate-900/20 mb-1" />
              <div className="h-1 w-12 rounded-full bg-slate-900/15" />
            </div>
            <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
          </div>
        </div>
      )}

      {template.name === "Event Ticket" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <div className="h-2 w-12 rounded-full bg-gray-900/20" />
            <div className="h-6 w-6 rounded-full border-2 border-dashed border-gray-900/30" />
          </div>
          <div className="rounded-xl border-2 border-dashed border-gray-900/20 bg-white/60 p-3">
            <div className="mb-2 h-2 w-16 rounded-full bg-gray-900/20" />
            <div className="mb-1 h-1.5 w-24 rounded-full bg-gray-900/15" />
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
              <div>
                <div className="h-1.5 w-14 rounded-full bg-gray-900/20 mb-1" />
                <div className="h-1 w-10 rounded-full bg-gray-900/15" />
              </div>
              <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
            </div>
          </div>
        </div>
      )}

      {template.name === "Product Packaging" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-50 to-slate-100 p-4 shadow-2xl">
          <div className="mb-2 h-16 rounded-lg border-2 border-dashed border-gray-900/20 bg-white/40" />
          <div className="mb-2 h-1.5 w-full rounded-full bg-gray-900/15" />
          <div className="mb-3 h-1.5 w-2/3 rounded-full bg-gray-900/15" />
          <div className="flex items-center justify-between rounded-xl bg-white/80 p-2">
            <div>
              <div className="h-1.5 w-16 rounded-full bg-gray-900/20 mb-1" />
              <div className="h-1 w-12 rounded-full bg-gray-900/15" />
            </div>
            <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
          </div>
        </div>
      )}

      {template.name === "Real Estate" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-50 to-slate-100 p-4 shadow-2xl">
          <div className="mb-2 h-16 rounded-lg bg-slate-200/60" />
          <div className="mb-2 h-2 w-16 rounded-full bg-slate-900/20" />
          <div className="mb-1 h-1.5 w-24 rounded-full bg-slate-900/15" />
          <div className="flex items-center justify-between rounded-xl bg-white/80 p-2">
            <div>
              <div className="h-1.5 w-16 rounded-full bg-slate-900/20 mb-1" />
              <div className="h-1 w-12 rounded-full bg-slate-900/15" />
            </div>
            <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
          </div>
        </div>
      )}

      {template.name === "Social Media" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 p-4 shadow-2xl">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-400/80" />
            <div className="h-2 w-16 rounded-full bg-white/20" />
          </div>
          <div className="mb-2 h-1.5 w-full rounded-full bg-white/10" />
          <div className="mb-1 h-1.5 w-3/4 rounded-full bg-white/10" />
          <div className="flex items-center justify-between rounded-xl bg-white/10 p-2">
            <div>
              <div className="h-1.5 w-14 rounded-full bg-white/20 mb-1" />
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>
            <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
          </div>
        </div>
      )}

      {template.name === "Wedding Invitation" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-2xl">
          <div className="mb-2 text-center">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-900/20 mb-1" />
            <div className="mx-auto h-1 w-16 rounded-full bg-gray-900/15" />
          </div>
          <div className="mb-2 h-px w-full bg-gray-900/10" />
          <div className="space-y-1">
            <div className="h-1.5 w-3/4 mx-auto rounded-full bg-gray-900/15" />
            <div className="h-1.5 w-1/2 mx-auto rounded-full bg-gray-900/10" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-6 w-6 rounded-full border border-gray-900/20" />
            <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
            <div className="h-6 w-6 rounded-full border border-gray-900/20" />
          </div>
        </div>
      )}

      {template.name === "Payment QR" && (
        <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="h-2 w-16 rounded-full bg-gray-900/20" />
              <div className="mt-1 h-1.5 w-12 rounded-full bg-gray-900/15" />
            </div>
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-full bg-gray-900/15" />
              <div className="h-3 w-3 rounded-full bg-gray-900/15" />
            </div>
          </div>
          <div className="rounded-xl border border-gray-900/10 bg-white/80 p-3">
            <div className="mb-2 flex items-center justify-center">
              <div ref={qrRef} className="rounded-lg bg-white p-1 shadow-sm" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-16 rounded-full bg-gray-900/20" />
              <div className="h-1.5 w-12 rounded-full bg-gray-900/15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
