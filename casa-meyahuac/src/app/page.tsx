import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Productos } from "@/components/Productos";
import { Experiencias } from "@/components/Experiencias";
import MapaOrigenLoader from "@/components/MapaOrigenLoader";
import { Contacto } from "@/components/Contacto";

export default function Page() {
  return (
    <>
      <Hero />
      <Story />
      <Productos />
      <Experiencias />
      <MapaOrigenLoader />
      <Contacto />
    </>
  );
}
