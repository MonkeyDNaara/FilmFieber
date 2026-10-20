# FilmFieber 🎬🌡️

> A Movie Diary application built with vanilla JavaScript, Vite, and TailwindCSS.

FilmFieber lets you explore popular movies from [The Movie Database (TMDB)](https://www.themoviedb.org/), search for specific titles, save favorites to a personal journal, and write notes for each movie. All data persists in the browser's `localStorage`.

_This was made as a learning project with focus on vanilla Javascript and Web APIs like DOM, Web Storage and Fetch._

Demo: https://filmfieber.onrender.com/

## Features

- **Browse Popular Movies** — Fetches and displays popular movies from the TMDB API on the homepage.
- **Search Movies** — Search by title via the built-in search bar; results appear in a dialog.
- **Movie Cards** — Each movie is displayed as a card with poster image, title, and overview.
- **Add to Favorites** — Click the star button to save movies to your personal Journal.
- **Personal Notes** — Add and persist personal notes for each favorite movie.
- **Journal Page** — A dedicated page listing all saved favorites with their notes.
- **Persistent Storage** — Favorites and notes are stored in `localStorage` and survive page reloads.
- **Responsive Design** — Styled with TailwindCSS v4 and CSS.

## Pages

| Page     | Entry Point                   | Description                                         |
| -------- | ----------------------------- | --------------------------------------------------- |
| Homepage | `index.html` → `main.js`      | Displays popular movies with search functionality.  |
| Journal  | `journal.html` → `journal.js` | Lists all favorite movies stored in `localStorage`. |

## Tech Stack

| Technology                                    | Purpose                                         |
| --------------------------------------------- | ----------------------------------------------- |
| [Vite](https://vite.dev/)                     | Fast build tool and dev server                  |
| [TailwindCSS v4](https://tailwindcss.com/)    | Utility-first CSS framework                     |
| [TMDB API](https://developer.themoviedb.org/) | Movie data (popular, search)                    |
| `localStorage`                                | Client-side persistence for favorites and notes |
| ES Modules                                    | Native `import`/`export` codebase               |

## Project Structure

```
FilmFieber/
├── index.html                # Homepage entry
├── journal.html              # Journal page entry
└── src/
    ├── main.js               # Homepage entry script
    ├── journal.js            # Journal page entry script
    ├── style.css             # Global styles + Tailwind imports
    └── modules/
        ├── config.js         # API URLs, tokens, constants
        ├── fetch.js          # TMDB API calls (popular, search)
        ├── storage.js        # localStorage CRUD operations
        └── ui.js             # DOM card creation & event handlers
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- A [TMDB API key](https://www.themoviedb.org/settings/api) and [API token](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MonkeyDNaara/FilmFieber.git
   cd FilmFieber
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.development` (and `.env.production` for deployment) with your TMDB credentials:

   ```env
   VITE_TMDB_KEY=your_api_key_here
   VITE_TMDB_TOKEN=your_api_token_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

   Output is written to the `dist/` directory.

6. **Preview the production build**
   ```bash
   npm run preview
   ```

## API Integration

The app uses the TMDB v3 API:

| Endpoint         | Method | Description            |
| ---------------- | ------ | ---------------------- |
| `/movie/popular` | `GET`  | Fetch popular movies   |
| `/search/movie`  | `GET`  | Search movies by query |

All requests are authenticated via Bearer token.

## Storage Schema

Favorites are stored in `localStorage` under the key `journal` as a JSON array.
The movie objects are copies of the fetched objects plus an optional `note` property.

## Modules

### `config.js`

Centralized configuration — API base URLs, authentication tokens, image URL templates, and the `localStorage` key.

### `fetch.js`

Handles all TMDB API calls using `fetch()`. Includes error handling for non-OK responses.

### `storage.js`

Provides CRUD operations for `localStorage`: get, save, add, remove, add notes, and check existence.

### `ui.js`

Manages DOM manipulation — creates movie cards with poster, title, overview, favorite toggle, and note editor. Dispatches custom events (`favoriteChanged`) for cross-component communication.
