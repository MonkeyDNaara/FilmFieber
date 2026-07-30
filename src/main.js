const state = {
  query: '',
  films: [],
  selected_id: null,
  films_loaded: false,
  loading: false,
};

function esc(str) {
  const v = String(str ?? '');
  return document.createElement('i').textContent = v, v;
}

const app = document.createElement('div');
app.className = 'relative min-h-screen overflow-hidden text-white antialiased selection:bg-[#6d28d9]/30 selection:text-white';
app.innerHTML = `
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#7c3aed30_0%,_#3d1f7e45_35%,_#000_100%)] mix-blend-screen" aria-hidden="true"></div>
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#f5d0611a_0%,_#000_100%)] mix-blend-screen" aria-hidden="true"></div>
  <div class="orb orb-top" aria-hidden="true"></div>
  <div class="orb orb-bottom" aria-hidden="true"></div>
  <div class="relative z-10">
    <header class="site-header sticky top-0 z-30">
      <div class="header-glass relative overflow-hidden">
        <div id="header-stars" class="star-field" aria-hidden="true"></div>
        <div class="site-header-inner mx-auto max-w-7xl px-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <a href="/" class="group inline-flex h-10 w-auto items-center justify-center gap-2 text-lg font-bold tracking-tight text-white">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-base backdrop-blur-md transition duration-200 group-hover:border-[#f5d061]/60">🌡️</span>
              <span class="brand-text font-display tracking-wide">Film<span class="text-[#f5d061]">Fieber</span></span>
            </a>
            <nav class="flex items-center gap-2">
              <a data-nav="home" href="/" class="nav-chip active rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition duration-200 hover:border-white/25 hover:bg-white/10">Start</a>
              <a data-nav="journal" href="/journal.html" class="nav-chip rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 ring-1 ring-white/10 backdrop-blur-md transition duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white">Journal</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <main></main>
  </div>
`;

document.body.appendChild(app);
const main = app.querySelector('main');

const nav_chips = () => {
  const path = location.pathname.replace(/\/$/, '') || '/';
  const is_journal = path === '/journal.html';
  app.querySelectorAll('.nav-chip').forEach((chip) => {
    const target = chip.getAttribute('data-nav');
    const active = target === 'home' && !is_journal || target === 'journal' && is_journal;
    chip.className = 'nav-chip rounded-lg px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition duration-200 ' + (active
      ? 'active text-white ring-1 ring-white/20 bg-white/10 hover:border-white/25 hover:bg-white/10'
      : 'text-neutral-300 ring-1 ring-white/10 hover:border-white/25 hover:bg-white/10 hover:text-white');
  });
};

const render_home = () => {
  main.innerHTML = `
    <section class="relative overflow-hidden border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div class="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 data-text="FilmFieber" class="text-5xl font-black tracking-tight gold-title md:text-6xl leading-[0.95]">FilmFieber</h1>
            <p class="mt-3 max-w-md text-base text-neutral-300 leading-relaxed">Suche, entdecke und behalte deine Favoriten im Blick.</p>
            <div class="mt-6">
              <label class="sr-only" for="search">Filmsuche</label>
              <div class="flex gap-2">
                <input id="search" type="search" autocomplete="off" placeholder="Titel, Genre oder Jahr…"
                  class="search-glass flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
                <button data-action="clear" class="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white ring-1 ring-[#7c3aed]/40 backdrop-blur-md transition duration-200 hover:bg-[#7c3aed]/40 hover:text-white">✕</button>
              </div>
              <div id="suggestions" class="mt-2 space-y-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mx-auto max-w-7xl px-4 py-10 md:py-12">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Empfehlungen</h2>
          <p class="mt-1 text-2xl font-bold text-white">Für dich</p>
        </div>
      </div>
      <div id="recommendations" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"></div>
    </section>
    <section class="mx-auto max-w-7xl px-4 py-10 md:py-12">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Entdecken</h2>
          <p id="headline" class="mt-1 text-2xl font-bold text-white">Filme</p>
        </div>
        <span id="count" class="text-xs text-neutral-500"></span>
      </div>
      <div id="grid" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"></div>
      <div id="empty" class="hidden mt-6 rounded-xl border border-dashed border-white/10 p-6 text-center text-neutral-400">Keine Ergebnisse. Versuche es mit einem anderen Begriff.</div>
    </section>
  `;

  const search_el = document.getElementById('search');
  const clear_el = document.querySelector('[data-action="clear"]');
  if (search_el && clear_el) {
    const toggle_clear = () => { if ((search_el.value || '').trim().length) clear_el.classList.remove('hidden'); else clear_el.classList.add('hidden'); };
    search_el.addEventListener('input', (e) => { state.query = (e.target.value || '').trim(); render(); toggle_clear(); });
    clear_el.addEventListener('click', () => { search_el.value = ''; state.query = ''; render(); toggle_clear(); search_el.focus(); });
  }
};

