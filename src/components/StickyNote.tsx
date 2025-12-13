import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StickyNoteProps {
  children: ReactNode;
  color: "yellow" | "pink" | "blue" | "green";
  rotation?: number;
  delay?: number;
}

const colorClasses = {
  yellow: "bg-sticky-yellow",
  pink: "bg-sticky-pink",
  blue: "bg-sticky-blue",
  green: "bg-sticky-green",
};

export const StickyNote = ({ children, color, rotation = 0, delay = 0 }: StickyNoteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      className={`${colorClasses[color]} p-4 rounded-lg shadow-lg cursor-default w-36 sm:w-44 sticky-shadow`}
      style={{ transformOrigin: "center center" }}
    >
      <div className="text-sticky-text text-sm font-medium leading-relaxed">
        {children}
      </div>
      {/* Tape effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/40 rounded-sm" />
    </motion.div>
  );
};
