@AGENTS.md

# Programma Stampe

Web app in cloud per lo **Studio MADA** (amministrazione condominiale) che genera le stampe
ricorrenti: avvisi, convocazioni di assemblea ordinaria e straordinaria, avvisi di lettura dei
contatori dell'acqua e simili. Flusso: scegli condominio, tipo di stampa e data, compili i
campi del modello, controlli l'anteprima A4 e stampi o salvi in PDF dal browser.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS 4.
- Hosting previsto: Vercel. Database previsto: Postgres (es. Supabase), **non ancora collegato**.
- Stampa: HTML/CSS in formato A4 (`.foglio` in `src/app/globals.css`) + `window.print()`.
  La generazione PDF lato server e la stampa unione (un documento per condòmino) sono da
  valutare quando arrivano gli esempi.

## Comandi

- `npm run dev`: server di sviluppo su http://localhost:3000
- `npm run build`: build di produzione (fa anche il controllo dei tipi)
- `npm run lint`: ESLint

## Struttura

- `src/app/`: pagine (`/` nuova stampa, `/impostazioni` intestazione studio e firma).
- `src/components/`: `Compositore` (modulo + anteprima), `Foglio` (pagina A4 con le parti
  comuni: intestazione, destinatari, luogo e data, oggetto, firma), `Impostazioni`, campi.
- `src/modelli/`: un file per ogni tipo di stampa, registrato in `src/modelli/index.ts`.
  Un `Modello` dichiara i propri `campi`, `destinatari`, `oggetto`, `corpo` e, se servono,
  `avvertenze` (controlli non bloccanti, es. termini di legge).
- `src/lib/`: tipi di dominio, date in italiano, dati demo, salvataggio nel browser.
- `esempi/`: documenti reali dello studio da usare come riferimento. **Il contenuto è escluso
  da git** perché contiene dati personali: non spostarlo altrove e non citarne i dati nel codice.

## Convenzioni

- Interfaccia, testi e identificatori di dominio in italiano (`condominio`, `convocazione`,
  `ordineDelGiorno`); termini tecnici generici possono restare in inglese.
- Date come stringhe ISO `AAAA-MM-GG`; formattazione e calcoli solo tramite `src/lib/date.ts`
  (interpreta le date come locali, evita lo slittamento di fuso orario).
- Per aggiungere un tipo di stampa: nuovo file in `src/modelli/`, poi aggiungerlo all'array
  `modelli` in `src/modelli/index.ts`. Le parti comuni del foglio stanno in `Foglio`, non nei
  modelli.
- Dati temporanei: impostazioni studio e firma sono in `localStorage`
  (`src/lib/archivio-locale.ts`), i condomini sono fittizi (`src/lib/dati-demo.ts`).
  Entrambi verranno sostituiti dal database.

## Dominio

- **Condominio / condòmino**: l'edificio amministrato / il singolo proprietario.
- **Assemblea ordinaria / straordinaria**: l'ordinaria approva rendiconto e preventivo e si
  occupa della gestione corrente; la straordinaria tratta lavori e decisioni non ricorrenti.
- **Prima e seconda convocazione**: l'avviso indica entrambe. Regole già controllate in
  `src/modelli/convocazione.tsx`:
  - l'avviso deve essere ricevuto almeno 5 giorni prima della prima convocazione
    (art. 66 disp. att. c.c.);
  - la seconda convocazione va in un giorno successivo alla prima e non oltre 10 giorni da
    essa (art. 1136 c.c.).
- **Ordine del giorno**: elenco dei punti da deliberare, uno per riga nel modulo.
- **Delega**: il condòmino può farsi rappresentare con delega scritta (art. 67 disp. att. c.c.).
