import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const WelcomeWidget = () => {
  const roles = ["Web Developer", "Creative Thinker", "Problem Solver", "Tech Enthusiast"];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-strong rounded-2xl px-8 py-6 text-center window-shadow"
    >
      <p className="text-sm text-muted-foreground mb-1">{getGreeting()}, I'm</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
        Hania Seifeldeen
      </h1>
      <div className="h-7 flex items-center justify-center">
        <span className="text-lg text-primary font-medium">
          {displayText}
          <span className="animate-pulse">|</span>
        </span>
      </div>
    </motion.div>
  );
};
