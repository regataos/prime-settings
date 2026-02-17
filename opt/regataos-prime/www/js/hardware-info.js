"use strict";

// Reusa fs se já foi declarado em outro script
var fs = window.fs || require("fs");
window.fs = fs;

var fsp = window.fsp || fs.promises;
window.fsp = fsp;

function byId(id) {
  return document.getElementById(id);
}

function setHtml(id, value) {
  const el = byId(id);
  if (el && value != null) el.innerHTML = value;
}

async function readTextSafe(p) {
  try {
    return await fsp.readFile(p, "utf8");
  } catch {
    return null;
  }
}

// Capture system information
async function system_information() {
  const base = "/tmp/regataos-prime/config/system-info";

  // Mapa: elemento -> arquivo
  const items = [
    { id: "os-name", file: `${base}/os-name.txt` },
    { id: "ram-total", file: `${base}/ram-total.txt` },
    { id: "cpu-model", file: `${base}/cpu-model.txt` },

    // opcional
    { id: "nvdriver-version", file: `${base}/nvdriver-version.txt`, optional: true },

    { id: "vram-size", file: `${base}/total-vram-size.txt` },
    { id: "igpu-model", file: `${base}/igpu-model.txt` },
    { id: "dgpu-model", file: `${base}/dgpu-model.txt` },
    { id: "mesa-version", file: `${base}/mesa-version.txt` },
    { id: "gl-version", file: `${base}/opengl-version.txt` },

    // opcional
    { id: "vk-version", file: `${base}/vulkan-version.txt`, optional: true },

    { id: "linux-version", file: `${base}/kernel-version.txt` },
  ];

  // Lê tudo em paralelo (bem mais rápido e sem bloquear a UI)
  const results = await Promise.all(
    items.map(async (it) => {
      const text = await readTextSafe(it.file);
      return { ...it, text };
    })
  );

  // Atualiza DOM
  for (const r of results) {
    if (r.text == null) {
      // se não é opcional, você pode escolher colocar "—" ou deixar vazio
      if (!r.optional) setHtml(r.id, "");
      continue;
    }
    setHtml(r.id, r.text);
  }
}

system_information().catch((e) => {
  console.error("system_information error:", e?.message || e);
});
