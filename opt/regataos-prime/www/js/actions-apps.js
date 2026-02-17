"use strict";

(function () {
  const { execFile } = require("child_process");
  if (!window.fs) window.fs = require("fs");
  const fs = window.fs;

  const runWithoutDgpuPath = "/tmp/regataos-prime/config/run-without-dgpu.conf";
  const runWithDgpuPath = "/tmp/regataos-prime/config/run-with-dgpu.conf";

  function execFileAsync(cmd, args) {
    return new Promise((resolve) => {
      execFile(cmd, args, { timeout: 60000 }, () => resolve());
    });
  }

  function readTextSafeSync(path) {
    try { return fs.readFileSync(path, "utf8"); } catch { return ""; }
  }

  async function actionApps(script, appname, pkg, packagemanager, dgpu, executable, desktopfile) {
    // args seguros (não manda desktopfile vazio pro run-app-dgpu)
    const args = [];
    if (String(script).includes("run-external-app-dgpu")) {
      args.push(String(appname || ""), String(desktopfile || ""));
    } else {
      args.push(String(appname || ""), String(pkg || ""), String(packagemanager || ""), String(executable || ""));
      if (desktopfile && String(desktopfile).trim()) args.push(String(desktopfile).trim());
    }

    try {
      await execFileAsync("/opt/regataos-prime/scripts/prime-options", ["-dgpu-app", String(appname || "")]);
      await execFileAsync("sudo", [`/opt/regataos-prime/scripts/${script}`, ...args]);
      await execFileAsync("sed", ["-i", "/^=on/d", runWithoutDgpuPath]);

      // Após salvar, se existir createAppList, pode revalidar UI (opcional)
      // Isso garante que o estado mostrado sempre bate com o conf
      // (sem recriar lista inteira)
      const runWithout = readTextSafeSync(runWithoutDgpuPath);
      const runWith = readTextSafeSync(runWithDgpuPath);

      // Se você quiser apenas revalidar um item, o list-apps.js já faz isso.
      // Mantemos aqui só para log/robustez.
      void runWithout; void runWith;

    } catch (e) {
      console.error("actionApps error:", e?.message || e);
    }
  }

  window.actionApps = actionApps;
})();
