import { useState, useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isOnDark, setIsOnDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const getBackgroundColor = (element: Element | null): string => {
      while (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        // Check if it's not transparent
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          return bgColor;
        }
        element = element.parentElement;
      }
      // Default to white (light background)
      return 'rgb(255, 255, 255)';
    };

    const animate = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, 0.15);
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 8}px, ${positionRef.current.y - 8}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check background color at cursor position
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const bgColor = getBackgroundColor(element);
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        setIsOnDark(brightness < 128);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-colors duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: 16,
        height: 16,
        backgroundColor: isOnDark ? 'white' : 'black',
        willChange: 'transform',
      }}
    />
  );
};
