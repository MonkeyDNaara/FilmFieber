import"./modulepreload-polyfill-Dezn_h7o.js";var e={query:``,films:[{id:1,title:`Strategic Intrigue`,year:`2024`,genres:[`Thriller`,`Sci-Fi`],rating:8.4,overview:`Ein Team kämpft sich durch ein verschlossenes System, um die Wahrheit über ein Projekt preiszugeben.`,poster:`https://image.tmdb.org/t/p/w500/fkS3x5QaBNwKqDW3rSPnHgmCRsy.jpg`},{id:2,title:`Cosmic Cavalry`,year:`2023`,genres:[`Adventure`,`Drama`],rating:7.9,overview:`Hinter der Fassade einer friedlichen Welt entdeckt eine Forschergruppe, dass sich die Menschheit mehrfach neu erfunden hat.`,poster:`https://image.tmdb.org/t/p/w500/8ChxV5APF4Z6w4BmXav5SrlMhG8.jpg`},{id:3,title:`Neon Heist`,year:`2025`,genres:[`Action`,`Crime`],rating:8.1,overview:`Ein letzter Coup in der Unterwelt, der alles aufs Spiel setzt.`,poster:`https://image.tmdb.org/t/p/w500/kWrXz4f12ve3Q5GKhhqpiLGBc1k.jpg`},{id:4,title:`Silent Orbit`,year:`2022`,genres:[`Sci-Fi`,`Mystery`],rating:7.6,overview:`Auf einer stillgelegten Raumstation empfängt man ein Signal, das nie abgeschickt wurde.`,poster:`https://image.tmdb.org/t/p/w500/6 DrKFYAzYGTj2nxmRVyKTfreyX.jpg`},{id:5,title:`Golden Run`,year:`2021`,genres:[`Crime`,`Drama`],rating:8,overview:`Ein letzter Deal soll eine Familie retten — aber das Netz ist größer als gedacht.`,poster:`https://image.tmdb.org/t/p/w500/placeholder5.jpg`},{id:6,title:`Dark Meridian`,year:`2024`,genres:[`Horror`,`Thriller`],rating:7.3,overview:`Einmarathon durch nebelgeplagte Wälder wird zum Überlebenskampf.`,poster:`https://image.tmdb.org/t/p/w500/placeholder6.jpg`},{id:7,title:`Aurora Code`,year:`2023`,genres:[`Sci-Fi`,`Action`],rating:8.2,overview:`Eine Programmiererin entdeckt einen Code, der die Realität neu schreibt.`,poster:`https://image.tmdb.org/t/p/w500/placeholder7.jpg`},{id:8,title:`Last Ember`,year:`2020`,genres:[`Drama`,`Romance`],rating:7.8,overview:`Zwei Fremde teilen eine letzte Nacht in einer schlafenden Stadt.`,poster:`https://image.tmdb.org/t/p/w500/placeholder8.jpg`}]},t=document.getElementById(`app`),n=document.createElement(`header`);n.className=`sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur`,n.innerHTML=`
  <div class="mx-auto max-w-6xl flex items-center justify-between gap-4 px-4 py-3">
    <a href="/" class="text-lg font-bold text-white">
      🌡️ ThermoMovie<span class="text-[#f5d061]">.</span>
    </a>
    <div class="flex items-center gap-2">
      <a href="/" class="cursor-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/10">Start</a>
      <a href="/journal.html" class="rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white">Journal</a>
    </div>
  </div>
`,t.appendChild(n);var r=document.createElement(`main`),i=document.createElement(`section`);i.className=`relative overflow-hidden border-b border-white/10`,i.innerHTML=`
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
`,r.appendChild(i);var a=document.createElement(`section`);a.className=`mx-auto max-w-6xl px-4 py-8`,a.innerHTML=`
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
`,r.appendChild(a),t.appendChild(r);var o=document.createElement(`div`);o.className=`fixed inset-x-0 bottom-6 flex justify-center`,o.innerHTML=`
  <div id="live-indicator" class="hidden items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] text-neutral-300 ring-1 ring-white/10 backdrop-blur">
    <span class="h-1.5 w-1.5 rounded-full bg-[#f5d061] animate-pulse" aria-hidden="true" />
    Aktualisiere…
  </div>
`,t.appendChild(o);var s=()=>{n.querySelectorAll(`a`).forEach(e=>{e.className=e.getAttribute(`href`)===location.pathname?`cursor-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 bg-white/10`:`rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white`})},c=e=>`
  <article data-id="${e.id}" class="film-card group cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-[#7c3aed]/50 hover:shadow-[0_1.2rem_2.4rem_rgba(124,58,237,0.18)]">
    <div class="relative aspect-[2/3] overflow-hidden rounded-t-xl bg-black/40">
      <img src="${e.poster||`/public/icons.svg`}" alt="${e.title}" loading="lazy" class="h-full w-full object-cover mix-blend-luminosity transition duration-500 group-hover:scale-105" />
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-black/0 p-2">
        <span class="text-[11px] font-medium text-white/90">${e.year??``}</span>
      </div>
    </div>
    <div class="space-y-1 p-3">
      <p class="text-sm font-semibold leading-tight text-white">${e.title}</p>
      <p class="text-xs text-neutral-400">${(e.genres||[]).join(`, `)||`Ohne Genre`}</p>
      <div class="flex items-center gap-1 text-[11px] font-semibold text-[#f5d061]">
        <span aria-hidden="true">★</span>
        <span>${e.rating??`-`}</span>
      </div>
    </div>
  </article>
`,l=async()=>{let t=e.films,n=(e.query||``).trim().toLowerCase();n&&(t=t.filter(e=>String(e.title).toLowerCase().includes(n)||String(e.year).toLowerCase().includes(n)||(e.genres||[]).some(e=>String(e).toLowerCase().includes(n))));let r=document.getElementById(`grid`),i=document.getElementById(`empty`),a=document.getElementById(`count`),o=document.getElementById(`headline`);o.textContent=n?`Suchergebnisse`:`Beliebte Filme`,t.length?(i.classList.add(`hidden`),a.textContent=`${t.length} ${t.length===1?`Film`:`Filme`}`,r.innerHTML=t.map(e=>c(e)).join(``)):(r.innerHTML=``,i.classList.remove(`hidden`),a.textContent=`0 Treffer`),document.querySelectorAll(`.film-card`).forEach(e=>{e.addEventListener(`click`,()=>{u(Number(e.dataset.id))})})},u=t=>{let n=e.films.find(e=>Number(e.id)===t);if(!n)return;let r=document.querySelector(`section.detail-sheet`);r&&r.remove();let i=document.createElement(`section`);i.className=`fixed inset-x-0 bottom-0 z-30`,i.innerHTML=`
    <div class="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-neutral-950 px-5 py-6 shadow-2xl backdrop-blur">
      <div class="flex gap-4">
        <img src="${n.poster||`/public/icons.svg`}" alt="${n.title}" class="hidden h-36 w-24 rounded-xl object-cover shadow-[0_1.2rem_2rem_rgba(124,58,237,0.35)] md:block ring-1 ring-[#7c3aed]/60" />
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">${n.title}</h3>
              <p class="text-xs text-neutral-400">${n.year} · ${(n.genres||[]).join(`, `)||`—`}</p>
            </div>
            <button id="close-details" class="rounded-lg px-2 py-1 text-xs text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 transition">✕</button>
          </div>
          <p class="mt-2 text-sm text-neutral-300">${n.overview||`Keine Beschreibung.`}</p>
          <div class="mt-3 flex items-center gap-2">
            <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white ring-1 ring-white/10 transition duration-200 hover:border-[#f5d061] hover:text-[#f5d061]">⭐ ${n.rating}</span>
            <span class="rounded-md bg-white/5 px-2 py-1 text-[11px] text-neutral-300 ring-1 ring-white/10">ID ${n.id}</span>
            <button data-action="journal" data-id="${n.id}" class="ml-auto rounded-md bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#7c3aed] transition hover:bg-[#6d28d9]">Zu Journal</button>
          </div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(i),document.getElementById(`close-details`).addEventListener(`click`,()=>i.remove());let a=document.getElementById(`live-indicator`);a&&(a.classList.remove(`hidden`),a.classList.add(`flex`),a.scrollIntoView({behavior:`smooth`})),document.querySelector(`button[data-action="journal"]`).addEventListener(`click`,()=>{i.remove(),a&&(a.classList.add(`hidden`),a.classList.remove(`flex`)),location.pathname=`/journal.html`})};document.getElementById(`search`).addEventListener(`input`,t=>{e.query=(t.target.value||``).trim(),l()}),window.addEventListener(`popstate`,()=>l()),s(),l();