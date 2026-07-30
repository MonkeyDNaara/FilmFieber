
const state = {
  query: '',
  films: [],
  selectedId: null,
};

function esc(str) {
  const v = String(str ?? '');
  return document.createElement('i').textContent = v, v;
}

export default async (app) => {
  const header = document.createElement('header');
  header.className = 'sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur';
  header.innerHTML = `
    <div class="mx-auto max-w-6xl flex items-center justify-between gap-4 px-4 py-3">
      <a href="#" class="text-lg font-bold text-white">
        🎬 FilmFieber<span class="text-[#b6ff3b]">.</span>
      </a>
      <div class="flex items-center gap-2">
        <a class="nav-link cursor-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/10" data-page="home">Start</a>
        <a class="nav-link rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white" href="journal.html" data-page="journal">Journal</a>
      </div>
    </div>
  `;
  app.appendChild(header);

  const main = document.createElement('main');
  const hero = document.createElement('section');
  hero.className = 'relative overflow-hidden border-b border-white/10';
  hero.innerHTML = `
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#7b1e2b30_0%,_#0a0a0a60_50%,_#000_100%)] mix-blend-screen"></div>
    <div class="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div class="max-w-2xl">
        <h1 class="text-3xl font-bold text-white md:text-4xl">
          Entdecke Filme.<span class="block text-[#b6ff3b]">Nichts übersehen.</span>
        </h1>
        <p class="mt-3 text-neutral-300">Suche, entdecke und behalte deine Favoriten im Blick.</p>
      </div>
      <div class="mt-6">
        <label class="sr-only" for="search">Filmsuche</label>
        <input id="search" type="search" autocomplete="off" placeholder="Suche Titel, Genre oder Jahr…"
          class="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 transition focus:border-[#6d28d9] focus:ring-[#6d28d9]/60" />
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
      <span class="h-1.5 w-1.5 rounded-full bg-[#b6ff3b] animate-pulse" aria-hidden="true" />
      Aktualisiere…
    </div>
  `;
  app.appendChild(loader);

  const nav = () => {
    const h = location.hash || '';
    header.querySelectorAll('.nav-link').forEach((link) => {
      const page = link.dataset.page;
      const active = (page === 'home' && !h.includes('journal')) || (page === 'journal' && h.includes('journal'));
      link.className = 'nav-link cursor-auto rounded-lg px-3 py-1.5 text-xs font-semibold ring-1 ' + (active ? 'bg-white/10 text-white ring-white/20' : 'text-neutral-300 ring-white/10 hover:bg-white/10 hover:text-white');
    });
  };

  const renderItem = (film) => {
    const active = state.selectedId === film.id;
    return `
      <article data-id="${film.id}" class="film-card group cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-[#6d28d9]/50 hover:shadow-[0_1.2rem_2.4rem_rgba(109,40,217,0.18)] ${active ? 'ring-1 ring-[#6d28d9]' : ''}">
        <div class="relative aspect-[2/3] overflow-hidden rounded-t-xl bg-black/40">
          <img src="${esc(film.poster || 'public/icons.svg')}" alt="${esc(film.title)}" loading="lazy" class="h-full w-full object-cover mix-blend-luminosity transition duration-500 group-hover:scale-105" />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-black/0 p-2">
            <span class="text-[11px] font-medium text-white/90">${esc(film.year)}</span>
          </div>
        </div>
        <div class="space-y-1 p-3">
          <p class="text-sm font-semibold leading-tight text-white">${esc(film.title)}</p>
          <p class="text-xs text-neutral-400">${(film.genres || []).join(', ') || 'Ohne Genre'}</p>
          <div class="flex items-center gap-1 text-[11px] font-semibold text-[#b6ff3b]">
            <span aria-hidden="true">★</span>
            <span>${esc(film.rating)}</span>
          </div>
        </div>
      </article>
    `;
  };

  const render = async () => {
    let films = state.films;
    const q = (state.query || '').trim().toLowerCase();
    if (q) {
      films = films.filter((film) => String(film.title).toLowerCase().includes(q) || String(film.year).toLowerCase().includes(q) || (film.genres || []).some((g) => String(g).toLowerCase().includes(q)));
    }
    const grid = document.getElementById('grid');
    const empty = document.getElementById('empty');
    const count = document.getElementById('count');
    const headline = document.getElementById('headline');
    headline.textContent = q ? 'Suchergebnisse' : 'Beliebte Filme';
    if (!films.length) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      count.textContent = '0 Treffer';
    } else {
      empty.classList.add('hidden');
      count.textContent = `${films.length} ${films.length === 1 ? 'Film' : 'Filme'}`;
      grid.innerHTML = films.map((f) => renderItem(f)).join('');
    }
    document.querySelectorAll('.film-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = Number(card.dataset.id);
        state.selectedId = state.selectedId === id ? null : id;
        render();
        if (state.selectedId === id) openDetails(id);
      });
    });
  };

  const openDetails = (id) => {
    const film = state.films.find((f) => Number(f.id) === id);
    if (!film) return;
    let existing = document.querySelector('section.detail-sheet');
    if (existing) existing.remove();
    const sheet = document.createElement('section');
    sheet.className = 'detail-sheet fixed inset-x-0 bottom-0 z-30';
    sheet.innerHTML = `
      <div class="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-neutral-950 px-5 py-5 shadow-2xl">
        <div class="flex gap-4">
          <img src="${esc(film.poster || 'public/icons.svg')}" alt="${esc(film.title)}" class="hidden h-36 w-24 rounded-lg object-cover md:block" />
          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-bold text-white">${esc(film.title)}</h3>
                <p class="text-xs text-neutral-400">${esc(film.year)} · ${(film.genres || []).join(', ') || '—'}</p>
              </div>
              <button id="close-details" class="rounded-lg px-2 py-1 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">✕</button>
            </div>
            <p class="mt-2 text-sm text-neutral-300">${esc(film.overview || 'Keine Beschreibung.')}</p>
            <div class="mt-3 flex items-center gap-2">
              <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white ring-1 ring-white/10">⭐ ${esc(film.rating)}</span>
              <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10">ID ${film.id}</span>
              <button data-action="journal" data-id="${film.id}" class="ml-auto rounded-md bg-[#7b1e2b] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7b1e2b] transition hover:bg-[#5e1622]">Zu Journal</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(sheet);
    document.getElementById('close-details').addEventListener('click', () => sheet.remove());
    const live = document.getElementById('live-indicator');
    if (live) {
      live.classList.remove('hidden');
      live.classList.add('flex');
      live.scrollIntoView({ behavior: 'smooth' });
    }
    const journalBtn = sheet.querySelector('button[data-action="journal"]');
    journalBtn.addEventListener('click', async () => {
      sheet.remove();
      if (live) { live.classList.add('hidden'); live.classList.remove('flex'); }
      location.hash = '#/journal';
    });
  };

  const init = async () => {
    const mod = await import('../data/films.json');
    state.films = mod.default || mod;
    render();
  };

  document.getElementById('search').addEventListener('input', (e) => {
    state.query = (e.target.value || '').trim();
    render();
  });

  window.addEventListener('hashchange', nav);
  window.addEventListener('popstate', () => { render(); });
  nav();
  await init();
};
