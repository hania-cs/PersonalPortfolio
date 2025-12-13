import { useState, useCallback } from "react";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { DesktopIcon } from "./DesktopIcon";
import { WelcomeWidget } from "./WelcomeWidget";
import { StickyNote } from "./StickyNote";
import { AboutWindow } from "./windows/AboutWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { SkillsWindow } from "./windows/SkillsWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { VirtualPetWindow } from "./windows/VirtualPetWindow";
import { User, FolderOpen, Sparkles, Mail, Briefcase, FileText, Heart } from "lucide-react";

export type WindowType =
  | "about"
  | "projects"
  | "skills"
  | "contact"
  | "experience"
  | "pet"
  | "games";

interface OpenWindow {
  id: WindowType;
  zIndex: number;
}

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openWindow = useCallback(
    (type: WindowType) => {
      setOpenWindows((prev) => {
        const exists = prev.find((w) => w.id === type);
        if (exists) {
          return prev.map((w) =>
            w.id === type ? { ...w, zIndex: maxZIndex + 1 } : w
          );
        }
        return [...prev, { id: type, zIndex: maxZIndex + 1 }];
      });
      setMaxZIndex((prev) => prev + 1);
    },
    [maxZIndex]
  );

  const closeWindow = useCallback((type: WindowType) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== type));
  }, []);

  const focusWindow = useCallback(
    (type: WindowType) => {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === type ? { ...w, zIndex: maxZIndex + 1 } : w
        )
      );
      setMaxZIndex((prev) => prev + 1);
    },
    [maxZIndex]
  );

  const desktopIcons = [
    { id: "about" as WindowType, label: "About Me", icon: User },
    { id: "projects" as WindowType, label: "Projects", icon: FolderOpen },
    { id: "experience" as WindowType, label: "Experience", icon: Briefcase },
    { id: "skills" as WindowType, label: "Skills", icon: Sparkles },
  ];

  const decorativeIcons = [
    {
      label: "Resume.pdf",
      icon: FileText,
      action: () => {
        const link = document.createElement("a");
        link.href = "/Resume.pdf";
        link.download = "Hania_Seifeldeen_Resume.pdf";
        link.click();
      },
    },
    { id: "contact" as WindowType, label: "Contact Me", icon: Mail },
    { id: "pet" as WindowType, label: "Pixel Pet", icon: Heart },
  ];

  const getWindowContent = (type: WindowType) => {
    switch (type) {
      case "about":
        return <AboutWindow />;
      case "projects":
        return <ProjectsWindow />;
      case "experience":
        return <ExperienceWindow />;
      case "skills":
        return <SkillsWindow />;
      case "contact":
        return <ContactWindow />;
      case "pet":
        return <VirtualPetWindow />;
    }
  };

  const getWindowTitle = (type: WindowType) => {
    switch (type) {
      case "about":
        return "About Me";
      case "projects":
        return "Projects";
      case "experience":
        return "Experience";
      case "skills":
        return "Skills";
      case "contact":
        return "Contact";
      case "pet":
        return "Pixel Pet 🐾";
    }
  };

  const hasOpenWindow = openWindows.length > 0;
  const allIcons = [...desktopIcons, ...decorativeIcons];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative touch-manipulation">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Soft ambient glow - top left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
      
      {/* Soft ambient glow - bottom right */}
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px]" />

      {/* MOBILE LAYOUT */}
      <div className={`sm:hidden flex flex-col h-full ${hasOpenWindow ? 'hidden' : ''}`}>
        {/* Welcome Widget at top */}
        <div className="pt-8 px-4 flex justify-center">
          <WelcomeWidget />
        </div>
        
        {/* Icons Grid - 3 columns */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <div className="grid grid-cols-3 gap-6">
            {allIcons.map((item, index) => (
              <DesktopIcon
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={'id' in item && item.id ? () => openWindow(item.id!) : ('action' in item ? item.action : undefined)}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden sm:block">
        {/* Desktop Icons - Left Column */}
        <div className="absolute top-8 left-8 flex flex-col gap-6 z-10">
          {desktopIcons.map((item, index) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => openWindow(item.id)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Desktop Icons - Right Column */}
        <div className="absolute top-8 right-8 flex flex-col gap-6 z-10">
          {decorativeIcons.map((item, index) => (
            <DesktopIcon
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={item.id ? () => openWindow(item.id!) : item.action}
              delay={index * 0.1 + 0.5}
            />
          ))}
        </div>

        {/* Center Content - Welcome Widget & Sticky Notes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <div className="relative flex flex-col items-center gap-8 pointer-events-auto">
            <WelcomeWidget />
            <div className="flex flex-wrap justify-center gap-6 max-w-lg px-4">
              <StickyNote color="yellow" rotation={-3} delay={0.5}>
                ☕ Fueled by coffee & curiosity. Currently obsessed with building cool stuff!
              </StickyNote>
              <StickyNote color="pink" rotation={2} delay={0.7}>
                🎯 Fun fact: I debug best at 2 AM with lo-fi beats playing
              </StickyNote>
              <StickyNote color="blue" rotation={-2} delay={0.9}>
                💡 Welcome to my portfolio 😁 Click the icons to explore!
              </StickyNote>
            </div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          title={getWindowTitle(window.id)}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
        >
          {getWindowContent(window.id)}
        </Window>
      ))}

      {/* Dock - hidden on mobile when window is open */}
      <div className={`${hasOpenWindow ? 'hidden sm:block' : ''}`}>
        <Dock
          onOpenWindow={openWindow}
          openWindows={openWindows.map((w) => w.id)}
        />
      </div>
    </div>
  );
};

export default Desktop;
