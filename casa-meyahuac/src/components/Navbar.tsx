"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#historia", label: "Historia" },
  { href: "#licores", label: "Licores" },
  { href: "#experiencias", label: "Experiencias" },
  { href: "#origen", label: "Origen" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-md bg-mey-black/70 border-b border-[var(--mey-line)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Casa Meyahuac"
        >
          <span className="block h-[1px] w-8 bg-mey-gold transition-all duration-500 group-hover:w-12" />
          <span className="mey-display text-xl text-mey-cream md:text-2xl">
            Casa <span className="text-mey-gold">Meyahuac</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative text-[11px] uppercase tracking-[0.28em] text-mey-cream/80 transition-colors hover:text-mey-gold"
              >
                {l.label}
                <span className="absolute -bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-mey-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contacto"
          className="hidden border border-[#C9A84C] bg-transparent px-6 py-2 text-xs uppercase tracking-[0.2em] text-[#C9A84C] transition-all duration-300 hover:bg-[#C9A84C] hover:text-black md:inline-block"
        >
          Cotizar
        </Link>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-mey-cream"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-[1px] w-7 bg-mey-cream transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1px] w-7 bg-mey-cream transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[1px] w-7 bg-mey-cream transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-700 ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-[var(--mey-line)] bg-mey-black/95 px-6 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="mey-display block py-3 text-2xl text-mey-cream"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full border border-mey-gold px-6 py-3 text-center text-[11px] uppercase tracking-[0.3em] text-mey-gold"
            >
              Cotizar tu experiencia
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
