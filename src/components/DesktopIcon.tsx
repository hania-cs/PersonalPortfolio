import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  delay?: number;
}

export const DesktopIcon = ({ icon: Icon, label, onClick, delay = 0 }: DesktopIconProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:bg-secondary/50 group cursor-pointer"
    >
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:glow-primary transition-all duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.button>
  );
};
