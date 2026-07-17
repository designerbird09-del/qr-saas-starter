import { create } from "zustand";

export type QrType =
  | "URL" | "TEXT" | "EMAIL" | "PHONE" | "SMS" | "WHATSAPP"
  | "WIFI" | "CONTACT" | "LOCATION" | "GOOGLE_MAPS" | "UPI" | "SOCIAL"
  | "EVENT" | "CALENDAR" | "APP_DOWNLOAD" | "INSTAGRAM" | "FACEBOOK"
  | "X" | "LINKEDIN" | "YOUTUBE" | "TELEGRAM" | "DISCORD" | "PAYPAL"
  | "STRIPE" | "PDF" | "IMAGE" | "VIDEO" | "MULTI_LINK"
  | "BITCOIN" | "PAYTM" | "PHONEPE" | "GOOGLE_PAY" | "TIKTOK"
  | "PINTEREST" | "MECARD" | "COUPON" | "RESTAURANT_MENU"
  | "GOOGLE_REVIEW" | "CUSTOM_LANDING" | "DYNAMIC";

export interface BuilderFormData {
  name?: string;
  email?: string;
  subject?: string;
  phone?: string;
  message?: string;
  wifiPassword?: string;
  wifiSecurity?: "WPA" | "WEP" | "nopass";
  contactName?: string;
  contactLastName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactWebsite?: string;
  contactAddress?: string;
  contactCompany?: string;
  contactImage?: string;
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  appStoreUrl?: string;
  multiLinks?: { label: string; url: string }[];
  upiId?: string;
  upiName?: string;
  upiAmount?: string;
  upiNote?: string;
  bitcoinAddress?: string;
  reviewBusinessName?: string;
  reviewUrl?: string;
  couponCode?: string;
  couponDiscount?: string;
  restaurantItems?: { name: string; price: string }[];
  landingUrl?: string;
  dynamicDestination?: string;
}

export type DotShape = "square" | "rounded" | "circle" | "diamond" | "dot";
export type EyeStyle = "square" | "rounded" | "circle" | "neon";
export type GradientType = "none" | "linear" | "radial";
export type LogoBgShape = "none" | "circle" | "rounded" | "square";
export type FrameStyle = "none" | "Scan Me" | "Follow Us" | "Visit Website" | "Download App" | "Connect With Us" | "Restaurant Menu" | "Event Entry" | "Custom";

interface BuilderState {
  type: QrType;
  value: string;
  formData: BuilderFormData;
  foregroundColor: string;
  backgroundColor: string;
  gradientEnabled: boolean;
  gradientType: GradientType;
  gradientStart: string;
  gradientEnd: string;
  dotShape: DotShape;
  eyeStyle: EyeStyle;
  margin: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  opacity: number;
  logoUrl: string;
  logoSize: number;
  logoPadding: number;
  logoBgShape: LogoBgShape;
  frameStyle: FrameStyle;
  frameText: string;
  name: string;
  socialLogoEnabled: boolean;

  setType: (t: QrType) => void;
  setValue: (v: string) => void;
  setFormData: (d: Partial<BuilderFormData>) => void;
  setForegroundColor: (c: string) => void;
  setBackgroundColor: (c: string) => void;
  setGradientEnabled: (v: boolean) => void;
  setGradientType: (t: GradientType) => void;
  setGradientStart: (c: string) => void;
  setGradientEnd: (c: string) => void;
  setDotShape: (s: DotShape) => void;
  setEyeStyle: (s: EyeStyle) => void;
  setMargin: (m: number) => void;
  setErrorCorrection: (e: "L" | "M" | "Q" | "H") => void;
  setOpacity: (o: number) => void;
  setLogoUrl: (u: string) => void;
  setLogoSize: (s: number) => void;
  setLogoPadding: (p: number) => void;
  setLogoBgShape: (s: LogoBgShape) => void;
  setFrameStyle: (s: FrameStyle) => void;
  setFrameText: (t: string) => void;
  setName: (n: string) => void;
  setSocialLogoEnabled: (v: boolean) => void;
  reset: () => void;
}

const initialState = {
  type: "URL" as QrType,
  value: "",
  formData: {} as BuilderFormData,
  foregroundColor: "#000000",
  backgroundColor: "#FFFFFF",
  gradientEnabled: false,
  gradientType: "linear" as GradientType,
  gradientStart: "#6366f1",
  gradientEnd: "#a855f7",
  dotShape: "square" as DotShape,
  eyeStyle: "square" as EyeStyle,
  margin: 4,
  errorCorrection: "M" as const,
  opacity: 1,
  logoUrl: "",
  logoSize: 40,
  logoPadding: 5,
  logoBgShape: "none" as LogoBgShape,
  frameStyle: "none" as FrameStyle,
  frameText: "",
  name: "",
  socialLogoEnabled: true,
};

export const useBuilderStore = create<BuilderState>((set) => ({
  ...initialState,

  setType: (type) => set({ type }),
  setValue: (value) => set({ value }),
  setFormData: (formData) => set((s) => ({ formData: { ...s.formData, ...formData } })),
  setForegroundColor: (foregroundColor) => set({ foregroundColor }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setGradientEnabled: (gradientEnabled) => set({ gradientEnabled }),
  setGradientType: (gradientType) => set({ gradientType }),
  setGradientStart: (gradientStart) => set({ gradientStart }),
  setGradientEnd: (gradientEnd) => set({ gradientEnd }),
  setDotShape: (dotShape) => set({ dotShape }),
  setEyeStyle: (eyeStyle) => set({ eyeStyle }),
  setMargin: (margin) => set({ margin }),
  setErrorCorrection: (errorCorrection) => set({ errorCorrection }),
  setOpacity: (opacity) => set({ opacity }),
  setLogoUrl: (logoUrl) => set({ logoUrl }),
  setLogoSize: (logoSize) => set({ logoSize }),
  setLogoPadding: (logoPadding) => set({ logoPadding }),
  setLogoBgShape: (logoBgShape) => set({ logoBgShape }),
  setFrameStyle: (frameStyle) => set({ frameStyle }),
  setFrameText: (frameText) => set({ frameText }),
  setName: (name) => set({ name }),
  setSocialLogoEnabled: (socialLogoEnabled) => set({ socialLogoEnabled }),
  reset: () => set(initialState),
}));
