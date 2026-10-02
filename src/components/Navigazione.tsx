"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const voci = [
  { href: "/", etichetta: "Nuova stampa" },
  { href: "/impostazioni", etichetta: "Impostazioni" },
];

export function Navigazione() {
  const percorso = usePathname();
  return (
    <header className="no-print flex items-center gap-8 border-b border-zinc-200 bg-white px-5 py-3">
      <span className="font-semibold">Programma Stampe</span>
      <nav className="flex gap-1 text-sm">
        {voci.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className={`rounded-md px-3 py-1.5 ${
              percorso === v.href
                ? "bg-zinc-100 font-medium text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {v.etichetta}
          </Link>
        ))}
      </nav>
    </header>
  );
}
