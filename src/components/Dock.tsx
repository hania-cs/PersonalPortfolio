import { motion } from "framer-motion";
import { User, FolderOpen, Sparkles, Mail, Briefcase, Heart } from "lucide-react";
import { WindowType } from "./Desktop";

interface DockProps {
  onOpenWindow: (type: WindowType) => void;
  openWindows: WindowType[];
}

const dockItems = [
  { id: "about" as WindowType, icon: User, label: "About" },
  { id: "projects" as WindowType, icon: FolderOpen, label: "Projects" },
  { id: "experience" as WindowType, icon: Briefcase, label: "Experience" },
  { id: "skills" as WindowType, icon: Sparkles, label: "Skills" },
  { id: "contact" as WindowType, icon: Mail, label: "Contact" },
  { id: "pet" as WindowType, icon: Heart, label: "Pet" },
];

export const Dock = ({ onOpenWindow, openWindows }: DockProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 flex justify-center pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="pointer-events-auto flex items-end gap-1 px-3 py-2 sm:px-4 sm:py-3 
                      bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50
                      shadow-2xl shadow-primary/10 max-w-[min(480px,100%-2rem)] w-full justify-center">
        {dockItems.map((item) => {
          const isOpen = openWindows.includes(item.id);
          return (
            <motion.button
              key={item.id}
              onClick={() => onOpenWindow(item.id)}
              whileHover={{ scale: 1.2, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 sm:p-3 rounded-xl hover:bg-foreground/5 
                         active:bg-foreground/10 transition-colors touch-manipulation select-none"
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/70" />
              
              {isOpen && (
                <motion.div
                  layoutId={`indicator-${item.id}`}
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 
                             rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
