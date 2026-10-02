import type { ReactNode } from "react";

/** Testo libero: una riga vuota separa i paragrafi, un a capo resta un a capo. */
export function Paragrafi({ testo }: { testo: string | undefined }) {
  const blocchi = (testo ?? "")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocchi.map((blocco, i) => (
    <p key={i}>
      {blocco.split("\n").map((riga, j) => (
        <span key={j}>
          {j > 0 && <br />}
          {riga}
        </span>
      ))}
    </p>
  ));
}

/** Elenco numerato da testo libero, un punto per riga. */
export function ElencoNumerato({ testo }: { testo: string | undefined }) {
  const punti = (testo ?? "")
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);
  if (punti.length === 0) return null;
  return (
    <ol className="list-decimal space-y-1 pl-8">
      {punti.map((punto, i) => (
        <li key={i}>{punto}</li>
      ))}
    </ol>
  );
}

/** Valore compilato dall'utente, o un segnaposto evidenziato se manca. */
export function Valore({ children }: { children: ReactNode }) {
  if (children === "" || children === undefined || children === null) {
    return <span className="segnaposto">________</span>;
  }
  return <strong>{children}</strong>;
}
