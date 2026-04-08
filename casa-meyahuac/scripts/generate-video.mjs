// Veo 3.1 Fast — generate ambient background video for Casa Meyahuac
// Run: GEMINI_API_KEY=... node scripts/generate-video.mjs

import { GoogleGenAI } from "@google/genai";
import { writeFileSync } from "node:fs";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const prompt = `Cinematic 8-second seamless loop for luxury Mexican spirits brand background. Extreme slow motion: golden copal smoke rising in thin elegant wisps against pure black. Scattered on a dark obsidian surface: vanilla pods from Papantla, dried citrus slices, coriander seeds, rose petals, dried guava flowers. A single drop of amber liquid falls in ultra slow motion into a crystal glass, creating a golden crown splash. The smoke and the drop are the only movement. No people. No faces. No text. Color palette: deep black, warm gold, obsidian. Shot on 65mm, shallow depth of field, film grain. The last frame matches the first for perfect loop.`;

const MODEL = "veo-3.1-fast-generate-preview";
const OUTPUT = "public/videos/historia-bg.mp4";

console.log(`→ Modelo: ${MODEL}`);
console.log(`→ Iniciando generación...`);

let operation = await ai.models.generateVideos({
  model: MODEL,
  prompt,
  config: {
    aspectRatio: "16:9",
    durationSeconds: 8,
  },
});

console.log(`→ Operación: ${operation.name ?? "(sin nombre)"}`);
console.log(`→ Polling cada 5s...`);

let polls = 0;
while (!operation.done) {
  await new Promise((r) => setTimeout(r, 5000));
  polls++;
  process.stdout.write(`  poll #${polls}...\r`);
  operation = await ai.operations.getVideosOperation({ operation });
}

console.log(`\n→ Operación completa.`);

// Inspect response shape — Veo SDK can return generatedVideos or generatedSamples
const resp = operation.response;
if (!resp) {
  console.error("Sin respuesta. Operación:", JSON.stringify(operation, null, 2));
  process.exit(1);
}

const videos = resp.generatedVideos ?? resp.generatedSamples ?? [];
if (!videos.length) {
  console.error("Sin videos en respuesta. Shape:", JSON.stringify(resp, null, 2));
  process.exit(1);
}

const first = videos[0];
const videoFile = first.video ?? first;

// Two paths to retrieve bytes:
// 1) videoBytes (base64) inline
// 2) ai.files.download() from a file reference / URI
if (videoFile.videoBytes) {
  const buffer = Buffer.from(videoFile.videoBytes, "base64");
  writeFileSync(OUTPUT, buffer);
  console.log(`✓ Guardado: ${OUTPUT} (${buffer.length} bytes)`);
} else if (videoFile.uri || videoFile.name) {
  console.log(`→ Descargando desde referencia...`);
  await ai.files.download({
    file: videoFile,
    downloadPath: OUTPUT,
  });
  console.log(`✓ Guardado: ${OUTPUT}`);
} else {
  console.error("Estructura desconocida del video:", JSON.stringify(first, null, 2));
  process.exit(1);
}
