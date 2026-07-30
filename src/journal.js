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

const dateFormatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' });

const app = document.getElementById('app');
const main = document.createElement('main');
main.className = 'mx-auto max-w-6xl px-4 py-8';
main.innerHTML = `
  <div class="flex items-end justify-between gap-3">
    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Journal</h2>
      <p class="mt-1 text-2xl font-bold text-white">Deine Einträge</p>
    </div>
    <button id="new-entry" class="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-200">Neu</button>
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
    <article class="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:border-white/20">
      <div>
        <p class="text-sm font-semibold text-white">${entry.title || 'Ohne Titel'}</p>
        <p class="mt-0.5 text-xs text-neutral-400">${dateFormatter.format(new Date(entry.at))}${entry.rating ? ' · ★ ' + entry.rating : ''}</p>
        <p class="mt-1 text-xs text-neutral-300">${entry.note || ''}</p>
        ${entry.mood ? '<span class="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neutral-300 ring-1 ring-white/10">' + entry.mood + '</span>' : ''}
      </div>
      <div class="flex flex-col gap-1">
        <button data-action="edit" data-idx="${idx}" class="rounded-md px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">Bearbeiten</button>
        <button data-action="remove" data-idx="${idx}" class="rounded-md px-2 py-1 text-[11px] text-[#7c3aed] ring-1 ring-[#7c3aed]/60 hover:bg-[#7c3aed] hover:text-white">Löschen</button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('button[data-action="remove"]').forEach((btn) => {
    btn.addEventListener('click', () => { if (confirm('Eintrag wirklich löschen?')) { storage.remove(Number((btn).dataset.idx)); render(); } });
  });
  container.querySelectorAll('button[data-action="edit"]').forEach((btn) => {
    btn.addEventListener('click', () => { const idx = Number((btn).dataset.idx); openForm(entries[idx], idx); });
  });
};

const openForm = (entry = null, idx = null) => {
  const isEdit = entry !== null && idx !== null;
  const overlay = document.createElement('section');
  overlay.className = 'fixed inset-x-0 inset-y-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm';
  overlay.innerHTML = `
    <form id="entry-form" class="w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-2xl">
      <h3 class="text-base font-bold text-white">${isEdit ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}</h3>
      <div class="mt-4 space-y-3">
        <input id="ef-title" value="${isEdit ? entry.title : ''}" placeholder="Titel" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <input id="ef-rating" value="${isEdit ? entry.rating ?? '' : ''}" placeholder="Bewertung (1–10)" inputmode="numeric" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <textarea id="ef-note" rows="3" placeholder="Notiz…" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">${isEdit ? entry.note ?? '' : ''}</textarea>
        <select id="ef-mood" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">
          <option value="" ${!isEdit || !entry.mood ? 'selected' : ''}>Stimmung (optional)</option>
          <option value="Positiv" ${isEdit && entry.mood === 'Positiv' ? 'selected' : ''}>Positiv</option>
          <option value="Neutral" ${isEdit && entry.mood === 'Neutral' ? 'selected' : ''}>Neutral</option>
          <option value="Negativ" ${isEdit && entry.mood === 'Negativ' ? 'selected' : ''}>Negativ</option>
        </select>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" id="close-form" class="rounded-lg px-3 py-1.5 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">Abbrechen</button>
        <button type="submit" class="rounded-lg bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7c3aed] transition hover:bg-[#6d28d9]">Speichern</button>
      </div>
    </form>
  `;
  document.body.appendChild(overlay);
  document.getElementById('close-form').addEventListener('click', () => overlay.remove());
  (overlay.querySelector('#entry-form')).addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      title: (document.getElementById('ef-title')).value.trim(),
      rating: (document.getElementById('ef-rating')).value.trim(),
      note: (document.getElementById('ef-note')).value.trim(),
      mood: (document.getElementById('ef-mood')).value,
      at: isEdit ? entry.at : new Date().toISOString(),
    };
    if (!payload.title) return;
    if (isEdit) storage.update(idx, payload);
    else storage.add(payload);
    overlay.remove();
    render();
  });
};

document.getElementById('new-entry').addEventListener('click', () => openForm());
render();
