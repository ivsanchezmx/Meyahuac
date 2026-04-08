"use client";

import { useEffect, useRef } from "react";

/**
 * Partículas botánicas flotantes — semillas de especias / pétalos.
 * Canvas 2D, sin librerías. Se desactiva con prefers-reduced-motion.
 */
export function Particles({ density = 60 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const dpr = devicePixelRatio || 1;

    type P = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      a: number;
      rot: number;
      vr: number;
      hue: number;
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const particles: P[] = Array.from({ length: density }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, 2.4) * dpr,
      vy: rand(-0.05, -0.25) * dpr,
      vx: rand(-0.08, 0.08) * dpr,
      a: rand(0.15, 0.65),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.005, 0.005),
      hue: Math.random() > 0.5 ? 45 : 38, // dorado / ámbar
    }));

    let raf = 0;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = rand(0, w);
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 60%, 65%, ${p.a})`);
        grad.addColorStop(1, `hsla(${p.hue}, 60%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
