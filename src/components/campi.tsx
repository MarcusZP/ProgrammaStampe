import type { ReactNode } from "react";
import type { Campo } from "@/modelli";

export const stileInput =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm " +
  "focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20 focus:outline-none";

export function CampoEtichettato({
  etichetta,
  className = "",
  children,
}: {
  etichetta: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-zinc-700">{etichetta}</span>
      {children}
    </label>
  );
}

const tipoInput = { testo: "text", data: "date", ora: "time" } as const;

/** Campo di un modello di stampa, disegnato in base al suo tipo. */
export function CampoModulo({
  campo,
  valore,
  onChange,
}: {
  campo: Campo;
  valore: string;
  onChange: (valore: string) => void;
}) {
  return (
    <CampoEtichettato etichetta={campo.etichetta}>
      {campo.tipo === "testo-lungo" ? (
        <textarea
          rows={6}
          className={stileInput}
          value={valore}
          placeholder={campo.suggerimento}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={tipoInput[campo.tipo]}
          className={stileInput}
          value={valore}
          placeholder={campo.suggerimento}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </CampoEtichettato>
  );
}
