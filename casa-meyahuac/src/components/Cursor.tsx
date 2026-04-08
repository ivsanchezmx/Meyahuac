"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado: gota dorada de licor.
 * Crece sobre elementos interactivos.
 * Se desactiva en touch / coarse pointer.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches);
    const onChange = () => setEnabled(fine.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rx = 0,
      ry = 0;
    let dx = 0,
      dy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const isInteractive = !!t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      setHover(isInteractive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full border border-mey-gold/60 transition-[width,height,margin,opacity,background-color] duration-300 ease-out"
        style={{
          width: hover ? "64px" : "40px",
          height: hover ? "64px" : "40px",
          marginLeft: hover ? "-32px" : "-20px",
          marginTop: hover ? "-32px" : "-20px",
          backgroundColor: hover ? "rgba(201,168,76,0.12)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-mey-gold-bright"
        style={{ boxShadow: "0 0 12px rgba(201,168,76,0.9)" }}
      />
    </>
  );
}
