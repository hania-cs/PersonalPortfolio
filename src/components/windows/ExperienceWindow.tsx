import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Founder & CEO",
    company: "Vertexa Digital Studios",
    location: "Rashaya, Lebanon | Remote",
    period: "Nov 2025 - Present",
    description:
      "I run my own web development agency where I handle full-stack projects end to end—covering web development, UX/UI design, SEO, and branding. I lead every project from concept to deployment, building responsive websites and e-commerce solutions while managing the technical architecture, code quality, and overall platform performance.",
    skills: [
      "React",
      "Typescript",
      "Tailwind",
      "Node.js",
      "PostgreSQL",
      "WordPress",
      "SEO",
      "UI/UX Design",
      "Client Relations",
      "Branding",
    ],
    gradient: "from-primary to-cyan-400",
    link: "https://www.vertexa.digital",
    type: "react",
  },
  {
    title: "Full Stack Developer",
    company: "Connect Services SARL",
    location: "Dahr Alahmar, Lebanon | On-site",
    period: "Nov 2025 - Present",
    description:
      "I design and develop modern, responsive websites using React, including the company’s official site showcasing its services and portfolio. I build and maintain high-quality, performance-optimized websites for a diverse range of clients, collaborating closely with a graphic designer to translate visual concepts and brand identities into functional, user-centered web experiences. I also develop full-stack solutions with modern technologies to ensure scalability, security, and seamless user interaction, while creating intuitive UI/UX designs that prioritize accessibility, aesthetics, and responsiveness across all devices.",
    skills: ["React", "Typescript", "Tailwind", "Node.js", "PostgreSQL", "UI/UX Design", "Client Relations"],
    gradient: "from-accent to-pink-400",
    link: "https://connect-services.me",
    type: "react",
  },
  {
    title: "Frontend Developer",
    company: "The Pixel Company",
    location: "Cairo-Egypt | Remote",
    period: "Aug 2024 - Oct 2024",
    description:
      "I collaborated with clients under NDA to gather requirements, clarify their vision, and deliver tailored technical solutions, partnering closely with UI/UX designers to transform protected design concepts into functional, polished interfaces. I built responsive web applications using React and occasional vanilla JavaScript for advanced interactivity, ensuring compatibility and a seamless experience across devices.",
    skills: ["Git", "TypeScript", "React", "TailwindCSS", "Client Relations"],
    gradient: "from-green-400 to-emerald-500",
    link: "",
    type: "react",
  },
  {
    title: "Web Developer Intern",
    company: "OctoVertex",
    location: "Beirut, Lebanon | Remote",
    period: "Dec 2024 - May 2025",
    description:
      "I engaged with clients to gather requirements and deliver tailored technical solutions, collaborating with UI/UX designers to transform concepts into intuitive, visually appealing interfaces. I built responsive web applications using React, WordPress, and PHP, ensuring functionality, performance, and a seamless user experience.",
    skills: ["Git", "TypeScript", "React", "WordPress"],
    gradient: "from-primary to-cyan-400",
    link: "https://octovertex.com/",
    type: "react",
  },
    {
    title: "WordPress Developer",
    company: "Freelance – Reporting to Project Manager & SEO Specialist",
    location: "Cairo, Egypt | Remote",
    period: "Apr 2024 - Present",
    description:
      "I build and customize WordPress business and eCommerce sites optimized for search performance, implementing SEO-driven site structures, metadata, heading hierarchy, URL optimization, schema markup, and on-page SEO. I conduct technical SEO audits to identify crawlability, indexing, and speed issues, and improve Core Web Vitals through image compression, caching, script minimization, and responsive layouts. I translate project requirements into responsive, mobile-first, search-optimized designs and implement plugins and custom features aligned with brand identity, performance targets, and SEO goals.",
    skills: ["WordPress", "SEO"],
    gradient: "from-primary to-cyan-400",
    link: "",
    type: "wordpress",
  },
  {
    title: "WordPress Developer Intern",
    company: "Sheefra",
    location: "Beirut, Lebanon | Remote",
    period: "May 2024 - May 2025",
    description:
      "Developed and customized three WordPress websites, including two eCommerce stores and one business site, building an eCommerce perfume website with optimized product presentation and smooth cart functionality. Designed a mobile-friendly online store for HizkezMizzek, aligning site structure with brand identity and SEO requirements. Resolved front-end issues affecting performance, usability, and search visibility, while executing on-page SEO tasks such as metadata optimization, alt-text updates, image compression, and speed improvements.",
    skills: ["WordPress", "SEO"],
    gradient: "from-accent to-pink-400",
    link: "https://www.sheefra.io/",
    type: "wordpress",
  },
    {
    title: "React Developer Intern",
    company: "YAFA Cloud Services LLC",
    location: "Dubai, UAE | Remote",
    period: "Apr 2024 - Oct 2024",
    description:
      "I utilized React.js and TypeScript to develop and maintain interactive user interfaces for the company's website. I collaborated with design and backend teams to ensure seamless integration of frontend components and implemented responsive design principles to enhance user experience across various devices and screen sizes. I conducted code reviews and participated in Agile development processes to deliver high-quality software solutions. I worked closely with senior developers to troubleshoot and debug frontend issues, ensuring optimal performance and functionality. Additionally, I worked on a blogging system for the company's website, focusing on the frontend using React, TypeScript, and Material-UI.",
    skills: ["React", "Javascript", "Material-UI"],
    gradient: "from-accent to-pink-400",
    link: "https://yafatek.dev/",
    type: "react",
  },
];

export const ExperienceWindow = () => {
  const [filter, setFilter] = useState<"react" | "wordpress">("react");

  const filteredExperiences = experiences.filter((exp) => exp.type === filter);

  return (
    <div className="p-6 space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-foreground mb-6"
      >
        Experience
      </motion.h2>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setFilter("react")}
          className={`px-3 py-1 rounded-lg border transition ${
            filter === "react"
              ? "bg-primary text-white"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          React
        </button>

        <button
          onClick={() => setFilter("wordpress")}
          className={`px-3 py-1 rounded-lg border transition ${
            filter === "wordpress"
              ? "bg-primary text-white"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          WordPress
        </button>
      </div>

      {/* EXPERIENCE LIST */}
      <div className="space-y-4">
        {filteredExperiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 border border-transparent hover:border-glass-border"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${exp.gradient} opacity-80`}
                >
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-primary/80">{exp.company}</p>
                </div>
              </div>

              {exp.link && (
                <a
                  href={exp.link}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3 ml-11">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-3 ml-11">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2 ml-11">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded-md bg-background/50 text-xs font-medium text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Hover gradient */}
            <div
              className={`pointer-events-none absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
