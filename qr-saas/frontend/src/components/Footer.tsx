import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/10 px-6 py-10 text-sm text-neutral-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link to="/" className="text-base font-semibold tracking-tight text-white">
            QR<span className="text-brand-500">Forge</span>
          </Link>
          <p className="text-neutral-500">QR codes, built for scale.</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/builder" className="hover:text-white">Builder</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/login" className="hover:text-white">Log in</Link>
          <Link to="/register" className="hover:text-white">Sign up</Link>
        </nav>

        <p className="text-neutral-500">© {year} QRForge. All rights reserved.</p>
      </div>
    </footer>
  );
}
