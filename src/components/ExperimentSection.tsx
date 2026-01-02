import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface ExperimentSectionProps {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
  accent?: "olive" | "clay" | "rust" | "graphite";
  slideFrom?: "bottom" | "right";
}

const accentStyles = {
  olive: "border-l-accent",
  clay: "border-l-clay",
  rust: "border-l-rust",
  graphite: "border-l-graphite",
};

export const ExperimentSection = ({
  number,
  title,
  description,
  children,
  accent = "olive",
  slideFrom = "bottom",
}: ExperimentSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.15 });

  const getTransformStyles = (inView: boolean) => {
    if (slideFrom === "right") {
      return inView 
        ? "translate-x-0 opacity-100" 
        : "translate-x-[100px] opacity-0";
    }
    return inView 
      ? "translate-y-0 opacity-100" 
      : "translate-y-10 opacity-0";
  };

  const getContentTransformStyles = (inView: boolean) => {
    if (slideFrom === "right") {
      return inView 
        ? "translate-x-0 opacity-100" 
        : "translate-x-[120px] opacity-0";
    }
    return inView 
      ? "translate-y-0 opacity-100" 
      : "translate-y-10 opacity-0";
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-24 md:py-32 px-8 md:px-16 overflow-hidden"
    >
      <div 
        className={`max-w-6xl mx-auto transform transition-all duration-700 ease-out ${getTransformStyles(isInView)}`}
      >
        {/* Section header */}
        <div className={`border-l-2 ${accentStyles[accent]} pl-6 mb-16`}>
          <span className="text-mono text-muted-foreground block mb-2">
            Experiment {number}
          </span>
          <h2 className="text-4xl md:text-5xl text-editorial mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-xl">{description}</p>
        </div>

        {/* Section content */}
        <div
          className={`transform transition-all duration-700 ease-out delay-150 ${getContentTransformStyles(isInView)}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
