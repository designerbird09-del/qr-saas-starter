import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { accessToken, user } = res.data.data;
      setSession(accessToken, user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <h1 className="mb-6 text-2xl font-semibold">Welcome back</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email" required placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-gray-500"
        />
        <input
          type="password" required placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-gray-500"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit" disabled={loading}
           className="rounded-xl bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] py-2 font-medium text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all duration-300"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-neutral-400">
         No account? <Link to="/register" className="text-neutral-400 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
