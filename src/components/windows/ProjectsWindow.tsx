import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  
  {
    title: "Vertexa Digital Studio",
    description:
      "Designed and developed the official Vertexa Digital Studio website using React, creating a modern, responsive, and user-friendly platform. Focused on clean design, smooth navigation, and performance optimization to deliver a professional online presence.",
    tech: ["ReactJS", "CSS"],
    link: "https://www.vertexa.digital",
    github: "https://github.com/hania-cs/Vertexa-Digital-Studios",
    gradient: "from-primary to-cyan-400",
    type: "code",
  },
  {
    title: "Karm El Anab",
    description:
      "Developed a role-based farmer and admin management web application using React, TypeScript, Vite, TailwindCSS, Supabase, PostgreSQL and shadcn-ui for a university student's project that enables admin-approved farmer authentication, farm and ground data management, equipment rental requests, and centralized administrative control with a relational database–driven design.",
    tech: ["ReactTS", "TailwindCSS", "Supabase", "shadcn-ui", "Vite", "PostgreSQL",],
    link: "https://karm3inab.vercel.app/",
    github: "https://github.com/hania-cs/Karm_El_Anab",
    gradient: "from-primary to-cyan-400",
    type: "code",
  },
  {
    title: "CrispyTime",
    description:
      "Designed and developed a responsive, sleek designed restaurant website using ReactTS, Vite, TailwindCSS and shadcn-ui, that allows users to add menu items to a cart, manage order quantities, and send the finalized order to the restaurant via WhatsApp in a structured, readable message format.",
    tech: ["ReactTS", "TailwindCSS", "shadcn-ui", "Vite"],
    link: "https://crispy-time.vercel.app/",
    github: "https://github.com/hania-cs/CrispyTime",
    gradient: "from-primary to-cyan-400",
    type: "code",
  },
  {
    title: "Connect Services SARL",
    description:
      "Designed and developed the official ConnectServices SARL website using React, creating a modern, responsive, and user-friendly platform. Focused on clean design, smooth navigation, and performance optimization to deliver a professional online presence.",
    tech: ["ReactJS", "CSS"],
    link: "https://www.connect-services.me",
    github: "https://github.com/hania-cs/ConnectServicesSARL",
    gradient: "from-primary to-cyan-400",
    type: "code",
  },
  {
    title: "Yanta Municipality Website",
    description:
      "I helped develop the frontend of Yanta Municipality's website, creating a responsive and user-friendly interface that allows residents and visitors to access municipal information, announcements, and services easily.",
    tech: ["Next.js"],
    link: "https://www.yanta-leb.com/en",
    gradient: "from-accent to-pink-400",
    type: "code",
  },
  {
    title: "Glitch Portfolio Site",
    description:
      "Built a glitch-inspired portfolio using React, Vite, and CSS to showcase projects and experience, featuring responsive design and creative visual effects",
    tech: ["ReactJS", "CSS"],
    link: "https://glitch-portfolio-teal.vercel.app/",
    github: "https://github.com/hania-cs/GlitchPortfolio",
    gradient: "from-green-400 to-emerald-500",
    type: "code",
  },
  {
    title: "Tiramisu Shop",
    description:
      "Built a responsive single-page website for a tiramisu shop, built with React and Vite. Showcases products with a clean design, fast performance, and seamless deployment on Vercel.",
    tech: ["ReactJS", "CSS"],
    link: "https://glitch-portfolio-teal.vercel.app/",
    github: "https://github.com/hania-cs/TiramisuChoice",
    gradient: "from-accent to-pink-400",
    type: "code",
  },
  {
    title: "Student Portfolio - Manuela Frierre Portfolio",
    description:
      "Created a responsive React portfolio to showcase a psychology student's skills, research, and achievements with a clean and user-friendly design.",
    tech: ["ReactJS", "CSS"],
    link: "https://manuelaportfolio.vercel.app/",
    github: "https://github.com/hania-cs/ManuelaPortfolio",
    gradient: "from-primary to-cyan-400",
    type: "code",
  },
  {
    title: "Jingle Jings",
    description:
      "A one page website built for a small business in Brazil, built with React",
    tech: ["ReactJS", "CSS"],
    link: "https://jingle-gings.vercel.app/",
    gradient: "from-accent to-pink-400",
    type: "code",
  },
  {
    title: "Arab Center for Consulting",
    description:
      "WordPress website for a Saudi consulting firm offering governance, financial, and operational advisory services, designed by the client and project lead. SEO contribution: Improved metadata structure and page speed for better discoverability.",
    tech: ["WordPress", "Elementor Pro"],
    link: "https://arabcenter.com.sa/",
    gradient: "from-accent to-pink-400",
    type: "wordpress",
  },
  {
    title: "Blossom Bloom Clinic",
    description:
      "WordPress mental health clinic website with a client-approved mobile-first design and a single-page desktop redirect for optimal viewing. SEO contribution: Optimized content structure and implemented mobile-first indexing improvements.",
    tech: ["WordPress", "Elementor Pro"],
    link: "https://bnbclinics.com/",
    gradient: "from-accent to-pink-400",
    type: "wordpress",
  },
  {
    title: "Hizzek Mizzek",
    description:
      "WordPress e-commerce website for a Lebanese gift and snack business with integrated DHL shipping. SEO contribution: Organized product taxonomy and applied schema markup for product visibility.",
    tech: ["WordPress", "Elementor Pro"],
    link: "http://hezzikmezzik.com/",
    gradient: "from-accent to-pink-400",
    type: "wordpress",
  },
  {
    title: "Midnight Fragrance",
    description:
      "WordPress perfume e-commerce store featuring categorized products for Men, Women, and Unisex fragrances. SEO contribution: Enhanced category metadata, optimized images, and improved overall loading performance.",
    tech: ["WordPress", "Elementor Pro"],
    link: "https://fragrance.sheefra.company/",
    gradient: "from-accent to-pink-400",
    type: "wordpress",
  },
];

export const ProjectsWindow = () => {
  const [filter, setFilter] = useState<"code" | "wordpress">("code");

  const filteredProjects = projects.filter((p) => p.type === filter);

  return (
    <div className="p-6 space-y-4 relative">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-foreground mb-4"
      >
        Projects
      </motion.h2>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setFilter("code")}
          className={`px-3 py-1 rounded-lg border transition ${
            filter === "code"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          Custom Code
        </button>
        <button
          onClick={() => setFilter("wordpress")}
          className={`px-3 py-1 rounded-lg border transition ${
            filter === "wordpress"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          WordPress
        </button>
      </div>

      {/* PROJECT CARDS */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 border border-transparent hover:border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md bg-background/50 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Gradient accent */}
            <div
              className={`pointer-events-none absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
