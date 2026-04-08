"use client";

import dynamic from "next/dynamic";

const MapaOrigen = dynamic(() => import("./MapaOrigen"), {
  ssr: false,
  loading: () => (
    <section
      id="origen"
      className="relative overflow-hidden bg-mey-black-soft py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-[560px] w-full animate-pulse bg-mey-black/40" />
      </div>
    </section>
  ),
});

export default function MapaOrigenLoader() {
  return <MapaOrigen />;
}
