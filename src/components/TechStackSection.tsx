import { useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface TechCategory {
  name: string;
  techs: { name: string; icon: string }[];
}

const techCategories: TechCategory[] = [
  {
    name: "FRONTEND",
    techs: [
      { name: "React", icon: "⚛" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind", icon: "◐" },
      { name: "Redux", icon: "◈" },
      { name: "HTML5", icon: "◇" },
      { name: "CSS3", icon: "◆" },
    ],
  },
  {
    name: "BACKEND",
    techs: [
      { name: "Node.js", icon: "⬡" },
      { name: "Express", icon: "⊡" },
      { name: "Python", icon: "◎" },
      { name: "REST API", icon: "⇄" },
      { name: "GraphQL", icon: "◈" },
    ],
  },
  {
    name: "DATABASES",
    techs: [
      { name: "MongoDB", icon: "◐" },
      { name: "PostgreSQL", icon: "◑" },
      { name: "MySQL", icon: "◒" },
      { name: "Redis", icon: "◓" },
      { name: "Firebase", icon: "◔" },
    ],
  },
  {
    name: "DEVELOPER TOOLS",
    techs: [
      { name: "Git", icon: "⎇" },
      { name: "Docker", icon: "◳" },
      { name: "AWS", icon: "☁" },
      { name: "VS Code", icon: "◫" },
      { name: "Figma", icon: "◧" },
      { name: "Postman", icon: "◨" },
    ],
  },
];

const TechRow = ({ category, index }: { category: TechCategory; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const isActive = isHovered || isTouched;

  const handleTouch = () => {
    setIsTouched(!isTouched);
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouch}
    >
      {/* Divider line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px transition-colors duration-500"
        style={{ backgroundColor: isActive ? "rgba(255, 77, 0, 0.4)" : "#3a3a3a" }}
      />
      
      {/* Main row */}
      <div className="py-5 md:py-8 px-4 md:px-10 flex items-center justify-between">
        <h3
          className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal tracking-tight transition-all duration-500"
          style={{
            color: isActive ? "rgb(255, 77, 0)" : "#8a8a8a",
          }}
        >
          {category.name}
        </h3>
        
        <span
          className="text-xs md:text-sm tracking-[0.35em] font-medium transition-all duration-500"
          style={{
            color: isActive ? "rgb(255, 77, 0)" : "#4a4a4a",
          }}
        >
          {category.techs.length} TOOLS
        </span>
      </div>

      {/* Tech icons reveal */}
      <div
        className="overflow-hidden transition-all duration-700 ease-out"
        style={{
          maxHeight: isActive ? "100px" : "0px",
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="px-4 md:px-10 pb-5 flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide">
          {category.techs.map((tech, techIndex) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 flex-shrink-0 transition-all duration-500"
              style={{
                transform: isActive 
                  ? `translateX(${Math.min(techIndex * 6, 30)}px)` 
                  : "translateX(-20px)",
                opacity: isActive ? 1 : 0,
                transitionDelay: `${techIndex * 50}ms`,
              }}
            >
              <span 
                className="text-xl md:text-2xl transition-colors duration-300"
                style={{ color: "rgb(255, 77, 0)" }}
              >
                {tech.icon}
              </span>
              <span className="text-xs md:text-sm text-[#aaaaaa] whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider for last item */}
      {index === techCategories.length - 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#3a3a3a]" />
      )}

      {/* Subtle orange glow on hover */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: isActive 
            ? "linear-gradient(90deg, rgba(255, 77, 0, 0.03) 0%, transparent 50%)" 
            : "transparent",
          opacity: isActive ? 1 : 0,
        }}
      />
    </div>
  );
};

export const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-24"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Section header */}
      <div className="px-4 md:px-10 mb-8 md:mb-14">
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] text-[#6a6a6a] uppercase mb-3 block">
            Experiment 02
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-terminal mb-3">
            The Stack
          </h2>
          <p className="text-[#8a8a8a] max-w-xl text-sm md:text-base">
            Technologies I engineer with. Hover to explore the tools behind the systems.
          </p>
        </div>
      </div>

      {/* Tech rows */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {techCategories.map((category, index) => (
          <TechRow key={category.name} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};
