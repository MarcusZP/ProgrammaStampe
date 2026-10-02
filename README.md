# Programma Stampe

Generatore di stampe per l'amministrazione condominiale (Studio MADA): avvisi, convocazioni di
assemblea ordinaria e straordinaria, letture dei contatori dell'acqua e altro.

## Avvio in locale

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000.

- **Nuova stampa**: scegli condominio, tipo di stampa e data, compila i campi e premi
  *Stampa / Salva PDF*.
- **Impostazioni**: intestazione dello studio e firma (immagine PNG/JPG).

## Stato

Prima versione. I condomini sono di prova e le impostazioni restano nel browser; il database
in cloud è il prossimo passo. Dettagli tecnici in [CLAUDE.md](CLAUDE.md).
