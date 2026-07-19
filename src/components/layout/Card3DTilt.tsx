import React, { useRef, useState } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.025
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [transitionStyle, setTransitionStyle] = useState<string>('transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransitionStyle('transform 0.1s ease-out');
    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`);
    setGlarePos({ x: glareX, y: glareY, opacity: 0.18 });
  };

  const handleMouseLeave = () => {
    setTransitionStyle('transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)');
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transitionStyle,
        transformStyle: 'preserve-3d'
      }}
      className={`relative will-change-transform transform-gpu ${className}`}
    >
      {children}

      {/* Dynamic Interactive Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(130, 170, 255, 0.1) 40%, rgba(0, 0, 0, 0) 70%)`
        }}
      />
    </div>
  );
};

export default Card3DTilt;
