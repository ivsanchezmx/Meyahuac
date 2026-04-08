"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * PingPongVideo — reproduce el video adelante, y al terminar lo rebobina
 * decrementando currentTime con requestAnimationFrame hasta volver a 0.
 * Loop infinito en formato ping-pong.
 */
function PingPongVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf: number | null = null;
    let direction: 1 | -1 = 1;
    const STEP = 1 / 30; // ~30 fps reverse playback

    const reverseTick = () => {
      if (!v) return;
      v.currentTime = Math.max(0, v.currentTime - STEP);
      if (v.currentTime <= 0.04) {
        direction = 1;
        raf = null;
        v.play().catch(() => {});
        return;
      }
      raf = requestAnimationFrame(reverseTick);
    };

    const onEnded = () => {
      direction = -1;
      v.pause();
      raf = requestAnimationFrame(reverseTick);
    };

    v.addEventListener("ended", onEnded);
    // Asegurar autoplay inicial
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("ended", onEnded);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="metadata"
      className="h-full w-full object-cover opacity-25"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

type Fundador = {
  region: string;
  rol: string;
  texto: string;
  icono: string;
  imagen: string;
};

const fundadores: Fundador[] = [
  {
    region: "Querétaro",
    rol: "El Alquimista",
    texto:
      "El que conoce las especias y los secretos del fuego lento. Conserva las técnicas heredadas de los maestros destiladores coloniales.",
    icono: "✦",
    imagen: "/images/espiritu-queretaro.jpg",
  },
  {
    region: "Tlaxcala",
    rol: "El Guardián de la Tierra",
    texto:
      "El que conecta con los ingredientes originarios y la vainilla sagrada de Papantla. Habla con los campesinos antes de hablar con los chefs.",
    icono: "✧",
    imagen: "/images/espiritu-tlaxcala.jpg",
  },
  {
    region: "Ciudad de México",
    rol: "El Cosmopolita",
    texto:
      "El que une mundos. Sabe de elegancia, de ritmo, de celebración. Su mesa siempre tiene un lugar para un extraño.",
    icono: "✦",
    imagen: "/images/espiritu-cdmx.jpg",
  },
];

const frases = [
  {
    texto: "Tres amigos.",
    initial: { x: -80, opacity: 0 },
    color: "#F5EDD6",
    fontStyle: "normal" as const,
    delay: 0,
  },
  {
    texto: "Tres espíritus.",
    initial: { y: 50, opacity: 0, scale: 0.9 },
    color: "#C9A84C",
    fontStyle: "italic" as const,
    delay: 0.3,
  },
  {
    texto: "Tres regiones.",
    initial: { x: 80, opacity: 0 },
    color: "rgba(245,237,214,0.55)",
    fontStyle: "normal" as const,
    letterSpacing: "0.08em",
    delay: 0.6,
  },
];

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      id="historia"
      className="relative overflow-hidden bg-mey-black py-32 md:py-48"
    >
      {/* Video ambiental de fondo (solo desktop, ping-pong rewind) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <PingPongVideo src="/videos/historia-bg.mp4" />
        {/* Overlay izquierdo donde está el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />
        {/* Overlay inferior para evitar competir con cards */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* Capa parallax decorativa */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[140%] opacity-30"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 30% at 30% 30%, rgba(201,168,76,0.15), transparent 60%), radial-gradient(ellipse 50% 30% at 70% 70%, rgba(26,47,30,0.35), transparent 60%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div ref={titleRef} className="relative mx-auto max-w-3xl text-center">
          {/* "3" atmosférico */}
          <div
            className="mey-display pointer-events-none absolute -left-8 top-1/2 z-0 -translate-y-1/2 select-none text-[280px] leading-none"
            style={{ color: "rgba(201,168,76,0.04)" }}
            aria-hidden
          >
            3
          </div>

          <p className="mey-divider relative z-10 mb-8 justify-center">La Historia</p>

          <h2 className="mey-display relative z-10 text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            {frases.map((frase) => (
              <motion.span
                key={frase.texto}
                initial={frase.initial}
                animate={inView ? { x: 0, y: 0, opacity: 1, scale: 1 } : frase.initial}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: frase.delay,
                }}
                style={{
                  color: frase.color,
                  fontStyle: frase.fontStyle,
                  letterSpacing: frase.letterSpacing ?? "normal",
                }}
                className="block"
              >
                {frase.texto}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-10 max-w-2xl text-base leading-relaxed text-mey-cream/70 md:text-lg"
          >
            Cada uno trae lo suyo desde su tierra. Juntos destilan algo que
            ninguno podría crear solo: licores que cuentan historias de México,
            hechos para los momentos más importantes de la vida.
          </motion.p>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {fundadores.map((f, i) => (
            <motion.article
              key={f.region}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.1,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden border border-[rgba(201,168,76,0.15)] bg-mey-black-soft transition-all duration-700 hover:border-mey-gold"
            >
              {/* Imagen 1:1 */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={f.imagen}
                  alt={`Espíritu de ${f.region}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Overlay degradado bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.95) 100%)",
                  }}
                />
                {/* Texto sobre la imagen */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-2xl text-mey-gold">{f.icono}</span>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-mey-gold">
                    Espíritu de
                  </p>
                  <h3 className="mey-display mt-1 text-3xl text-mey-cream md:text-4xl">
                    {f.region}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mey-cream/65">
                    {f.rol}
                  </p>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="px-6 pb-7 pt-6">
                <p className="text-sm leading-relaxed text-mey-cream/70">
                  {f.texto}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
