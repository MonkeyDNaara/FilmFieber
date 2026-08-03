// Imports
import { fetchMovies, fetchSearchQuery } from "./modules/fetch.js";
import { saveData } from "./modules/storage.js";
import { createCard } from "./modules/ui.js";

// DOM-Elemente auslesen
const cardContainer = document.querySelector("#card_container");
const form = document.querySelector("#search_form");

// Funktionen
let pagesShown = 1;
const movies = await fetchMovies(pagesShown);

// const searchResult = await fetchSearchQuery("Interstel", 1);
// console.log(searchResult);

movies.results.forEach((movie) => {
  createCard(movie, cardContainer);
});

// saveData(movies.results);

// Search
const searchField = document.getElementById("search");
const searchResultContainer = document.getElementById("searchresults");

searchField.addEventListener("search", async (event) => {
  searchResultContainer.replaceChildren();
  const query = encodeURIComponent(event.target.value);
  const searchResults = await fetchSearchQuery(query, 1);
  searchResults.results.forEach((movie) => {
    createCard(movie, searchResultContainer);
  });
});

// Export
export { cardContainer, form };
