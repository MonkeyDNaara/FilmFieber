// Imports
import { API_URL, API_TOKEN, API_KEY, LANGUAGE } from "./config.js";

// Functions
const options = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_TOKEN}` },
};

const fetchSingleMovie = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}movie/${id}?language=${LANGUAGE}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `Fehler bei laden von Seite ${id}. Status: ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(error.message);
    return;
  }
};

const fetchMovies = async (page) => {
  try {
    const response = await fetch(
      `${API_URL}movie/popular?language=${LANGUAGE}&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `Fehler bei laden von Seite ${page}. Status: ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(error.message);
    return;
  }
};

const fetchSearchQuery = async (query, page) => {
  try {
    const response = await fetch(
      `${API_URL}search/movie?query=${query}&language=${LANGUAGE}&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `Fehler bei laden von Seite ${page}. Status: ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(error.message);
    return;
  }
};

// Exports
export { fetchMovies, fetchSearchQuery, fetchSingleMovie };
