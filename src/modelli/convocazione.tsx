import { formattaData, giorniTra } from "@/lib/date";
import { ElencoNumerato, Valore } from "./componenti";
import type { ContestoStampa, Modello } from "./tipi";

type Genere = "ordinaria" | "straordinaria";

const ODG_PREDEFINITO: Record<Genere, string> = {
  ordinaria: [
    "Approvazione del rendiconto consuntivo e del relativo riparto",
    "Approvazione del bilancio preventivo e del relativo riparto",
  ].join("\n"),
  straordinaria: "",
};

function avvertenze(ctx: ContestoStampa): string[] {
  const { primaData, secondaData } = ctx.valori;
  const messaggi: string[] = [];

  const preavviso = giorniTra(ctx.dataDocumento, primaData);
  if (preavviso !== null && preavviso < 5) {
    messaggi.push(
      `Tra la data del documento e la prima convocazione ci sono ${preavviso} giorni: ` +
        "l'avviso deve essere ricevuto almeno 5 giorni prima (art. 66 disp. att. c.c.).",
    );
  }

  const distanza = giorniTra(primaData, secondaData);
  if (distanza !== null && distanza < 1) {
    messaggi.push(
      "La seconda convocazione deve essere in un giorno successivo alla prima (art. 1136 c.c.).",
    );
  } else if (distanza !== null && distanza > 10) {
    messaggi.push(
      "La seconda convocazione non può essere oltre 10 giorni dalla prima (art. 1136 c.c.).",
    );
  }

  return messaggi;
}

function creaConvocazione(genere: Genere): Modello {
  return {
    id: `convocazione-${genere}`,
    nome: `Convocazione assemblea ${genere}`,
    descrizione: `Avviso di convocazione dell'assemblea ${genere} con prima e seconda convocazione.`,
    campi: [
      { nome: "primaData", etichetta: "Prima convocazione: data", tipo: "data" },
      { nome: "primaOra", etichetta: "Prima convocazione: ora", tipo: "ora", predefinito: "08:00" },
      { nome: "secondaData", etichetta: "Seconda convocazione: data", tipo: "data" },
      { nome: "secondaOra", etichetta: "Seconda convocazione: ora", tipo: "ora", predefinito: "18:00" },
      {
        nome: "luogo",
        etichetta: "Luogo",
        tipo: "testo",
        suggerimento: "es. presso lo Studio, Via …",
      },
      {
        nome: "ordineDelGiorno",
        etichetta: "Ordine del giorno",
        tipo: "testo-lungo",
        predefinito: ODG_PREDEFINITO[genere],
        suggerimento: "Un punto per riga",
      },
    ],
    destinatari: () => "Ai Sigg. Condòmini",
    oggetto: () => `Convocazione assemblea ${genere} dei condòmini`,
    corpo: (ctx) => {
      const v = ctx.valori;
      return (
        <>
          <p>
            I Signori Condòmini sono convocati in assemblea {genere} che si terrà in{" "}
            <strong>prima convocazione</strong> il giorno{" "}
            <Valore>{v.primaData && formattaData(v.primaData, true)}</Valore> alle ore{" "}
            <Valore>{v.primaOra}</Valore> presso <Valore>{v.luogo}</Valore> e, occorrendo, in{" "}
            <strong>seconda convocazione</strong> il giorno{" "}
            <Valore>{v.secondaData && formattaData(v.secondaData, true)}</Valore> alle ore{" "}
            <Valore>{v.secondaOra}</Valore>, stesso luogo, per discutere e deliberare sul
            seguente
          </p>
          <p className="text-center font-bold tracking-wide">ORDINE DEL GIORNO</p>
          <ElencoNumerato testo={v.ordineDelGiorno} />
          <p>
            Ciascun condòmino può intervenire personalmente o farsi rappresentare da altra
            persona munita di delega scritta (art. 67 disp. att. c.c.). Data l&apos;importanza
            degli argomenti, si raccomanda la partecipazione.
          </p>
        </>
      );
    },
    avvertenze,
  };
}

export const convocazioneOrdinaria = creaConvocazione("ordinaria");
export const convocazioneStraordinaria = creaConvocazione("straordinaria");
