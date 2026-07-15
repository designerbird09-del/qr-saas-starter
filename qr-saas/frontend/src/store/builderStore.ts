import { create } from "zustand";

export type QrType =
  | "URL" | "TEXT" | "EMAIL" | "PHONE" | "SMS" | "WHATSAPP"
  | "WIFI" | "CONTACT" | "LOCATION" | "GOOGLE_MAPS" | "UPI" | "SOCIAL";

export type DotShape = "square" | "rounded" | "circle" | "diamond" | "dot";

interface BuilderState {
  type: QrType;
  value: string;
  foregroundColor: string;
  backgroundColor: string;
  dotShape: DotShape;
  margin: number;
  errorCorrection: "L" | "M" | "Q" | "H";

  setType: (t: QrType) => void;
  setValue: (v: string) => void;
  setForegroundColor: (c: string) => void;
  setBackgroundColor: (c: string) => void;
  setDotShape: (s: DotShape) => void;
  setMargin: (m: number) => void;
  setErrorCorrection: (e: "L" | "M" | "Q" | "H") => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  type: "URL",
  value: "",
  foregroundColor: "#000000",
  backgroundColor: "#FFFFFF",
  dotShape: "square",
  margin: 4,
  errorCorrection: "M",

  setType: (type) => set({ type }),
  setValue: (value) => set({ value }),
  setForegroundColor: (foregroundColor) => set({ foregroundColor }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setDotShape: (dotShape) => set({ dotShape }),
  setMargin: (margin) => set({ margin }),
  setErrorCorrection: (errorCorrection) => set({ errorCorrection }),
}));
