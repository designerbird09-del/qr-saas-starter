import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    let stars: { x: number; y: number; size: number; opacity: number; twinkleSpeed: number }[] = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          color: "180, 160, 140",
        });
      }
    }

    function createStars() {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    }

    function drawGradientWaves(time: number) {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const gradient1 = ctx.createLinearGradient(0, 0, w, h);
      gradient1.addColorStop(0, "rgba(10, 10, 10, 1)");
      gradient1.addColorStop(0.5, "rgba(20, 18, 15, 0.95)");
      gradient1.addColorStop(1, "rgba(10, 10, 10, 1)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 10) {
          const y = h * 0.6 + Math.sin(x * 0.003 + time * 0.0005 + i) * 80 + Math.cos(x * 0.007 + time * 0.0003) * 40;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        const waveGradient = ctx.createLinearGradient(0, h * 0.4, 0, h);
        waveGradient.addColorStop(0, `rgba(184, 115, 51, ${0.03 - i * 0.01})`);
        waveGradient.addColorStop(1, `rgba(212, 165, 116, ${0.01 - i * 0.003})`);
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      const auroraGradient = ctx.createRadialGradient(w * 0.3, h * 0.2, 0, w * 0.3, h * 0.2, w * 0.6);
      auroraGradient.addColorStop(0, `rgba(184, 115, 51, ${0.04 + Math.sin(time * 0.001) * 0.015})`);
      auroraGradient.addColorStop(0.5, `rgba(212, 165, 116, ${0.02 + Math.cos(time * 0.0008) * 0.01})`);
      auroraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, w, h);
    }

    function drawStars(time: number) {
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 200, ${star.opacity * twinkle})`;
        ctx.fill();
      });
    }

    function drawParticles() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });
    }

    function animate(time: number) {
      drawGradientWaves(time);
      drawStars(time);
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    createStars();
    animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", () => {
      resize();
      createParticles();
      createStars();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
