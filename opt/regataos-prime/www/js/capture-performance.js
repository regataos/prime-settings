"use strict";

const { execFile } = require("child_process");
const fsp = require("fs/promises");

// ==============================
// Config
// ==============================
const HWINFO = "/opt/regataos-prime/scripts/hardware-info";

// Ajuste aqui se quiser ainda mais leve:
const CONCURRENCY_TICK_MS = 250;  // “resolução” do scheduler (não é frequência das coletas)

// ==============================
// Helpers
// ==============================
function execFileAsync(file, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      file,
      args,
      {
        timeout: 10_000,
        maxBuffer: 2 * 1024 * 1024,
        ...options,
      },
      (error, stdout, stderr) => {
        if (error) return reject({ error, stdout, stderr });
        resolve({ stdout: String(stdout || ""), stderr: String(stderr || "") });
      }
    );
  });
}

function firstNonEmptyLine(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .find(Boolean) || "";
}

function toIntOrNull(text) {
  const n = parseInt(String(text).trim(), 10);
  return Number.isFinite(n) ? n : null;
}

function clampPct(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function setGauge(gaugeEl, numberEl, pctOrNull, fallbackText = "0") {
  const pct = pctOrNull == null ? 0 : clampPct(pctOrNull);
  if (gaugeEl) gaugeEl.style.strokeDashoffset = `calc(440 - (440 * ${pct}) / 100)`;
  if (numberEl) numberEl.innerHTML = pctOrNull == null ? fallbackText : String(pct);
}

async function readTextSafe(p) {
  try {
    return await fsp.readFile(p, "utf8");
  } catch {
    return "";
  }
}

// ==============================
// Cache DOM (evita getElementById toda hora)
// ==============================
const el = {
  gpuUsageGauge: document.getElementById("gpu-usage"),
  gpuUsageNum: document.getElementById("gpu-usage-number"),
  gpuTemp: document.getElementById("gpu-temp"),
  gpuFreq: document.getElementById("gpu-freq"),

  vramSize: document.getElementById("vram-size"),
  vramFreq: document.getElementById("vram-freq"),
  vramUsageGauge: document.getElementById("vram-usage"),
  vramUsageNum: document.getElementById("vram-usage-number"),
  vramUsageNodata: document.getElementById("vram-usage-nodata"),
  vramUsageBlock: document.getElementById("vram-usage-block"),

  cpuUsageGauge: document.getElementById("cpu-usage"),
  cpuUsageNum: document.getElementById("cpu-usage-number"),
  cpuFreq: document.getElementById("cpu-freq"),
  cpuTemp: document.getElementById("cpu-temp"),

  ramSize: document.getElementById("ram-size"),
  ramUsageGauge: document.getElementById("ram-usage"),
  ramUsageNum: document.getElementById("ram-usage-number"),
  ramUse: document.getElementById("ram-use"),
};

// ==============================
// Coletas (leves e sem pipeline)
// ==============================

// GPU usage (%)
async function updateGpuUsage() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-gpu-usage"]);
    const line = firstNonEmptyLine(stdout);
    const n = toIntOrNull(line);
    setGauge(el.gpuUsageGauge, el.gpuUsageNum, n, "0");
  } catch {
    setGauge(el.gpuUsageGauge, el.gpuUsageNum, 0, "0");
  }
}

// GPU temp (texto)
async function updateGpuTemp() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-gpu-temp"]);
    const line = firstNonEmptyLine(stdout);
    if (el.gpuTemp && line) el.gpuTemp.innerHTML = line;
  } catch {}
}

// GPU freq (texto)
async function updateGpuFreq() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-gpu-freq"]);
    const line = firstNonEmptyLine(stdout);
    if (el.gpuFreq && line) el.gpuFreq.innerHTML = line;
  } catch {}
}

// VRAM total (one-shot)
async function updateVramSizeOnce() {
  const totalVramSize = await readTextSafe("/tmp/regataos-prime/config/system-info/total-vram-size.txt");
  if (el.vramSize) el.vramSize.innerHTML = totalVramSize || "";
}

// VRAM freq (texto)
async function updateVramFreq() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-vram-freq"]);
    const line = firstNonEmptyLine(stdout);
    if (el.vramFreq && line) el.vramFreq.innerHTML = line;
  } catch {}
}

// VRAM usage (% ou nodata)
async function updateVramUsage() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-vram-usage"]);
    const line = firstNonEmptyLine(stdout);

    if (line.includes("nodata")) {
      setGauge(el.vramUsageGauge, el.vramUsageNum, 0, "N/A");
      if (el.vramUsageNodata) el.vramUsageNodata.style.display = "none";
      if (el.vramUsageBlock) el.vramUsageBlock.style.opacity = ".3";
      return;
    }

    if (el.vramUsageBlock) el.vramUsageBlock.style.opacity = "1";

    const n = toIntOrNull(line);
    setGauge(el.vramUsageGauge, el.vramUsageNum, n, "0");
  } catch {
    setGauge(el.vramUsageGauge, el.vramUsageNum, 0, "0");
  }
}

