"use strict";

(function () {
  // Reuso global (evita conflitos)
  if (!window.fs) window.fs = require("fs");
  const fs = window.fs;

  // Cache do JSON para não ler/parsing toda hora
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

      // Alguns arquivos vêm como array [ { ... } ], outros como objeto { ... }
      const t = Array.isArray(parsed) ? (parsed[0] || null) : parsed;

      _cachedPath = p;
      _cachedT = t;
      return t;
    } catch (e) {
      console.error("Translation load error:", e?.message || e);
      return null;
    }
  }

  // Helpers seguros (não quebram se o elemento não existir)
  function q(sel) {
    return document.querySelector(sel);
  }

  function setHTML(sel, html) {
    const el = q(sel);
    if (el && html != null) el.innerHTML = String(html);
  }

  function setTitle(selOrEl, title) {
    const el = (typeof selOrEl === "string") ? q(selOrEl) : selOrEl;
    if (el && title != null) el.title = String(title);
  }

  function setHTMLAll(sel, html) {
    const nodes = document.querySelectorAll(sel);
    if (!nodes || nodes.length === 0) return;
    for (let i = 0; i < nodes.length; i++) {
      if (html != null) nodes[i].innerHTML = String(html);
    }
  }

  function getPage() {
    const href = String(window.location.href || "");
    if (href.includes("apps.html")) return "apps";
    if (href.includes("performance.html")) return "performance";
    if (href.includes("settings.html")) return "settings";
    if (href.includes("system.html")) return "system";
    return "unknown";
  }

  function applyTranslationPages() {
    const t = loadTranslation();
    if (!t) return;

    const page = getPage();

    if (page === "apps") {
      setHTML(".page-apps-title", t.appsPage?.title);
      setHTML(".page-apps-description", t.appsPage?.description);

      setHTML(".enable-all", t.appsPage?.buttonAllApps?.enableApps);
      setHTML(".disable-all", t.appsPage?.buttonAllApps?.disableApps);

      // status textos
      setHTMLAll(".performance", t.index?.status?.performance);
      setHTMLAll(".powersaving", t.index?.status?.powersaving);

      // add app
      setHTML(".label-add .text-app", t.appsPage?.addApp?.title);
      setHTML(".label-add .desc-option-blocks", t.appsPage?.addApp?.description);
      setTitle(".label-add", t.appsPage?.addApp?.tip);

      // tooltips do botão remover (external apps)
      const removeButtons = document.querySelectorAll(".remove-app-buttom");
      for (let i = 0; i < removeButtons.length; i++) {
        setTitle(removeButtons[i], t.appsPage?.removeApp);
      }
      return;
    }

    if (page === "performance") {
      setHTML(".page-performance-title", t.performancePage?.title);
      setHTML(".page-performance-description", t.performancePage?.description);

      setHTML(".ram-desc", t.performancePage?.blocksTitle?.ram);
      setHTML(".cpu-desc", t.performancePage?.blocksTitle?.cpu);
      setHTML(".vram-desc", t.performancePage?.blocksTitle?.vram);
      setHTML(".gpu-desc", t.performancePage?.blocksTitle?.gpu);

      setHTML(".mem-sz-text", t.performancePage?.blocksDesc?.memorySize);
      setHTML(".mem-tt-text", t.performancePage?.blocksDesc?.totalMemory);
      setHTML(".in-use-text", t.performancePage?.blocksDesc?.inUse);

      setHTMLAll(".freq-text", t.performancePage?.blocksDesc?.frequency);
      setHTMLAll(".temp-text", t.performancePage?.blocksDesc?.temperature);
      return;
    }

    if (page === "settings") {
      setHTML(".page-settings-title", t.settingsPage?.title);
      setHTML(".page-settings-description", t.settingsPage?.description);

      // botão fechar do popup
      const closeButton = document.getElementById("button-close");
      setTitle(closeButton, t.index?.buttonTop?.close);

      // select GPU
      setHTML(".select-gpu-text", t.settingsPage?.selectGpu?.title);
      setHTMLAll(".integrated", t.settingsPage?.selectGpu?.integrated);
      setHTMLAll(".dedicated", t.settingsPage?.selectGpu?.dedicated);

      setHTML(".render-igpu-desc", t.settingsPage?.selectGpu?.energySaving);
      setHTML(".render-dgpu-desc", t.settingsPage?.selectGpu?.performance);

      // botões
      setHTML(".display-settings", t.settingsPage?.displaySettings?.title);
      setHTML(".display-settings-info", t.settingsPage?.displaySettings?.description);
      setHTML(".nvidia-settings", t.settingsPage?.nvidiaSettings?.title);
      setHTML(".nvidia-settings-info", t.settingsPage?.nvidiaSettings?.description);
      setHTML(".run-tests", t.settingsPage?.runTests?.title);
      setHTML(".run-tests-info", t.settingsPage?.runTests?.description);

      // popup
      setHTML(".popup-title-settings", t.settingsPage?.popUpTests?.title);
      setHTML(".popup-desc-settings", t.settingsPage?.popUpTests?.description);
      setHTML(".button-gl", t.settingsPage?.popUpTests?.buttonOpengl);
      setHTML(".button-vk", t.settingsPage?.popUpTests?.buttonVulkan);

      // FreeSync / TearFree
      setHTML(".freesync", t.settingsPage?.freesync?.title);
      setHTML(".freesync-on", t.settingsPage?.freesync?.on);
      setHTML(".freesync-off", t.settingsPage?.freesync?.off);

      setHTML(".pst-text", t.settingsPage?.tearing?.title);
      setHTML(".tearfree-on", t.settingsPage?.tearing?.on);
      setHTML(".tearfree-off", t.settingsPage?.tearing?.off);

      // CPU governor
      setHTML(".cpu-governor-text", t.settingsPage?.cpuPower?.title);
      setHTML(".cpu-powersave-desc", t.index?.status?.powersaving);
      setHTML(".cpu-performance-desc", t.index?.status?.performance);

      setHTMLAll(".governor-powersave", t.settingsPage?.cpuPower?.balanced);
      setHTMLAll(".governor-performance", t.settingsPage?.cpuPower?.performance);

      // compositor / widgets / amf
      setHTML(".compositor-text", t.settingsPage?.compositor?.title);
      setHTML(".compositor-on", t.settingsPage?.compositor?.on);
      setHTML(".compositor-off", t.settingsPage?.compositor?.off);

      setHTML(".unlockwidgets-text", t.settingsPage?.unlockWidgets?.title);
      setHTML(".unlockwidgets-on", t.settingsPage?.unlockWidgets?.on);
      setHTML(".unlockwidgets-off", t.settingsPage?.unlockWidgets?.off);

      setHTML(".amf-text", t.settingsPage?.amdAmf?.title);
      setHTML(".amf-on", t.settingsPage?.amdAmf?.on);
      setHTML(".amf-off", t.settingsPage?.amdAmf?.off);

      return;
    }

    if (page === "system") {
      setHTML(".page-system-title", t.systemPage?.title);
      setHTML(".page-system-description", t.systemPage?.description);

      // Copy info button
      const copyTxt = document.getElementById("copy-all-txt");
      if (copyTxt && t.systemPage?.copyButton?.title != null) copyTxt.innerHTML = String(t.systemPage.copyButton.title);

      const copyBtn = document.getElementById("copy-all");
      setTitle(copyBtn, t.systemPage?.copyButton?.description);

      setHTML(".nvidia-driver", t.systemPage?.systemInfo?.nvidia);
      setHTML(".dgpu-name", t.systemPage?.systemInfo?.dgpu);
      setHTML(".vram", t.systemPage?.systemInfo?.vram);
      setHTML(".os-name", t.systemPage?.systemInfo?.osName);
      setHTML(".ram", t.systemPage?.systemInfo?.ram);
      setHTML(".cpu", t.systemPage?.systemInfo?.cpu);
      setHTML(".igpu-name", t.systemPage?.systemInfo?.igpu);
      setHTML(".mesa-driver", t.systemPage?.systemInfo?.mesa);
      setHTML(".opengl-version", t.systemPage?.systemInfo?.opengl);
      setHTML(".vulkan-version", t.systemPage?.systemInfo?.vulkan);
      setHTML(".kernel-version", t.systemPage?.systemInfo?.linux);

      setHTML(".more-info", t.systemPage?.moreInfo?.title);
      setHTML(".more-info-desc", t.systemPage?.moreInfo?.description);
      return;
    }
  }

  // Special function for apps page: traduz textos gerados dinamicamente
  function translation_app_status() {
    const t = loadTranslation();
    if (!t) return;

    setHTMLAll(".performance", t.index?.status?.performance);
    setHTMLAll(".powersaving", t.index?.status?.powersaving);

    // também aplica tooltip em novos botões de remover (caso tenham sido criados)
    const removeButtons = document.querySelectorAll(".remove-app-buttom");
    for (let i = 0; i < removeButtons.length; i++) {
      setTitle(removeButtons[i], t.appsPage?.removeApp);
    }
  }

  // Exporta para os outros scripts (list-apps.js chama translation_app_status)
  window.applyTranslationPages = applyTranslationPages;
  window.translation_app_status = translation_app_status;

  // Rodar uma vez quando carregar
  applyTranslationPages();
})();
