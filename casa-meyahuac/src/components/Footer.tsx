import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--mey-line)] bg-mey-black-soft">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mey-divider mb-6">Casa Meyahuac</p>
            <h3 className="mey-display text-4xl text-mey-cream md:text-5xl">
              Donde México
              <br />
              <span className="text-mey-gold">celebra.</span>
            </h3>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-mey-cream/60">
              Bebidas de lujo mexicanas. Hechas a mano en pequeñas series, para
              quienes entienden que un brindis no es un acto: es un ritual.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-mey-gold">
              Navegación
            </p>
            <ul className="space-y-3 text-sm text-mey-cream/70">
              <li>
                <Link href="#historia" className="hover:text-mey-gold">
                  Historia
                </Link>
              </li>
              <li>
                <Link href="#licores" className="hover:text-mey-gold">
                  Licores
                </Link>
              </li>
              <li>
                <Link href="#experiencias" className="hover:text-mey-gold">
                  Experiencias
                </Link>
              </li>
              <li>
                <Link href="#origen" className="hover:text-mey-gold">
                  El Origen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-mey-gold">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-mey-cream/70">
              <li>
                <a
                  href="mailto:hola@casameyahuac.com"
                  className="hover:text-mey-gold"
                >
                  hola@casameyahuac.com
                </a>
              </li>
              <li>
                <a href="tel:+525500000000" className="hover:text-mey-gold">
                  +52 55 0000 0000
                </a>
              </li>
              <li>Ciudad de México · Querétaro · Tlaxcala</li>
            </ul>

            <div className="mt-6 flex gap-4 text-[10px] uppercase tracking-[0.3em] text-mey-cream/60">
              <a href="#" className="hover:text-mey-gold">
                Instagram
              </a>
              <a href="#" className="hover:text-mey-gold">
                Vimeo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[var(--mey-line)] pt-8 text-[10px] uppercase tracking-[0.3em] text-mey-cream/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Casa Meyahuac. Hecho en México.</p>
          <p>Beba con responsabilidad. Mayores de 18 años.</p>
        </div>
      </div>
    </footer>
  );
}
