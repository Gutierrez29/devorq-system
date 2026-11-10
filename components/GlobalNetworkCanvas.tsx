"use client";

import { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

interface DataPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function GlobalNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 170,
    };

    const nodeColors = [
      "rgba(14, 165, 233, ",  // Sky 500
      "rgba(99, 102, 241, ",  // Indigo 500
      "rgba(168, 85, 247, ",  // Purple 500
      "rgba(6, 182, 212, ",   // Cyan 500
    ];

    // Responsive node count
    const nodeCount = Math.min(Math.floor((width * height) / 12000), 85);
    const nodes: NodePoint[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
      });
    }

    // Active data pulses traveling along connections
    const pulses: DataPulse[] = [];
    const maxPulses = 12;

    const spawnPulse = () => {
      if (pulses.length >= maxPulses || nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      // Find a close neighbor
      let closest = -1;
      let closestDist = 130;
      for (let j = 0; j < nodes.length; j++) {
        if (j === from) continue;
        const d = Math.hypot(nodes[from].x - nodes[j].x, nodes[from].y - nodes[j].y);
        if (d < closestDist) {
          closestDist = d;
          closest = j;
        }
      }
      if (closest !== -1) {
        pulses.push({
          fromNode: from,
          toNode: closest,
          progress: 0,
          speed: (Math.random() * 0.012 + 0.008),
          color: Math.random() > 0.5 ? "rgba(56, 189, 248, " : "rgba(168, 85, 247, ",
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Periodically spawn new data pulses
      if (Math.random() < 0.08) spawnPulse();

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse gravitational attraction
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        let mouseGlow = 0;
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p1.x += (dxMouse / distMouse) * force * 1.5;
          p1.y += (dyMouse / distMouse) * force * 1.5;
          mouseGlow = force * 0.5;
        }

        // Pulse alpha
        p1.pulsePhase += p1.pulseSpeed;
        const currentAlpha = Math.min(1, p1.baseAlpha + Math.sin(p1.pulsePhase) * 0.15 + mouseGlow);

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius + (mouseGlow * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${currentAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${p1.color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 125) {
            let lineAlpha = (1 - dist / 125) * 0.22;
            // Brighten if near mouse
            if (distMouse < mouse.radius) {
              lineAlpha += 0.18;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${Math.min(0.65, lineAlpha)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Update & Draw Data Pulses (flowing signals)
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }

        const n1 = nodes[pulse.fromNode];
        const n2 = nodes[pulse.toNode];
        if (!n1 || !n2) {
          pulses.splice(k, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${pulse.color}0.95)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `${pulse.color}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ background: "transparent" }}
    />
  );
}
