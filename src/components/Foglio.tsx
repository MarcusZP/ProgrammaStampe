import { formattaData } from "@/lib/date";
import type { ContestoStampa, Modello } from "@/modelli";

/** Pagina A4 con le parti comuni a tutte le stampe; il contenuto viene dal modello. */
export function Foglio({ modello, ctx }: { modello: Modello; ctx: ContestoStampa }) {
  const { studio, condominio, firma } = ctx;
  const sedeStudio = [studio.indirizzo, [studio.cap, studio.citta].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(" · ");
  const contatti = [
    studio.telefono && `Tel. ${studio.telefono}`,
    studio.email,
    studio.pec && `PEC ${studio.pec}`,
  ].filter(Boolean);
  const luogo = studio.citta || condominio.citta;

  return (
    <article className="foglio">
      <header className="border-b border-zinc-400 pb-3 text-center">
        <div className="text-[16pt] font-bold uppercase tracking-wide">{studio.nome}</div>
        <div className="text-[9pt] text-zinc-600">Amministrazione condominiale</div>
        {sedeStudio && <div className="text-[9pt]">{sedeStudio}</div>}
        {contatti.length > 0 && <div className="text-[9pt]">{contatti.join(" · ")}</div>}
      </header>

      <div className="mt-10 ml-auto w-[85mm]">
        <div>{modello.destinatari(ctx)}</div>
        <div className="font-bold">{condominio.nome}</div>
        <div>{condominio.indirizzo}</div>
        <div>
          {condominio.cap} {condominio.citta} {condominio.provincia && `(${condominio.provincia})`}
        </div>
      </div>

      <p className="mt-10">
        {luogo ? `${luogo}, ` : ""}
        {formattaData(ctx.dataDocumento)}
      </p>

      <p className="mt-6">
        <strong>Oggetto: {modello.oggetto(ctx)}</strong>
      </p>

      <div className="corpo mt-6">{modello.corpo(ctx)}</div>

      <div className="mt-12 ml-auto w-[70mm] text-center">
        <div>{firma.qualifica}</div>
        {firma.immagine ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URL caricato dall'utente
          <img src={firma.immagine} alt="Firma" className="mx-auto my-1 max-h-[22mm] max-w-[60mm]" />
        ) : (
          <div className="h-[16mm]" />
        )}
        {firma.nomeFirmatario && <div>{firma.nomeFirmatario}</div>}
      </div>

      {studio.partitaIva && (
        <footer className="absolute right-[20mm] bottom-[12mm] left-[20mm] border-t border-zinc-300 pt-1 text-center text-[8pt] text-zinc-500">
          {studio.nome} · P. IVA {studio.partitaIva}
        </footer>
      )}
    </article>
  );
}
