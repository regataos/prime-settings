"use strict";

(function () {
  if (window.__listAppsLoaded) return;
  window.__listAppsLoaded = true;

  if (!window.fs) window.fs = require("fs");
  if (!window.fsp) window.fsp = window.fs.promises;

  const fs = window.fs;
  const fsp = window.fsp;

  const iconAddress = "/opt/regataos-prime/www/images/apps-icons";
  const installedAppsPath = "/opt/regataos-store/installed-apps/installed-apps.txt";
  const jsonFileDirectories = [
    "/opt/regataos-store/apps-list",
    "/tmp/regataos-prime/config/external-app",
  ];

  const runWithoutDgpuPath = "/tmp/regataos-prime/config/run-without-dgpu.conf";
  const runWithDgpuPath = "/tmp/regataos-prime/config/run-with-dgpu.conf";

  function $(sel) { return document.querySelector(sel); }

  function safeClass(node, cls, on) {
    if (!node) return;
    node.classList.toggle(cls, !!on);
  }

  async function readTextSafe(p) {
    try { return await fsp.readFile(p, "utf8"); } catch { return ""; }
  }

  function toInstalledSet(text) {
    return new Set(
      String(text || "")
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }

  function toCommandString(v) {
    if (Array.isArray(v)) return v.map(String).join("|");
    return String(v || "");
  }

  function normalizeExecutable(executable) {
    const s = toCommandString(executable).trim();
    return s.replace(/^snap\|run\|?/, "").trim();
  }

  function getDomRefs(nickname) {
    return {
      statusOn: document.querySelector(`#${nickname}-on`),
      statusOff: document.querySelector(`#${nickname}-off`),
      labelOn: document.querySelector(`#switch-on-${nickname}`),
      labelOff: document.querySelector(`#switch-off-${nickname}`),
      cbOn: document.querySelector(`#switch-shadow-${nickname}`),
      cbOff: document.querySelector(`#switch-shadow2-${nickname}`),
    };
  }

  // ---- conf parsing (1 item por linha)
  function parseConfSet(txt) {
    const set = new Set();
    String(txt || "")
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean)
      .forEach(line => {
        const base = line.replace(/=on$/i, "").trim();
        if (base) set.add(base);
      });
    return set;
  }

  function hasAnyKey(set, keys) {
    for (const k of keys || []) {
      const kk = String(k || "").trim();
      if (!kk) continue;
      if (set.has(kk)) return true;
    }
    return false;
  }

  // ✅ aplica estado ao DOM.
  // IMPORTANTE: neste tema, o visual do switch é "invertido" via :checked.
  // O design original mostra o estado principalmente alternando QUAL label aparece
  // (switch-on-* vs switch-off-*), mantendo os inputs desmarcados.
  // Se marcarmos o checkbox para refletir o estado, o label pode parecer "desativado".
  function applyUiState(nickname, shouldOn) {
    const { statusOn, statusOff, labelOn, labelOff, cbOn, cbOff } = getDomRefs(nickname);

    safeClass(statusOn, "show-element", !!shouldOn);
    safeClass(labelOn, "show-element", !!shouldOn);
    safeClass(statusOff, "show-element", !shouldOn);
    safeClass(labelOff, "show-element", !shouldOn);

    // Mantém os dois inputs desmarcados para manter o CSS padrão (ON azul / OFF cinza)
    if (cbOn) cbOn.checked = false;
    if (cbOff) cbOff.checked = false;
  }

  function computeShouldOnFromConf(item, runWithoutTxt, runWithTxt) {
    const { nickname, dgpu, filePath, keys } = item;

    const runWithSet = parseConfSet(runWithTxt);
    const runWithoutSet = parseConfSet(runWithoutTxt);

    const externalDefaultOn =
      filePath.includes("external-app") && !runWithoutTxt.includes(`${nickname}`);

    const explicitOn =
      hasAnyKey(runWithSet, keys) ||
      keys.some((k) => runWithoutTxt.includes(`${k}=on`)) ||
      externalDefaultOn;

    const explicitOff = hasAnyKey(runWithoutSet, keys);

    const defaultOff =
      !explicitOn && !explicitOff &&
      dgpu && dgpu.includes("deactivate");

    const shouldOff = explicitOff || defaultOff;
    return !shouldOff;
  }

  async function getIconForNickname(nickname) {
    const p = `${iconAddress}/${nickname}-icon.txt`;
    const txt = await readTextSafe(p);
    return txt.trim();
  }

  function buildAppLi({ filePath, dgpu, name, nickname, icon, pkg, pkgManager, executable }) {
    const isExternal = filePath.includes("external-app");

    const li = document.createElement("li");
    li.id = nickname;

    li.dataset.script = isExternal ? "run-external-app-dgpu" : "run-app-dgpu";
    li.dataset.nickname = nickname;
    li.dataset.package = toCommandString(pkg);
    li.dataset.packagemanager = pkgManager || "";
    li.dataset.dgpu = dgpu || "";
    li.dataset.executable = isExternal ? "" : normalizeExecutable(executable);
    li.dataset.desktopfile = isExternal ? String(executable || "") : "";

    const closeButton = isExternal
      ? `<div title="" class="remove-app-buttom" data-remove="1" data-nickname="${nickname}" data-desktop="${String(executable || "")}"></div>`
      : "";

    li.innerHTML = `
      <div class="icon-app" style="background-image:url('${icon || ""}');"></div>
      ${closeButton}
      <div class="text-app app-name">${name || nickname}</div>

      <div class="switch__container">
        <input id="switch-shadow-${nickname}" class="switch switch--shadow-app" type="checkbox" data-action="1" data-side="on">
        <label id="switch-on-${nickname}" for="switch-shadow-${nickname}"></label>

        <input id="switch-shadow2-${nickname}" class="switch switch--shadow2-app" type="checkbox" data-action="1" data-side="off">
        <label id="switch-off-${nickname}" for="switch-shadow2-${nickname}"></label>
      </div>

      <span id="${nickname}-on" class="performance"></span>
      <span id="${nickname}-off" class="powersaving"></span>
    `;

    return li;
  }

  function bindAppListEvents(listEl, createdAppsRef) {
    // remover external
    listEl.addEventListener("click", (ev) => {
      const removeBtn = ev.target.closest("[data-remove='1']");
      if (!removeBtn) return;

      const nickname = removeBtn.getAttribute("data-nickname") || "";
      const desktop = removeBtn.getAttribute("data-desktop") || "";
      window.remove_external_app?.(nickname, desktop);
    });

    // ✅ change: clicar no label funciona
    listEl.addEventListener("change", async (ev) => {
      const input = ev.target;
      if (!input || input.tagName !== "INPUT") return;
      if (!input.matches("input[data-action='1']")) return;

      const li = input.closest("li");
      if (!li) return;

      const nickname = li.dataset.nickname || "";
      const side = input.getAttribute("data-side"); // "on" ou "off"

      // ✅ 1) Alterna UI imediatamente (sem esperar script)
      applyUiState(nickname, side === "on");

      // ✅ 2) Executa ação real
      await Promise.resolve(
        window.actionApps?.(
          li.dataset.script || "",
          nickname,
          li.dataset.package || "",
          li.dataset.packagemanager || "",
          li.dataset.dgpu || "",
          li.dataset.executable || "",
          li.dataset.desktopfile || ""
        )
      );

      // ✅ 3) Revalida pelo conf (garante persistência/consistência)
      const [runWithout, runWith] = await Promise.all([
        readTextSafe(runWithoutDgpuPath),
        readTextSafe(runWithDgpuPath),
      ]);

      const item = createdAppsRef.find((a) => a.nickname === nickname);
      if (!item) return;

      const shouldOn = computeShouldOnFromConf(item, runWithout, runWith);
      applyUiState(nickname, shouldOn);
    });
  }

  async function createAppList() {
    const listEl = $("ul.apps-buttons");
    if (!listEl) {
      console.error("list-apps.js: não encontrei ul.apps-buttons");
      return;
    }

    const [installedText, runWithout, runWith] = await Promise.all([
      readTextSafe(installedAppsPath),
      readTextSafe(runWithoutDgpuPath),
      readTextSafe(runWithDgpuPath),
    ]);

    const installedSet = toInstalledSet(installedText);

    const jsonFiles = [];
    for (const dir of jsonFileDirectories) {
      try {
        const entries = await fsp.readdir(dir);
        for (const file of entries) jsonFiles.push({ filePath: `${dir}/${file}` });
      } catch (e) {
        console.error(`Error reading directory ${dir}:`, e?.message || e);
      }
    }

    const createdApps = [];

    // garante listener 1 vez
    if (!listEl.__boundEvents) {
      bindAppListEvents(listEl, createdApps);
      listEl.__boundEvents = true;
    }

    for (const jf of jsonFiles) {
      const filePath = jf.filePath;
      const raw = await readTextSafe(filePath);
      if (!raw) continue;

      let appData;
      try { appData = JSON.parse(raw); }
      catch (e) { console.error("Invalid JSON:", filePath, e?.message || e); continue; }

      const isExternal = filePath.includes("external-app");

      for (const app of appData) {
        if (isExternal) {
          const name = app.app_name;
          const nickname = app.app_nickname;
          const icon = app.app_icon;
          const executable = app.desktop_app_file;

          if (!nickname) continue;
          if (listEl.querySelector(`#${nickname}`)) continue;

          const li = buildAppLi({ filePath, dgpu: "", name, nickname, icon, pkg: "", pkgManager: "", executable });
          listEl.appendChild(li);

          createdApps.push({
            nickname,
            dgpu: "",
            filePath,
            keys: [nickname, executable].filter(Boolean),
          });

        } else {
          const dgpu = app.dgpu || "";
          const name = app.name;
          const nickname = app.nickname;
          const pkg = app.package;
          const pkgManager = app.package_manager || "";
          const executable = app.executable;

          if (!nickname) continue;

          // ✅ MOSTRA activate OU deactivate (como seu original)
          const shouldShow =
            (dgpu.includes("activate") || dgpu.includes("deactivate")) &&
            installedSet.has(nickname);

          if (!shouldShow) continue;
          if (listEl.querySelector(`#${nickname}`)) continue;

          const icon = await getIconForNickname(nickname);

          const li = buildAppLi({ filePath, dgpu, name, nickname, icon, pkg, pkgManager, executable });
          listEl.appendChild(li);

          const pkgKey = toCommandString(pkg).trim();
          const exeKey = normalizeExecutable(executable).trim();

          createdApps.push({
            nickname,
            dgpu,
            filePath,
            keys: [nickname, pkgKey, exeKey].filter(Boolean),
          });
        }
      }
    }

    if (typeof window.translation_app_status === "function") {
      window.translation_app_status();
    }

    // aplica status inicial a partir dos confs
    for (const item of createdApps) {
      const shouldOn = computeShouldOnFromConf(item, runWithout, runWith);
      applyUiState(item.nickname, shouldOn);
    }
  }

  window.createAppList = createAppList;

  createAppList().catch((e) => console.error("createAppList error:", e?.message || e));
})();
