import { formattaData } from "@/lib/date";
import { Paragrafi, Valore } from "./componenti";
import type { Modello } from "./tipi";

export const letturaAcqua: Modello = {
  id: "lettura-acqua",
  nome: "Lettura contatori acqua",
  descrizione: "Avviso del passaggio per la lettura dei contatori dell'acqua.",
  campi: [
    { nome: "dataLettura", etichetta: "Data della lettura", tipo: "data" },
    { nome: "oraInizio", etichetta: "Dalle ore", tipo: "ora", predefinito: "09:00" },
    { nome: "oraFine", etichetta: "Alle ore", tipo: "ora", predefinito: "13:00" },
    {
      nome: "incaricato",
      etichetta: "Incaricato della lettura",
      tipo: "testo",
      suggerimento: "es. ditta …  (vuoto = \"personale incaricato\")",
    },
    {
      nome: "note",
      etichetta: "Note",
      tipo: "testo-lungo",
      predefinito:
        "In caso di assenza è possibile comunicare l'autolettura allo Studio, indicando nominativo, interno e lettura del contatore (meglio se con foto).",
    },
  ],
  destinatari: () => "A tutti i Sigg. Condòmini",
  oggetto: () => "Lettura dei contatori dell'acqua",
  corpo: (ctx) => {
    const v = ctx.valori;
    return (
      <>
        <p>
          Si comunica che il giorno{" "}
          <Valore>{v.dataLettura && formattaData(v.dataLettura, true)}</Valore> dalle ore{" "}
          <Valore>{v.oraInizio}</Valore> alle ore <Valore>{v.oraFine}</Valore>{" "}
          {v.incaricato ? (
            <>
              il personale di <strong>{v.incaricato}</strong>
            </>
          ) : (
            "il personale incaricato"
          )}{" "}
          effettuerà la lettura dei contatori dell&apos;acqua.
        </p>
        <p>Si invitano i Sigg. Condòmini a garantire l&apos;accesso ai contatori, ove necessario.</p>
        <Paragrafi testo={v.note} />
      </>
    );
  },
};
