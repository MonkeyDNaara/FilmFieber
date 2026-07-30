(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){return location.pathname.replace(/\/$/,``)||`/`}function t(){return e()===`/journal.html`}function n(e){return`nav-chip rounded-lg px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition duration-200 `+(e===`home`&&!t()||e===`journal`&&t()?`active text-white ring-1 ring-white/20 bg-white/10 hover:border-white/25 hover:bg-white/10`:`text-neutral-300 ring-1 ring-white/10 hover:border-white/25 hover:bg-white/10 hover:text-white`)}function r(e=`header-stars`){return`
    <header class="site-header sticky top-0 z-30">
      <div class="header-glass relative overflow-hidden">
        <div id="${e}" class="star-field" aria-hidden="true"></div>
        <div class="site-header-inner mx-auto max-w-7xl px-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <a href="/" class="group inline-flex h-10 w-auto items-center justify-center gap-2 text-lg font-bold tracking-tight text-white">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-base backdrop-blur-md transition duration-200 group-hover:border-[#f5d061]/60">🌡️</span>
              <span class="brand-text font-display tracking-wide">Film<span class="text-[#f5d061]">Fieber</span></span>
            </a>
            <nav class="flex items-center gap-2">
              <a data-nav="home" href="/" class="${n(`home`)}">Start</a>
              <a data-nav="journal" href="/journal.html" class="${n(`journal`)}">Journal</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  `}function i(){document.querySelectorAll(`.nav-chip`).forEach(e=>{let t=e.getAttribute(`data-nav`);t&&(e.className=n(t))})}function a(e){let t=document.querySelector(e);if(!t)return;let n=document.createDocumentFragment();for(let e=0;e<200;e++){let e=document.createElement(`span`);e.className=`star`,e.style.left=`${Math.random()*100}%`,e.style.top=`${Math.random()*100}%`,e.style.width=`${1+Math.random()*2}px`,e.style.height=e.style.width,e.style.animationDelay=`${Math.random()*2400}ms`,e.style.animationDuration=`${1800+Math.random()*1600}ms`,n.appendChild(e)}t.appendChild(n)}export{r as n,i as r,a as t};