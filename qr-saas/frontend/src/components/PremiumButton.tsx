import { motion } from "framer-motion";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "download";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function PremiumButton({ children, onClick, variant = "primary", className = "", disabled, type = "button" }: PremiumButtonProps) {
  const base = "relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300 disabled:opacity-50";
  const variants = {
    primary: "bg-gradient-to-br from-[#d4a574] via-[#c68b59] to-[#b87333] text-[#1a0f0a] shadow-[0_0_15px_rgba(200,140,100,0.25)] hover:shadow-[0_0_30px_rgba(255,180,140,0.45)] hover:brightness-110 active:scale-95",
    secondary: "border border-white/10 bg-white/5 text-neutral-200 hover:border-white/20 hover:bg-white/10",
    ghost: "text-neutral-400 hover:text-neutral-300",
    download: "border border-[#b87333]/30 bg-[#b87333]/10 text-[#d4a574] hover:border-[#b87333] hover:bg-[#b87333]/20 hover:shadow-[0_0_20px_rgba(184,115,51,0.3)] active:scale-95",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
