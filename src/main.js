
const state = {
  query: '',
  films: [
    {
      id: 1,
      title: 'Strategic Intrigue',
      year: '2024',
      genres: ['Thriller', 'Sci-Fi'],
      rating: 8.4,
      overview: 'Ein Team kämpft sich durch ein verschlossenes System, um die Wahrheit über ein Projekt preiszugeben.',
      poster: 'https://image.tmdb.org/t/p/w500/fkS3x5QaBNwKqDW3rSPnHgmCRsy.jpg',
    },
    {
      id: 2,
      title: 'Cosmic Cavalry',
      year: '2023',
      genres: ['Adventure', 'Drama'],
      rating: 7.9,
      overview: 'Hinter der Fassade einer friedlichen Welt entdeckt eine Forschergruppe, dass sich die Menschheit mehrfach neu erfunden hat.',
      poster: 'https://image.tmdb.org/t/p/w500/8ChxV5APF4Z6w4BmXav5SrlMhG8.jpg',
    },
    {
      id: 3,
      title: 'Neon Heist',
      year: '2025',
      genres: ['Action', 'Crime'],
      rating: 8.1,
      overview: 'Ein letzter Coup in der Unterwelt, der alles aufs Spiel setzt.',
      poster: 'https://image.tmdb.org/t/p/w500/kWrXz4f12ve3Q5GKhhqpiLGBc1k.jpg',
    },
    {
      id: 4,
      title: 'Silent Orbit',
      year: '2022',
      genres: ['Sci-Fi', 'Mystery'],
      rating: 7.6,
      overview: 'Auf einer stillgelegten Raumstation empfängt man ein Signal, das nie abgeschickt wurde.',
      poster: 'https://image.tmdb.org/t/p/w500/6 DrKFYAzYGTj2nxmRVyKTfreyX.jpg',
    },
    {
      id: 5,
      title: 'Golden Run',
      year: '2021',
      genres: ['Crime', 'Drama'],
      rating: 8.0,
      overview: 'Ein letzter Deal soll eine Familie retten — aber das Netz ist größer als gedacht.',
      poster: 'https://image.tmdb.org/t/p/w500/placeholder5.jpg',
    },
    {
      id: 6,
      title: 'Dark Meridian',
      year: '2024',
      genres: ['Horror', 'Thriller'],
      rating: 7.3,
      overview: 'Einmarathon durch nebelgeplagte Wälder wird zum Überlebenskampf.',
      poster: 'https://image.tmdb.org/t/p/w500/placeholder6.jpg',
    },
    {
      id: 7,
      title: 'Aurora Code',
      year: '2023',
      genres: ['Sci-Fi', 'Action'],
      rating: 8.2,
      overview: 'Eine Programmiererin entdeckt einen Code, der die Realität neu schreibt.',
      poster: 'https://image.tmdb.org/t/p/w500/placeholder7.jpg',
    },
    {
      id: 8,
      title: 'Last Ember',
      year: '2020',
      genres: ['Drama', 'Romance'],
      rating: 7.8,
      overview: 'Zwei Fremde teilen eine letzte Nacht in einer schlafenden Stadt.',
      poster: 'https://image.tmdb.org/t/p/w500/placeholder8.jpg',
    },
  ],
};

const app = document.getElementById('app');
const header = document.createElement('header');
header.className = 'sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur';
header.innerHTML = `
  <div class="mx-auto max-w-6xl flex items-center justify-between gap-4 px-4 py-3">
    <a href="/" class="text-lg font-bold text-white">
      🌡️ ThermoMovie<span class="text-[#f5d061]">.</span>
    </a>
    <div class="flex items-center gap-2">
      <a href="/" class="cursor-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/10">Start</a>
      <a href="/journal.html" class="rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white">Journal</a>
    </div>
  </div>
`;
app.appendChild(header);

const main = document.createElement('main');
const hero = document.createElement('section');
hero.className = 'relative overflow-hidden border-b border-white/10';
hero.innerHTML = `
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#7c3aed30_0%,_#0a0a0a60_50%,_#000_100%)] mix-blend-screen"></div>
  <div class="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-black tracking-tight text-white md:text-5xl leading-[0.95]">
        Entdecke Filme.<span class="block text-[#f5d061] mix-blend-difference">Nichts übersehen.</span>
      </h1>
      <p class="mt-3 text-base text-neutral-300 leading-relaxed">Suche, entdecke und behalte deine Favoriten im Blick.</p>
    </div>
    <div class="mt-8">
      <label class="sr-only" for="search">Filmsuche</label>
      <div class="flex gap-2">
        <input id="search" type="search" autocomplete="off" placeholder="Suche Titel, Genre oder Jahr…"
          class="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 transition focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <button class="hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white ring-1 ring-[#7c3aed]/40 hover:bg-[#7c3aed]/40 hover:text-white">✕</button>
      </div>
      <div id="suggestions" class="mt-2 space-y-1"></div>
    </div>
  </div>
`;
main.appendChild(hero);

