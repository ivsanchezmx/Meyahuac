"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Paquete = {
  id: string;
  nombre: string;
  nivel: string;
  tagline: string;
  capacidad: string;
  descripcion: string;
  incluye: string[];
  acento: string;
  destacado?: boolean;
};

const paquetes: Paquete[] = [
  {
    id: "essentia",
    nombre: "Colección Essentia",
    nivel: "Básico · Personalizado",
    tagline: "El Arte de Anfitrionar",
    capacidad: "Desde 20 a 30 invitados",
    descripcion:
      "Para los momentos íntimos donde cada detalle importa porque cada invitado importa. Una experiencia curada para anfitriones que entienden que la elegancia se mide en pausas, no en cantidades.",
    incluye: [
      "Nuestra ginebra artesanal Alma de Jaguar",
      "Insumos premium de coctelería",
      "Personalización de etiquetas con tu ritual",
      "Guía de servicio para tu equipo",
    ],
    acento: "#c9a84c",
  },
  {
    id: "signature",
    nombre: "Colección Signature",
    nivel: "Clásico · Fiesta",
    tagline: "Elegancia en Movimiento",
    capacidad: "Recepciones de 50 a 150 invitados",
    descripcion:
      "Para celebraciones donde la barra es protagonista. Servicio de carrito de coctelería itinerante o mesas DIY de Gin diseñadas para que tus invitados sean parte del ritual y tú seas el centro de atención.",
    incluye: [
      "Carrito de coctelería itinerante",
      "Mesa DIY de Gin con botánicos vivos",
      "Selección de dos espíritus Casa Meyahuac",
      "Bartenders entrenados in-house",
      "Cristalería y mise-en-place completo",
    ],
    acento: "#e0c061",
    destacado: true,
  },
  {
    id: "haute-couture",
    nombre: "Colección Haute Couture",
    nivel: "Premium · Creadora",
    tagline: "Tu Historia, Destilada",
    capacidad: "Hasta 100 invitados — exclusivo",
    descripcion:
      "El máximo nivel de lujo. Co-creamos contigo una receta única — un destilado nacido de tu historia de amor, embotellado con tu nombre y servido exclusivamente en tu gran día. Ningún otro evento en el mundo tendrá ese sabor.",
    incluye: [
      "Co-creación de receta con nuestro maestro destilador",
      "Sesiones de cata privadas previas al evento",
      "Botellas con etiqueta de autor (cantidad ilimitada)",
      "Servicio de coctelería de autor",
      "Maridaje a 4 tiempos con chef invitado",
      "Edición conmemorativa post-evento para los novios",
    ],
    acento: "#8b1a1a",
  },
];

export function Experiencias() {
  return (
    <section
      id="experiencias"
      className="relative overflow-hidden bg-mey-black py-32 md:py-48"
    >
      <div className="absolute inset-0 mey-paper opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 20%, rgba(201,168,76,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Encabezado + imagen evocadora */}
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--mey-line)]"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.18), transparent 60%), linear-gradient(180deg, #1a2f1e 0%, #0a0a0a 100%)",
              }}
            />
            <Image
              src="/images/wedding-bar.svg"
              alt="Barra de hacienda Casa Meyahuac"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mey-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[10px] uppercase tracking-[0.32em] text-mey-gold">
                Hacienda · Atardecer · Velas
              </p>
              <p className="mey-display mt-2 text-3xl italic text-mey-cream md:text-4xl">
                «No vendemos licor.
                <br />
                Vendemos memoria.»
              </p>
            </div>
          </motion.div>

          <div>
            <p className="mey-divider mb-6">Experiencias para Bodas</p>
            <h2 className="mey-display text-5xl text-mey-cream md:text-6xl lg:text-7xl">
              Tres niveles
              <br />
              de <span className="text-mey-gold">exclusividad.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-mey-cream/70">
              Cada colección es un grado distinto de presencia. Desde el ritual
              íntimo hasta el destilado único nacido de tu historia. Tú eliges
              hasta dónde llevar la noche.
            </p>

            <Link
              href="#contacto"
              className="mey-glow mt-12 inline-block rounded-full bg-mey-gold px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-mey-black transition-all duration-500 hover:bg-mey-gold-bright"
            >
              Cotiza tu colección
            </Link>
          </div>
        </div>

        {/* Tres paquetes */}
        <ul className="mt-24 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {paquetes.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative flex flex-col border bg-mey-black-soft p-8 transition-all duration-700 md:p-10 ${
                p.destacado
                  ? "border-mey-gold/60"
                  : "border-[var(--mey-line)] hover:border-[var(--mey-line-strong)]"
              }`}
            >
              {/* Línea superior decorativa */}
              <div
                className="absolute -top-[1px] left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-1000 group-hover:scale-x-100"
                style={{ backgroundColor: p.acento }}
              />

              {p.destacado && (
                <span className="absolute right-6 top-6 rounded-full border border-mey-gold/60 bg-mey-black px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-mey-gold">
                  Más solicitada
                </span>
              )}

              <p
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: p.acento }}
              >
                {p.nivel}
              </p>
              <h3 className="mey-display mt-3 text-3xl text-mey-cream md:text-4xl">
                {p.nombre}
              </h3>
              <p className="mey-display mt-1 text-lg italic text-mey-cream/80">
                {p.tagline}
              </p>

              <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-mey-cream/50">
                {p.capacidad}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-mey-cream/70">
                {p.descripcion}
              </p>

              <div className="mt-auto pt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-mey-gold">
                  Incluye
                </p>
                <ul className="mt-4 space-y-3">
                  {p.incluye.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-sm text-mey-cream/75"
                    >
                      <span
                        className="text-xs"
                        style={{ color: p.acento }}
                      >
                        ✦
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contacto"
                  className="mt-8 inline-flex items-center gap-2 border-b border-[var(--mey-line)] pb-1 text-[11px] uppercase tracking-[0.3em] text-mey-cream transition-colors hover:border-mey-gold hover:text-mey-gold"
                >
                  Cotizar esta colección <span>→</span>
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
