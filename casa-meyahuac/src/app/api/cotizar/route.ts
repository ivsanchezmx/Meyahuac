import { NextResponse } from "next/server";
import { cotizacionSchema } from "@/lib/cotizacion";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = cotizacionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: si vino lleno, fingimos éxito y descartamos
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // Envío con Resend (sólo si está configurado)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.COTIZACION_TO ?? "hola@casameyahuac.com";
  const from =
    process.env.COTIZACION_FROM ?? "Casa Meyahuac <no-reply@casameyahuac.com>";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `Nueva cotización · ${data.nombre} · ${data.tipoEvento}`,
        text: [
          `Nombre: ${data.nombre}`,
          `Email: ${data.email}`,
          `Teléfono: ${data.telefono ?? "—"}`,
          `Tipo de evento: ${data.tipoEvento}`,
          `Invitados: ${data.invitados}`,
          `Fecha tentativa: ${data.fecha}`,
          ``,
          `Mensaje:`,
          data.mensaje ?? "(sin mensaje)",
        ].join("\n"),
      });
    } catch (err) {
      console.error("[cotizar] Resend error:", err);
      return NextResponse.json(
        { error: "Error enviando correo" },
        { status: 500 },
      );
    }
  } else {
    // En dev sin API key: solo log
    console.log("[cotizar] Nueva cotización (sin Resend):", data);
  }

  return NextResponse.json({ ok: true });
}
