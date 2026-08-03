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

cardContainer.addEventListener("favoriteChanged", (event) => {
  const isFavorite = event.detail.isFavorite;
  if (!isFavorite) {
    console.log(event);

    cardContainer.removeChild(event.target.closest(".moviecard"));
  }
});

// Export
export { cardContainer, form };