const render_item = (film) => {
  const active = state.selected_id === film.id;
  return `
    <article data-id="${film.id}" class="film-card group cursor-pointer overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-[#7c3aed]/55 hover:shadow-[0_1.6rem_2.6rem_rgba(124,58,237,0.24)] ${active ? 'ring-1 ring-[#7c3aed] shadow-[0_1.6rem_2.6rem_rgba(124,58,237,0.28)]' : 'shadow-lg'}">
      <div class="relative aspect-video overflow-hidden bg-black/40">
        <img src="${esc(film.poster || '/public/icons.svg')}" alt="${esc(film.title)}" loading="lazy" class="h-full w-full object-cover mix-blend-luminosity transition duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 p-4">
          <p class="text-sm font-semibold leading-tight text-white">${esc(film.title)}</p>
          <div class="mt-1 flex items-center gap-2 text-xs text-neutral-300">
            <span>${esc(film.year ?? '')}</span>
            <span>·</span>
            <span>${(film.genres || []).join(', ') || 'Ohne Genre'}</span>
          </div>
        </div>
        <div class="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[11px] font-semibold text-[#f5d061] ring-1 ring-white/10 backdrop-blur-md">
          <span aria-hidden="true">★</span>
          <span>${esc(film.rating ?? '-')}</span>
        </div>
      </div>
    </article>
  `;
};

const render_grid = async () => {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  if (!grid || !empty) return;
  grid.innerHTML = '';
  const loader = document.createElement('div');
  loader.className = 'col-span-full rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-neutral-400';
  loader.textContent = state.loading ? 'Lade Filme…' : 'Keine Ergebnisse.';
  grid.appendChild(loader);
  empty.classList.add('hidden');
};

const render = async () => {
  let films = state.films || [];
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
  if (!grid || !empty) return;
  headline.textContent = q ? 'Suchergebnisse' : 'Filme';
  if (!state.films_loaded) { await render_grid(); return; }
  if (!films.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); count.textContent = '0 Treffer'; }
  else {
    empty.classList.add('hidden');
    count.textContent = `${films.length} ${films.length === 1 ? 'Film' : 'Filme'}`;
    grid.innerHTML = films.map((f) => render_item(f)).join('');
    render_recommendations();
  }
  grid.querySelectorAll('.film-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      state.selected_id = state.selected_id === id ? null : id;
      render();
      if (state.selected_id === id) open_details(id);
    });
  });
};

