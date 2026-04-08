"use client";

import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  cotizacionSchema,
  type CotizacionInput,
  type CotizacionOutput,
} from "@/lib/cotizacion";

export function Contacto() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CotizacionInput, unknown, CotizacionOutput>({
    resolver: zodResolver(cotizacionSchema),
    defaultValues: {
      tipoEvento: "boda",
    },
  });

  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const onSubmit: SubmitHandler<CotizacionOutput> = async (data) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-mey-black py-32 md:py-48"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(201,168,76,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <p className="mey-divider mb-6">Cotización</p>
            <h2 className="mey-display text-5xl text-mey-cream md:text-7xl">
              Cuéntanos
              <br />
              <span className="text-mey-gold">tu celebración.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-mey-cream/70">
              Cada evento es único. Diseñamos una propuesta a la medida en menos
              de 48 horas hábiles. Sin compromiso.
            </p>

            <div className="mt-12 space-y-4 text-sm text-mey-cream/60">
              <p className="flex items-start gap-3">
                <span className="text-mey-gold">✦</span>
                Contacto directo con un anfitrión, no con un call center.
              </p>
              <p className="flex items-start gap-3">
                <span className="text-mey-gold">✦</span>
                Cotización personalizada según tu menú e invitados.
              </p>
              <p className="flex items-start gap-3">
                <span className="text-mey-gold">✦</span>
                Cobertura en CDMX, Querétaro, Tlaxcala y bajo solicitud, todo
                México.
              </p>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit(onSubmit)}
            className="border border-[var(--mey-line)] bg-mey-black-soft p-8 md:p-12"
            noValidate
          >
            {/* Honeypot oculto */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              {...register("website")}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nombre" error={errors.nombre?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  {...register("nombre")}
                  className={inputStyle}
                />
              </Field>

              <Field label="Correo" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={inputStyle}
                />
              </Field>

              <Field label="Teléfono" error={errors.telefono?.message}>
                <input
                  type="tel"
                  autoComplete="tel"
                  {...register("telefono")}
                  className={inputStyle}
                />
              </Field>

              <Field label="Tipo de evento" error={errors.tipoEvento?.message}>
                <select {...register("tipoEvento")} className={inputStyle}>
                  <option value="boda">Boda</option>
                  <option value="cata">Cata privada</option>
                  <option value="corporativo">Corporativo</option>
                  <option value="privado">Evento privado</option>
                  <option value="otro">Otro</option>
                </select>
              </Field>

              <Field label="Invitados" error={errors.invitados?.message}>
                <input
                  type="number"
                  min={10}
                  {...register("invitados")}
                  className={inputStyle}
                />
              </Field>

              <Field label="Fecha tentativa" error={errors.fecha?.message}>
                <input
                  type="text"
                  placeholder="Ej. Octubre 2026"
                  {...register("fecha")}
                  className={inputStyle}
                />
              </Field>
            </div>

            <Field
              label="Mensaje"
              error={errors.mensaje?.message}
              className="mt-6"
            >
              <textarea
                rows={4}
                placeholder="Cuéntanos de tu evento, locación, ambiente que buscas…"
                {...register("mensaje")}
                className={`${inputStyle} resize-none`}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mey-glow mt-8 w-full rounded-full bg-mey-gold px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-mey-black transition-all duration-500 hover:bg-mey-gold-bright disabled:opacity-50"
            >
              {isSubmitting ? "Enviando…" : "Enviar cotización"}
            </button>

            {status === "ok" && (
              <p className="mt-5 text-center text-sm text-mey-gold">
                Recibido. Un anfitrión te contactará en menos de 48 horas.
              </p>
            )}
            {status === "error" && (
              <p className="mt-5 text-center text-sm text-mey-ruby">
                Algo salió mal. Intenta de nuevo o escribe a
                hola@casameyahuac.com
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const inputStyle =
  "w-full border-0 border-b border-[var(--mey-line)] bg-transparent px-0 py-3 text-sm text-mey-cream placeholder:text-mey-cream/30 focus:border-mey-gold focus:outline-none focus:ring-0";

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.28em] text-mey-cream/60">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-[11px] text-mey-ruby">{error}</p>}
    </label>
  );
}
