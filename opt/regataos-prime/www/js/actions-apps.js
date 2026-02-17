// Add or remove apps from the list of apps that should or should not run with the dGPU

const fs = require("fs");
const { spawn } = require("child_process");

// --- Helpers (treat JSON arrays for legacy bash scripts) ---

function firstToken(value) {
	// For package: ["android-studio","--classic"] -> "android-studio"
	if (Array.isArray(value)) return value.length ? String(value[0]) : "";
	if (value === null || value === undefined) return "";
	return String(value).trim();
}

function joinAsCommand(value) {
	// For executable: ["snap","run","android-studio"] -> "snap run android-studio"
	// For string: keep as-is
	if (Array.isArray(value)) return value.map(v => String(v)).join(" ").trim();
	if (value === null || value === undefined) return "";
	return String(value).trim();
}

function oneString(value) {
	// Ensures a single string argument
	if (Array.isArray(value)) return value.length ? String(value[0]) : "";
	if (value === null || value === undefined) return "";
	return String(value);
}

function runCmd(command, args = [], opts = {}) {
	return new Promise((resolve) => {
		const child = spawn(command, args, {
			stdio: "ignore",
			shell: false,
			...opts,
		});
		child.on("close", (code) => resolve(code));
		child.on("error", () => resolve(1));
	});
}

// --- Main ---

async function actionApps(script, appname, packageValue, packagemanager, dgpu, executable, desktopfile) {
	// 1) /opt/regataos-prime/scripts/prime-options -dgpu-app <appname>
	await runCmd("/opt/regataos-prime/scripts/prime-options", ["-dgpu-app", String(appname)]);

	// 2) sudo /opt/regataos-prime/scripts/<script> <args...>
	let scriptArgs = [];

	if (script.includes("run-external-app-dgpu")) {
		// legacy bash expects: app_name, desktop_file
		const desktop = oneString(desktopfile);
		scriptArgs = [String(appname), desktop].filter(Boolean);
	} else {
		// legacy bash expects: app_name, package_name, package_manager, app_executable
		const pkgName = firstToken(packageValue);            // only the package name (no flags)
		const pm = oneString(packagemanager);
		const execCmd = joinAsCommand(executable);           // "snap run android-studio" if array
		scriptArgs = [String(appname), pkgName, pm, execCmd].filter(Boolean);
	}

	await runCmd("sudo", ["/opt/regataos-prime/scripts/" + String(script), ...scriptArgs]);

	// 3) sed -i ...
	await runCmd("sed", ["-i", "/^=on/d", "/tmp/regataos-prime/config/run-without-dgpu.conf"]);

	// --- Atualiza UI (mantive sua lógica) ---
	const runWithoutDgpuPath = "/tmp/regataos-prime/config/run-without-dgpu.conf";
	const runWithDgpuPath = "/tmp/regataos-prime/config/run-with-dgpu.conf";

	setTimeout(() => {
		const readFile = (path) =>
			new Promise((resolve, reject) => {
				fs.readFile(path, "utf8", (error, data) => {
					if (error) reject(error);
					else resolve(data);
				});
			});

		Promise.all([readFile(runWithoutDgpuPath), readFile(runWithDgpuPath)])
			.then(([runWithoutDgpu, runWithDgpu]) => {
				const statusOn = document.querySelector(`#${appname}-on`);
				const statusOff = document.querySelector(`#${appname}-off`);

				if (runWithDgpu.includes(appname) || runWithoutDgpu.includes(`${appname}=on`)) {
					statusOn.classList.add("show-element");
					statusOff.classList.remove("show-element");
				} else if (runWithoutDgpu.includes(appname) || String(dgpu).includes("deactivate")) {
					statusOn.classList.remove("show-element");
					statusOff.classList.add("show-element");
				} else {
					statusOn.classList.add("show-element");
					statusOff.classList.remove("show-element");
				}
			})
			.catch((error) => console.error(error.message));
	}, 1000);
}

async function switchAllApps(runAction) {
	const getInstalledGames = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
	const jsonFileDirectories = ["/opt/regataos-store/apps-list", "/tmp/regataos-prime/config/external-app"];

	for (const allAppsJsonFiles of jsonFileDirectories) {
		try {
			for (const jsonFile of fs.readdirSync(allAppsJsonFiles)) {
				const filePath = `${allAppsJsonFiles}/${jsonFile}`;

				const data = fs.readFileSync(filePath, "utf8");
				const appData = JSON.parse(data);

				for (const getAppData of appData) {
					const isExternal = filePath.includes("external-app");

					// filtra apps alvo (mantive sua condição)
					if (!isExternal) {
						const { dgpu, nickname } = getAppData;
						const shouldRun =
							(String(dgpu).includes("activate") && getInstalledGames.includes(nickname)) ||
							(String(dgpu).includes("deactivate") && getInstalledGames.includes(nickname));

						if (!shouldRun) continue;
					}

					// 1) prime-options
					await runCmd("/opt/regataos-prime/scripts/prime-options", [String(runAction)]);

					// 2) legacy script args (fixed)
					if (isExternal) {
						// external-app json: { app_nickname, desktop_app_file }
						const { app_nickname: nickname, desktop_app_file: desktopFile } = getAppData;

						const args = [String(nickname), oneString(desktopFile)].filter(Boolean);
						await runCmd("sudo", ["/opt/regataos-prime/scripts/run-external-app-dgpu", ...args]);
					} else {
						// apps-list json: { nickname, package, package_manager, executable }
						const { nickname, package: pkg, package_manager, executable } = getAppData;

						const pkgName = firstToken(pkg);              // only name
						const execCmd = joinAsCommand(executable);    // string command
						const pm = oneString(package_manager);

						const args = [String(nickname), pkgName, pm, execCmd].filter(Boolean);
						await runCmd("sudo", ["/opt/regataos-prime/scripts/run-app-dgpu", ...args]);
					}
				}
			}
		} catch (error) {
			console.error(`Error reading directory ${allAppsJsonFiles}:`, error);
		}
	}
}

// Check whether running with dGPU is enabled or disabled for all applications
function checkGpuConfigForAllApps() {
	const settingsFile = "/tmp/regataos-prime/config/regataos-prime.conf";
	if (fs.existsSync(settingsFile)) {
		const getSettings = fs.readFileSync(settingsFile, "utf8");
		const checkConfig = checkConfigFile(getSettings, "one-apps=");
		return checkConfig;
	}
	return "off";
}

function buttonsAllApps() {
	const checkConfig = checkGpuConfigForAllApps();

	if (checkConfig.includes("on")) {
		document.querySelector(".enable-all").style.display = "none";
		document.querySelector(".disable-all").style.display = "block";
	} else {
		document.querySelector(".enable-all").style.display = "block";
		document.querySelector(".disable-all").style.display = "none";
	}
}
buttonsAllApps();

function actionAllApps(checkbox) {
	const checkConfig = checkGpuConfigForAllApps();
	let runAction = "";

	if (checkConfig.includes("on")) runAction = "-disable-run-dgpu";
	else runAction = "-enable-run-dgpu";

	switchAllApps(runAction);

	setTimeout(() => {
		runCmd("/opt/regataos-prime/scripts/notifications/notify", [String(runAction)])
			.then(() => location.reload())
			.catch(() => location.reload());
	}, 2000);
}
