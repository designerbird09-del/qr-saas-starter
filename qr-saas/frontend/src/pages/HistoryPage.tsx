import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumCard } from "@/components/PremiumCard";
import { PremiumButton } from "@/components/PremiumButton";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useBuilderStore, QrType } from "@/store/builderStore";

const HISTORY_KEY = "qrso-history";
const FAVORITES_KEY = "qrso-favorites";

interface QrSettings {
  value?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  margin?: number;
  errorCorrection?: "L" | "M" | "Q" | "H";
  dotShape?: "square" | "rounded" | "circle" | "diamond" | "dot";
}

interface SavedQr {
  id: string;
  name: string;
  type: string;
  dataUrl: string;
  settings: QrSettings;
  createdAt: string;
  favorite: boolean;
}

type FilterTab = "All" | "Favorites" | "Recent";

function loadHistory(): SavedQr[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as SavedQr[]) : [];
  } catch {
    return [];
  }
}

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function saveHistory(items: SavedQr[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function HistoryPage() {
  const navigate = useNavigate();
  const { setType, setValue, setForegroundColor, setBackgroundColor, setMargin, setErrorCorrection, setDotShape } =
    useBuilderStore();

  const [items, setItems] = useState<SavedQr[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [tab, setTab] = useState<FilterTab>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setItems(loadHistory());
    setFavorites(loadFavorites());
  }, []);

  function toggleFavorite(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(next);
    saveFavorites(next);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, favorite: next.includes(id) } : it)));
  }

  function deleteQr(id: string) {
    const next = items.filter((it) => it.id !== id);
    setItems(next);
    saveHistory(next);
    const nextFav = favorites.filter((f) => f !== id);
    setFavorites(nextFav);
    saveFavorites(nextFav);
  }

  function clearAll() {
    setItems([]);
    setFavorites([]);
    saveHistory([]);
    saveFavorites([]);
  }

  function reuseQr(qr: SavedQr) {
    setType(qr.type as QrType);
    if (qr.settings.value !== undefined) setValue(qr.settings.value);
    if (qr.settings.foregroundColor) setForegroundColor(qr.settings.foregroundColor);
    if (qr.settings.backgroundColor) setBackgroundColor(qr.settings.backgroundColor);
    if (qr.settings.margin !== undefined) setMargin(qr.settings.margin);
    if (qr.settings.errorCorrection) setErrorCorrection(qr.settings.errorCorrection);
    if (qr.settings.dotShape) setDotShape(qr.settings.dotShape);
    navigate("/builder");
  }

  const filtered = useMemo(() => {
    let list = items;
    if (tab === "Favorites") list = list.filter((it) => favorites.includes(it.id));
    if (tab === "Recent") list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((it) => it.name.toLowerCase().includes(q));
    }
    if (tab === "All" || tab === "Favorites") {
      list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return list;
  }, [items, favorites, tab, query]);

  const tabs: FilterTab[] = ["All", "Favorites", "Recent"];

  return (
    <div className="relative min-h-screen px-6 py-10">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-3xl font-bold text-transparent">
              Your QR History
            </h1>
            <p className="mt-1 text-sm text-neutral-400">
              {items.length} saved {items.length === 1 ? "code" : "codes"} stored on this device.
            </p>
          </div>
          {items.length > 0 && (
            <PremiumButton variant="secondary" onClick={clearAll}>
              Clear All
            </PremiumButton>
          )}
        </motion.div>

        {items.length > 0 && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                   className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      tab === t
                        ? "bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)]"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10"
                   }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name…"
               className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 sm:w-72"
            />
          </div>
        )}

        {items.length === 0 ? (
          <PremiumCard glow className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">🗂️</div>
            <h3 className="text-lg font-semibold text-white">No QR codes yet</h3>
            <p className="mt-2 max-w-sm text-sm text-neutral-400">
              Your generated QR codes will appear here. Create one and it'll be saved automatically.
            </p>
            <div className="mt-6">
              <PremiumButton onClick={() => navigate("/builder")}>Create QR Code</PremiumButton>
            </div>
          </PremiumCard>
        ) : filtered.length === 0 ? (
          <PremiumCard className="py-16 text-center text-neutral-400">
            No results match your filters.
          </PremiumCard>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filtered.map((qr) => {
                const isFav = favorites.includes(qr.id);
                return (
                  <motion.div
                    key={qr.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PremiumCard glow className="flex flex-col">
                      <div className="mb-4 flex items-start justify-between">
                        <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
                          {qr.type}
                        </span>
                        <button
                          onClick={() => toggleFavorite(qr.id)}
                          aria-label="Toggle favorite"
                          className="text-lg leading-none transition hover:scale-110"
                        >
                          {isFav ? "❤️" : "🤍"}
                        </button>
                      </div>

                      <div className="mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-xl bg-white p-3">
                        {qr.dataUrl ? (
                          <img src={qr.dataUrl} alt={qr.name} className="h-full w-full object-contain" />
                        ) : (
                          <div className="text-center text-xs text-neutral-400">No preview</div>
                        )}
                      </div>

                      <h3 className="truncate font-medium text-white" title={qr.name}>
                        {qr.name}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500">{formatDate(qr.createdAt)}</p>

                      <div className="mt-4 flex items-center gap-2">
                        <PremiumButton variant="secondary" className="flex-1 px-3 py-2 text-xs" onClick={() => reuseQr(qr)}>
                          Reuse
                        </PremiumButton>
                        <button
                          onClick={() => deleteQr(qr.id)}
                          aria-label="Delete"
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300 transition hover:bg-red-500/20 hover:text-red-300"
                        >
                          🗑️
                        </button>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