const open_details = (id) => {
  const film = state.films.find((f) => Number(f.id) === id);
  if (!film) return;
  let existing = document.querySelector('section.detail-sheet');
  if (existing) existing.remove();
  const sheet = document.createElement('section');
  sheet.className = 'detail-sheet fixed inset-x-0 bottom-0 z-40';
  sheet.innerHTML = `
    <div class="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-neutral-950/80 px-5 py-6 shadow-2xl backdrop-blur-xl">
      <div class="flex gap-4">
        <img src="${esc(film.poster || '/public/icons.svg')}" alt="${esc(film.title)}" class="hidden h-40 w-28 rounded-xl object-cover shadow-[0_1.4rem_2.2rem_rgba(0,0,0,0.6)] md:block ring-1 ring-white/10" />
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">${esc(film.title)}</h3>
              <p class="text-xs text-neutral-400">${esc(film.year)} · ${(film.genres || []).join(', ') || '—'}</p>
            </div>
            <button id="close-details" class="rounded-lg px-2 py-1 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 transition duration-200">✕</button>
          </div>
          <p class="mt-2 text-sm text-neutral-300">${esc(film.overview || 'Keine Beschreibung.')}</p>
          <div class="mt-3 flex items-center gap-2">
            <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white ring-1 ring-white/10 transition duration-200 hover:border-[#f5d061] hover:text-[#f5d061]">⭐ ${esc(film.rating)}</span>
            <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10">ID ${film.id}</span>
            <button data-action="journal" data-id="${film.id}" class="ml-auto rounded-md bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7c3aed] backdrop-blur-md transition duration-200 hover:bg-[#6d28d9]">Zu Journal</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(sheet);
  document.getElementById('close-details').addEventListener('click', () => sheet.remove());
  document.querySelector('button[data-action="journal"]').addEventListener('click', () => {
    sheet.remove();
    location.pathname = '/journal.html';
  });
};

const load_films = async () => {
  if (state.films_loaded) return;
  state.loading = true;
  await render();
  await new Promise((resolve) => setTimeout(resolve, 700));

  state.films = [
    { id: 1, title: 'Strategic Intrigue', year: '2024', genres: ['Thriller', 'Sci-Fi'], rating: 8.4, overview: 'Ein Team kämpft sich durch ein verschlossenes System, um die Wahrheit preiszugeben.', poster: 'https://image.tmdb.org/t/p/w500/fkS3x5QaBNwKqDW3rSPnHgmCRsy.jpg' },
    { id: 2, title: 'Cosmic Cavalry', year: '2023', genres: ['Adventure', 'Drama'], rating: 7.9, overview: 'Eine Forschergruppe entdeckt, dass die Menschheit sich mehrfach neu erfunden hat.', poster: 'https://image.tmdb.org/t/p/w500/8ChxV5APF4Z6w4BmXav5SrlMhG8.jpg' },
    { id: 3, title: 'Neon Heist', year: '2025', genres: ['Action', 'Crime'], rating: 8.1, overview: 'Ein letzter Coup in der Unterwelt, der alles aufs Spiel setzt.', poster: 'https://image.tmdb.org/t/p/w500/kWrXz4f12ve3Q5GKhhqpiLGBc1k.jpg' },
    { id: 4, title: 'Silver Meridian', year: '2024', genres: ['Thriller', 'Mystery'], rating: 7.6, overview: 'In einem gläsernen Hochhaus beginnt die Realität zu zerfließen.', poster: 'https://image.tmdb.org/t/p/w500/placeholder1.jpg' },
  ];
  state.films_loaded = true;
  state.loading = false;
  render();
  render_recommendations();
};

function render_recommendations() {
  const container = document.getElementById('recommendations');
  if (!container) return;

  const placeholders = Array.from({ length: 3 }, (_, i) => ({
    id: `placeholder-${i}`,
    title: 'Platzhalter',
    year: '',
    genres: [],
    rating: '-',
    overview: '',
    poster: '/public/icons.svg',
  }));

  container.innerHTML = placeholders.map((film) => render_item(film)).join('');
}

function init_header_stars() {
  const field = document.getElementById('header-stars');
  if (!field) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 200; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.width = `${1 + Math.random() * 2}px`;
    s.style.height = s.style.width;
    s.style.animationDelay = `${Math.random() * 2400}ms`;
    s.style.animationDuration = `${1800 + Math.random() * 1600}ms`;
    frag.appendChild(s);
  }
  field.appendChild(frag);
}

const init = async () => {
  render_home();
  nav_chips();
  await load_films();
  init_header_stars();
};

window.addEventListener('popstate', () => { nav_chips(); render(); });
window.addEventListener('hashchange', () => { nav_chips(); render(); });
nav_chips();
init();
