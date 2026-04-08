"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "./Particles";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-mey-black"
    >
      {/* Imagen hero full-bleed */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-altar.jpg"
          alt="Casa Meyahuac — Altar de Espíritus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay degradado: oscuro a la izquierda donde va el texto, transparente a la derecha */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.85) 25%, rgba(5,5,5,0.55) 50%, rgba(5,5,5,0.2) 75%, rgba(5,5,5,0) 100%)",
        }}
      />
      {/* Velo inferior + textura */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-mey-black via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 mey-paper opacity-20" />
      <div className="absolute inset-0 -z-10 mey-vignette" />

      {/* Partículas botánicas flotantes */}
      <Particles density={70} />

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="block h-[1px] w-12 bg-mey-gold" />
            <span
              className="text-[10px] uppercase text-mey-gold"
              style={{ letterSpacing: "0.3em" }}
            >
              Tres Espíritus · Una Celebración
            </span>
          </div>

          <h1 className="mey-display text-[14vw] leading-[0.88] text-mey-cream md:text-[8.5vw] lg:text-[7.5rem]">
            Donde
            <br />
            <span className="text-mey-gold">México</span>
            <br />
            <em className="not-italic">celebra.</em>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{ color: "#A89880" }}
          >
            Bebidas artesanales hechas para los momentos que se recordarán por
            décadas. Vainilla de Papantla, cítricos de Colima, guayaba de
            altura, plátano de Tabasco — destilados en pequeñas series para tus
            celebraciones más importantes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Link
              href="#licores"
              className="border border-[#C9A84C]/50 bg-transparent px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#F5EDD6] transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            >
              Descubre Casa Meyahuac
            </Link>
            <Link
              href="#contacto"
              className="group flex items-center gap-3 px-2 py-4 text-[11px] uppercase tracking-[0.32em] text-mey-cream"
            >
              <span className="border-b border-mey-cream/30 pb-1 transition-colors group-hover:border-mey-gold group-hover:text-mey-gold">
                Cotiza tu experiencia
              </span>
              <span className="text-mey-gold transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Etiqueta vertical decorativa */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-180 md:block">
          <p
            className="text-[10px] uppercase tracking-[0.5em] text-mey-cream/40"
            style={{ writingMode: "vertical-rl" }}
          >
            Edición artesanal · México 2026
          </p>
        </div>

        {/* Indicador scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.32em] text-mey-cream/50">
              desliza
            </span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-mey-gold/80 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
