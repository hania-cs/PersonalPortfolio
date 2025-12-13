import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Utensils, Sparkles, Moon, Zap } from "lucide-react";

type PetMood = "happy" | "hungry" | "sleepy" | "excited" | "sad";

const petFaces: Record<PetMood, string> = {
  happy: "(◕‿◕)",
  hungry: "(◕︿◕)",
  sleepy: "(－ω－)",
  excited: "(★‿★)",
  sad: "(╥﹏╥)",
};

const petColors: Record<PetMood, string> = {
  happy: "from-primary to-cyan-400",
  hungry: "from-orange-400 to-amber-500",
  sleepy: "from-purple-400 to-indigo-500",
  excited: "from-pink-400 to-rose-500",
  sad: "from-slate-400 to-slate-500",
};

export const VirtualPetWindow = () => {
  const [hunger, setHunger] = useState(70);
  const [happiness, setHappiness] = useState(80);
  const [energy, setEnergy] = useState(60);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [petName] = useState("Pixel");

  const getMood = (): PetMood => {
    if (energy < 20) return "sleepy";
    if (hunger < 30) return "hungry";
    if (happiness < 30) return "sad";
    if (happiness > 80 && hunger > 50 && energy > 50) return "excited";
    return "happy";
  };

  const mood = getMood();

  // Stats decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(0, prev - 2));
      setHappiness((prev) => Math.max(0, prev - 1));
      setEnergy((prev) => Math.max(0, prev - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 1500);
  };

  const feed = () => {
    if (hunger >= 100) {
      showMessage("I'm full! 🫃");
      return;
    }
    setIsAnimating(true);
    setHunger((prev) => Math.min(100, prev + 25));
    setEnergy((prev) => Math.min(100, prev + 5));
    showMessage("Yummy! 🍕");
    setTimeout(() => setIsAnimating(false), 500);
  };

  const play = () => {
    if (energy < 10) {
      showMessage("Too tired... 😴");
      return;
    }
    setIsAnimating(true);
    setHappiness((prev) => Math.min(100, prev + 20));
    setEnergy((prev) => Math.max(0, prev - 15));
    setHunger((prev) => Math.max(0, prev - 10));
    showMessage("Wheee! 🎉");
    setTimeout(() => setIsAnimating(false), 500);
  };

  const sleep = () => {
    if (energy >= 100) {
      showMessage("Not sleepy! 😊");
      return;
    }
    setIsAnimating(true);
    setEnergy((prev) => Math.min(100, prev + 30));
    setHunger((prev) => Math.max(0, prev - 5));
    showMessage("Zzz... 💤");
    setTimeout(() => setIsAnimating(false), 500);
  };

  const StatBar = ({ value, icon: Icon, color }: { value: number; icon: React.ElementType; color: string }) => (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color === "text-red-400" ? "bg-red-400" : color === "text-yellow-400" ? "bg-yellow-400" : "bg-blue-400"}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", damping: 15 }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-8">{value}%</span>
    </div>
  );

  return (
    <div className="p-6 flex flex-col items-center min-h-[380px]">
      {/* Pet name */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold text-foreground mb-4"
      >
        {petName}
      </motion.h2>

      {/* Pet container */}
      <div className="relative mb-6">
        {/* Message bubble */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-card border border-glass-border text-sm whitespace-nowrap z-10"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet body */}
        <motion.div
          animate={{
            scale: isAnimating ? [1, 1.1, 1] : 1,
            rotate: isAnimating ? [0, -5, 5, 0] : 0,
            y: [0, -5, 0],
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.3 },
            rotate: { duration: 0.3 },
          }}
          className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${petColors[mood]} flex items-center justify-center shadow-lg relative overflow-hidden`}
        >
          {/* Shine effect */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-sm" />
          
          {/* Face */}
          <span className="text-3xl font-mono text-white select-none drop-shadow-md">
            {petFaces[mood]}
          </span>
        </motion.div>

        {/* Mood indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-background border border-glass-border text-xs capitalize"
        >
          {mood}
        </motion.div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-[200px] space-y-3 mb-6">
        <StatBar value={hunger} icon={Utensils} color="text-yellow-400" />
        <StatBar value={happiness} icon={Heart} color="text-red-400" />
        <StatBar value={energy} icon={Zap} color="text-blue-400" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={feed}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-glass-border"
        >
          <Utensils className="w-5 h-5 text-yellow-400" />
          <span className="text-xs text-muted-foreground">Feed</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={play}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-glass-border"
        >
          <Sparkles className="w-5 h-5 text-pink-400" />
          <span className="text-xs text-muted-foreground">Play</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sleep}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-glass-border"
        >
          <Moon className="w-5 h-5 text-purple-400" />
          <span className="text-xs text-muted-foreground">Sleep</span>
        </motion.button>
      </div>
    </div>
  );
};
