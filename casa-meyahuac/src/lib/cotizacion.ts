import { z } from "zod";

export const cotizacionSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Tu nombre, por favor")
    .max(120, "Demasiado largo"),
  email: z.string().trim().email("Correo no válido").max(200),
  telefono: z
    .string()
    .trim()
    .min(7, "Teléfono incompleto")
    .max(30, "Demasiado largo")
    .optional()
    .or(z.literal("")),
  tipoEvento: z.enum([
    "boda",
    "cata",
    "corporativo",
    "privado",
    "otro",
  ]),
  invitados: z.coerce
    .number({ error: "Indica un número" })
    .int()
    .min(10, "Mínimo 10 invitados")
    .max(5000, "Demasiados, ¿en serio?"),
  fecha: z.string().trim().min(1, "Fecha requerida").max(40),
  mensaje: z
    .string()
    .trim()
    .max(2000, "Máximo 2000 caracteres")
    .optional()
    .or(z.literal("")),
  // Honeypot anti-spam
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CotizacionInput = z.input<typeof cotizacionSchema>;
export type CotizacionOutput = z.output<typeof cotizacionSchema>;
