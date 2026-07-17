export function QLogo({ className = "" }: { className?: string }) {
  const base =
    "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] shadow-[0_0_20px_rgba(200,140,100,0.35)]";
  return (
    <span className={`${base} ${className}`}>
      <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
      <svg
        viewBox="0 0 64 64"
        className="relative h-[60%] w-[60%]"
        role="img"
        aria-label="QRSO"
      >
        <g fill="none" stroke="#1a0f0a" strokeWidth="7" strokeLinecap="round">
          <circle cx="32" cy="29" r="17" />
          <path d="M44 41 L54 52" />
        </g>
      </svg>
    </span>
  );
}
