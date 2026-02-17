"use strict";

(function () {
  // Reusa módulos no NW.js
  if (!window.fs) window.fs = require("fs");
  const fs = window.fs;
  const fsp = fs.promises;

  const { execFile, exec } = require("child_process");
  const PRIME_CONF = "/tmp/regataos-prime/config/regataos-prime.conf";

  // --------------------------
  // Helpers
  // --------------------------
  function $(sel) { return document.querySelector(sel); }
  function byId(id) { return document.getElementById(id); }

  function setDisplay(node, value) {
    if (node) node.style.display = value;
  }

  function readTextSafeSync(path) {
    try { return fs.readFileSync(path, "utf8"); } catch { return ""; }
  }

  function execFileAsync(file, args, options = {}) {
    return new Promise((resolve) => {
      execFile(file, args, { timeout: 30_000, ...options }, () => resolve());
    });
  }

  // ✅ Reload robusto do apps.html dentro do iframe (cache-bust)
  // Motivo: no NW.js, location.reload() dentro do iframe pode não reconstruir a UI como esperado.
  function reloadAppsIframeHard() {
    // Preferir recarregar o iframe do pai (mais confiável)
    try {
      const parentDoc = window.parent && window.parent.document;
      const iframe = parentDoc && parentDoc.getElementById && parentDoc.getElementById("main-iframe");
      if (iframe && iframe.src) {
        const url = new URL(iframe.src);
        url.searchParams.set("r", String(Date.now())); // cache-bust
        iframe.src = url.toString();
        return true;
      }
    } catch (e) {
      // sem acesso ao parent (ou URL inválida) -> segue fallback
    }

    // Fallback: recarrega a própria página (também com cache-bust)
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("r", String(Date.now()));
      window.location.replace(url.toString());
      return true;
    } catch { }

    try { window.location.reload(); return true; } catch { }
    return false;
  }

  function updateOptionUI(option, confText) {
    const onEl = $(`.${option}-on`);
    const offEl = $(`.${option}-off`);

    const isOn = confText.includes(`${option}=on`);
    const isOff = confText.includes(`${option}=off`);

    if (isOn) {
      setDisplay(onEl, "block"); setDisplay(offEl, "none");
    } else if (isOff) {
      setDisplay(onEl, "none"); setDisplay(offEl, "block");
    } else {
      setDisplay(onEl, "block"); setDisplay(offEl, "none");
    }
  }

  // --------------------------
  // Core actions (mantém nomes)
  // --------------------------
  async function runConfigOption(option) {
    await execFileAsync("/opt/regataos-prime/scripts/settings-options", [`-${option}`]);

    setTimeout(() => {
      if (!fs.existsSync(PRIME_CONF)) return;
      const conf = readTextSafeSync(PRIME_CONF);
      updateOptionUI(option, conf);
    }, 1000);
  }

  // ✅ FIX: execFile primeiro; se falhar, fallback para o comando antigo via shell (exec)
  function display() {
    setTimeout(() => {
      execFile("kcmshell6", ["kcm_kscreen"], (err) => {
        if (!err) return;
        exec("kcmshell6 kcm_kscreen", () => { });
      });
    }, 500);
  }

  function dgpuTest(graphicalApi) {
    setTimeout(() => {
      execFile("/opt/regataos-prime/scripts/test-dgpu", [`-${graphicalApi}`], () => { });
    }, 1000);
  }

  function nvidia_driver() {
    setTimeout(() => execFile("nvidia-settings", [], () => { }), 500);
  }

  async function getDesktopFile() {
    const input = byId("add-apps");
    const fileUrl = input ? input.value : "";
    if (!fileUrl) return;

    await execFileAsync("sudo", ["/opt/regataos-prime/scripts/prime-config-external-apps", fileUrl]);
    await execFileAsync("/opt/regataos-prime/scripts/prime-option-add-apps", [fileUrl]);

    if (input) input.value = "";

    setTimeout(() => {
      if (typeof window.createAppList === "function") window.createAppList();
    }, 500);
  }

  async function remove_external_app(appname, desktop) {
    if (!appname) return;

    await execFileAsync("sudo", [
      "/opt/regataos-prime/scripts/prime-option-remove-apps",
      appname,
      String(desktop || "")
    ]);

    const row = byId(appname);
    if (row) row.remove();

    setTimeout(() => {
      if (typeof window.createAppList === "function") window.createAppList();
    }, 500);
  }

  async function chooseDefaultGpu(value) {
    await execFileAsync("sudo", ["/opt/regataos-prime/scripts/gpu-render", `-${value}`]);

    if (String(value).includes("igpu")) {
      setDisplay($(".render-igpu-desc"), "block");
      setDisplay($(".render-dgpu-desc"), "none");
    } else {
      setDisplay($(".render-igpu-desc"), "none");
      setDisplay($(".render-dgpu-desc"), "block");
    }

    setTimeout(() => {
      execFile("/opt/regataos-prime/scripts/notifications/notify", ["-restart"], () => { });
    }, 1000);
  }

  async function chooseCpuGovernor(value) {
    await execFileAsync("sudo", ["/opt/regataos-prime/scripts/cpu-configs", `-cpu-${value}`]);

    if (String(value).includes("powersave")) {
      setDisplay($(".cpu-powersave-desc"), "block");
      setDisplay($(".cpu-performance-desc"), "none");
    } else {
      setDisplay($(".cpu-powersave-desc"), "none");
      setDisplay($(".cpu-performance-desc"), "block");
    }

    setTimeout(() => {
      execFile("/opt/regataos-prime/scripts/notifications/notify", [`-cpu-${value}`], () => { });
    }, 1000);
  }

  // --------------------------
  // Menus & popup
  // --------------------------
  function close_popup() {
    setDisplay(byId("pop-up"), "none");
  }

  function open_popup() {
    setTimeout(() => setDisplay(byId("pop-up"), "block"), 500);
  }

  function hideAllMenus() {
    document.querySelectorAll(".context-menu").forEach((m) => setDisplay(m, "none"));
  }

  function toggleMenu(menuId) {
    const m = byId(menuId);
    if (!m) return;
    const isOpen = m.style.display === "block";
    hideAllMenus();
    setDisplay(m, isOpen ? "none" : "block");
  }

  // --------------------------
  // Apps page: All Apps switch  ✅ FIX DEFINITIVO
  // --------------------------
  const INSTALLED_APPS_PATH = "/opt/regataos-store/installed-apps/installed-apps.txt";
  const JSON_DIRS = ["/opt/regataos-store/apps-list", "/tmp/regataos-prime/config/external-app"];

  // Lê "one-apps=" do arquivo de conf (on/off)
  function readAllAppsStateFromConf() {
    const conf = readTextSafeSync(PRIME_CONF);
    if (!conf) return false;

    // Captura one-apps=on|off
    const m = conf.match(/(?:^|\n)\s*one-apps\s*=\s*(on|off)\s*(?:\n|$)/i);
    if (!m) return false;

    return String(m[1]).toLowerCase() === "on";
  }

  function syncAllAppsText(isOn) {
    const enableEl = $(".enable-all");
    const disableEl = $(".disable-all");

    // fallback de texto (caso tradução falhe)
    if (enableEl && !enableEl.textContent.trim()) enableEl.textContent = "Ativar para todos os aplicativos";
    if (disableEl && !disableEl.textContent.trim()) disableEl.textContent = "Desativar para todos os aplicativos";

    if (enableEl) enableEl.style.display = isOn ? "none" : "block";
    if (disableEl) disableEl.style.display = isOn ? "block" : "none";
  }

  function toInstalledSet(text) {
    return new Set(
      String(text || "")
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }

  function normalizeExecutable(exe) {
    return String(exe || "").replace(/snap\|run\|?/g, "").trim();
  }

  async function readTextSafe(path) {
    try { return await fsp.readFile(path, "utf8"); } catch { return ""; }
  }

  async function listJsonFiles() {
    const out = [];
    for (const dir of JSON_DIRS) {
      try {
        const files = await fsp.readdir(dir);
        for (const f of files) out.push(`${dir}/${f}`);
      } catch (e) {
        console.error(`AllApps: erro lendo dir ${dir}:`, e?.message || e);
      }
    }
    return out;
  }

  async function runWithConcurrency(tasks, limit = 4) {
    let i = 0;
    const workers = new Array(limit).fill(0).map(async () => {
      while (i < tasks.length) {
        const idx = i++;
        try { await tasks[idx](); }
        catch (e) { console.error("AllApps task error:", e?.message || e); }
      }
    });
    await Promise.all(workers);
  }

  async function applyAllApps(runAction) {
    const installedTxt = await readTextSafe(INSTALLED_APPS_PATH);
    const installedSet = toInstalledSet(installedTxt);
    const jsonFiles = await listJsonFiles();

    const tasks = [];
    for (const filePath of jsonFiles) {
      const raw = await readTextSafe(filePath);
      if (!raw) continue;

      let arr;
      try { arr = JSON.parse(raw); }
      catch (e) { console.error("AllApps: JSON inválido:", filePath, e?.message || e); continue; }

      const isExternal = filePath.includes("external-app");

      for (const app of arr) {
        if (isExternal) {
          const nickname = app.app_nickname;
          const desktop = app.desktop_app_file;
          if (!nickname || !desktop) continue;
          tasks.push(async () => {
            await execFileAsync("sudo", [
              "/opt/regataos-prime/scripts/run-external-app-dgpu",
              String(nickname),
              String(desktop),
            ]);
          });
        } else {
          const dgpu = String(app.dgpu || "");
          const nickname = app.nickname;
          if (!nickname) continue;
          if (!installedSet.has(nickname)) continue;
          if (!dgpu.includes("activate") && !dgpu.includes("deactivate")) continue;

          const pkg = app.package || "";
          const pkgManager = app.package_manager || "";
          const exe = normalizeExecutable(app.executable || "");

          tasks.push(async () => {
            await execFileAsync("sudo", [
              "/opt/regataos-prime/scripts/run-app-dgpu",
              String(nickname),
              String(pkg),
              String(pkgManager),
              String(exe),
            ]);
          });
        }
      }
    }

    await runWithConcurrency(tasks, 4);
  }

  async function runAllAppsToggleFallback(targetOn) {
    const runAction = targetOn ? "-enable-run-dgpu" : "-disable-run-dgpu";

    // 1) Faz só o PRIME on/off (rápido)
    await execFileAsync("/opt/regataos-prime/scripts/prime-options", [runAction]);

    // 2) Dispara o lote pesado em "background" (não espera terminar)
    //    Importante: usamos applyAllApps, mas SEM await.
    //    Assim o reload não fica preso.
    applyAllApps(runAction).catch((e) => {
      console.error("applyAllApps background error:", e?.message || e);
    });

    // 3) Notifica e recarrega rápido
    setTimeout(() => {
      execFile("/opt/regataos-prime/scripts/notifications/notify", [runAction], () => { });
      setTimeout(() => {
        reloadAppsIframeHard(); // ✅ reload real no iframe
      }, 300);
    }, 800);
  }

  function bindAllAppsSwitchIfPresent() {
    const allApps = byId("switch-shadow-all-apps");
    if (!allApps) return;

    // Estado inicial REAL (lendo conf)
    const initialOn = readAllAppsStateFromConf();
    allApps.checked = !!initialOn;       // ✅ visual correto
    syncAllAppsText(!!initialOn);

    // ✅ change funciona ao clicar no label
    allApps.addEventListener("change", async () => {
      const targetOn = !!allApps.checked;

      // UI imediata
      syncAllAppsText(targetOn);

      // Executa ação real
      if (typeof window.actionAllApps === "function") {
        try {
          window.actionAllApps(allApps.id);
        } catch (e) {
          console.error("actionAllApps error:", e);
          await runAllAppsToggleFallback(targetOn);
        }
      } else {
        await runAllAppsToggleFallback(targetOn);
      }
    });
  }

  // Apps page: input .desktop
  function bindDesktopInputIfPresent() {
    const input = byId("add-apps");
    if (!input) return;
    input.addEventListener("change", () => getDesktopFile());
  }

  // --------------------------
  // Global event delegation
  // --------------------------
  document.addEventListener("click", (ev) => {
    const t = ev.target;

    // Clique fora fecha menus (substitui body onclick)
    if (!t.closest(".context-menu") && !t.closest("[data-action='toggle-menu']")) {
      hideAllMenus();
    }

    const actionEl = t.closest("[data-action]");
    if (!actionEl) return;

    const action = actionEl.getAttribute("data-action");

    if (action === "open-display") return display();
    if (action === "open-nvidia-settings") return nvidia_driver();
    if (action === "open-tests-popup") return open_popup();
    if (action === "close-tests-popup") return close_popup();

    if (action === "dgpu-test") {
      const api = actionEl.getAttribute("data-api") || "gl";
      return dgpuTest(api);
    }

    if (action === "toggle-config") {
      const opt = actionEl.getAttribute("data-option");
      if (opt) return runConfigOption(opt);
      return;
    }

    if (action === "toggle-menu") {
      const menu = actionEl.getAttribute("data-menu");
      if (menu) return toggleMenu(menu);
      return;
    }

    if (action === "select-gpu") {
      const value = actionEl.getAttribute("data-value");
      hideAllMenus();
      if (value) return chooseDefaultGpu(value);
      return;
    }

    if (action === "select-cpu") {
      const value = actionEl.getAttribute("data-value");
      hideAllMenus();
      if (value) return chooseCpuGovernor(value);
      return;
    }
  });

  // --------------------------
  // Init
  // --------------------------
  setTimeout(() => {
    const load = byId("loadscreen");
    if (load) load.style.display = "none";
  }, 1000);

  // ✅ roda depois do DOM pronto (evita bind antes do iframe montar)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindAllAppsSwitchIfPresent();
      bindDesktopInputIfPresent();
    });
  } else {
    bindAllAppsSwitchIfPresent();
    bindDesktopInputIfPresent();
  }

  // Expor apenas o necessário (compatibilidade com outros scripts)
  window.runConfigOption = runConfigOption;
  window.remove_external_app = remove_external_app;
  window.getDesktopFile = getDesktopFile;
})();
