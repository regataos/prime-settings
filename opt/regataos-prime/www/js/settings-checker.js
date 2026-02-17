"use strict";

(function () {
  // Evita conflito de escopo global (NW.js)
  if (!window.fs) window.fs = require("fs");
  const fs = window.fs;

  const translationDir = "/opt/regataos-prime/www/js/translations/languages";
  const fallback = `${translationDir}/en-us.json`;

  function normalizeLang(raw) {
    // Ex.: "pt_BR.UTF-8" -> "pt-br"
    // Ex.: '"pt_BR"' -> "pt-br"
    // Ex.: "pt_BR:en_US" -> "pt-br" (pega o primeiro)
    let s = String(raw || "").trim();

    // remove aspas
    s = s.replace(/^["']|["']$/g, "");

    // se tiver lista tipo pt_BR:en_US, pega o primeiro
    s = s.split(":")[0].trim();

    // remove sufixos de encoding
    s = s.replace(/\.utf-?8$/i, "");

    // normaliza separador
    s = s.replace(/_/g, "-").toLowerCase();

    // remove espaços
    s = s.replace(/\s+/g, "");

    return s;
  }

  function getConfigValue(text, key) {
    // pega o valor de uma linha tipo KEY=value
    const re = new RegExp(`^\\s*${key}\\s*([^\\r\\n#]*)`, "m");
    const m = String(text || "").match(re);
    return m ? String(m[1]).trim() : "";
  }

  function fileIfExists(path) {
    try {
      return fs.existsSync(path) ? path : null;
    } catch {
      return null;
    }
  }

  // Choose the JSON file with the language translation.
  function selectTranslationFile() {
    // 1) plasma-localerc (prioridade)
    const plasmaPath = "/tmp/regataos-configs/config/plasma-localerc";
    if (fs.existsSync(plasmaPath)) {
      const content = fs.readFileSync(plasmaPath, "utf8");

      const raw =
        getConfigValue(content, "LANGUAGE=") ||
        getConfigValue(content, "LANG=");

      const lang = normalizeLang(raw);
      if (lang) {
        const candidate = `${translationDir}/${lang}.json`;
        return fileIfExists(candidate) || fallback;
      }

      return fallback;
    }

    // 2) user-dirs.locale
    const userDirsPath = "/tmp/regataos-configs/config/user-dirs.locale";
    if (fs.existsSync(userDirsPath)) {
      const content = fs.readFileSync(userDirsPath, "utf8");
      const lang = normalizeLang(content);

      if (lang) {
        const candidate = `${translationDir}/${lang}.json`;
        return fileIfExists(candidate) || fallback;
      }

      return fallback;
    }

    // 3) fallback final garantido
    return fallback;
  }

  // expõe se você usa em outro arquivo
  window.selectTranslationFile = selectTranslationFile;
})();
