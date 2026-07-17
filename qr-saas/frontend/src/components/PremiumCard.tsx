import { motion } from "framer-motion";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export function PremiumCard({ children, className = "", glow = false, onClick }: PremiumCardProps) {
  return (
    <motion.div
      whileHover={{ y: glow ? -4 : 0, scale: glow ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 ${
        glow ? "shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