const content = document.createElement('section');
content.className = 'mx-auto max-w-6xl px-4 py-8';
content.innerHTML = `
  <div class="flex items-end justify-between">
    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Entdecken</h2>
      <p id="headline" class="mt-1 text-2xl font-bold text-white">Beliebte Filme</p>
    </div>
    <span id="count" class="text-xs text-neutral-500"></span>
  </div>
  <div id="grid" class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
  <div id="empty" class="hidden mt-6 rounded-xl border border-dashed border-white/10 p-6 text-center text-neutral-400">
    Keine Ergebnisse. Versuche es mit einem anderen Begriff.
  </div>
`;
main.appendChild(content);
app.appendChild(main);

const loader = document.createElement('div');
loader.className = 'fixed inset-x-0 bottom-6 flex justify-center';
loader.innerHTML = `
  <div id="live-indicator" class="hidden items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] text-neutral-300 ring-1 ring-white/10 backdrop-blur">
    <span class="h-1.5 w-1.5 rounded-full bg-[#f5d061] animate-pulse" aria-hidden="true" />
    Aktualisiere…
  </div>
`;
app.appendChild(loader);

const nav = () => {
  header.querySelectorAll('a').forEach((link) => {
    const active = link.getAttribute('href') === location.pathname;
    link.className = active
      ? 'cursor-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 bg-white/10'
      : 'rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white';
  });
};

const renderItem = (film) => `
  <article data-id="${film.id}" class="film-card group cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-[#7c3aed]/50 hover:shadow-[0_1.2rem_2.4rem_rgba(124,58,237,0.18)]">
    <div class="relative aspect-[2/3] overflow-hidden rounded-t-xl bg-black/40">
      <img src="${film.poster || '/public/icons.svg'}" alt="${film.title}" loading="lazy" class="h-full w-full object-cover mix-blend-luminosity transition duration-500 group-hover:scale-105" />
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-black/0 p-2">
        <span class="text-[11px] font-medium text-white/90">${film.year ?? ''}</span>
      </div>
    </div>
    <div class="space-y-1 p-3">
      <p class="text-sm font-semibold leading-tight text-white">${film.title}</p>
      <p class="text-xs text-neutral-400">${(film.genres || []).join(', ') || 'Ohne Genre'}</p>
      <div class="flex items-center gap-1 text-[11px] font-semibold text-[#f5d061]">
        <span aria-hidden="true">★</span>
        <span>${film.rating ?? '-'}</span>
      </div>
    </div>
  </article>
`;

const render = async () => {
  let films = state.films;
  const q = (state.query || '').trim().toLowerCase();
  if (q) {
    films = films.filter((film) =>
      String(film.title).toLowerCase().includes(q) ||
      String(film.year).toLowerCase().includes(q) ||
      (film.genres || []).some((g) => String(g).toLowerCase().includes(q))
    );
  }
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const count = document.getElementById('count');
  const headline = document.getElementById('headline');
  headline.textContent = q ? 'Suchergebnisse' : 'Beliebte Filme';
  if (!films.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); count.textContent = '0 Treffer'; }
  else {
    empty.classList.add('hidden');
    count.textContent = `${films.length} ${films.length === 1 ? 'Film' : 'Filme'}`;
    grid.innerHTML = films.map((f) => renderItem(f)).join('');
  }
  document.querySelectorAll('.film-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      openDetails(id);
    });
  });
};

const openDetails = (id) => {
  const film = state.films.find((f) => Number(f.id) === id);
  if (!film) return;
  let existing = document.querySelector('section.detail-sheet');
  if (existing) existing.remove();
  const sheet = document.createElement('section');
  sheet.className = 'fixed inset-x-0 bottom-0 z-30';
  sheet.innerHTML = `
    <div class="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-neutral-950 px-5 py-6 shadow-2xl backdrop-blur">
      <div class="flex gap-4">
        <img src="${film.poster || '/public/icons.svg'}" alt="${film.title}" class="hidden h-36 w-24 rounded-xl object-cover shadow-[0_1.2rem_2rem_rgba(124,58,237,0.35)] md:block ring-1 ring-[#7c3aed]/60" />
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">${film.title}</h3>
              <p class="text-xs text-neutral-400">${film.year} · ${(film.genres || []).join(', ') || '—'}</p>
            </div>
            <button id="close-details" class="rounded-lg px-2 py-1 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 transition">✕</button>
          </div>
          <p class="mt-2 text-sm text-neutral-300">${film.overview || 'Keine Beschreibung.'}</p>
          <div class="mt-3 flex items-center gap-2">
            <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white ring-1 ring-white/10 transition duration-200 hover:border-[#f5d061] hover:text-[#f5d061]">⭐ ${film.rating}</span>
            <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10">ID ${film.id}</span>
            <button data-action="journal" data-id="${film.id}" class="ml-auto rounded-md bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7c3aed] transition hover:bg-[#6d28d9]">Zu Journal</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(sheet);
  document.getElementById('close-details').addEventListener('click', () => sheet.remove());
  const live = document.getElementById('live-indicator');
  if (live) { live.classList.remove('hidden'); live.classList.add('flex'); live.scrollIntoView({ behavior: 'smooth' }); }
  document.querySelector('button[data-action="journal"]').addEventListener('click', () => {
    sheet.remove();
    if (live) { live.classList.add('hidden'); live.classList.remove('flex'); }
    location.pathname = '/journal.html';
  });
};

document.getElementById('search').addEventListener('input', (e) => {
  state.query = (e.target.value || '').trim();
  render();
});

window.addEventListener('popstate', () => render());
nav();
render();
