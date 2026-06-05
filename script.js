/* WallGamers — renders content from data.js and handles tab switching. */

(function () {
  "use strict";

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const initials = (name) =>
    name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const hostOf = (url) => {
    try { return new URL(url).host; } catch { return url; }
  };

  /* ---------- Renderers ---------- */
  function renderLinks(items) {
    const grid = document.getElementById("links-grid");
    if (!items.length) {
      grid.innerHTML = `<div class="empty">No games yet — check back soon.</div>`;
      return;
    }
    grid.innerHTML = items.map((it) => {
      const accent = esc(it.accent || "#7c5cff");
      const features = (it.features || [])
        .map((f) => `<li>${esc(f)}</li>`).join("");
      return `
        <article class="card" style="--card-accent:${accent}">
          <div class="card-top">
            <div class="card-emblem">${esc(initials(it.name))}</div>
            ${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ""}
          </div>
          <h3>${esc(it.name)}</h3>
          <p class="card-host">${esc(hostOf(it.url))}</p>
          <p class="card-desc">${esc(it.description)}</p>
          ${features ? `<ul class="feature-list">${features}</ul>` : ""}
          <div class="card-foot">
            <a class="play-btn" href="${esc(it.url)}" target="_blank" rel="noopener noreferrer">
              Play now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </article>`;
    }).join("");
  }

  function renderSnapshots(items) {
    const grid = document.getElementById("snapshots-grid");
    if (!items.length) {
      grid.innerHTML = `<div class="empty">No snapshots yet — check back soon.</div>`;
      return;
    }
    grid.innerHTML = items.map((it) => {
      const accent = esc(it.accent || "#7c5cff");
      const features = (it.features || [])
        .map((f) => `<li>${esc(f)}</li>`).join("");
      return `
        <article class="card" style="--card-accent:${accent}">
          <div class="card-top">
            <div class="card-emblem">${esc(initials(it.name))}</div>
            ${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ""}
          </div>
          <h3>${esc(it.name)}</h3>
          <p class="card-desc">${esc(it.description)}</p>
          ${features ? `<ul class="feature-list">${features}</ul>` : ""}
          <div class="card-foot">
            <span class="status-pill"><span class="pulse"></span>${esc(it.status || "Snapshot")}</span>
          </div>
        </article>`;
    }).join("");
  }

  function renderStats() {
    const stats = [
      { num: LINKS.length, label: LINKS.length === 1 ? "Game" : "Games" },
      { num: SNAPSHOTS.length, label: "Snapshots" },
      { num: "∞", label: "To come" },
    ];
    document.getElementById("hero-stats").innerHTML = stats.map((s) =>
      `<div class="stat"><span class="stat-num">${esc(s.num)}</span><span class="stat-label">${esc(s.label)}</span></div>`
    ).join("");
  }

  /* ---------- Tabs ---------- */
  function setupTabs() {
    const tabs = document.querySelectorAll(".tab");
    const views = {
      links: document.getElementById("view-links"),
      snapshots: document.getElementById("view-snapshots"),
    };

    function activate(view) {
      tabs.forEach((t) => {
        const on = t.dataset.view === view;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      Object.entries(views).forEach(([key, el]) => {
        const on = key === view;
        el.classList.toggle("is-active", on);
        el.hidden = !on;
      });
      history.replaceState(null, "", "#" + view);
    }

    tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.view)));

    const fromHash = location.hash.replace("#", "");
    if (views[fromHash]) activate(fromHash);
  }

  /* ---------- Init ---------- */
  renderLinks(LINKS);
  renderSnapshots(SNAPSHOTS);
  renderStats();
  setupTabs();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
