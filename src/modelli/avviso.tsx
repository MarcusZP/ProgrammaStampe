import { Paragrafi } from "./componenti";
import type { Modello } from "./tipi";

export const avviso: Modello = {
  id: "avviso",
  nome: "Avviso ai condòmini",
  descrizione: "Comunicazione generica da affiggere in bacheca o consegnare.",
  campi: [
    { nome: "oggetto", etichetta: "Oggetto", tipo: "testo", predefinito: "Avviso" },
    {
      nome: "testo",
      etichetta: "Testo",
      tipo: "testo-lungo",
      suggerimento: "Testo dell'avviso. Lascia una riga vuota per iniziare un nuovo paragrafo.",
    },
  ],
  destinatari: () => "A tutti i Sigg. Condòmini",
  oggetto: (ctx) => ctx.valori.oggetto || "Avviso",
  corpo: (ctx) => <Paragrafi testo={ctx.valori.testo} />,
};
