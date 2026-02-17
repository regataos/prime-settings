"use strict";

var fs = window.fs || require("fs");
window.fs = fs;

const PRIME_CONF = "/tmp/regataos-prime/config/regataos-prime.conf";
const CPU_GOV_FILE = "/etc/regataos-prime/cpu-governor.txt";

// ==============================
// Helpers
// ==============================
function readTextSafeSync(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

function $(selector) {
  return document.querySelector(selector);
}

function byId(id) {
  return document.getElementById(id);
}

function setDisplay(node, value) {
  if (node) node.style.display = value;
}

function addClass(node, className) {
  if (node) node.classList.add(className);
}

function debounce(fn, waitMs) {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), waitMs);
  };
}

// ==============================
// 1) FreeSync / options UI
// ==============================
function checkFreeSync(primeConfText) {
  if (!primeConfText) return;

  const freesyncToggle = byId("freesync-toggle");
  const tearfreeToggle = byId("tearfree-toggle");

  if (primeConfText.includes("freesync-supported=true")) {
    setDisplay(freesyncToggle, "block");
    setDisplay(tearfreeToggle, "none");
  } else {
    setDisplay(freesyncToggle, "none");
    setDisplay(tearfreeToggle, "block");
  }

  const allOptions = ["freesync", "compositor", "tearfree", "unlockwidgets", "amf"];

  // Cache de seletores
  const cache = new Map();
  const q = (sel) => {
    if (cache.has(sel)) return cache.get(sel);
    const node = $(sel);
    cache.set(sel, node);
    return node;
  };

  for (const opt of allOptions) {
    const on = primeConfText.includes(`${opt}=on`);
    const off = primeConfText.includes(`${opt}=off`);

    const onLabel = q(`.switch-on-${opt} + label`);
    const offLabel = q(`.switch-off-${opt} + label`);
    const onIcon = q(`.${opt}-on`);
    const offIcon = q(`.${opt}-off`);

    if (on) {
      setDisplay(onLabel, "block");
      setDisplay(offLabel, "none");
      setDisplay(onIcon, "block");
      setDisplay(offIcon, "none");
    } else if (off) {
      setDisplay(onLabel, "none");
      setDisplay(offLabel, "block");
      setDisplay(onIcon, "none");
      setDisplay(offIcon, "block");
    } else {
      setDisplay(onIcon, "block");
      setDisplay(offIcon, "none");
      setDisplay(onLabel, "block");
      setDisplay(offLabel, "none");
    }
  }
}

// ==============================
// 2) GPU render
// ==============================
function checkGpuRender(primeConfText) {
  const selectGpuBlock = byId("selecte-gpu");
  const hasHybrid =
    fs.existsSync("/tmp/regataos-prime/use-hybrid-graphics.txt") ||
    fs.existsSync("/usr/share/X11/xorg.conf.d/10-nvidia-primary.conf");

  if (!hasHybrid) {
    setDisplay(selectGpuBlock, "none");
    return;
  }

  setDisplay(selectGpuBlock, "block");

  const badge = $("#select-default-gpu span");
  const igpuDesc = $(".render-igpu-desc");
  const dgpuDesc = $(".render-dgpu-desc");

  if (primeConfText.includes("dgpu")) {
    addClass(badge, "dedicated");
    setDisplay(igpuDesc, "none");
    setDisplay(dgpuDesc, "block");
  } else {
    addClass(badge, "integrated");
    setDisplay(igpuDesc, "block");
    setDisplay(dgpuDesc, "none");
  }
}

// ==============================
// 3) CPU governor
// ==============================
function checkCpuGovernor() {
  const governorText = fs.existsSync(CPU_GOV_FILE) ? readTextSafeSync(CPU_GOV_FILE) : "";

  const badge = $("#select-cpu-governor span");
  const powersaveDesc = $(".cpu-powersave-desc");
  const perfDesc = $(".cpu-performance-desc");

  if (governorText.includes("performance")) {
    addClass(badge, "governor-performance");
    setDisplay(powersaveDesc, "none");
    setDisplay(perfDesc, "block");
  } else {
    addClass(badge, "governor-powersave");
    setDisplay(powersaveDesc, "block");
    setDisplay(perfDesc, "none");
  }
}

// ==============================
// Render / refresh centralizado
// ==============================
function renderFromPrimeConf() {
  const primeConfText = fs.existsSync(PRIME_CONF) ? readTextSafeSync(PRIME_CONF) : "";
  checkFreeSync(primeConfText);
  checkGpuRender(primeConfText);
}

const refreshPrime = debounce(renderFromPrimeConf, 200);
const refreshGov = debounce(checkCpuGovernor, 200);

// ==============================
// Watchers (leves)
// ==============================
function watchFileSafe(filePath, onChange) {
  try {
    // Alguns sistemas disparam "rename" quando salvam o arquivo via write+move
    const watcher = fs.watch(filePath, { persistent: false }, (eventType) => {
      if (eventType === "change" || eventType === "rename") onChange();
    });
    return watcher;
  } catch (e) {
    // Se o arquivo não existir ainda, não quebra
    return null;
  }
}

// ==============================
// Init
// ==============================
(function init() {
  renderFromPrimeConf();
  checkCpuGovernor();

  // Observa mudanças
  watchFileSafe(PRIME_CONF, refreshPrime);
  watchFileSafe(CPU_GOV_FILE, refreshGov);

  // Observa também os flags de híbrido (pode aparecer/desaparecer)
  watchFileSafe("/tmp/regataos-prime/use-hybrid-graphics.txt", refreshPrime);
  watchFileSafe("/usr/share/X11/xorg.conf.d/10-nvidia-primary.conf", refreshPrime);
})();
