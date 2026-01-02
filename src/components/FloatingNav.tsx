import { useState, useEffect } from "react";
import { Compass, ArrowUp } from "lucide-react";

export const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Show nav after first viewport
      setIsVisible(scrollY > vh * 0.5);

      // Calculate current section (rough estimate)
      setCurrentSection(Math.floor(scrollY / vh));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToNext = () => {
    const vh = window.innerHeight;
    const nextSection = (currentSection + 1) * vh;
    window.scrollTo({ top: nextSection, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-8 bottom-8 z-40 flex flex-col gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 bg-background border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
      <button
        onClick={scrollToNext}
        className="p-3 bg-foreground text-background hover:bg-rust transition-all duration-300 shadow-lg"
        aria-label="Next section"
      >
        <Compass className="w-4 h-4" />
      </button>
    </div>
  );
};
