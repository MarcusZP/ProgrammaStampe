// Tipi di dominio dello studio. Quando arriverà il database, queste forme
// diventeranno le tabelle (condomini, impostazioni studio, firme).

export type Condominio = {
  id: string;
  nome: string;
  indirizzo: string;
  cap: string;
  citta: string;
  provincia: string;
  codiceFiscale?: string;
};

export type DatiStudio = {
  nome: string;
  indirizzo: string;
  cap: string;
  citta: string;
  provincia: string;
  telefono: string;
  email: string;
  pec: string;
  partitaIva: string;
};

export type Firma = {
  nomeFirmatario: string;
  qualifica: string;
  /** Immagine della firma come data URL (PNG/JPG), null se non caricata. */
  immagine: string | null;
};
