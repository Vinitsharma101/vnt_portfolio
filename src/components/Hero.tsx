import { ChevronDown, Download, Linkedin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import CircularText from "./CircularText";

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixelPos, setMousePixelPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showFaceReveal, setShowFaceReveal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDragMouseDown = (e: ReactMouseEvent<HTMLImageElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleDragMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
      setMousePixelPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="fixed inset-0 h-screen w-full flex flex-col justify-between p-8 md:p-16 bg-background z-0 overflow-hidden"
    >
      {/* Interactive grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hover reveal grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(circle 150px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Hover reveal face image (masked at mouse position while hovering name area) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: "url('/myyp.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: " 50%",
          opacity: showFaceReveal ? 1 : 0,
          maskImage: showFaceReveal
            ? `radial-gradient(circle 300px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`
            : "none",
          WebkitMaskImage: showFaceReveal
            ? `radial-gradient(circle 300px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`
            : "none",
        }}
      />
      {/* Floating geometric elements with parallax */}
      <div
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-accent/20 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${
            mousePos.y * 30
          }px) rotate(${45 + mousePos.x * 10}deg)`,
          opacity: 0.3,
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-clay/20 rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          opacity: 0.2,
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-16 h-16 bg-rust/5 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${
            mousePos.y * 40
          }px) rotate(${mousePos.x * 20}deg)`,
        }}
      />

      {/* Top navigation hint */}
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <p className="text-mono text-muted-foreground">
            Chandigarh University
          </p>
          <p className="text-sm text-muted-foreground">2022 — 2026</p>
        </div>
      </div>

      {/* Center content with parallax */}
      <div
        className="flex-1 flex flex-col justify-center max-w-5xl relative z-10"
        onMouseEnter={() => setShowFaceReveal(true)}
        onMouseLeave={() => setShowFaceReveal(false)}
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          opacity: 1 - scrollY / (window.innerHeight * 0.8),
        }}
      >
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl text-editorial animate-fade-up"
              style={{
                transform: `translateX(${mousePos.x * 5}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              Vinit Sharma
            </h1>
          </div>
          <div className="overflow-hidden">
            <p
              className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-fade-up-delay-1 font-sans"
              style={{
                transform: `translateX(${mousePos.x * 3}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              Full Stack Developer who doesn't just build websites—
              <span className="text-foreground">
                {" "}
                I design systems and experiences.
              </span>
            </p>
          </div>
          <div className="flex gap-4 mt-8 animate-fade-up-delay-2">
            <span className="text-xs px-3 py-1.5 border border-border text-muted-foreground">
              B.E. Computer Science
            </span>
            <span className="text-xs px-3 py-1.5 border border-accent/30 text-accent">
              Available for projects
            </span>
          </div>
        </div>
      </div>

      {/* Bottom navigation hint */}
      <div className="flex justify-between items-end relative z-10">
        <div className="flex gap-3 animate-fade-up-delay-2">
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Resume</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sharma-vinit101/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm"></span>
          </a>
        </div>
        <div
          onMouseMove={handleDragMouseMove}
          onMouseUp={handleDragMouseUp}
          className="relative w-full h-full"
        >
          <img
            src="/st.png"
            className="w-52 h-32 animate-fade-up-delay-2 cursor-grab active:cursor-grabbing absolute"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              userSelect: "none",
            }}
            onMouseDown={handleDragMouseDown}
            draggable="false"
          />
        </div>

        <span>
          <CircularText
            text="Full-StackDev*App-Dev*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class border border-black"
          />
        </span>
      </div>
    </section>
  );
};
