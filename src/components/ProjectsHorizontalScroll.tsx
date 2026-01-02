import { useRef, useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project Manager Web App",
    category: "Full Stack",
    year: "2024",
    description: "Built a task and team collaboration platform with real-time React UI, authentication, and REST APIs.",
    tech: ["React", "Node.js", "Express.js", "FastAPI", "SQL", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Live Location Sharing",
    category: "Real-time Systems",
    year: "2024",
    description: "Developed a real-time location sharing app using WebSockets with <200ms map marker updates and seamless session management.",
    tech: ["WebSockets", "Leaflet.js", "Node.js", "Real-time UI"],
  },
  {
    id: 3,
    title: "Token Buddy Platform",
    category: "Healthcare Tech",
    year: "2025",
    description: "Healthcare data visualization platform with monthly team reports, identifying trends that led to 15% improvement in user satisfaction.",
    tech: ["React", "Data Visualization", "Analytics", "Node.js"],
  },
  {
    id: 4,
    title: "NLP & Web Scraping Tools",
    category: "Data Engineering",
    year: "2024",
    description: "Built tools for extracting, cleaning, and analyzing web-based textual data using natural language processing techniques.",
    tech: ["Python", "NLP", "Web Scraping", "Data Analysis"],
  },
];

export const ProjectsHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const progress = scrollLeft / (scrollWidth - clientWidth);
        setScrollProgress(progress);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Floating geometric shape - moves with scroll */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-32 h-32 border border-accent/20 pointer-events-none transition-all duration-700 ease-out z-0"
        style={{
          left: `${10 + scrollProgress * 60}%`,
          transform: `translateY(-50%) rotate(${scrollProgress * 90}deg) scale(${1 + scrollProgress * 0.3})`,
          opacity: 0.4 + scrollProgress * 0.3,
        }}
      />
      
      {/* Second floating element */}
      <div 
        className="absolute top-1/4 w-16 h-16 bg-clay/10 rounded-full pointer-events-none transition-all duration-500 ease-out z-0"
        style={{
          left: `${5 + scrollProgress * 70}%`,
          transform: `translateX(${mousePos.x * 20}px) translateY(${mousePos.y * 20}px)`,
        }}
      />

      {/* Scroll controls */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-mono text-muted-foreground">
            {String(Math.round(scrollProgress * 100)).padStart(2, "0")}%
          </span>
          <div className="w-24 h-[2px] bg-border overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="p-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={scrollRef} className="horizontal-scroll relative z-10 p-1">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-[280px] md:w-[450px] experiment-card group cursor-pointer p-4 md:p-6"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: `translateY(${mousePos.y * (index % 2 === 0 ? 10 : -10)}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Project number */}
            <span className="text-mono text-muted-foreground mb-2 md:mb-4 block text-xs md:text-sm">
              {String(project.id).padStart(2, "0")}
            </span>

            {/* Project info */}
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <span className="text-[10px] md:text-xs uppercase tracking-wider text-accent">
                {project.category}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground">{project.year}</span>
            </div>

            <h3 className="text-lg md:text-2xl text-editorial mb-2 md:mb-4 group-hover:text-rust transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-secondary text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View project link */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="line-reveal">Explore Build</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-mono text-muted-foreground text-center mt-8 md:hidden">
        ← Swipe to explore →
      </p>

      {/* View all projects link */}
      <div className="flex justify-center mt-12">
        <Link
          to="/projects"
          className="group flex items-center gap-3 px-6 py-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <span className="text-sm">View All Projects</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
