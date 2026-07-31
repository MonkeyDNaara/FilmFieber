// Imports
import { getData } from "./modules/storage.js";
import { createCard } from "./modules/ui.js";

// DOM-Elemente auslesen
const cardContainer = document.querySelector("#card_container");
const form = document.querySelector("#search_form");

const movies = getData();

movies.forEach((movie) => {
  createCard(movie, cardContainer);
});

// Export
export { cardContainer, form };
