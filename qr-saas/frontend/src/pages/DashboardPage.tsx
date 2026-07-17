import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PremiumCard } from "@/components/PremiumCard";
import { PremiumButton } from "@/components/PremiumButton";
import { AnimatedBackground } from "@/components/AnimatedBackground";

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: string;
}

const stats: StatCard[] = [
  { label: "Total QR Codes", value: "1,284", sub: "+12.4% this month", icon: "▦" },
  { label: "Total Scans", value: "48,920", sub: "+8.1% this week", icon: "◎" },
  { label: "Most Popular", value: "URL", sub: "38% of all codes", icon: "🔗" },
  { label: "Avg Scans", value: "38.1", sub: "per QR code", icon: "📈" },
];

const scansOverTime = [
  { day: "Mon", scans: 4200 },
  { day: "Tue", scans: 5300 },
  { day: "Wed", scans: 4800 },
  { day: "Thu", scans: 6700 },
  { day: "Fri", scans: 8100 },
  { day: "Sat", scans: 9200 },
  { day: "Sun", scans: 7400 },
];

const devices = [
  { label: "Mobile", pct: 64, color: "bg-brand-500" },
  { label: "Desktop", pct: 28, color: "bg-emerald-500" },
  { label: "Tablet", pct: 8, color: "bg-purple-500" },
];

const countries = [
  { label: "United States", pct: 32, code: "US" },
  { label: "India", pct: 21, code: "IN" },
  { label: "United Kingdom", pct: 14, code: "GB" },
  { label: "Germany", pct: 11, code: "DE" },
  { label: "Brazil", pct: 9, code: "BR" },
];

const browsers = [
  { label: "Chrome", pct: 58, color: "bg-amber-500" },
  { label: "Safari", pct: 24, color: "bg-sky-500" },
  { label: "Firefox", pct: 9, color: "bg-orange-500" },
  { label: "Edge", pct: 6, color: "bg-teal-500" },
  { label: "Other", pct: 3, color: "bg-neutral-500" },
];

interface RecentQr {
  name: string;
  type: string;
  date: string;
  scans: number;
}

const recentQrs: RecentQr[] = [
  { name: "Product Launch Flyer", type: "URL", date: "Jul 14, 2026", scans: 1240 },
  { name: "Event Check-in", type: "WIFI", date: "Jul 13, 2026", scans: 892 },
  { name: "Support Email", type: "EMAIL", date: "Jul 12, 2026", scans: 431 },
  { name: "Promo SMS", type: "SMS", date: "Jul 11, 2026", scans: 658 },
  { name: "Restaurant Menu", type: "URL", date: "Jul 10, 2026", scans: 2034 },
  { name: "Payment Link", type: "UPI", date: "Jul 9, 2026", scans: 517 },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const maxScans = Math.max(...scansOverTime.map((s) => s.scans));

  return (
    <div className="relative min-h-screen px-4 py-12 sm:px-6">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header with Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">Your Dashboard</h1>
            <p className="mt-2 text-neutral-400">Track your QR codes performance and analytics</p>
          </div>
          <div className="flex gap-3 sm:flex-col lg:flex-row">
            <PremiumButton 
              onClick={() => navigate('/builder')}
              className="gap-2"
            >
              <span>✦</span> Generate QR Code
            </PremiumButton>
            <PremiumButton variant="secondary">Export</PremiumButton>
          </div>
        </motion.div>

        {/* Minimal Stats Grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{s.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-xs text-neutral-400">{s.sub}</p>
                </div>
                <span className="text-2xl opacity-40">{s.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Scans over time - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-300">
                Weekly Scans
              </h2>
              <div className="flex h-48 items-end justify-between gap-2">
                {scansOverTime.map((s, i) => (
                  <div key={s.day} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(s.scans / maxScans) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-cyan-400"
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-xs text-neutral-500">{s.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-300">
                Device Type
              </h2>
              <div className="space-y-4">
                {devices.map((d) => (
                  <div key={d.label}>
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-neutral-300">{d.label}</span>
                      <span className="font-medium text-brand-300">{d.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${d.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className={`h-full rounded-full ${d.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Browser Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-300">
                Top Browsers
              </h2>
              <div className="space-y-4">
                {browsers.map((b) => (
                  <div key={b.label}>
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-neutral-300">{b.label}</span>
                      <span className="font-medium text-brand-300">{b.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className={`h-full rounded-full ${b.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Countries - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-8"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-300">
              Top Countries
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map((c) => (
                <div key={c.label}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <span className="rounded bg-brand-500/20 px-2 py-0.5 font-medium text-brand-300 text-[11px]">
                        {c.code}
                      </span>
                      {c.label}
                    </span>
                    <span className="font-medium text-brand-300">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent QR Codes Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">
                Recent QR Codes
              </h2>
              <PremiumButton 
                variant="ghost" 
                onClick={() => navigate('/builder')}
                className="text-xs"
              >
                Create New +
              </PremiumButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-neutral-500">
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Type</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Scans</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQrs.map((qr) => (
                    <tr 
                      key={qr.name} 
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-neutral-100">{qr.name}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-300">
                          {qr.type}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-neutral-400 text-xs">{qr.date}</td>
                      <td className="py-3 text-right font-semibold text-brand-300">{qr.scans.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
