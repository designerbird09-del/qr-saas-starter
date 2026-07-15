import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

interface QrItem {
  id: string;
  name: string;
  type: string;
  isDynamic: boolean;
  scanCount: number;
  createdAt: string;
}

export function DashboardPage() {
  const [qrs, setQrs] = useState<QrItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/qr")
      .then((res) => setQrs(res.data.data))
      .catch(() => setError("Couldn't load your QR codes. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your QR Codes</h1>
        <Link to="/builder" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-700">
          + New QR Code
        </Link>
      </div>

      {loading && <p className="text-neutral-400">Loading…</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && qrs.length === 0 && (
        <p className="text-neutral-400">No QR codes yet. Create your first one to get started.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {qrs.map((qr) => (
          <div key={qr.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{qr.name}</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-neutral-400">{qr.type}</span>
            </div>
            <p className="text-sm text-neutral-500">
              {qr.isDynamic ? "Dynamic" : "Static"} · {qr.scanCount} scans
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
