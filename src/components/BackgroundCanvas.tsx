import React, { useEffect, useRef } from "react";

interface BackgroundCanvasProps {
  theme: "sunset" | "happy" | "sad" | "painful" | "recovery" | "success" | "ending";
}

// Particle class to encapsulate operations
class CanvasParticle {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  size = 0;
  color = "";
  opacity = 0;
  rotation = 0;
  rotSpeed = 0;
  type: "sparkle" | "heart" | "rain" | "leaf" | "orb" | "lantern" | "fragment" | "star" = "sparkle";
  wiggle = 0;
  wiggleSpeed = 0;

  constructor(
    width: number,
    height: number,
    type: "sparkle" | "heart" | "rain" | "leaf" | "orb" | "lantern" | "fragment" | "star"
  ) {
    this.type = type;
    this.reset(width, height, true);
  }

  reset(width: number, height: number, initial = false) {
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : -50;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.05;
    this.wiggle = Math.random() * 100;
    this.wiggleSpeed = 0.02 + Math.random() * 0.03;

    if (this.type === "rain") {
      this.vx = (Math.random() - 0.2) * 1.5;
      this.vy = 12 + Math.random() * 8;
      this.size = 1 + Math.random() * 2;
      this.opacity = 0.4 + Math.random() * 0.4;
      this.color = `rgba(174, 219, 255, ${this.opacity})`;
    } else if (this.type === "heart") {
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = -(0.5 + Math.random() * 1.5);
      this.size = 8 + Math.random() * 12;
      this.opacity = 0.3 + Math.random() * 0.5;
      const hue = Math.random() > 0.5 ? 340 : 320; // soft pink or magenta-pink
      this.color = `hsla(${hue}, 85%, 70%, ${this.opacity})`;
      if (!initial) this.y = height + 30; // Float up
    } else if (this.type === "leaf") {
      this.vx = -(0.3 + Math.random() * 1.2);
      this.vy = 0.8 + Math.random() * 1.2;
      this.size = 10 + Math.random() * 15;
      this.opacity = 0.2 + Math.random() * 0.5;
      const leafHues = [25, 40, 15]; // Orange, golden, mahogany
      const chosenHue = leafHues[Math.floor(Math.random() * leafHues.length)];
      this.color = `hsla(${chosenHue}, 70%, 45%, ${this.opacity})`;
    } else if (this.type === "fragment") {
      // Torn paper
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = 1.5 + Math.random() * 3;
      this.size = 6 + Math.random() * 12;
      this.opacity = 0.4 + Math.random() * 0.5;
      this.color = Math.random() > 0.4 ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(239, 68, 68, ${this.opacity})`; // white or red torn paper
    } else if (this.type === "orb") {
      // Sunrise rising light
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(0.8 + Math.random() * 1.5);
      this.size = 15 + Math.random() * 35;
      this.opacity = 0.2 + Math.random() * 0.3;
      this.color = `hsla(${35 + Math.random() * 15}, 90%, 65%, ${this.opacity})`; // glowing orange-yellow orbs
      if (!initial) this.y = height + 50;
    } else if (this.type === "lantern") {
      // Floating paper lantern (flickering slowly)
      this.vx = (Math.random() - 0.5) * 0.5 + Math.sin(this.wiggle) * 0.2;
      this.vy = -(0.4 + Math.random() * 0.7);
      this.size = 14 + Math.random() * 18;
      this.opacity = 0.4 + Math.random() * 0.4;
      this.color = `rgba(253, 150, 68, ${this.opacity})`; // soft glowing amber lantern
      if (!initial) this.y = height + 60;
    } else if (this.type === "star") {
      this.vx = 0;
      this.vy = 0;
      this.size = 0.5 + Math.random() * 1.8;
      this.opacity = 0.2 + Math.random() * 0.8;
      this.color = `rgba(255, 255, 255, ${this.opacity})`;
      // Keep stars fixed usually but let them slowly drift/twinkle
    } else {
      // Sunset Sparkles
      this.vx = (Math.random() - 0.5) * 1.0;
      this.vy = 0.3 + Math.random() * 0.8;
      this.size = 3 + Math.random() * 5;
      this.opacity = 0.3 + Math.random() * 0.5;
      this.color = `rgba(251, 191, 36, ${this.opacity})`; // Golden warm sparks
    }
  }

  update(width: number, height: number) {
    this.rotation += this.rotSpeed;
    this.wiggle += this.wiggleSpeed;

    if (this.type === "rain") {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > height) this.reset(width, height, false);
    } else if (this.type === "heart" || this.type === "orb" || this.type === "lantern") {
      this.x += this.vx + Math.sin(this.wiggle) * 0.4;
      this.y += this.vy;
      if (this.y < -60) this.reset(width, height, false);
    } else if (this.type === "leaf") {
      // Drifts side to side beautifully
      this.x += this.vx + Math.sin(this.wiggle) * 0.7;
      this.y += this.vy;
      if (this.y > height || this.x < -40) this.reset(width, height, false);
    } else if (this.type === "fragment") {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > height) this.reset(width, height, false);
    } else if (this.type === "star") {
      // Star twinkling
      this.opacity += (Math.random() - 0.5) * 0.1;
      if (this.opacity < 0.1) this.opacity = 0.15;
      if (this.opacity > 0.9) this.opacity = 0.85;
      this.color = `rgba(255, 255, 255, ${this.opacity})`;
    } else {
      // Sparkle
      this.x += this.vx + Math.sin(this.wiggle) * 0.3;
      this.y += this.vy;
      if (this.y > height) this.reset(width, height, false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.type === "heart") {
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw standard mathematical heart path
      const d = this.size;
      ctx.moveTo(0, d / 4);
      ctx.quadraticCurveTo(0, 0, d / 4, 0);
      ctx.quadraticCurveTo(d / 2, 0, d / 2, d / 3);
      ctx.quadraticCurveTo(d / 2, 0, (3 * d) / 4, 0);
      ctx.quadraticCurveTo(d, 0, d, d / 4);
      ctx.quadraticCurveTo(d, d / 2, (3 * d) / 4, (3 * d) / 4);
      ctx.lineTo(d / 2, d);
      ctx.lineTo(d / 4, (3 * d) / 4);
      ctx.quadraticCurveTo(0, d / 2, 0, d / 4);
      ctx.closePath();
      // Center heart on x,y
      ctx.translate(-d / 2, -d / 2);
      ctx.fill();
    } else if (this.type === "rain") {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(this.vx * 1.5, this.vy * 1.5);
      ctx.stroke();
    } else if (this.type === "leaf") {
      ctx.rotate(this.rotation + Math.sin(this.wiggle) * 0.2);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw double curves leaf
      const w = this.size;
      const h = this.size / 2;
      ctx.moveTo(-w / 2, 0);
      ctx.quadraticCurveTo(0, -h, w / 2, 0);
      ctx.quadraticCurveTo(0, h, -w / 2, 0);
      ctx.closePath();
      ctx.fill();
      // Add a tiny vein line
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.lineTo(w / 2, 0);
      ctx.stroke();
    } else if (this.type === "fragment") {
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw triangular/polygonal shard
      const r = this.size;
      ctx.moveTo(Math.cos(0) * r, Math.sin(0) * r);
      ctx.lineTo(Math.cos(2) * r, Math.sin(2) * r);
      ctx.lineTo(Math.cos(4) * r * 0.8, Math.sin(4) * r * 0.8);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === "orb") {
      // Sunbeams glowing orbs
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, "rgba(255, 239, 160, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "lantern") {
      // Floating paper lantern rectangle/trapezoid
      ctx.rotate(Math.sin(this.wiggle) * 0.15); // gentle swaying
      
      // Draw lantern body with soft backlighting
      const w = this.size;
      const h = this.size * 1.4;

      // Glow behind lantern
      const glowGrad = ctx.createRadialGradient(0, h / 2, 2, 0, h / 2, w * 2.2);
      glowGrad.addColorStop(0, "rgba(253, 150, 68, 0.45)");
      glowGrad.addColorStop(0.3, "rgba(253, 110, 48, 0.18)");
      glowGrad.addColorStop(1, "rgba(253, 110, 48, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, h / 2, w * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Draw lantern paper body (subtle orange glassmorphic)
      const paperGrad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      paperGrad.addColorStop(0, "rgba(254, 187, 107, 0.8)");
      paperGrad.addColorStop(0.5, "rgba(255, 230, 160, 0.9)");
      paperGrad.addColorStop(1, "rgba(254, 187, 107, 0.8)");
      ctx.fillStyle = paperGrad;
      
      // Draw rectangular paper box
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(w * 0.6 / 2, h);
      ctx.lineTo(-w * 0.6 / 2, h);
      ctx.closePath();
      ctx.fill();

      // Draw a burning warm candle/core inside near bottom
      const flameGrad = ctx.createRadialGradient(0, h * 0.7, 0, 0, h * 0.7, w * 0.45);
      flameGrad.addColorStop(0, "#ffffff");
      flameGrad.addColorStop(0.3, "#ffeb3b");
      flameGrad.addColorStop(0.8, "#ff5722");
      flameGrad.addColorStop(1, "rgba(255,87,34,0)");
      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.arc(0, h * 0.7, w * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Top and bottom wooden frames
      ctx.strokeStyle = "rgba(100, 50, 20, 0.65)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.lineTo(w / 2, 0);
      ctx.moveTo(-w * 0.6 / 2, h);
      ctx.lineTo(w * 0.6 / 2, h);
      ctx.stroke();

      // Render custom wish text floating adjacently to grand wishing lanterns
      if ((this as any).customWishText) {
        ctx.save();
        ctx.font = "italic 500 11px 'Playfair Display', Georgia, serif";
        ctx.fillStyle = "rgba(255, 222, 117, 0.95)";
        ctx.shadowColor = "rgba(0, 0, 0, 1)";
        ctx.shadowBlur = 6;
        ctx.fillText((this as any).customWishText, w * 0.75, h / 2 + 3);
        ctx.restore();
      }

    } else if (this.type === "star") {
      ctx.fillStyle = this.color;
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = Math.random() > 0.85 ? 4 : 0;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Golden Sparkle star cross
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const r = this.size;
      ctx.moveTo(0, -r);
      ctx.lineTo(r / 3, -r / 3);
      ctx.lineTo(r, 0);
      ctx.lineTo(r / 3, r / 3);
      ctx.lineTo(0, r);
      ctx.lineTo(-r / 3, r / 3);
      ctx.lineTo(-r, 0);
      ctx.lineTo(-r / 3, -r / 3);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}

// Map themes to particle types and base configurations
const THEME_MAP = {
  sunset: {
    bgFrom: { r: 18, g: 15, b: 24 },    // Deep dusty twilight purple
    bgTo: { r: 51, g: 26, b: 22 },      // Golden dusty rust orange
    particleCount: 40,
    particleType: "sparkle" as const
  },
  happy: {
    bgFrom: { r: 12, g: 18, b: 32 },    // Clear starry blue-black
    bgTo: { r: 35, g: 24, b: 38 },      // Pastel crimson-purple (rose sky)
    particleCount: 30,
    particleType: "heart" as const
  },
  sad: {
    // Rainy dark blue with heavy stormy blue-black background
    bgFrom: { r: 8, g: 10, b: 16 },
    bgTo: { r: 21, g: 28, b: 42 },
    particleCount: 110,                 // Lots of rain!
    particleType: "rain" as const       // Leaf is co-modeled or added dynamically
  },
  painful: {
    // Black and red cinematic atmosphere
    bgFrom: { r: 4, g: 4, b: 6 },
    bgTo: { r: 48, g: 8, b: 10 },
    particleCount: 50,
    particleType: "fragment" as const   // Torn floating card elements + red spots
  },
  recovery: {
    // Orange sunrise colors
    bgFrom: { r: 24, g: 12, b: 8 },
    bgTo: { r: 66, g: 33, b: 12 },
    particleCount: 45,
    particleType: "orb" as const
  },
  success: {
    // Royal blue and gold
    bgFrom: { r: 8, g: 12, b: 26 },
    bgTo: { r: 15, g: 28, b: 58 },
    particleCount: 60,
    particleType: "star" as const       // Glitter sparkling stars
  },
  ending: {
    // Starry night with floating lanterns
    bgFrom: { r: 5, g: 6, b: 12 },
    bgTo: { r: 14, g: 15, b: 31 },
    particleCount: 75,
    particleType: "lantern" as const    // Lanterns (some stars added automatically)
  }
};

type ColorHex = { r: number; g: number; b: number };

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep track of current interpolated colors for smooth cinematic transition
  const curFrom = useRef<ColorHex>({ r: 18, g: 15, b: 24 });
  const curTo = useRef<ColorHex>({ r: 51, g: 26, b: 22 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Handle container resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: CanvasParticle[] = [];

    // Custom lantern emitter linked to interactive wishing mechanics
    const handleSpawnCustomLantern = (event: Event) => {
      const customEvt = event as CustomEvent;
      const wishText = customEvt.detail?.wish || "";
      if (!wishText) return;

      const p = new CanvasParticle(width, height, "lantern");
      p.x = width * 0.15 + Math.random() * (width * 0.7); // spawn across middle 70% width
      p.y = height + 40;
      p.size = 22 + Math.random() * 8; // prominent aesthetic size
      p.vy = -(0.5 + Math.random() * 0.4); // slow, floating ascent velocity
      p.vx = (Math.random() - 0.5) * 0.25;
      (p as any).customWishText = wishText;
      particles.push(p);
    };
    window.addEventListener("spawn_custom_lantern", handleSpawnCustomLantern);

    // Helper to populate/refresh particles based on settings
    const currentSettings = THEME_MAP[theme];
    
    // Setup initial particles
    const rebuildParticles = () => {
      particles.length = 0;
      const count = currentSettings.particleCount;
      const primaryType = currentSettings.particleType;

      if (theme === "sad") {
        // Half rain, half falling leaves
        for (let i = 0; i < count * 0.7; i++) {
          particles.push(new CanvasParticle(width, height, "rain"));
        }
        for (let i = 0; i < count * 0.3; i++) {
          particles.push(new CanvasParticle(width, height, "leaf"));
        }
      } else if (theme === "ending") {
        // Half lanterns, half ambient background twinkling stars
        for (let i = 0; i < count * 0.35; i++) {
          particles.push(new CanvasParticle(width, height, "lantern"));
        }
        for (let i = 0; i < count * 0.65; i++) {
          particles.push(new CanvasParticle(width, height, "star"));
        }
      } else if (theme === "success") {
        // Success gets gorgeous twinkling stars + elegant yellow-gold sparks
        for (let i = 0; i < count * 0.6; i++) {
          particles.push(new CanvasParticle(width, height, "star"));
        }
        for (let i = 0; i < count * 0.4; i++) {
          particles.push(new CanvasParticle(width, height, "sparkle"));
        }
      } else {
        // Single type
        for (let i = 0; i < count; i++) {
          particles.push(new CanvasParticle(width, height, primaryType));
        }
      }
    };

    rebuildParticles();

    // Core Animation loop
    const render = () => {
      // 1. Smoothly interpolate colors (lerp) towards targeted theme colors
      const targetSettings = THEME_MAP[theme];
      const speed = 0.035; // smooth slow bleed

      curFrom.current.r += (targetSettings.bgFrom.r - curFrom.current.r) * speed;
      curFrom.current.g += (targetSettings.bgFrom.g - curFrom.current.g) * speed;
      curFrom.current.b += (targetSettings.bgFrom.b - curFrom.current.b) * speed;

      curTo.current.r += (targetSettings.bgTo.r - curTo.current.r) * speed;
      curTo.current.g += (targetSettings.bgTo.g - curTo.current.g) * speed;
      curTo.current.b += (targetSettings.bgTo.b - curTo.current.b) * speed;

      // Ensure integers
      const rF = Math.round(curFrom.current.r);
      const gF = Math.round(curFrom.current.g);
      const bF = Math.round(curFrom.current.b);

      const rT = Math.round(curTo.current.r);
      const gT = Math.round(curTo.current.g);
      const bT = Math.round(curTo.current.b);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `rgb(${rF}, ${gF}, ${bF})`);
      gradient.addColorStop(1, `rgb(${rT}, ${gT}, ${bT})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Spotlight effect for "success" / movie sections
      if (theme === "success" || theme === "recovery") {
        ctx.save();
        // Create sweeping cinematic spotlights from corners
        const time = Date.now() * 0.0004;
        const beamX = width * 0.15 + Math.sin(time) * 120;
        
        const spotGrad = ctx.createRadialGradient(
          0, 0, 10,
          beamX, height * 0.4, width * 0.45
        );
        spotGrad.addColorStop(0, "rgba(255, 223, 106, 0.12)");
        spotGrad.addColorStop(0.5, "rgba(224, 187, 255, 0.04)");
        spotGrad.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Add a subtle lightning thunder flash in the 'sad' theme
      if (theme === "sad" && Math.random() > 0.997) {
        ctx.fillStyle = "rgba(180, 220, 255, 0.12)";
        ctx.fillRect(0, 0, width, height);
      }

      // Draw and update particles if performance mode is disabled
      if (!document.body.classList.contains("performance-mode-no-particles")) {
        particles.forEach((particle) => {
          particle.update(width, height);
          // Draw particle
          particle.draw(ctx);
        });
      }

      // Special overlay details (e.g. cinematic vignette)
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.max(width, height) * 0.35,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("spawn_custom_lantern", handleSpawnCustomLantern);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Rebuild when theme changes strictly

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
      style={{ mixBlendMode: "normal" }}
    />
  );
};
