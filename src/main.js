// Imports
import { fetchMovies, fetchSearchQuery } from "./modules/fetch.js";
import { saveData } from "./modules/storage.js";
import { createCard } from "./modules/ui.js";

// DOM-Elemente auslesen
const cardContainer = document.querySelector("#card_container");
const form = document.querySelector("#search_form");
const moreButton = document.querySelector("#show_more_button");
const recoContainer = document.querySelector("#recommendations");
const searchField = document.getElementById("search");
const searchResultContainer = document.getElementById("searchresults");

// Funktionen
// Show more Function
let pagesShown = 1;
let movies = {};

const showMovies = async () => {
  movies = await fetchMovies(pagesShown);
  movies.results.forEach((movie) => {
    createCard(movie, cardContainer);
  });
};

showMovies();

const showMorePages = (event) => {
  event.preventDefault();
  pagesShown++;
  showMovies();
};

moreButton.addEventListener("click", showMorePages);

// Recommendations
const recoMovies = [
  { title: "Blind", id: "22881" },
  { title: "Spider", id: "969681" },
];
let recoFetchMovies = {};
const recoResults = [];
let test = {};

recoMovies.forEach(async (recos) => {
  recoFetchMovies = await fetchSearchQuery(recos.title, 1);
  recoFetchMovies.results.forEach((movie) => {
    if (movie.id == recos.id) {
      createCard(movie, recoContainer);
    }
  });
});

// const searchResult = await fetchSearchQuery("Interstel", 1);
// console.log(searchResult);
// saveData(movies.results);

// Search

searchField.addEventListener("search", async (event) => {
  searchResultContainer.replaceChildren();
  const query = encodeURIComponent(event.target.value);
  const searchResults = await fetchSearchQuery(query, 1);
  searchResults.results.forEach((movie) => {
    createCard(movie, searchResultContainer);
  });
});

// Export
export { cardContainer, form, pagesShown };
