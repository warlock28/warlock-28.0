import React from 'react';
import './CyberpunkBackground.css';

interface CyberpunkBackgroundProps {
  className?: string;
}

export const CyberpunkBackground: React.FC<CyberpunkBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`cyberpunk-background ${className}`}>
      {/* Infinite grid plane */}
      <div className="grid-plane">
        <div className="grid-lines-vertical" />
        <div className="grid-lines-horizontal" />
      </div>

      {/* Center hexagonal prism */}
      <div className="prism-container">
        <div className="hexagonal-prism">
          {/* Front hexagon */}
          <div className="hex-face front">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={`front-${i}`} className="hex-edge" style={{ '--edge-index': i } as React.CSSProperties} />
            ))}
          </div>
          
          {/* Back hexagon */}
          <div className="hex-face back">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={`back-${i}`} className="hex-edge" style={{ '--edge-index': i } as React.CSSProperties} />
            ))}
          </div>
          
          {/* Connecting edges */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={`connect-${i}`} className="connecting-edge" style={{ '--edge-index': i } as React.CSSProperties} />
          ))}
        </div>

        {/* Coordinate labels */}
        <div className="coord-label coord-1">
          <span className="arrow">→</span>
          <span className="coords">(-0.552, 0.442)</span>
        </div>
        <div className="coord-label coord-2">
          <span className="arrow">↑</span>
          <span className="coords">(0.000, 0.884)</span>
        </div>
        <div className="coord-label coord-3">
          <span className="arrow">↗</span>
          <span className="coords">(0.552, 0.442)</span>
        </div>
      </div>
    </div>
  );
};
