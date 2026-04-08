"use client";

import { motion, AnimatePresence } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import { useEffect, useMemo, useRef, useState } from "react";

const VIEW_W = 800;
const VIEW_H = 520;

type LabelDir = "right" | "left" | "above" | "below";

type Marcador = {
  id: string;
  nombre: string;
  producto: string;
  licor: string;
  coords: [number, number]; // [lng, lat]
  color: string;
  labelDir: LabelDir;
};

const marcadores: Marcador[] = [
  {
    id: "papantla",
    nombre: "Papantla, Veracruz",
    producto: "Vainilla",
    licor: "Gin Espíritu Jaguar",
    coords: [-97.32, 20.44],
    color: "#E8C44A",
    labelDir: "right",
  },
  {
    id: "colima",
    nombre: "Colima",
    producto: "Cítricos",
    licor: "Gin Espíritu Jaguar",
    coords: [-103.72, 19.24],
    color: "#E8C44A",
    labelDir: "left",
  },
  {
    id: "tabasco",
    nombre: "Tabasco",
    producto: "Plátano",
    licor: "Banana Na",
    coords: [-92.92, 17.98],
    color: "#FFD700",
    labelDir: "right",
  },
  {
    id: "jalisco",
    nombre: "Jalisco",
    producto: "Guayaba",
    licor: "Guayaba Na",
    coords: [-103.34, 20.66],
    color: "#FF4D8D",
    labelDir: "left",
  },
  {
    id: "tamaulipas",
    nombre: "Tamaulipas",
    producto: "Naranja",
    licor: "Naranja Na",
    coords: [-99.14, 24.26],
    color: "#FF6B1A",
    labelDir: "right",
  },
  {
    id: "queretaro",
    nombre: "Querétaro",
    producto: "Espíritu Fundador",
    licor: "",
    coords: [-100.39, 20.59],
    color: "#FFFFFF",
    labelDir: "above",
  },
  {
    id: "tlaxcala",
    nombre: "Tlaxcala",
    producto: "Espíritu Fundador",
    licor: "",
    coords: [-98.24, 19.31],
    color: "#FFFFFF",
    labelDir: "above",
  },
  {
    id: "cdmx",
    nombre: "Ciudad de México",
    producto: "Espíritu Fundador",
    licor: "",
    coords: [-99.13, 19.43],
    color: "#FFFFFF",
    labelDir: "below",
  },
];

const leyenda = [
  { producto: "Vainilla", color: "#E8C44A" },
  { producto: "Cítricos", color: "#E8C44A" },
  { producto: "Plátano", color: "#FFD700" },
  { producto: "Guayaba", color: "#FF4D8D" },
  { producto: "Naranja", color: "#FF6B1A" },
  { producto: "Fundadores", color: "#FFFFFF" },
];

