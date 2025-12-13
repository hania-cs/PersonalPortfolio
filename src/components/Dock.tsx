import { motion } from "framer-motion";
import { User, FolderOpen, Sparkles, Mail, Github, Linkedin, Briefcase } from "lucide-react";
import { WindowType } from "./Desktop";

interface DockProps {
  onOpenWindow: (type: WindowType) => void;
  openWindows: WindowType[];
}

export const Dock = ({ onOpenWindow, openWindows }: DockProps) => {
  const dockItems = [
    { id: "about" as WindowType, icon: User, label: "About" },
    { id: "projects" as WindowType, icon: FolderOpen, label: "Projects" },
    { id: "experience" as WindowType, icon: Briefcase, label: "Experience" },
    { id: "skills" as WindowType, icon: Sparkles, label: "Skills" },
    { id: "contact" as WindowType, icon: Mail, label: "Contact" },
  ];

  const externalLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/hania-cs" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/hania-seif/" },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
    >
      <div className="glass-strong rounded-2xl px-2 sm:px-4 py-2 sm:py-3 dock-shadow flex items-center gap-1 sm:gap-2 overflow-x-auto">
        {dockItems.map((item) => (
          <DockItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isOpen={openWindows.includes(item.id)}
            onClick={() => onOpenWindow(item.id)}
          />
        ))}

        <div className="w-px h-8 sm:h-10 bg-border mx-1 sm:mx-2 flex-shrink-0" />

        {externalLinks.map((item) => (
          <DockItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface DockItemProps {
  icon: React.ElementType;
  label: string;
  isOpen?: boolean;
  onClick?: () => void;
  href?: string;
}

const DockItem = ({ icon: Icon, label, isOpen, onClick, href }: DockItemProps) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center icon-glow cursor-pointer hover:bg-secondary/80 transition-colors flex-shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>

      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
        {label}
      </div>

      {isOpen && (
        <motion.div
          layoutId={`indicator-${label}`}
          className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary"
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <button onClick={onClick}>{content}</button>;
};
