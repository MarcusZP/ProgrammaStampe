"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { CHIAVE_FIRMA, CHIAVE_STUDIO, useValoreSalvato } from "@/lib/archivio-locale";
import { condominiDemo, FIRMA_PREDEFINITA, STUDIO_PREDEFINITO } from "@/lib/dati-demo";
import { oggiIso } from "@/lib/date";
import { modelli, trovaModello, valoriPredefiniti, type ContestoStampa } from "@/modelli";
import { CampoEtichettato, CampoModulo, stileInput } from "./campi";
import { Foglio } from "./Foglio";

const nessunaIscrizione = () => () => {};

export function Compositore() {
  // La pagina è pre-renderizzata alla build: "oggi" va letto nel browser, non sul server.
  const oggi = useSyncExternalStore(nessunaIscrizione, oggiIso, () => "");
  const [dataScelta, setDataScelta] = useState<string | null>(null);
  const dataDocumento = dataScelta ?? oggi;
  const [studio] = useValoreSalvato(CHIAVE_STUDIO, STUDIO_PREDEFINITO);
  const [firma] = useValoreSalvato(CHIAVE_FIRMA, FIRMA_PREDEFINITA);
  const [condominioId, setCondominioId] = useState(condominiDemo[0].id);
  const [modelloId, setModelloId] = useState(modelli[0].id);
  // Valori compilati, separati per modello: cambiando tipo di stampa non si perdono.
  const [compilati, setCompilati] = useState<Record<string, Record<string, string>>>({});

  const modello = trovaModello(modelloId);
  const condominio = condominiDemo.find((c) => c.id === condominioId) ?? condominiDemo[0];
  const valori = { ...valoriPredefiniti(modello), ...compilati[modello.id] };
  const ctx: ContestoStampa = { condominio, studio, firma, dataDocumento, valori };
  const avvertenze = modello.avvertenze?.(ctx) ?? [];

  function aggiornaCampo(nome: string, valore: string) {
    setCompilati((prec) => ({
      ...prec,
      [modello.id]: { ...prec[modello.id], [nome]: valore },
    }));
  }

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="no-print w-[380px] shrink-0 space-y-5 overflow-y-auto border-r border-zinc-200 bg-white p-5">
        <h1 className="text-lg font-semibold">Nuova stampa</h1>

        <CampoEtichettato etichetta="Condominio">
          <select
            className={stileInput}
            value={condominioId}
            onChange={(e) => setCondominioId(e.target.value)}
          >
            {condominiDemo.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </CampoEtichettato>

        <CampoEtichettato etichetta="Tipo di stampa">
          <select
            className={stileInput}
            value={modelloId}
            onChange={(e) => setModelloId(e.target.value)}
          >
            {modelli.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-zinc-500">{modello.descrizione}</span>
        </CampoEtichettato>

        <CampoEtichettato etichetta="Data del documento">
          <input
            type="date"
            className={stileInput}
            value={dataDocumento}
            onChange={(e) => setDataScelta(e.target.value)}
          />
        </CampoEtichettato>

        <hr className="border-zinc-200" />

        {modello.campi.map((campo) => (
          <CampoModulo
            key={`${modello.id}:${campo.nome}`}
            campo={campo}
            valore={valori[campo.nome] ?? ""}
            onChange={(v) => aggiornaCampo(campo.nome, v)}
          />
        ))}

        <hr className="border-zinc-200" />

        {!firma.immagine && (
          <p className="rounded-md bg-zinc-100 p-3 text-xs text-zinc-600">
            Nessuna firma caricata.{" "}
            <Link href="/impostazioni" className="font-medium text-sky-700 underline">
              Imposta la firma
            </Link>
          </p>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full rounded-md bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-800"
        >
          Stampa / Salva PDF
        </button>
      </aside>

      <section className="anteprima flex-1 overflow-auto bg-zinc-100 p-8">
        {avvertenze.length > 0 && (
          <ul className="no-print mx-auto mb-4 w-[210mm] space-y-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            {avvertenze.map((a) => (
              <li key={a}>⚠ {a}</li>
            ))}
          </ul>
        )}
        <Foglio modello={modello} ctx={ctx} />
      </section>
    </div>
  );
}
