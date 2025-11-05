import React from 'react';
import '../styles/cyberpunk-background.css';

const NetworkBackground: React.FC = () => {
  return (
    <div className="cyberpunk-background">
      {/* Infinite grid plane */}
      <div className="grid-plane">
        <div className="grid-lines-vertical" />
        <div className="grid-lines-horizontal" />
      </div>
    </div>
  );
};

export default NetworkBackground;