// CPU usage (%)
// agora vem direto no stdout do hardware-info -cpu-use (sem ler arquivo)
async function updateCpuUsage() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-cpu-use"]);
    const line = firstNonEmptyLine(stdout);
    const n = toIntOrNull(line);
    setGauge(el.cpuUsageGauge, el.cpuUsageNum, n, "0");
  } catch {
    setGauge(el.cpuUsageGauge, el.cpuUsageNum, 0, "0");
  }
}

// CPU freq (texto)
async function updateCpuFreq() {
  try {
    const { stdout } = await execFileAsync(HWINFO, ["-cpu-freq"]);
    const line = firstNonEmptyLine(stdout);
    if (el.cpuFreq && line) el.cpuFreq.innerHTML = line;
  } catch {}
}

// CPU temp (pesado: sensors) — roda menos
async function updateCpuTemp() {
  // Mantive “bash -lc” porque sensors/egrep/sed/awk é um pipeline mesmo.
  // Se quiser, dá pra trocar por parsing em JS, mas o custo maior é o sensors.
  try {
    const { stdout } = await execFileAsync("bash", [
      "-lc",
      "sensors | egrep -wi 'Tctl|tdie|Package id 0' | sed 's/Package id//' | awk '{print $2}' | cut -d'.' -f -1 | sed 's/+//' | head -n 1"
    ]);
    const line = firstNonEmptyLine(stdout);
    if (el.cpuTemp && line) el.cpuTemp.innerHTML = `${line}°C`;
  } catch {}
}

// RAM total (texto) — parse do free em JS
async function updateRamTotal() {
  try {
    const { stdout } = await execFileAsync("free", ["-h"]);
    const memLine = stdout.split(/\r?\n/).find(l => l.toLowerCase().startsWith("mem:"));
    if (!memLine) return;

    const parts = memLine.trim().split(/\s+/);
    const total = (parts[1] || "").replace("Gi", "GB").replace("Mi", "MB");
    if (el.ramSize && total) el.ramSize.innerHTML = total;
  } catch {}
}

// RAM usage (%) — parse do free em JS
async function updateRamUsagePercent() {
  try {
    const { stdout } = await execFileAsync("free", ["-m"]);
    const memLine = stdout.split(/\r?\n/).find(l => l.toLowerCase().startsWith("mem:"));
    if (!memLine) return;

    const parts = memLine.trim().split(/\s+/);
    const total = parseInt(parts[1], 10);
    const used = parseInt(parts[2], 10);

    if (!Number.isFinite(total) || !Number.isFinite(used) || total <= 0) {
      setGauge(el.ramUsageGauge, el.ramUsageNum, 0, "0");
      return;
    }

    const pct = Math.round((used / total) * 100);
    setGauge(el.ramUsageGauge, el.ramUsageNum, pct, "0");
  } catch {
    setGauge(el.ramUsageGauge, el.ramUsageNum, 0, "0");
  }
}

// RAM used (texto) — parse do free em JS
async function updateRamUsedHuman() {
  try {
    const { stdout } = await execFileAsync("free", ["-h"]);
    const memLine = stdout.split(/\r?\n/).find(l => l.toLowerCase().startsWith("mem:"));
    if (!memLine) return;

    const parts = memLine.trim().split(/\s+/);
    const used = (parts[2] || "").replace("Gi", "GB").replace("Mi", "MB");
    if (el.ramUse && used) el.ramUse.innerHTML = used;
  } catch {}
}

// ==============================
// Scheduler único (sem empilhar chamadas)
// ==============================
const tasks = [
  // 1s (leves / importantes)
  { everyMs: 1000, last: 0, running: false, fn: updateGpuUsage },
  { everyMs: 1000, last: 0, running: false, fn: updateGpuTemp },
  { everyMs: 1000, last: 0, running: false, fn: updateGpuFreq },
  { everyMs: 1000, last: 0, running: false, fn: updateVramUsage },
  { everyMs: 1000, last: 0, running: false, fn: updateCpuFreq },
  { everyMs: 1000, last: 0, running: false, fn: updateRamUsagePercent },
  { everyMs: 1000, last: 0, running: false, fn: updateRamUsedHuman },

  // 2s (CPU use tem “sleep 1” no hardware-info; 2s já alivia bastante)
  { everyMs: 2000, last: 0, running: false, fn: updateCpuUsage },
  { everyMs: 2000, last: 0, running: false, fn: updateVramFreq },

  // 5s (moderado)
  { everyMs: 5000, last: 0, running: false, fn: updateRamTotal },

  // 3s (pesado: sensors)
  { everyMs: 3000, last: 0, running: false, fn: updateCpuTemp },
];

let schedulerTimer = null;

function tick() {
  const now = Date.now();

  for (const t of tasks) {
    if (t.running) continue;
    if (now - t.last < t.everyMs) continue;

    t.running = true;
    t.last = now;

    // dispara sem bloquear o tick, mas sem overlap por tarefa
    t.fn()
      .catch(() => {})
      .finally(() => {
        t.running = false;
      });
  }
}

async function start() {
  // one-shot
  await updateVramSizeOnce();

  // primeiro tick
  tick();

  if (schedulerTimer) clearInterval(schedulerTimer);
  schedulerTimer = setInterval(tick, CONCURRENCY_TICK_MS);
}

start().catch(() => {});
