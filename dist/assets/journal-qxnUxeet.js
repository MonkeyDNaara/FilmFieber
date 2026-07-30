import{n as e,t}from"./header-BtWUvtvy.js";var n={entries:()=>{try{return JSON.parse(localStorage.getItem(`journal`)||`[]`)}catch{return[]}},add(e){let t=this.entries();t.unshift(e),localStorage.setItem(`journal`,JSON.stringify(t))},update(e,t){let n=this.entries();n[e]=t,localStorage.setItem(`journal`,JSON.stringify(n))},remove(e){let t=this.entries();t.splice(e,1),localStorage.setItem(`journal`,JSON.stringify(t))}},r=new Intl.DateTimeFormat(`de-DE`,{dateStyle:`medium`,timeStyle:`short`}),i=document.getElementById(`app`),a=document.createElement(`header`);a.className=`site-header sticky top-0 z-30`,a.innerHTML=e(`journal-stars`),i.appendChild(a);var o=document.createElement(`main`);o.className=`relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-12`,o.innerHTML=`
  <div class="pointer-events-none absolute -right-10 top-10 h-56 w-56 rounded-full bg-[#7c3aed]/20 blur-3xl" aria-hidden="true"></div>
  <div class="pointer-events-none absolute -left-10 top-28 h-44 w-44 rounded-full bg-[#f5d061]/15 blur-3xl" aria-hidden="true"></div>
  <div class="flex items-end justify-between gap-3">
    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-400">Journal</h2>
      <p data-text="Deine Einträge" class="mt-1 text-2xl font-bold gold-title text-white md:text-3xl">Deine Einträge</p>
    </div>
    <button id="new-entry" class="btn-glass shrink-0">Neu</button>
  </div>
  <div id="entries" class="mt-6 space-y-3"></div>
  <div id="empty" class="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-400">
    Noch keine Einträge.
  </div>
`,i.appendChild(o);var s=()=>{let e=n.entries(),t=document.getElementById(`entries`),i=document.getElementById(`empty`);if(!e.length){t.innerHTML=``,i.classList.remove(`hidden`);return}i.classList.add(`hidden`),t.innerHTML=e.map((e,t)=>`
    <article class="group glass-card flex items-start justify-between gap-3 rounded-2xl p-4 transition duration-200 hover:border-white/22">
      <div>
        <p class="text-sm font-semibold text-white">${e.title||`Ohne Titel`}</p>
        <p class="mt-0.5 text-xs text-neutral-400">${r.format(new Date(e.at))}${e.rating?` · ★ `+e.rating:``}</p>
        <p class="mt-1 text-xs text-neutral-300">${e.note||``}</p>
        ${e.mood?`<span class="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neutral-300 ring-1 ring-white/10">`+e.mood+`</span>`:``}
      </div>
      <div class="flex flex-col gap-1">
        <button data-action="edit" data-idx="${t}" class="btn-icon">Bearbeiten</button>
        <button data-action="remove" data-idx="${t}" class="btn-danger">Löschen</button>
      </div>
    </article>
  `).join(``),t.querySelectorAll(`button[data-action="remove"]`).forEach(e=>{e.addEventListener(`click`,()=>{confirm(`Eintrag wirklich löschen?`)&&(n.remove(Number(e.dataset.idx)),s())})}),t.querySelectorAll(`button[data-action="edit"]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.idx);c(e[n],n)})})},c=(e=null,t=null)=>{let r=e!==null&&t!==null,i=document.createElement(`section`);i.className=`fixed inset-x-0 inset-y-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm`,i.innerHTML=`
    <form id="entry-form" class="glass-panel w-full max-w-lg rounded-2xl p-5 shadow-2xl">
      <h3 class="text-base font-bold text-white">${r?`Eintrag bearbeiten`:`Neuer Eintrag`}</h3>
      <div class="mt-4 space-y-3">
        <input id="ef-title" value="${r?e.title:``}" placeholder="Titel" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <input id="ef-rating" value="${r?e.rating??``:``}" placeholder="Bewertung (1–10)" inputmode="numeric" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <textarea id="ef-note" rows="3" placeholder="Notiz…" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">${r?e.note??``:``}</textarea>
        <select id="ef-mood" class="search-glass w-full rounded-xl px-3 py-2 text-sm text-white backdrop-blur-md transition duration-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">
          <option value="" ${!r||!e.mood?`selected`:``}>Stimmung (optional)</option>
          <option value="Positiv" ${r&&e.mood===`Positiv`?`selected`:``}>Positiv</option>
          <option value="Neutral" ${r&&e.mood===`Neutral`?`selected`:``}>Neutral</option>
          <option value="Negativ" ${r&&e.mood===`Negativ`?`selected`:``}>Negativ</option>
        </select>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" id="close-form" class="btn-icon">Abbrechen</button>
        <button type="submit" class="btn-primary">Speichern</button>
      </div>
    </form>
  `,document.body.appendChild(i),document.getElementById(`close-form`).addEventListener(`click`,()=>i.remove()),i.querySelector(`#entry-form`).addEventListener(`submit`,a=>{a.preventDefault();let o={title:document.getElementById(`ef-title`).value.trim(),rating:document.getElementById(`ef-rating`).value.trim(),note:document.getElementById(`ef-note`).value.trim(),mood:document.getElementById(`ef-mood`).value,at:r?e.at:new Date().toISOString()};o.title&&(r?n.update(t,o):n.add(o),i.remove(),s())})};document.getElementById(`new-entry`).addEventListener(`click`,()=>c()),s(),t(`#app .star-field`);