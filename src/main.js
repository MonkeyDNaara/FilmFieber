// Imports
import { fetchMovies, fetchSearchQuery } from "./modules/fetch.js";
import { saveData } from "./modules/storage.js";
import { createCard } from "./modules/ui.js";

// DOM-Elemente auslesen
const cardContainer = document.querySelector("#card_container");
const form = document.querySelector("#search_form");
const moreButton = document.querySelector("#show_more_button");

// Funktionen
// Show more Function
let pagesShown = 1;
let movies = {};
let allMovies = [];

const showMovies = async () => {
  for (let i = 1; i <= pagesShown; i++) {
    movies = await fetchMovies(i);
    allMovies.push(movies);
  }
  allMovies.forEach((movieList) => {
    movieList.results.forEach((movie) => {
      createCard(movie, cardContainer);
    });
  });
  if (pagesShown > 1) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
};

showMovies();

const showMorePages = (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  allMovies = [];
  pagesShown++;
  showMovies();
};

moreButton.addEventListener("click", showMorePages);

// const searchResult = await fetchSearchQuery("Interstel", 1);
// console.log(searchResult);
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
export { cardContainer, form, pagesShown };
