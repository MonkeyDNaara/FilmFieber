// Imports
import { fetchMovies } from "./modules/fetch.js";
import { saveData } from "./modules/storage.js";
import { createCard } from "./modules/ui.js";

// DOM-Elemente auslesen
const cardContainer = document.querySelector("#card_container");
const form = document.querySelector("#search_form");

// Funktionen
let pagesShown = 1;

const movies = await fetchMovies(pagesShown);

movies.results.forEach((movie) => {
  createCard(movie, cardContainer);
});

// saveData(movies.results);

// Export
export { cardContainer, form };