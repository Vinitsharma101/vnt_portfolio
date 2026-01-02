import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 16; // ~60fps
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Start exit animation after fill completes
      setTimeout(() => {
        setIsExiting(true);
        // Complete after exit animation
        setTimeout(onComplete, 600);
      }, 200);
    }
  }, [progress, onComplete]);

  const text = "TERMINAL";
  // Smooth fractional fill - each letter fills gradually
  const fillProgress = (progress / 100) * text.length;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-500 ease-out ${
        isExiting ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Centered TERMINAL text */}
      <h1
        className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase select-none"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {text.split("").map((char, index) => {
          // Calculate opacity for smooth transition per letter
          const letterProgress = Math.min(Math.max(fillProgress - index, 0), 1);
          const orangeColor = `rgba(255, 77, 0, ${letterProgress})`;
          const greyColor = `rgba(255, 255, 255, ${0.15 * (1 - letterProgress)})`;
          
          return (
            <span
              key={index}
              style={{
                color: letterProgress > 0.5 ? orangeColor : greyColor,
                textShadow: letterProgress > 0.5 ? `0 0 30px rgba(255, 77, 0, ${letterProgress * 0.5})` : 'none',
                transition: "color 0.15s ease-out, text-shadow 0.15s ease-out",
              }}
            >
              {char}
            </span>
          );
        })}
      </h1>
      
      {/* Loading text under TERMINAL */}
      <p 
        className="mt-8 text-sm md:text-base tracking-[0.5em] uppercase"
        style={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          color: "rgba(255, 255, 255, 0.3)"
        }}
      >
        loading...
      </p>
    </div>
  );
};

export default LoadingScreen;