export default function MapaOrigen() {
  const [paths, setPaths] = useState<string[]>([]);
  const [puntos, setPuntos] = useState<
    Array<Marcador & { x: number; y: number }>
  >([]);
  const [active, setActive] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch("/mexico-states.json")
      .then((r) => r.json())
      .then((geo: FeatureCollection<Geometry>) => {
        if (!alive) return;
        const projection = geoMercator().fitSize([VIEW_W, VIEW_H], geo);
        const pathGen = geoPath(projection);
        const ps: string[] = [];
        for (const f of geo.features) {
          const d = pathGen(f);
          if (d) ps.push(d);
        }
        setPaths(ps);
        const pts = marcadores.map((m) => {
          const xy = projection(m.coords);
          return {
            ...m,
            x: xy ? xy[0] : 0,
            y: xy ? xy[1] : 0,
          };
        });
        setPuntos(pts);
      })
      .catch((e) => console.error("MapaOrigen fetch error", e));
    return () => {
      alive = false;
    };
  }, []);

  // Posición del tooltip en coordenadas del viewBox (luego escalado a pixels reales por CSS)
  const tooltipFor = useMemo(() => {
    return (m: Marcador & { x: number; y: number }) => {
      switch (m.labelDir) {
        case "right":
          return { left: `${(m.x + 14) / VIEW_W * 100}%`, top: `${(m.y - 26) / VIEW_H * 100}%`, transform: "none" };
        case "left":
          return { left: `${(m.x - 14) / VIEW_W * 100}%`, top: `${(m.y - 26) / VIEW_H * 100}%`, transform: "translateX(-100%)" };
        case "above":
          return { left: `${m.x / VIEW_W * 100}%`, top: `${(m.y - 18) / VIEW_H * 100}%`, transform: "translate(-50%, -100%)" };
        case "below":
          return { left: `${m.x / VIEW_W * 100}%`, top: `${(m.y + 14) / VIEW_H * 100}%`, transform: "translateX(-50%)" };
      }
    };
  }, []);

  return (
    <section
      id="origen"
      className="relative overflow-hidden bg-mey-black-soft py-32 md:py-48"
    >
      <div className="absolute inset-0 mey-paper opacity-30" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="mey-divider mb-6">El Origen</p>
          <h2 className="mey-display text-5xl text-mey-cream md:text-7xl">
            México,
            <br />
            <span className="text-mey-gold">de raíz a copa.</span>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-mey-cream/70">
            Cada ingrediente proviene de una región específica, en su
            temporada, de manos que conocen su nombre. Sin atajos. Sin
            imitaciones.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="relative mx-auto w-full bg-[#020704]"
          style={{ maxWidth: 1100 }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            xmlns="http://www.w3.org/2000/svg"
            className="block h-auto w-full"
            role="img"
            aria-label="Mapa de México con regiones de origen de Casa Meyahuac"
          >
            <defs>
              <radialGradient id="mapBg" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#06120A" />
                <stop offset="100%" stopColor="#020704" />
              </radialGradient>
            </defs>

            <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#mapBg)" />

            {/* Estados de México */}
            <g>
              {paths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="#060D08"
                  stroke="#0F2010"
                  strokeWidth={0.5}
                  style={{ pointerEvents: "none" }}
                />
              ))}
            </g>

            {/* Marcadores */}
            <g>
              {puntos.map((m, i) => {
                const isActive = active === m.id;
                return (
                  <g
                    key={m.id}
                    transform={`translate(${m.x},${m.y})`}
                    onMouseEnter={() => setActive(m.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(m.id)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    style={{ cursor: "none", outline: "none" }}
                    data-cursor="hover"
                  >
                    {/* Pulso sutil único */}
                    <motion.circle
                      r={4}
                      fill="transparent"
                      stroke={m.color}
                      strokeWidth={0.6}
                      initial={{ scale: 1, opacity: 0.35 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.4,
                      }}
                      style={{ transformOrigin: "center", transformBox: "fill-box" }}
                    />
                    {/* Punto central minimal */}
                    <circle
                      r={isActive ? 4 : 3.2}
                      fill={m.color}
                      style={{
                        filter: `drop-shadow(0 0 4px ${m.color}90)`,
                        transition: "all 0.3s ease",
                      }}
                    />
                    {/* Hit area generosa para hover/touch */}
                    <circle r={14} fill="transparent" />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Tooltips HTML overlay (posicionados en % del wrapper) */}
          <div className="pointer-events-none absolute inset-0">
            <AnimatePresence>
              {puntos.map(
                (m) =>
                  active === m.id && (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute z-10"
                      style={{
                        ...tooltipFor(m),
                        background: "#0A0A0A",
                        border: `1px solid ${m.color}`,
                        borderRadius: 4,
                        padding: "8px 12px",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                      }}
                    >
                      <p
                        style={{
                          color: m.color,
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          margin: 0,
                        }}
                      >
                        {m.producto}
                      </p>
                      <p
                        style={{
                          color: "#F5EDD6",
                          fontSize: 12,
                          margin: "2px 0 0",
                        }}
                      >
                        {m.nombre}
                      </p>
                      {m.licor && (
                        <p
                          style={{
                            color: "#888",
                            fontSize: 10,
                            margin: "2px 0 0",
                          }}
                        >
                          {m.licor}
                        </p>
                      )}
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Leyenda */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em] text-mey-cream/70">
          {leyenda.map((l) => (
            <li key={l.producto} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: l.color, boxShadow: `0 0 8px ${l.color}80` }}
              />
              {l.producto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
