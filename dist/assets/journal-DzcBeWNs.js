import"./modulepreload-polyfill-Dezn_h7o.js";var e={entries:()=>{try{return JSON.parse(localStorage.getItem(`journal`)||`[]`)}catch{return[]}},add(e){let t=this.entries();t.unshift(e),localStorage.setItem(`journal`,JSON.stringify(t))},update(e,t){let n=this.entries();n[e]=t,localStorage.setItem(`journal`,JSON.stringify(n))},remove(e){let t=this.entries();t.splice(e,1),localStorage.setItem(`journal`,JSON.stringify(t))}},t=new Intl.DateTimeFormat(`de-DE`,{dateStyle:`medium`,timeStyle:`short`}),n=document.getElementById(`app`),r=document.createElement(`main`);r.className=`mx-auto max-w-6xl px-4 py-8`,r.innerHTML=`
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
`,n.appendChild(r);var i=()=>{let n=e.entries(),r=document.getElementById(`entries`),o=document.getElementById(`empty`);if(!n.length){r.innerHTML=``,o.classList.remove(`hidden`);return}o.classList.add(`hidden`),r.innerHTML=n.map((e,n)=>`
    <article class="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:border-white/20">
      <div>
        <p class="text-sm font-semibold text-white">${e.title||`Ohne Titel`}</p>
        <p class="mt-0.5 text-xs text-neutral-400">${t.format(new Date(e.at))}${e.rating?` · ★ `+e.rating:``}</p>
        <p class="mt-1 text-xs text-neutral-300">${e.note||``}</p>
        ${e.mood?`<span class="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neutral-300 ring-1 ring-white/10">`+e.mood+`</span>`:``}
      </div>
      <div class="flex flex-col gap-1">
        <button data-action="edit" data-idx="${n}" class="rounded-md px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">Bearbeiten</button>
        <button data-action="remove" data-idx="${n}" class="rounded-md px-2 py-1 text-[11px] text-[#7c3aed] ring-1 ring-[#7c3aed]/60 hover:bg-[#7c3aed] hover:text-white">Löschen</button>
      </div>
    </article>
  `).join(``),r.querySelectorAll(`button[data-action="remove"]`).forEach(t=>{t.addEventListener(`click`,()=>{confirm(`Eintrag wirklich löschen?`)&&(e.remove(Number(t.dataset.idx)),i())})}),r.querySelectorAll(`button[data-action="edit"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.idx);a(n[t],t)})})},a=(t=null,n=null)=>{let r=t!==null&&n!==null,a=document.createElement(`section`);a.className=`fixed inset-x-0 inset-y-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm`,a.innerHTML=`
    <form id="entry-form" class="w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-2xl">
      <h3 class="text-base font-bold text-white">${r?`Eintrag bearbeiten`:`Neuer Eintrag`}</h3>
      <div class="mt-4 space-y-3">
        <input id="ef-title" value="${r?t.title:``}" placeholder="Titel" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <input id="ef-rating" value="${r?t.rating??``:``}" placeholder="Bewertung (1–10)" inputmode="numeric" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60" />
        <textarea id="ef-note" rows="3" placeholder="Notiz…" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">${r?t.note??``:``}</textarea>
        <select id="ef-mood" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:border-[#7c3aed] focus:ring-[#7c3aed]/60">
          <option value="" ${!r||!t.mood?`selected`:``}>Stimmung (optional)</option>
          <option value="Positiv" ${r&&t.mood===`Positiv`?`selected`:``}>Positiv</option>
          <option value="Neutral" ${r&&t.mood===`Neutral`?`selected`:``}>Neutral</option>
          <option value="Negativ" ${r&&t.mood===`Negativ`?`selected`:``}>Negativ</option>
        </select>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" id="close-form" class="rounded-lg px-3 py-1.5 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10">Abbrechen</button>
        <button type="submit" class="rounded-lg bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7c3aed] transition hover:bg-[#6d28d9]">Speichern</button>
      </div>
    </form>
  `,document.body.appendChild(a),document.getElementById(`close-form`).addEventListener(`click`,()=>a.remove()),a.querySelector(`#entry-form`).addEventListener(`submit`,o=>{o.preventDefault();let s={title:document.getElementById(`ef-title`).value.trim(),rating:document.getElementById(`ef-rating`).value.trim(),note:document.getElementById(`ef-note`).value.trim(),mood:document.getElementById(`ef-mood`).value,at:r?t.at:new Date().toISOString()};s.title&&(r?e.update(n,s):e.add(s),a.remove(),i())})};document.getElementById(`new-entry`).addEventListener(`click`,()=>a()),i();