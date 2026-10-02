import type { ReactNode } from "react";
import type { Condominio, DatiStudio, Firma } from "@/lib/tipi";

/** Un campo che l'utente compila per un certo modello di stampa. */
export type Campo = {
  nome: string;
  etichetta: string;
  tipo: "testo" | "testo-lungo" | "data" | "ora";
  predefinito?: string;
  suggerimento?: string;
};

/** Tutto ciò che serve per comporre un documento. */
export type ContestoStampa = {
  condominio: Condominio;
  studio: DatiStudio;
  firma: Firma;
  /** Data del documento, ISO "AAAA-MM-GG". */
  dataDocumento: string;
  /** Valori dei campi del modello, indicizzati per `Campo.nome`. */
  valori: Record<string, string>;
};

/**
 * Un tipo di stampa (avviso, convocazione, ...). Intestazione, destinatari,
 * luogo/data e firma sono comuni e li disegna <Foglio>; il modello fornisce
 * il resto.
 */
export type Modello = {
  id: string;
  nome: string;
  descrizione: string;
  campi: Campo[];
  destinatari: (ctx: ContestoStampa) => string;
  oggetto: (ctx: ContestoStampa) => string;
  corpo: (ctx: ContestoStampa) => ReactNode;
  /** Controlli non bloccanti (es. termini di legge) mostrati sopra l'anteprima. */
  avvertenze?: (ctx: ContestoStampa) => string[];
};
