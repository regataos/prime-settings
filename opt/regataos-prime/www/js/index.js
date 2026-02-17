"use strict";

// ==============================
// NW.js window show when ready
// ==============================
const gui = require("nw.gui");
window.onload = function () {
  gui.Window.get().show();
};

const win = nw.Window.get();
win.moveTo(0, 0);
win.setPosition("center");

// ==============================
// Shared modules (avoid redeclare)
// ==============================
var fs = window.fs || require("fs");
window.fs = fs;

const { execFile } = require("child_process");

// ==============================
// Cache DOM
// ==============================
const el = {
  loadscreen: document.getElementById("loadscreen"),
  iframe: document.getElementById("main-iframe"),

  sidebar: document.querySelector(".sidebar"),
  hideSidebarBtn: document.querySelector(".hide-sidebar"),
  showSidebarBtn: document.querySelector(".show-sidebar"),
  btnHideSidebar: document.getElementById("btn-hide-sidebar"),
  btnShowSidebar: document.getElementById("btn-show-sidebar"),

  divIframe: document.querySelector(".div-iframe"),
  iframeContainer: document.querySelector(".iframe"),

  pageApplications: document.querySelector(".applications"),

  appEffect: document.querySelector(".applications .sidebar-item-effect"),
  settingsEffect: document.querySelector(".settings .sidebar-item-effect"),
  systemInfoEffect: document.querySelector(".system-info .sidebar-item-effect"),
  systemEffect: document.querySelector(".system .sidebar-item-effect"),
};

// ==============================
// UI quick tweaks
// ==============================

// Hide loadscreen after a short delay
setTimeout(() => {
  if (el.loadscreen) el.loadscreen.style.display = "none";
}, 1000);

// Prevent dragging and dropping of icons
document.querySelectorAll(".icones-menu").forEach((node) => {
  node.draggable = false;
});

// ==============================
// Helpers
// ==============================

function setActiveMenu(iframeUrl) {
  const url = String(iframeUrl || "");

  if (el.appEffect) el.appEffect.style.backgroundColor = url.includes("apps.html") ? "#3daee9" : "";
  if (el.settingsEffect) el.settingsEffect.style.backgroundColor = url.includes("settings.html") ? "#3daee9" : "";
  if (el.systemInfoEffect) el.systemInfoEffect.style.backgroundColor = url.includes("performance.html") ? "#3daee9" : "";
  if (el.systemEffect) el.systemEffect.style.backgroundColor = url.includes("system.html") ? "#3daee9" : "";
}

function scrollToTopSoon() {
  setTimeout(() => window.scrollTo(0, 0), 300);
}

