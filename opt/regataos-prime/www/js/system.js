"use strict";

(function () {
  // Reusa módulos globais no NW.js
  if (!window.fs) window.fs = require("fs");
  const fs = window.fs;

  const { execFile } = require("child_process");

  function setDisplay(node, value) {
    if (node) node.style.display = value;
  }

  // system page options
  // Open the Information Center application
  function info() {
    setTimeout(() => {
      execFile("kinfocenter", [], () => {});
    }, 500);
  }

  // Copy hardware and software information to the clipboard
  function copy_info() {
    execFile("/opt/regataos-prime/scripts/settings-options", ["-copy-info"], () => {});
  }

  // If PRIME is not supported, hide some elements in the System section
  function hide_elements() {
    const optionPrimeOn = document.querySelector("li.primeon");
    if (!optionPrimeOn) return;

    fs.access("/tmp/regataos-prime/use-hybrid-graphics.txt", (err) => {
      setDisplay(optionPrimeOn, err ? "none" : "inline-block");
    });
  }

  // init
  hide_elements();

  // expõe para o HTML (se ainda usar onclick)
  window.info = info;
  window.copy_info = copy_info;
  window.hide_elements = hide_elements;
})();
