import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
  id?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  className = '',
  id,
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsHovered(true);
        const offsetX = (e.clientX - centerX) / strength;
        const offsetY = (e.clientY - centerY) / strength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={magnetRef}
      id={id}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
