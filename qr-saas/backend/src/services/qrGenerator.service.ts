import QRCode from "qrcode";

export interface QrDesignOptions {
  foregroundColor?: string;
  backgroundColor?: string;
  margin?: number;
  errorCorrection?: "L" | "M" | "Q" | "H";
}

export function buildPayload(type: string, value: string): string {
  switch (type) {
    case "EMAIL":
      return `mailto:${value}`;
    case "PHONE":
      return `tel:${value}`;
    case "SMS":
      return `sms:${value}`;
    case "WHATSAPP":
      return `https://wa.me/${value.replace(/[^\d]/g, "")}`;
    case "GOOGLE_MAPS":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
    case "EVENT":
      return value;
    case "CALENDAR":
      return value;
    case "APP_DOWNLOAD":
      return value;
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

export async function generateQrPngDataUrl(payload: string, opts: QrDesignOptions = {}): Promise<string> {
  return QRCode.toDataURL(payload, {
    margin: opts.margin ?? 4,
    color: {
      dark: opts.foregroundColor ?? "#000000",
      light: opts.backgroundColor ?? "#FFFFFF",
    },
    errorCorrectionLevel: opts.errorCorrection ?? "M",
    width: 512,
  });
}

export async function generateQrSvg(payload: string, opts: QrDesignOptions = {}): Promise<string> {
  return QRCode.toString(payload, {
    type: "svg",
    margin: opts.margin ?? 4,
    color: {
      dark: opts.foregroundColor ?? "#000000",
      light: opts.backgroundColor ?? "#FFFFFF",
    },
    errorCorrectionLevel: opts.errorCorrection ?? "M",
  });
}
