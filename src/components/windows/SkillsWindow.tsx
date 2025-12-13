import { motion } from "framer-motion";

const skills = {
  "Languages": [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
  ],
  "Frontend": [
    { name: "React", level: 90 },
    { name: "Next.js", level: 70 },
    { name: "TailwindCSS", level: 95 },
  ],
  "Backend & Tools": [
    { name: "Node.js", level: 85 },
    { name: "PostgreSQL", level: 75 },
        { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 70 },
  ],
  "Version Control & DevOps": [
    { name: "Git", level: 90 },
    { name: "Docker", level: 65 },
  ],
};

export const SkillsWindow = () => {
  return (
    <div className="p-6 space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-foreground"
      >
        Skills & Technologies
      </motion.h2>

      <div className="space-y-6">
        {Object.entries(skills).map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              {category}
            </h3>
            <div className="space-y-3">
              {items.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-4 pt-4 border-t border-glass-border"
      >
        
      </motion.div>
    </div>
  );
};