// Safe config parsing: reads value after "key" until end-of-line
function getConfigValue(text, keyWithEquals) {
  const key = String(keyWithEquals || "");
  const m = String(text || "").match(new RegExp(`^\\s*${escapeRegExp(key)}\\s*([^\\r\\n]*)`, "m"));
  if (!m) return "";
  return String(m[1]).trim().replace(/:.*/g, "").replace(/\.UTF-8/g, "");
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function execFileAsync(file, args, options = {}) {
  return new Promise((resolve) => {
    execFile(file, args, { timeout: 15_000, ...options }, () => resolve());
  });
}

// ==============================
// Sidebar shell actions
// ==============================

async function hide_sidebar_shell() {
  await execFileAsync("/opt/regataos-prime/scripts/regataos-prime-configs", ["-hide-sidebar"]);
}

async function show_sidebar_shell() {
  await execFileAsync("/opt/regataos-prime/scripts/regataos-prime-configs", ["-show-sidebar"]);
}

// ==============================
// Sidebar UI actions
// ==============================

function hide_sidebar(saveConfig = false) {
  document.querySelectorAll(".link-items p").forEach((p) => (p.style.visibility = "hidden"));
  document.querySelectorAll(".sidebar .ul-sidebar li").forEach((li) => (li.style.width = "58px"));

  if (el.sidebar) el.sidebar.style.width = "58px";
  if (el.hideSidebarBtn) el.hideSidebarBtn.style.display = "none";
  if (el.showSidebarBtn) el.showSidebarBtn.style.display = "flex";
  if (el.divIframe) el.divIframe.style.marginLeft = "58px";
  if (el.iframeContainer) el.iframeContainer.style.width = "calc(100% - 58px)";

  if (saveConfig) hide_sidebar_shell();
}

function show_sidebar(saveConfig = false) {
  document.querySelectorAll(".sidebar .ul-sidebar li").forEach((li) => (li.style.width = "230px"));

  if (el.sidebar) el.sidebar.style.width = "230px";
  if (el.hideSidebarBtn) el.hideSidebarBtn.style.display = "flex";
  if (el.showSidebarBtn) el.showSidebarBtn.style.display = "none";
  if (el.divIframe) el.divIframe.style.marginLeft = "230px";
  if (el.iframeContainer) el.iframeContainer.style.width = "calc(100% - 230px)";

  if (saveConfig) show_sidebar_shell();

  setTimeout(() => {
    document.querySelectorAll(".link-items p").forEach((p) => (p.style.visibility = "visible"));
  }, 300);
}

// ==============================
// Sidebar config read
// ==============================

function check_sidebar_config() {
  const cfgPath = "/tmp/regataos-prime/config-app/config-app.conf";

  if (!fs.existsSync(cfgPath)) {
    show_sidebar(false);
    return;
  }

  const cfg = fs.readFileSync(cfgPath, "utf8");
  const sideBarConfig = getConfigValue(cfg, "hide_sidebar=");

  if (sideBarConfig.includes("0")) show_sidebar(false);
  else hide_sidebar(false);
}

check_sidebar_config();

// ==============================
// Prime support routing
// ==============================

function check_prime_support() {
  const supported = fs.existsSync("/tmp/regataos-prime/use-hybrid-graphics.txt");
  if (!el.iframe) return;

  if (supported) {
    el.iframe.src = "pages/apps.html";
    if (el.pageApplications) el.pageApplications.style.display = "block";
  } else {
    el.iframe.src = "pages/settings.html";
    if (el.pageApplications) el.pageApplications.style.display = "none";
  }

  setActiveMenu(el.iframe.src);
}

check_prime_support();

// Update menu highlight on iframe load
if (el.iframe) {
  el.iframe.addEventListener("load", () => {
    setActiveMenu(el.iframe.src);
  });
}

// ==============================
// Navigation
// ==============================

function go_applications() {
  if (!el.iframe) return;
  if (!String(el.iframe.src).includes("apps")) {
    el.iframe.src = "./pages/apps.html";
    scrollToTopSoon();
  }
}

function go_settings() {
  if (!el.iframe) return;
  if (!String(el.iframe.src).includes("settings")) {
    el.iframe.src = "./pages/settings.html";
    scrollToTopSoon();
  }
}

function go_system_info() {
  if (!el.iframe) return;
  if (!String(el.iframe.src).includes("performance")) {
    el.iframe.src = "./pages/performance.html";
    scrollToTopSoon();
  }
}

function go_system() {
  if (!el.iframe) return;
  if (!String(el.iframe.src).includes("system")) {
    el.iframe.src = "./pages/system.html";
    scrollToTopSoon();
  }
}

// ==============================
// Bind events (no inline onclick)
// ==============================
(function bindEvents() {
  // Sidebar buttons
  if (el.btnHideSidebar) el.btnHideSidebar.addEventListener("click", () => hide_sidebar(true));
  if (el.btnShowSidebar) el.btnShowSidebar.addEventListener("click", () => show_sidebar(true));

  // Menu navigation (delegation)
  document.addEventListener("click", (ev) => {
    const target = ev.target.closest("[data-page]");
    if (!target) return;

    ev.preventDefault();

    const page = target.getAttribute("data-page");
    if (!page) return;

    if (page === "apps") go_applications();
    else if (page === "settings") go_settings();
    else if (page === "performance") go_system_info();
    else if (page === "system") go_system();
  });
})();
