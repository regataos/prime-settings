"use strict";

var fs = window.fs || require("fs");
window.fs = fs;

function byId(id) {
  return document.getElementById(id);
}

function setDisplay(node, value) {
  if (node) node.style.display = value;
}

function readTextSafeSync(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

// Check system
function checkSystem() {
  // ==========================
  // Prime support
  // ==========================
  const primeOn = byId("primeon");
  if (primeOn) {
    const hasHybrid = fs.existsSync("/tmp/regataos-prime/use-hybrid-graphics.txt");
    setDisplay(primeOn, hasHybrid ? "block" : "none");
  }

  // ==========================
  // NVIDIA driver
  // ==========================
  const hasNvidiaXconfig = fs.existsSync("/usr/bin/nvidia-xconfig");

  const useNvidiaClick = byId("use-nvidia-click");
  if (useNvidiaClick) setDisplay(useNvidiaClick, hasNvidiaXconfig ? "block" : "none");

  const useNvidia = byId("use-nvidia");
  if (useNvidia) setDisplay(useNvidia, hasNvidiaXconfig ? "block" : "none");

  // ==========================
  // Vulkan support (cache)
  // ==========================
  function checkVulkanSupport() {
    if (!fs.existsSync("/tmp/regataos-prime/vulkan-version.txt")) return false;

    const vulkanSupport = readTextSafeSync("/tmp/regataos-prime/vulkan-version.txt");
    if (!vulkanSupport) return false;

    // se NÃO contém essas strings, consideramos suportado
    return (
      !vulkanSupport.includes("Incomplete support") &&
      !vulkanSupport.includes("Not supported")
    );
  }

  const vulkanOk = checkVulkanSupport();

  // Atenção: você estava usando "primeon" também para Vulkan.
  // Mantive o comportamento original, mas se existir um ID próprio para Vulkan,
  // troque aqui (ex.: byId("vulkan-supported")).
  const vulkanSupportedEl = byId("primeon");
  if (vulkanSupportedEl) {
    setDisplay(vulkanSupportedEl, vulkanOk ? "block" : "none");
  }

  // ==========================
  // AMD AMF (depende de Vulkan)
  // ==========================
  const amfToggle = byId("amf-toggle");
  if (amfToggle) {
    if (!vulkanOk) {
      setDisplay(amfToggle, "none");
    } else {
      const openglVendor = readTextSafeSync("/tmp/regataos-prime/config/system-info/opengl-vendor.txt");
      setDisplay(amfToggle, openglVendor.includes("AMD") ? "block" : "none");
    }
  }
}

checkSystem();
