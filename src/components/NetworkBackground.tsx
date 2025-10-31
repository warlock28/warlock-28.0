import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create nodes
    const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }
    nodesRef.current = nodes;

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get scroll position
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Only draw nodes in viewport area (with buffer)
        const nodeScreenY = node.y - scrollY;
        if (nodeScreenY > -200 && nodeScreenY < viewportHeight + 200) {
          // Draw node
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
          
          // Check if dark mode
          const isDark = document.documentElement.classList.contains('dark');
          const nodeColor = isDark ? 'rgba(147, 97, 227, 0.6)' : 'rgba(147, 97, 227, 0.4)';
          const glowColor = isDark ? 'rgba(147, 97, 227, 0.0)' : 'rgba(147, 97, 227, 0.0)';
          
          gradient.addColorStop(0, nodeColor);
          gradient.addColorStop(1, glowColor);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw connections between nearby nodes
      const maxDistance = 150;
      const isDark = document.documentElement.classList.contains('dark');
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const nodeAScreenY = nodeA.y - scrollY;
        
        // Skip if node A is not in viewport
        if (nodeAScreenY < -200 || nodeAScreenY > viewportHeight + 200) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const nodeBScreenY = nodeB.y - scrollY;
          
          // Skip if node B is not in viewport
          if (nodeBScreenY < -200 || nodeBScreenY > viewportHeight + 200) continue;

          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * (isDark ? 0.25 : 0.15);
            const lineColor = isDark ? `rgba(147, 97, 227, ${opacity})` : `rgba(147, 97, 227, ${opacity})`;
            
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="network-canvas"
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <div className="floating-lines">
        <div className="floating-line"></div>
        <div className="floating-line"></div>
        <div className="floating-line"></div>
        <div className="floating-line"></div>
        <div className="floating-line"></div>
        <div className="floating-line"></div>
      </div>
    </>
  );
};

export default NetworkBackground;
