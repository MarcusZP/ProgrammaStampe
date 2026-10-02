"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

// Salvataggio temporaneo nel browser (localStorage) per impostazioni e firma.
// Verrà sostituito dal database in cloud.

export const CHIAVE_STUDIO = "programma-stampe:studio";
export const CHIAVE_FIRMA = "programma-stampe:firma";

const ascoltatori = new Set<() => void>();

function iscriviti(avvisa: () => void) {
  ascoltatori.add(avvisa);
  window.addEventListener("storage", avvisa);
  return () => {
    ascoltatori.delete(avvisa);
    window.removeEventListener("storage", avvisa);
  };
}

function leggi(chiave: string): string | null {
  try {
    return window.localStorage.getItem(chiave);
  } catch {
    return null;
  }
}

/**
 * Valore salvato nel browser sotto `chiave`. I campi mancanti vengono presi da
 * `predefinito`, che deve essere una costante (non un oggetto creato a ogni render).
 * Il setter restituisce false se il browser rifiuta il salvataggio (es. spazio esaurito).
 */
export function useValoreSalvato<T extends object>(
  chiave: string,
  predefinito: T,
): [T, (valore: T) => boolean] {
  const grezzo = useSyncExternalStore(
    iscriviti,
    () => leggi(chiave),
    () => null,
  );

  const valore = useMemo<T>(() => {
    if (grezzo === null) return predefinito;
    try {
      return { ...predefinito, ...JSON.parse(grezzo) };
    } catch {
      return predefinito;
    }
  }, [grezzo, predefinito]);

  const imposta = useCallback(
    (nuovo: T) => {
      try {
        window.localStorage.setItem(chiave, JSON.stringify(nuovo));
      } catch {
        return false;
      }
      ascoltatori.forEach((avvisa) => avvisa());
      return true;
    },
    [chiave],
  );

  return [valore, imposta];
}
