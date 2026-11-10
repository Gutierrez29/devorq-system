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
  glowColor: string;
  depth: number; // 0 (far/dim) to 1 (near/bright)
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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const mouse = {
      x: -2000,
      y: -2000,
      radius: 220,
      active: false,
    };

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Palette: Cyan, Indigo, Violet, Electric Blue
    const colorThemes = [
      { base: "rgba(14, 165, 233, ", glow: "rgba(14, 165, 233, 0.8)" },  // Sky 500
      { base: "rgba(99, 102, 241, ", glow: "rgba(99, 102, 241, 0.8)" },  // Indigo 500
      { base: "rgba(168, 85, 247, ", glow: "rgba(168, 85, 247, 0.8)" },  // Purple 500
      { base: "rgba(56, 189, 248, ", glow: "rgba(56, 189, 248, 0.9)" },  // Cyan 400
    ];

    // Responsive node density covering the entire screen seamlessly
    // Approx 1 node per 7,500 px^2, minimum 90, maximum 180 on wide screens
    const calculateNodeCount = (w: number, h: number) => {
      const area = w * h;
      return Math.max(90, Math.min(180, Math.floor(area / 7500)));
    };

    let nodes: NodePoint[] = [];

    const initNodes = () => {
      const count = calculateNodeCount(width, height);
      nodes = [];
      for (let i = 0; i < count; i++) {
        const theme = colorThemes[i % colorThemes.length];
        const depth = Math.random(); // 0 is far, 1 is close
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.25 + depth * 0.35),
          vy: (Math.random() - 0.5) * (0.25 + depth * 0.35),
          radius: 1.0 + depth * 2.2,
          baseAlpha: 0.25 + depth * 0.45,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          color: theme.base,
          glowColor: theme.glow,
          depth,
        });
      }
    };

    initNodes();

    // Active data pulses traveling along connection filaments
    const pulses: DataPulse[] = [];
    const maxPulses = 18;

    const spawnPulse = () => {
      if (pulses.length >= maxPulses || nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      const n1 = nodes[from];

      // Find nearby neighbors within connection distance
      const candidates: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === from) continue;
        const d = Math.hypot(n1.x - nodes[j].x, n1.y - nodes[j].y);
        if (d < 165) {
          candidates.push(j);
        }
      }

      if (candidates.length > 0) {
        const to = candidates[Math.floor(Math.random() * candidates.length)];
        pulses.push({
          fromNode: from,
          toNode: to,
          progress: 0,
          speed: 0.012 + Math.random() * 0.014,
          color: Math.random() > 0.5 ? "rgba(56, 189, 248, " : "rgba(168, 85, 247, ",
        });
      }
    };

    const handleResize = () => {
      resizeCanvas();
      // Keep existing nodes within the new bounds instead of clustering
      for (const n of nodes) {
        if (n.x > width) n.x = Math.random() * width;
        if (n.y > height) n.y = Math.random() * height;
      }
      // Re-populate if count changed significantly
      const targetCount = calculateNodeCount(width, height);
      if (Math.abs(nodes.length - targetCount) > 20) {
        initNodes();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.12;
      lastScrollY = currentScrollY;
    };

    // Click creates a gentle shockwave/pulse among nearby nodes
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 260 && dist > 0) {
          const force = (260 - dist) / 260;
          n.vx += (dx / dist) * force * 3;
          n.vy += (dy / dist) * force * 3;
        }
      }
      // Spawn burst pulses
      for (let p = 0; p < 4; p++) {
        spawnPulse();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp scroll velocity
      scrollVelocity *= 0.92;

      // Periodically spawn data pulses
      if (Math.random() < 0.12) spawnPulse();

      const connectionDist = 160;

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];

        // Natural movement + scroll parallax based on depth
        p1.x += p1.vx;
        p1.y += p1.vy - scrollVelocity * (0.3 + p1.depth * 0.7);

        // Gentle drag to return velocities to normal
        p1.vx *= 0.992;
        p1.vy *= 0.992;

        // Smooth wrap-around edges to guarantee uniform full-screen coverage
        if (p1.x < -20) p1.x = width + 20;
        else if (p1.x > width + 20) p1.x = -20;

        if (p1.y < -20) p1.y = height + 20;
        else if (p1.y > height + 20) p1.y = -20;

        // Mouse attraction & energetic interaction
        let mouseGlow = 0;
        if (mouse.active) {
          const dxMouse = mouse.x - p1.x;
          const dyMouse = mouse.y - p1.y;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < mouse.radius) {
            const force = (mouse.radius - distMouse) / mouse.radius;
            // Gentle gravitational pull
            p1.x += (dxMouse / distMouse) * force * 1.8;
            p1.y += (dyMouse / distMouse) * force * 1.8;
            mouseGlow = force * 0.6;
          }
        }

        // Pulse alpha
        p1.pulsePhase += p1.pulseSpeed;
        const currentAlpha = Math.min(
          1,
          p1.baseAlpha + Math.sin(p1.pulsePhase) * 0.18 + mouseGlow
        );

        // Draw node with glow halo
        ctx.beginPath();
        const renderRadius = p1.radius + mouseGlow * 2;
        ctx.arc(p1.x, p1.y, renderRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${currentAlpha})`;

        if (p1.depth > 0.4 || mouseGlow > 0) {
          ctx.shadowBlur = 10 + mouseGlow * 12;
          ctx.shadowColor = p1.glowColor;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connections between nodes across the entire screen
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            // Smooth falloff
            let lineAlpha = (1 - dist / connectionDist) * 0.28 * Math.min(p1.baseAlpha, p2.baseAlpha);

            // Highlight connections near cursor
            if (mouse.active) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const distToCursor = Math.hypot(midX - mouse.x, midY - mouse.y);
              if (distToCursor < mouse.radius) {
                const boost = (mouse.radius - distToCursor) / mouse.radius;
                lineAlpha += boost * 0.35;
              }
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${Math.min(0.75, lineAlpha)})`;
            ctx.lineWidth = 0.85 + (p1.depth + p2.depth) * 0.35;
            ctx.stroke();
          }
        }
      }

      // Update & Draw Data Pulses (flowing luminescent signals)
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
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `${pulse.color}0.95)`;
        ctx.shadowBlur = 14;
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
