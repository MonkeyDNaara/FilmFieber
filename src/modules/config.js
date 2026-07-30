const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const LANGUAGE = "en-US";
const STORAGE_KEY = "journal";

export { STORAGE_KEY, API_URL, API_TOKEN, API_KEY, LANGUAGE };
