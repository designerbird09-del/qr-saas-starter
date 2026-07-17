import { Link, useNavigate } from "react-router-dom";
import { QLogo } from "@/components/QLogo";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 px-6 py-4 backdrop-blur-xl">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-lg font-bold tracking-tight">
        <QLogo className="h-10 w-10 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,180,140,0.55)]" />
        <span className="bg-gradient-to-r from-[#d4a574] to-[#c68b59] bg-clip-text text-transparent">QRSO</span>
      </button>
      <div className="flex items-center gap-2 sm:gap-3 text-sm">
        <Link to="/builder" className="text-neutral-300 hover:text-white transition">Builder</Link>
        <Link to="/history" className="hidden text-neutral-300 hover:text-white transition sm:inline">History</Link>
        <Link to="/blog" className="hidden text-neutral-300 hover:text-white transition sm:inline">Blog</Link>
        <Link to="/pricing" className="hidden text-neutral-300 hover:text-white transition sm:inline">Pricing</Link>
        <Link to="/login" className="rounded-xl bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] px-4 py-1.5 font-medium text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)] hover:brightness-110 active:scale-95 transition-all duration-300">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
