// Le date viaggiano come stringhe ISO "AAAA-MM-GG" (il formato di <input type="date">)
// e vengono interpretate come date locali, così non slittano di un giorno per il fuso orario.

const formatoData = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const formatoDataEsteso = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function scomponi(iso: string): [number, number, number] | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

export function oggiIso(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const gg = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${gg}`;
}

/** "2 ottobre 2026", oppure "venerdì 2 ottobre 2026" con esteso. */
export function formattaData(iso: string, esteso = false): string {
  const p = scomponi(iso);
  if (!p) return "…";
  const data = new Date(p[0], p[1] - 1, p[2]);
  return (esteso ? formatoDataEsteso : formatoData).format(data);
}

/** Giorni di calendario da `da` ad `a` (negativo se `a` è prima di `da`). */
export function giorniTra(da: string, a: string): number | null {
  const p1 = scomponi(da);
  const p2 = scomponi(a);
  if (!p1 || !p2) return null;
  const ms = Date.UTC(p2[0], p2[1] - 1, p2[2]) - Date.UTC(p1[0], p1[1] - 1, p1[2]);
  return Math.round(ms / 86_400_000);
}
