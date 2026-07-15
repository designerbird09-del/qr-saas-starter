import QRCode from "qrcode";

export interface QrDesignOptions {
  foregroundColor?: string;
  backgroundColor?: string;
  margin?: number;
  errorCorrection?: "L" | "M" | "Q" | "H";
}

/**
 * Builds the raw string payload to encode, based on QR type.
 * This mirrors the frontend's client-side encoder so previews match final output.
 */
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
    default:
      // URL, TEXT, WIFI, CONTACT, LOCATION, UPI, SOCIAL: value is passed through
      // (WIFI/CONTACT/UPI payloads are pre-formatted by the frontend form before reaching here)
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
