import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRExampleProps {
  color: string;
  bg: string;
  shape?: "square" | "rounded" | "circle" | "diamond";
  logo?: boolean;
}

export function QRExample({ color, bg, shape = "rounded", logo }: QRExampleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const qr = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "canvas",
      data: "https://qrso.app",
      margin: 10,
      qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "H" },
      imageOptions: { hideBackgroundDots: true, imageSize: 0.5, margin: 15 },
      dotsOptions: {
        color: "#888888",
        type: shape === "square" ? "square" : shape === "circle" ? "dots" : shape === "diamond" ? "square" : "rounded",
      },
      cornersSquareOptions: {
        color: "#888888",
        type: "rounded",
      },
      cornersDotOptions: {
        color: "#888888",
        type: "dot",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      ...(logo && {
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ffffff' width='100' height='100' rx='20'/%3E%3Ctext x='50' y='65' font-size='45' font-weight='bold' text-anchor='middle' fill='%23888888'%3EQ%3C/text%3E%3C/svg%3E",
      }),
    });

    ref.current.innerHTML = "";
    qr.append(ref.current);
  }, [color, bg, shape, logo]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <div ref={ref} className="flex items-center justify-center" />
      </div>
    </div>
  );
}
