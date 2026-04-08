"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "meyahuac:age-confirmed";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const confirmed = window.localStorage.getItem(STORAGE_KEY);
    if (confirmed !== "true") setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleAccept() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setOpen(false);
  }

  function handleDeny() {
    setDenied(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-mey-black/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
        >
          {/* Fondo dramático */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.15), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 -z-10 mey-paper opacity-30" />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-6 w-full max-w-md border border-[var(--mey-line-strong)] bg-mey-black-soft px-8 py-12 text-center shadow-2xl md:px-12 md:py-16"
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/logo.svg"
                alt="Casa Meyahuac"
                width={180}
                height={70}
                className="h-auto w-[180px] brightness-0 invert"
                priority
              />
            </div>

            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="block h-[1px] w-10 bg-mey-gold" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-mey-gold">
                Verificación
              </span>
              <span className="block h-[1px] w-10 bg-mey-gold" />
            </div>

            {!denied ? (
              <>
                <h2
                  id="age-gate-title"
                  className="mey-display text-3xl text-mey-cream md:text-4xl"
                >
                  ¿Eres mayor de edad?
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-mey-cream/65">
                  Para entrar a Casa Meyahuac debes tener la edad legal para
                  consumir bebidas alcohólicas en tu país.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={handleAccept}
                    data-cursor="hover"
                    className="mey-glow rounded-full bg-mey-gold px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-mey-black transition-all duration-500 hover:bg-mey-gold-bright"
                  >
                    Sí, soy mayor
                  </button>
                  <button
                    type="button"
                    onClick={handleDeny}
                    data-cursor="hover"
                    className="rounded-full border border-[var(--mey-line)] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-mey-cream/80 transition-all duration-500 hover:border-mey-gold hover:text-mey-gold"
                  >
                    No
                  </button>
                </div>

                <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-mey-cream/40">
                  Beber con moderación · Prohibida su venta a menores de edad
                </p>
              </>
            ) : (
              <>
                <h2 className="mey-display text-3xl text-mey-cream md:text-4xl">
                  Lo sentimos
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-mey-cream/65">
                  Debes ser mayor de edad para acceder a este sitio. Vuelve
                  cuando puedas disfrutar responsablemente de nuestras
                  creaciones.
                </p>
                <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-mey-cream/40">
                  Casa Meyahuac · México
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
