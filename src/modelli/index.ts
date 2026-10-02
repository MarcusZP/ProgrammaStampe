import { avviso } from "./avviso";
import { convocazioneOrdinaria, convocazioneStraordinaria } from "./convocazione";
import { letturaAcqua } from "./lettura-acqua";
import type { Modello } from "./tipi";

// Elenco dei tipi di stampa disponibili. Per aggiungerne uno: crea il file
// del modello in questa cartella e registralo qui.
export const modelli: Modello[] = [
  avviso,
  convocazioneOrdinaria,
  convocazioneStraordinaria,
  letturaAcqua,
];

export function trovaModello(id: string): Modello {
  return modelli.find((m) => m.id === id) ?? modelli[0];
}

export function valoriPredefiniti(modello: Modello): Record<string, string> {
  return Object.fromEntries(modello.campi.map((c) => [c.nome, c.predefinito ?? ""]));
}

export type { Campo, ContestoStampa, Modello } from "./tipi";
