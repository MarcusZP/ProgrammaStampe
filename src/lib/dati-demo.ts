import type { Condominio, DatiStudio, Firma } from "./tipi";

// Dati fittizi usati finché non c'è il database.

export const condominiDemo: Condominio[] = [
  {
    id: "via-roma-10",
    nome: "Condominio Via Roma 10",
    indirizzo: "Via Roma 10",
    cap: "00100",
    citta: "Roma",
    provincia: "RM",
  },
  {
    id: "le-querce",
    nome: "Condominio Le Querce",
    indirizzo: "Via dei Pini 25",
    cap: "00100",
    citta: "Roma",
    provincia: "RM",
  },
  {
    id: "residence-aurora",
    nome: "Residence Aurora",
    indirizzo: "Viale Europa 3",
    cap: "00100",
    citta: "Roma",
    provincia: "RM",
  },
];

export const STUDIO_PREDEFINITO: DatiStudio = {
  nome: "Studio MADA",
  indirizzo: "",
  cap: "",
  citta: "",
  provincia: "",
  telefono: "",
  email: "",
  pec: "",
  partitaIva: "",
};

export const FIRMA_PREDEFINITA: Firma = {
  nomeFirmatario: "",
  qualifica: "L'Amministratore",
  immagine: null,
};
