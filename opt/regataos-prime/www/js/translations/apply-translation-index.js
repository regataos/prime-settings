"use strict";

(function () {
  // Reuso global (evita conflitos)
  if (!window.fs) window.fs = require("fs");
  const fs = window.fs;

  // Cache do JSON
  let _cachedPath = "";
  let _cachedT = null;

  function loadTranslation() {
    const p = (typeof window.selectTranslationFile === "function")
      ? window.selectTranslationFile()
      : "";

    if (!p) return null;
    if (_cachedT && _cachedPath === p) return _cachedT;

    try {
      const raw = fs.readFileSync(p, "utf8");
      const parsed = JSON.parse(raw);

      // pode ser array [ { ... } ] ou objeto { ... }
      const t = Array.isArray(parsed) ? (parsed[0] || null) : parsed;

      _cachedPath = p;
      _cachedT = t;
      return t;
    } catch (e) {
      console.error("Translation load error:", e?.message || e);
      return null;
    }
  }

  // Helpers seguros
  function q(sel) {
    return document.querySelector(sel);
  }

  function setHTML(sel, html) {
    const el = q(sel);
    if (el && html != null) el.innerHTML = String(html);
  }

  function setTitle(sel, title) {
    const el = q(sel);
    if (el && title != null) el.title = String(title);
  }

  function applyTranslation() {
    const t = loadTranslation();
    if (!t) return;

    // Window title
    setHTML("title", t.index?.windowTitle);

    // Side bar: tooltips do botão de mostrar/esconder
    setTitle(".show-sidebar img", t.index?.sideBar?.showMenu);
    setTitle(".hide-sidebar img", t.index?.sideBar?.hideMenu);

    // Menu labels + tooltips
    setHTML(".applications p", t.index?.sideBar?.applications);
    setTitle(".applications img", t.index?.sideBar?.applications);

    setHTML(".settings p", t.index?.sideBar?.settings);
    setTitle(".settings img", t.index?.sideBar?.settings);

    setHTML(".system-info p", t.index?.sideBar?.performance);
    setTitle(".system-info img", t.index?.sideBar?.performance);

    setHTML(".system p", t.index?.sideBar?.system);
    setTitle(".system img", t.index?.sideBar?.system);
  }

  // Exporta caso você queira chamar novamente depois
  window.applyTranslation = applyTranslation;

  // Executa uma vez
  applyTranslation();
})();
