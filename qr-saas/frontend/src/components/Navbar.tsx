import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <Link to="/" className="text-lg font-semibold tracking-tight">
        QR<span className="text-brand-500">Forge</span>
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/builder" className="text-neutral-300 hover:text-white">Builder</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-neutral-300 hover:text-white">Dashboard</Link>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="rounded-lg bg-white/5 px-3 py-1.5 hover:bg-white/10"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-neutral-300 hover:text-white">Log in</Link>
            <Link to="/register" className="rounded-lg bg-brand-600 px-3 py-1.5 hover:bg-brand-700">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
