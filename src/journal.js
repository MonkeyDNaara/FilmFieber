const storage = {
  entries: () => {
    try { return JSON.parse(localStorage.getItem('journal') || '[]'); } catch { return []; }
  },
  add(entry) {
    const list = this.entries();
    list.unshift(entry);
    localStorage.setItem('journal', JSON.stringify(list));
  },
  update(idx, entry) {
    const list = this.entries();
    list[idx] = entry;
    localStorage.setItem('journal', JSON.stringify(list));
  },
  remove(idx) {
    const list = this.entries();
    list.splice(idx, 1);
    localStorage.setItem('journal', JSON.stringify(list));
  },
};

const date_formatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' });

const app = document.getElementById('app');

const journal_header = document.createElement('header');
journal_header.className = 'site-header sticky top-0 z-30';
journal_header.innerHTML = `
  <div class="header-glass relative overflow-hidden">
    <div class="star-field" aria-hidden="true"></div>
    <div class="site-header-inner mx-auto max-w-7xl px-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <a href="/" class="group inline-flex h-10 w-auto items-center justify-center gap-2 text-lg font-bold tracking-tight text-white">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-base backdrop-blur-md transition duration-200 group-hover:border-[#f5d061]/60">🌡️</span>
          <span class="brand-text font-display tracking-wide">Film<span class="text-[#f5d061]">Fieber</span></span>
        </a>
        <nav class="flex items-center gap-2">
          <a data-nav="home" href="/" class="nav-chip rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 ring-1 ring-white/10 backdrop-blur-md transition duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white">Start</a>
          <a data-nav="journal" href="/journal.html" class="nav-chip active rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white">Journal</a>
        </nav>
      </div>
    </div>
  </div>
`;
app.appendChild(journal_header);

const main = document.createElement('main');
main.className = 'relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-12';
main.innerHTML = `
  <div class="pointer-events-none absolute -right-10 top-10 h-56 w-56 rounded-full bg-[#7c3aed]/20 blur-3xl" aria-hidden="true"></div>
  <div class="pointer-events-none absolute -left-10 top-28 h-44 w-44 rounded-full bg-[#f5d061]/15 blur-3xl" aria-hidden="true"></div>
  <div class="flex items-end justify-between gap-3">
    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Journal</h2>
      <p data-text="Deine Einträge" class="mt-1 text-2xl font-bold gold-title text-white md:text-3xl">Deine Einträge</p>
    </div>
    <button id="new-entry" class="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition duration-200 hover:border-[#f5d061]/60 hover:shadow-[0_0_25px_rgba(245,208,97,0.25)]">Neu</button>
  </div>
  <div id="entries" class="mt-6 space-y-3"></div>
  <div id="empty" class="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-400">
    Noch keine Einträge.
  </div>
`;
app.appendChild(main);

const render = () => {
  const entries = storage.entries();
  const container = document.getElementById('entries');
  const empty = document.getElementById('empty');
  if (!entries.length) {
    container.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  container.innerHTML = entries.map((entry, idx) => `
    <article class="group glass-card flex items-start justify-between gap-3 rounded-2xl p-4 transition duration-200 hover:border-white/22">
      <div>
        <p class="text-sm font-semibold text-white">${entry.title || 'Ohne Titel'}</p>
        <p class="mt-0.5 text-xs text-neutral-400">${date_formatter.format(new Date(entry.at))}${entry.rating ? ' · ★ ' + entry.rating : ''}</p>
        <p class="mt-1 text-xs text-neutral-300">${entry.note || ''}</p>
        ${entry.mood ? '<span class="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neutral-300 ring-1 ring-white/10">' + entry.mood + '</span>' : ''}
      </div>
      <div class="flex flex-col gap-1">
        <button data-action="edit" data-idx="${idx}" class="rounded-md px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">Bearbeiten</button>
        <button data-action="remove" data-idx="${idx}" class="rounded-md px-2 py-1 text-[11px] text-white ring-1 ring-[#7c3aed]/70 hover:bg-[#7c3aed] hover:text-white">Löschen</button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('button[data-action="remove"]').forEach((btn) => {
    btn.addEventListener('click', () => { if (confirm('Eintrag wirklich löschen?')) { storage.remove(Number(btn.dataset.idx)); render(); } });
  });
  container.querySelectorAll('button[data-action="edit"]').forEach((btn) => {
    btn.addEventListener('click', () => { const idx = Number(btn.dataset.idx); open_form(entries[idx], idx); });
  });
};

const open_form = (entry = null, idx = null) => {
  const is_edit = entry !== null && idx !== null;
  const overlay = document.createElement('section');
  overlay.className = 'fixed inset-x-0 inset-y-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm';
  overlay.innerHTML = `
    <form id="entry-form" class="glass-panel w-full max-w-lg rounded-2xl p-5 shadow-2xl">
      <h3 class="text-base font-bold text-white">${is_edit ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h3>
      <div class="mt-4 space-y-3">
        <input id="ef-title" value="${is_edit ? entry.title : ''}" placeholder="Titel" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <input id="ef-rating" value="${is_edit ? entry.rating ?? '' : ''}" placeholder="Bewertung (1–10)" inputmode="numeric" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <textarea id="ef-note" rows="3" placeholder="Notiz…" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">${is_edit ? entry.note ?? '' : ''}</textarea>
        <select id="ef-mood" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">
          <option value="" ${!is_edit || !entry.mood ? 'selected' : ''}>Stimmung (optional)</option>
          <option value="Positiv" ${is_edit && entry.mood === 'Positiv' ? 'selected' : ''}>Positiv</option>
          <option value="Neutral" ${is_edit && entry.mood === 'Neutral' ? 'selected' : ''}>Neutral</option>
          <option value="Negativ" ${is_edit && entry.mood === 'Negativ' ? 'selected' : ''}>Negativ</option>
        </select>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" id="close-form" class="rounded-lg px-3 py-1.5 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">Abbrechen</button>
        <button type="submit" class="rounded-lg bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7c3aed] backdrop-blur-md transition duration-200 hover:bg-[#6d28d9]">Speichern</button>
      </div>
    </form>
  `;
  document.body.appendChild(overlay);
  document.getElementById('close-form').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#entry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById('ef-title').value.trim(),
      rating: document.getElementById('ef-rating').value.trim(),
      note: document.getElementById('ef-note').value.trim(),
      mood: document.getElementById('ef-mood').value,
      at: is_edit ? entry.at : new Date().toISOString(),
    };
    if (!payload.title) return;
    if (is_edit) storage.update(idx, payload);
    else storage.add(payload);
    overlay.remove();
    render();
  });
};

document.getElementById('new-entry').addEventListener('click', () => open_form());
render();

function init_journal_stars() {
  const field = document.querySelector('#app .star-field');
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

init_journal_stars();
