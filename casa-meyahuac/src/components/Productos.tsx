"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { productos, type Producto } from "@/lib/productos";

export function Productos() {
  const [activo, setActivo] = useState<Producto | null>(null);

  return (
    <section
      id="licores"
      className="relative overflow-hidden bg-mey-black-soft py-32 md:py-48"
    >
      <div className="absolute inset-0 mey-paper opacity-30" />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mey-divider mb-6">Nuestros Licores</p>
            <h2 className="mey-display max-w-2xl text-5xl text-mey-cream md:text-7xl">
              Cuatro destilados.
              <br />
              <span className="text-mey-gold">Una sola obsesión.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-mey-cream/60">
            Cada botella es una geografía mexicana embotellada. Pasa el cursor
            por encima para revelar su carácter, haz click para entrar a su
            historia completa.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProductoCard producto={p} onOpen={() => setActivo(p)} />
            </motion.li>
          ))}
        </ul>
      </div>

      <ProductoDialog
        producto={activo}
        onClose={() => setActivo(null)}
      />
    </section>
  );
}

function ProductoCard({
  producto,
  onOpen,
}: {
  producto: Producto;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      data-cursor="hover"
      className="group relative block w-full overflow-hidden border border-[var(--mey-line)] bg-mey-black text-left transition-all duration-700 hover:border-[var(--mey-line-strong)]"
    >
      {/* Imagen / placeholder */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* Fondo gradiente con color del producto */}
        <div
          className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${producto.acento}33, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)`,
          }}
        />
        {/* Imagen real (si existe) */}
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-0 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100 data-[loaded=true]:opacity-100"
          onLoadingComplete={(img) => img.setAttribute("data-loaded", "true")}
          // si la imagen no existe en build, Next igual la pide en runtime;
          // mostramos solo el gradiente como fallback elegante
          unoptimized={false}
        />
        {/* Velo inferior */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-mey-black via-mey-black/80 to-transparent" />
        {/* Línea decorativa que crece en hover */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-mey-gold transition-all duration-1000 group-hover:w-full" />
      </div>

      {/* Texto */}
      <div className="relative px-6 pb-7 pt-5">
        <p
          className="text-[10px] uppercase tracking-[0.32em]"
          style={{ color: producto.acento }}
        >
          {producto.categoria}
        </p>
        <h3 className="mey-display mt-2 text-3xl text-mey-cream md:text-4xl">
          {producto.nombre}
        </h3>
        <p className="mt-2 text-xs text-mey-cream/50">{producto.region}</p>

        <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-mey-cream/75">
            {producto.caracter}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mey-gold">
            Ver historia <span>→</span>
          </p>
        </div>
      </div>
    </button>
  );
}

function ProductoDialog({
  producto,
  onClose,
}: {
  producto: Producto | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={!!producto} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-mey-black/85 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[90] w-[min(96vw,1100px)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-[var(--mey-line-strong)] bg-mey-black-soft p-0 shadow-2xl focus:outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {producto?.nombre ?? ""}
          </Dialog.Title>
          {producto && (
            <div className="grid md:grid-cols-2">
              <div
                className="relative min-h-[320px] md:min-h-[600px]"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${producto.acento}40, transparent 70%), #0a0a0a`,
                }}
              >
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-mey-black-soft md:to-mey-black-soft/40" />
              </div>

              <div className="relative p-8 md:p-14">
                <Dialog.Close
                  aria-label="Cerrar"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mey-line)] text-mey-cream/70 transition-all hover:border-mey-gold hover:text-mey-gold"
                >
                  ×
                </Dialog.Close>

                <p
                  className="text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: producto.acento }}
                >
                  {producto.categoria}
                </p>
                <h3 className="mey-display mt-3 text-5xl text-mey-cream md:text-6xl">
                  {producto.nombre}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mey-cream/50">
                  {producto.region}
                </p>

                <p className="mt-8 text-base leading-relaxed text-mey-cream/80">
                  {producto.descripcionLarga}
                </p>

                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-mey-gold">
                    Notas de Sabor
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {producto.notasSabor.map((n) => (
                      <li
                        key={n}
                        className="rounded-full border border-[var(--mey-line)] px-3 py-1 text-xs text-mey-cream/80"
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-[var(--mey-line)] pt-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-mey-gold">
                    Para Bodas
                  </p>
                  <p className="mt-2 text-sm italic leading-relaxed text-mey-cream/75">
                    «{producto.paraBodas}»
                  </p>
                </div>

                <div className="mt-10 border-t border-[var(--mey-line)] pt-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-mey-cream/60">
                    Color
                  </p>
                  <p className="mt-2 text-sm text-mey-cream/80">
                    {producto.color}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
