export type Producto = {
  slug: string;
  nombre: string;
  categoria: string;
  region: string;
  color: string;
  acento: string; // CSS color para acentos del producto
  imagen: string;
  notasSabor: string[];
  caracter: string;
  descripcionLarga: string;
  paraBodas: string;
};

export const productos: Producto[] = [
  {
    slug: "alma-de-jaguar",
    nombre: "Alma de Jaguar",
    categoria: "Ginebra Artesanal",
    region: "Vainilla de Papantla · Cítricos de Colima",
    color: "Ámbar dorado con destellos verdes botánicos",
    acento: "#c9a84c",
    imagen: "/images/resultado_gin.png",
    notasSabor: [
      "Vainilla de Papantla",
      "Especias tostadas",
      "Lima mexicana",
      "Naranja agria",
      "Toronja de Colima",
    ],
    caracter:
      "Profunda, misteriosa, cálida. Como el jaguar: elegante y poderosa.",
    descripcionLarga:
      "La ginebra del brindis principal. Destilada en alambiques de cobre con vainilla sagrada de Papantla y los cítricos más vibrantes de las regiones mexicanas. Un trago para los momentos que se recordarán por décadas.",
    paraBodas:
      "El brindis principal. La que se sirve en copas de cristal tallado bajo la luna.",
  },
  {
    slug: "naranja-na",
    nombre: "Naranja Na",
    categoria: "Licor de Naranja",
    region: "Naranjas de temporada · México",
    color: "Naranja intenso con reflejos dorados",
    acento: "#c8631e",
    imagen: "/images/resultado_naranja.png",
    notasSabor: [
      "Naranja dulce mexicana",
      "Cáscara amarga",
      "Notas solares",
      "Final cítrico vibrante",
    ],
    caracter: "Brillante, festivo, solar. El licor de la alegría.",
    descripcionLarga:
      "El primer trago de la noche. El que abre el ritual. Naranjas seleccionadas en temporada de cada región mexicana, destiladas con la paciencia que solo el sol puede enseñar.",
    paraBodas: "El aperitivo. El primer trago de la noche.",
  },
  {
    slug: "guayaba-na",
    nombre: "Guayaba Na",
    categoria: "Licor de Guayaba",
    region: "Guayaba mexicana de altura",
    color: "Rosa-rojizo profundo, casi rubí",
    acento: "#8b1a1a",
    imagen: "/images/resultado_guayaba.png",
    notasSabor: [
      "Guayaba madura",
      "Acidez tropical",
      "Notas florales",
      "Dulzor profundo",
    ],
    caracter: "Tropical, romántico, evocador. El licor de los recuerdos.",
    descripcionLarga:
      "Recuerdos de infancia elevados a la alta coctelería. El licor del after-party, el de los momentos más íntimos cuando ya solo quedan los que de verdad importan.",
    paraBodas: "El after-party. Los momentos más íntimos de la noche.",
  },
  {
    slug: "banana-na",
    nombre: "Banana Na",
    categoria: "Licor de Plátano",
    region: "Tabasco · Veracruz",
    color: "Oro pálido con calidez cremosa",
    acento: "#d4b46a",
    imagen: "/images/resultado_banana.png",
    notasSabor: [
      "Plátano macho asado",
      "Plátano dominico",
      "Notas cremosas",
      "Final largo y dulce",
    ],
    caracter: "Cremoso, exótico, sorprendente. El que nadie espera y todos recuerdan.",
    descripcionLarga:
      "Plátano macho y plátano dominico de Tabasco y Veracruz, destilados con técnica francesa y alma mexicana. El licor de los postres, el de la mesa dulce, el que cierra la noche con una sonrisa.",
    paraBodas: "La mesa dulce. El cierre perfecto de la celebración.",
  },
];
