import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { useBuilderStore, QrType } from "@/store/builderStore";

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

export function QRPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const {
    type, value, formData, foregroundColor, backgroundColor,
    gradientEnabled, gradientType, gradientStart, gradientEnd,
    dotShape, eyeStyle, margin, errorCorrection, opacity,
    logoUrl, logoSize, logoPadding, logoBgShape,
    frameStyle, frameText,
  } = useBuilderStore();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const qr = new QRCodeStyling({
      width: 512,
      margin,
      qrOptions: {
        errorCorrectionLevel: errorCorrection,
      },
      dotsOptions: {
        type: DOT_SHAPE_MAP[dotShape] || "square",
        color: gradientEnabled ? undefined : foregroundColor,
      },
      cornersSquareOptions: {
        type: EYE_STYLE_MAP[eyeStyle] || "square",
        color: gradientEnabled ? undefined : foregroundColor,
      },
      cornersDotOptions: {
        type: EYE_STYLE_MAP[eyeStyle] || "square",
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
      },
    });

    qrRef.current = qr;
    qr.append(containerRef.current);

    return () => {
      qrRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    const qr = qrRef.current;
    if (!qr) return;

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        let payload = buildPayload(type, value, formData);

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

        const blob = await qr.getRawData("png");
        if (blob) {
          const url = URL.createObjectURL(blob);
          setDataUrl(url);
          setError(null);
        } else {
          setError("Failed to render QR code");
        }
      } catch (e) {
        setError("Couldn't render preview.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [type, value, formData, foregroundColor, backgroundColor, gradientEnabled, gradientType, gradientStart, gradientEnd, dotShape, eyeStyle, margin, errorCorrection, opacity, logoUrl, logoSize, logoPadding, logoBgShape, frameStyle, frameText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = container.querySelector("canvas");
    const svg = container.querySelector("svg");
    const target = canvas || svg;
    if (target) {
      if (canvas) {
        const parent = canvas.parentElement;
        if (parent) {
          const parentWidth = parent.clientWidth;
          const parentHeight = parent.clientHeight;
          const size = Math.min(parentWidth, parentHeight, 512);
          canvas.style.width = `${size}px`;
          canvas.style.height = `${size}px`;
        }
      }
      if (svg) {
        svg.style.maxWidth = "100%";
        svg.style.maxHeight = "100%";
        svg.style.width = "auto";
        svg.style.height = "auto";
      }
    }
  }, [dataUrl, type, value, formData, foregroundColor, backgroundColor, gradientEnabled, gradientType, gradientStart, gradientEnd, dotShape, eyeStyle, margin, errorCorrection, logoUrl, logoSize, logoPadding, logoBgShape, frameStyle, frameText]);

  return (
    <>
      <style>{`
        .qr-aspect {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1 / 1;
        }
        .qr-aspect .qr-canvas canvas,
        .qr-aspect .qr-canvas svg {
          max-width: 100% !important;
          max-height: 100% !important;
          width: auto !important;
          height: auto !important;
          display: block;
          margin: 0 auto;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
        <div className="flex w-full justify-center" style={{ opacity }}>
          <div className={`flex w-full max-w-[400px] flex-col items-center gap-3 ${frameStyle !== "none" && frameText ? "rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-transparent p-4" : ""}`}>
            <div className={`qr-aspect relative w-full overflow-hidden bg-white ${frameStyle !== "none" && frameText ? "rounded-lg" : "rounded-xl"}`}>
              <div
                ref={containerRef}
                className="qr-canvas relative flex h-full w-full items-center justify-center"
                style={{ backgroundColor }}
              />
            </div>
            {frameStyle !== "none" && frameText && (
              <span className="text-xs font-medium text-neutral-300">{frameText}</span>
            )}
          </div>
        </div>
        {!dataUrl && (
          <span className="px-6 text-center text-sm text-neutral-500">
            {error ?? (loading ? "Rendering…" : "Enter content on the left to generate your QR code")}
          </span>
        )}
        {dataUrl && (
          <ScanQualityIndicator
            errorCorrection={errorCorrection}
            hasLogo={!!logoUrl}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
          />
        )}
      </div>
    </>
  );
}

function buildPayload(type: string, value: string, formData: any): string {
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
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.contactName || value} ${formData.contactLastName || ""}\nORG:${formData.contactCompany || ""}\nTEL:${formData.contactPhone || ""}\nEMAIL:${formData.contactEmail || ""}\nURL:${formData.contactWebsite || ""}\nADR:${formData.contactAddress || ""}\nEND:VCARD`;
    case "LOCATION":
      return `geo:0,0?q=${encodeURIComponent(value)}`;
    case "GOOGLE_MAPS":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
    case "UPI":
      return `upi://pay?pa=${value}&pn=${encodeURIComponent(formData.upiName || "QRSO")}&am=${formData.upiAmount || ""}&tn=${encodeURIComponent(formData.upiNote || "")}`;
    case "SOCIAL":
      return `https://${value.replace(/^@/, "")}`;
    case "EVENT":
      return `BEGIN:VEVENT\nSUMMARY:${formData.eventName || value}\nDTSTART:${formData.eventDate || ""}\nDTEND:${formData.eventDate || ""}\nLOCATION:${formData.eventLocation || ""}\nEND:VEVENT`;
    case "CALENDAR":
      return value;
    case "APP_DOWNLOAD":
      return formData.appStoreUrl || value;
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
    case "BITCOIN":
      return `bitcoin:${value}`;
    case "PAYTM":
      return `https://paytm.com/${value.replace(/^@/, "")}`;
    case "PHONEPE":
      return `https://phonepay.com/${value.replace(/^@/, "")}`;
    case "GOOGLE_PAY":
      return `https://pay.google.com/${value.replace(/^@/, "")}`;
    case "TIKTOK":
      return `https://tiktok.com/@${value.replace(/^@/, "")}`;
    case "PINTEREST":
      return `https://pinterest.com/${value.replace(/^@/, "")}`;
    case "MECARD":
      return `MECARD:N:${formData.contactName || value};TEL:${formData.contactPhone || ""};EMAIL:${formData.contactEmail || ""};;`;
    case "COUPON":
      return `https://example.com/coupon?code=${encodeURIComponent(formData.couponCode || value)}&discount=${encodeURIComponent(formData.couponDiscount || "")}`;
    case "RESTAURANT_MENU":
      return `https://example.com/menu?items=${encodeURIComponent(JSON.stringify(formData.restaurantItems || []))}`;
    case "GOOGLE_REVIEW":
      return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(formData.reviewBusinessName || value)}`;
    case "CUSTOM_LANDING":
      return formData.landingUrl || value;
    case "DYNAMIC":
      return formData.dynamicDestination || value;
    default:
      return value;
  }
}

function ScanQualityIndicator({ errorCorrection, hasLogo, foregroundColor, backgroundColor }: { errorCorrection: string; hasLogo: boolean; foregroundColor: string; backgroundColor: string }) {
  let score: "Excellent" | "Good" | "Warning" = "Good";
  let color = "text-yellow-400";
  let dotColor = "bg-yellow-400";

  const fgLuminance = getLuminance(foregroundColor);
  const bgLuminance = getLuminance(backgroundColor);
  const contrast = Math.abs(fgLuminance - bgLuminance);

  if (errorCorrection === "H" && !hasLogo && contrast > 0.5) {
    score = "Excellent";
    color = "text-emerald-400";
    dotColor = "bg-emerald-400";
  } else if (errorCorrection === "L" || hasLogo || contrast < 0.3) {
    score = "Warning";
    color = "text-red-400";
    dotColor = "bg-red-400";
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span className="text-xs font-medium text-neutral-300">Scanability:</span>
      <span className={`text-xs font-semibold ${color}`}>{score}</span>
    </div>
  );
}

function getLuminance(hex: string): number {
  const rgb = hex.replace("#", "").match(/.{2}/g)?.map((c) => parseInt(c, 16)) || [0, 0, 0];
  const [r, g, b] = rgb.map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
