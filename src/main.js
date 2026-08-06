// Imports
import {
  fetchMovies,
  fetchSingleMovie,
  fetchSearchQuery,
} from "./modules/fetch.js";
import { saveData } from "./modules/storage.js";
import { createCard } from "./modules/ui.js";

// DOM-Elemente auslesen
const cardContainer = document.querySelector("#card_container");
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
  { title: "The Blind Side", id: "22881" },
  { title: "Christophers langweiliger Film :P", id: "120467" },
  { title: "The Book of Eli", id: "20504" },
];

recoMovies.forEach(async (recos) => {
  createCard(await fetchSingleMovie(recos.id), recoContainer);
});

// Search
const showSearchResults = async (query, container) => {
  container.replaceChildren();
  const encodedQuery = encodeURIComponent(query);
  const searchResults = await fetchSearchQuery(encodedQuery, 1);
  searchResults.results.forEach((movie) => {
    createCard(movie, container);
  });
};

const modal = document.getElementById("searchModal");
const modalBox = document.getElementById("modalBox");
const mainSearchInput = document.getElementById("mainSearchInput");
const modalSearchInput = document.getElementById("modalSearchInput");
const queryDisplay = document.getElementById("queryDisplay");
const resultsContainer = document.getElementById("resultsContainer");

const handleSearch = async (event, source) => {
  event.preventDefault();

  let query = "";
  if (source === "main") {
    query = mainSearchInput.value.trim();
  } else if (source === "modal") {
    query = modalSearchInput.value.trim();
  }

  if (query !== "") {
    queryDisplay.textContent = query;
    mainSearchInput.value = query;
    modalSearchInput.value = query;
    openModal();
  }
  await showSearchResults(query, resultsContainer);
};

const openModal = () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modalSearchInput.focus();
  document.body.classList.add("overflow-hidden");
};

const closeModal = () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
};

modal.addEventListener("click", (event) => {
  if (!modalBox.contains(event.target)) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

const searchForm = document.getElementById("searchForm");
const modalSearchForm = document.getElementById("modalSearchForm");
const modalCloseButton = document.getElementById("modalCloseButton");
searchForm.addEventListener(
  "submit",
  async (event) => await handleSearch(event, "main"),
);
modalSearchForm.addEventListener(
  "submit",
  async (event) => await handleSearch(event, "modal"),
);
modalCloseButton.addEventListener("click", closeModal);

const mobileSearchButton = document.getElementById("mobileSearch");
mobileSearchButton.addEventListener("click", openModal);

// Export
export { cardContainer, pagesShown };
