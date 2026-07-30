/**
 * Optionaler Fetch-Layer für FilmFieber.
 *
 * Aktuell: Platzhalter-Implementierung, damit `main.js` sauber andocken kann.
 * Wenn die Gruppe `fetch.js` fertig hat, kann diese Datei ersetzt werden.
 *
 * Kontrakt für spätere Implementierung:
 * - getTrending() -> array
 * - getMovie(id) -> object | null
 * - getSimilar(id) -> array
 */

export async function getTrending() {
  return [];
}

export async function getMovie(id) {
  return null;
}

export async function getSimilar(id) {
  return [];
}
