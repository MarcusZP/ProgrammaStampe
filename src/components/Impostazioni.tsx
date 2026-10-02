"use client";

import { useState } from "react";
import { CHIAVE_FIRMA, CHIAVE_STUDIO, useValoreSalvato } from "@/lib/archivio-locale";
import { FIRMA_PREDEFINITA, STUDIO_PREDEFINITO } from "@/lib/dati-demo";
import type { DatiStudio } from "@/lib/tipi";
import { CampoEtichettato, stileInput } from "./campi";

const DIMENSIONE_MASSIMA_FIRMA = 500_000;

export function Impostazioni() {
  const [studio, setStudio] = useValoreSalvato(CHIAVE_STUDIO, STUDIO_PREDEFINITO);
  const [firma, setFirma] = useValoreSalvato(CHIAVE_FIRMA, FIRMA_PREDEFINITA);
  const [errore, setErrore] = useState<string | null>(null);

  function campoStudio(nome: keyof DatiStudio, etichetta: string, className = "") {
    return (
      <CampoEtichettato etichetta={etichetta} className={className}>
        <input
          className={stileInput}
          value={studio[nome]}
          onChange={(e) => setStudio({ ...studio, [nome]: e.target.value })}
        />
      </CampoEtichettato>
    );
  }

  function caricaFirma(file: File | undefined) {
    setErrore(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrore("Il file deve essere un'immagine (PNG o JPG).");
      return;
    }
    if (file.size > DIMENSIONE_MASSIMA_FIRMA) {
      setErrore("L'immagine è troppo grande (massimo 500 KB).");
      return;
    }
    const lettore = new FileReader();
    lettore.onload = () => {
      if (!setFirma({ ...firma, immagine: String(lettore.result) })) {
        setErrore("Il browser non ha spazio per salvare questa immagine.");
      }
    };
    lettore.readAsDataURL(file);
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 p-8">
      <div>
        <h1 className="text-lg font-semibold">Impostazioni</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Per ora i dati vengono salvati solo in questo browser. Con il database saranno in
          cloud e condivisi.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-semibold">Intestazione dello studio</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {campoStudio("nome", "Nome dello studio", "sm:col-span-2")}
          {campoStudio("indirizzo", "Indirizzo", "sm:col-span-2")}
          {campoStudio("cap", "CAP")}
          {campoStudio("citta", "Città")}
          {campoStudio("provincia", "Provincia")}
          {campoStudio("partitaIva", "Partita IVA")}
          {campoStudio("telefono", "Telefono")}
          {campoStudio("email", "Email")}
          {campoStudio("pec", "PEC", "sm:col-span-2")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Firma</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <CampoEtichettato etichetta="Qualifica">
            <input
              className={stileInput}
              value={firma.qualifica}
              onChange={(e) => setFirma({ ...firma, qualifica: e.target.value })}
            />
          </CampoEtichettato>
          <CampoEtichettato etichetta="Nome del firmatario">
            <input
              className={stileInput}
              value={firma.nomeFirmatario}
              placeholder="es. Mario Rossi"
              onChange={(e) => setFirma({ ...firma, nomeFirmatario: e.target.value })}
            />
          </CampoEtichettato>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex h-28 w-64 items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white">
            {firma.immagine ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URL caricato dall'utente
              <img src={firma.immagine} alt="Firma" className="max-h-24 max-w-60" />
            ) : (
              <span className="text-sm text-zinc-400">Nessuna firma</span>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <label className="inline-block cursor-pointer rounded-md border border-zinc-300 bg-white px-3 py-2 font-medium shadow-sm hover:bg-zinc-50">
              Carica immagine…
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                onChange={(e) => {
                  caricaFirma(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
            {firma.immagine && (
              <button
                type="button"
                className="ml-2 text-red-700 underline"
                onClick={() => setFirma({ ...firma, immagine: null })}
              >
                Rimuovi
              </button>
            )}
            <p className="text-xs text-zinc-500">
              Consigliato: PNG con sfondo trasparente, massimo 500 KB.
            </p>
            {errore && <p className="text-xs text-red-700">{errore}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
