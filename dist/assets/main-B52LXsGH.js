import{n as e,r as t,t as n}from"./header-BtWUvtvy.js";var r={query:``,films:[],selected_id:null,films_loaded:!1,loading:!1};function i(e){let t=String(e??``);return document.createElement(`i`).textContent=t,t}var a=document.createElement(`div`);a.className=`relative min-h-screen overflow-hidden text-white antialiased selection:bg-[#6d28d9]/30 selection:text-white`,a.innerHTML=`
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#7c3aed30_0%,_#3d1f7e45_35%,_#000_100%)] mix-blend-screen" aria-hidden="true"></div>
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#f5d0611a_0%,_#000_100%)] mix-blend-screen" aria-hidden="true"></div>
  <div class="relative z-10">
    ${e(`header-stars`)}
    <main></main>
  </div>
`,document.body.appendChild(a);var o=a.querySelector(`main`),s=t,c=()=>{o.innerHTML=`
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
                <button data-action="clear" class="btn-glass hidden">✕</button>
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
  `;let e=document.getElementById(`search`),t=document.querySelector(`[data-action="clear"]`);if(e&&t){let n=()=>{(e.value||``).trim().length?t.classList.remove(`hidden`):t.classList.add(`hidden`)};e.addEventListener(`input`,e=>{r.query=(e.target.value||``).trim(),d(),n()}),t.addEventListener(`click`,()=>{e.value=``,r.query=``,d(),n(),e.focus()})}},l=e=>{let t=r.selected_id===e.id;return`
    <article data-id="${e.id}" class="film-card group cursor-pointer overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] ${t?`active`:``}">
      <div class="relative aspect-video overflow-hidden bg-black/40">
        <img src="${i(e.poster||`/favicon.svg`)}" alt="${i(e.title)}" loading="lazy" class="h-full w-full object-cover mix-blend-luminosity transition duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 p-4">
          <p class="text-sm font-semibold leading-tight text-white">${i(e.title)}</p>
          <div class="mt-1 flex items-center gap-2 text-xs text-neutral-300">
            <span>${i(e.year??``)}</span>
            <span>·</span>
            <span>${(e.genres||[]).join(`, `)||`Ohne Genre`}</span>
          </div>
        </div>
        <div class="absolute right-3 top-3 rating-badge">
          <span aria-hidden="true">★</span>
          <span>${i(e.rating??`-`)}</span>
        </div>
      </div>
    </article>
  `},u=async()=>{let e=document.getElementById(`grid`),t=document.getElementById(`empty`);if(!e||!t)return;e.innerHTML=``;let n=document.createElement(`div`);n.className=`col-span-full rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-neutral-400`,n.textContent=r.loading?`Lade Filme…`:`Keine Ergebnisse.`,e.appendChild(n),t.classList.add(`hidden`)},d=async()=>{let e=r.films||[],t=(r.query||``).trim().toLowerCase();t&&(e=e.filter(e=>String(e.title).toLowerCase().includes(t)||String(e.year).toLowerCase().includes(t)||(e.genres||[]).some(e=>String(e).toLowerCase().includes(t))));let n=document.getElementById(`grid`),i=document.getElementById(`empty`),a=document.getElementById(`count`),o=document.getElementById(`headline`);if(!(!n||!i)){if(o.textContent=t?`Suchergebnisse`:`Filme`,!r.films_loaded){await u();return}e.length?(i.classList.add(`hidden`),a.textContent=`${e.length} ${e.length===1?`Film`:`Filme`}`,n.innerHTML=e.map(e=>l(e)).join(``),m()):(n.innerHTML=``,i.classList.remove(`hidden`),a.textContent=`0 Treffer`),n.querySelectorAll(`.film-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id);r.selected_id=r.selected_id===t?null:t,d(),r.selected_id===t&&f(t)})})}},f=e=>{let t=r.films.find(t=>Number(t.id)===e);if(!t)return;let n=document.querySelector(`section.detail-sheet`);n&&n.remove();let a=document.createElement(`section`);a.className=`detail-sheet fixed inset-x-0 bottom-0 z-40`,a.innerHTML=`
    <div class="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-neutral-950/80 px-5 py-6 shadow-2xl backdrop-blur-xl">
      <div class="flex gap-4">
        <img src="${i(t.poster||`/favicon.svg`)}" alt="${i(t.title)}" class="hidden h-40 w-28 rounded-xl object-cover shadow-[0_1.4rem_2.2rem_rgba(0,0,0,0.6)] md:block ring-1 ring-white/10" />
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">${i(t.title)}</h3>
              <p class="text-xs text-neutral-400">${i(t.year)} · ${(t.genres||[]).join(`, `)||`—`}</p>
            </div>
            <button id="close-details" class="btn-icon">✕</button>
          </div>
          <p class="mt-2 text-sm text-neutral-300">${i(t.overview||`Keine Beschreibung.`)}</p>
          <div class="mt-3 flex items-center gap-2">
            <span class="rating-badge interactive">⭐ ${i(t.rating)}</span>
            <span class="badge-secondary">ID ${t.id}</span>
            <button data-action="journal" data-id="${t.id}" class="btn-primary">Zu Journal</button>
          </div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(a),document.getElementById(`close-details`).addEventListener(`click`,()=>a.remove()),document.querySelector(`button[data-action="journal"]`).addEventListener(`click`,()=>{a.remove(),location.pathname=`/journal.html`})},p=async()=>{r.films_loaded||(r.loading=!0,await d(),await new Promise(e=>setTimeout(e,700)),r.films=[{id:1,title:`Strategic Intrigue`,year:`2024`,genres:[`Thriller`,`Sci-Fi`],rating:8.4,overview:`Ein Team kämpft sich durch ein verschlossenes System, um die Wahrheit preiszugeben.`,poster:`https://image.tmdb.org/t/p/w500/fkS3x5QaBNwKqDW3rSPnHgmCRsy.jpg`},{id:2,title:`Cosmic Cavalry`,year:`2023`,genres:[`Adventure`,`Drama`],rating:7.9,overview:`Eine Forschergruppe entdeckt, dass die Menschheit sich mehrfach neu erfunden hat.`,poster:`https://image.tmdb.org/t/p/w500/8ChxV5APF4Z6w4BmXav5SrlMhG8.jpg`},{id:3,title:`Neon Heist`,year:`2025`,genres:[`Action`,`Crime`],rating:8.1,overview:`Ein letzter Coup in der Unterwelt, der alles aufs Spiel setzt.`,poster:`https://image.tmdb.org/t/p/w500/kWrXz4f12ve3Q5GKhhqpiLGBc1k.jpg`},{id:4,title:`Silver Meridian`,year:`2024`,genres:[`Thriller`,`Mystery`],rating:7.6,overview:`In einem gläsernen Hochhaus beginnt die Realität zu zerfließen.`,poster:`/favicon.svg`}],r.films_loaded=!0,r.loading=!1,d(),m())};function m(){let e=document.getElementById(`recommendations`);e&&(e.innerHTML=Array.from({length:3},(e,t)=>({id:`placeholder-${t}`,title:`Platzhalter`,year:``,genres:[],rating:`-`,overview:``,poster:`/favicon.svg`})).map(e=>l(e)).join(``))}window.addEventListener(`popstate`,()=>{s(),d()}),window.addEventListener(`hashchange`,()=>{s(),d()}),s(),(async()=>{c(),s(),await p(),n(`#header-stars`)})();