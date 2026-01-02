import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { ContactSection } from "@/components/ContactSection";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  links?: {
    live?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project Manager Web App",
    category: "Full Stack",
    year: "2024",
    description: "Built a task and team collaboration platform with real-time React UI, authentication, and REST APIs.",
    longDescription: "A comprehensive project management solution designed for teams to collaborate effectively. Features include real-time updates, task assignments, progress tracking, and team communication tools.",
    tech: ["React", "Node.js", "Express.js", "FastAPI", "SQL", "Tailwind CSS"],
    features: ["Real-time collaboration", "Task management", "Team dashboards", "Authentication system"],
  },
  {
    id: 2,
    title: "Live Location Sharing",
    category: "Real-time Systems",
    year: "2024",
    description: "Developed a real-time location sharing app using WebSockets with <200ms map marker updates and seamless session management.",
    longDescription: "A high-performance location sharing application that enables users to share their live location with minimal latency. Built with WebSocket technology for instant updates and interactive map visualization.",
    tech: ["WebSockets", "Leaflet.js", "Node.js", "Real-time UI"],
    features: ["Sub-200ms updates", "Interactive maps", "Session management", "Multi-user support"],
  },
  {
    id: 3,
    title: "Token Buddy Platform",
    category: "Healthcare Tech",
    year: "2025",
    description: "Healthcare data visualization platform with monthly team reports, identifying trends that led to 15% improvement in user satisfaction.",
    longDescription: "An analytics-driven healthcare platform that transforms raw data into actionable insights. Provides comprehensive reporting and trend analysis to improve patient care and operational efficiency.",
    tech: ["React", "Data Visualization", "Analytics", "Node.js"],
    features: ["Data visualization", "Trend analysis", "Monthly reports", "Performance metrics"],
  },
  {
    id: 4,
    title: "NLP & Web Scraping Tools",
    category: "Data Engineering",
    year: "2024",
    description: "Built tools for extracting, cleaning, and analyzing web-based textual data using natural language processing techniques.",
    longDescription: "A suite of data engineering tools designed to extract, process, and analyze textual data from web sources. Leverages NLP techniques for sentiment analysis, entity extraction, and text classification.",
    tech: ["Python", "NLP", "Web Scraping", "Data Analysis"],
    features: ["Text extraction", "Data cleaning", "Sentiment analysis", "Entity recognition"],
  },
  {
    id: 5,
    title: "Portfolio Website",
    category: "Frontend",
    year: "2025",
    description: "A creative portfolio showcasing projects and skills with smooth animations and interactive elements.",
    longDescription: "This very portfolio you're viewing — built with React and modern web technologies. Features parallax effects, smooth scrolling, and a unique editorial design aesthetic.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Parallax effects", "Responsive design", "Interactive UI", "Performance optimized"],
  },
];

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useInView(headerRef, { threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-border/30">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <span className="text-mono text-muted-foreground">Projects Archive</span>
        </div>
      </header>

      {/* Hero section */}
      <section 
        ref={headerRef}
        className="pt-32 pb-16 px-8 max-w-7xl mx-auto"
      >
        <div className={`transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-mono text-accent mb-4 block">Archive / 2024-2025</span>
          <h1 className="text-5xl md:text-7xl text-editorial mb-6">All Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A complete collection of my work — from full-stack applications to data engineering tools.
            Each project represents a unique challenge conquered with code and creativity.
          </p>
        </div>
      </section>

      {/* Projects stacking cards */}
      <section className="px-8 pb-0 max-w-7xl mx-auto relative">
        {projects.map((project, index) => (
          <StickyProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            total={projects.length}
          />
        ))}
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

const StickyProjectCard = ({ 
  project, 
  index, 
  total 
}: { 
  project: Project; 
  index: number; 
  total: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(cardRef, { threshold: 0.1 });

  // Each card sticks slightly lower to create stacking effect
  const topOffset = 80 + index * 8; // Header is ~64px + some spacing
  const zIndex = total - index; // Higher index = lower z-index so earlier cards stay on top initially

  return (
    <div
      ref={cardRef}
      className="sticky mb-8"
      style={{ 
        top: `${topOffset}px`,
        zIndex: index + 1, // Later cards have higher z-index to cover previous ones
      }}
    >
      <div 
        className={`group bg-background border border-border p-8 md:p-12 transition-all duration-700 hover:border-foreground shadow-lg ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ 
          transitionDelay: `${index * 100}ms`,
        }}
      >
        <div className="grid md:grid-cols-[1fr,2fr] gap-8">
          {/* Left column - Meta info */}
          <div className="space-y-4">
            <span className="text-mono text-muted-foreground">
              {String(project.id).padStart(2, "0")}
            </span>
            <div>
              <span className="text-xs uppercase tracking-wider text-accent block mb-1">
                {project.category}
              </span>
              <span className="text-sm text-muted-foreground">{project.year}</span>
            </div>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right column - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-editorial group-hover:text-rust transition-colors">
              {project.title}
            </h2>
            
            <p className="text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer">
                <ExternalLink className="w-4 h-4" />
                <span>View Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
