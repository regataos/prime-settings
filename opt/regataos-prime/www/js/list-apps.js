// Add or remove apps from the list of apps that should or should not run with the dGPU

// Helpers to support array fields coming from .json (e.g. executable/package/extra_packages)
function normalizeToPipeArg(value) {
	// Keep backward compatibility: strings pass through; arrays become a single argument joined by '|'
	if (Array.isArray(value)) {
		return value.map(v => String(v)).join('|');
	}
	if (value === null || value === undefined) return "";
	return String(value);
}

function getRunTargetFromExecutable(executable) {
	// Returns the "target" that should be passed to scripts (usually the last token of the command)
	if (Array.isArray(executable)) {
		return executable.length ? String(executable[executable.length - 1]) : "";
	}
	if (executable === null || executable === undefined) return "";
	const s = String(executable).trim();
	if (!s) return "";
	if (s.includes('|')) {
		const parts = s.split('|').map(p => p.trim()).filter(Boolean);
		return parts.length ? parts[parts.length - 1] : "";
	}
	// fallback: whitespace split
	const parts = s.split(/\s+/).filter(Boolean);
	return parts.length ? parts[parts.length - 1] : "";
}

function escapeForSingleQuotedAttr(value) {
	// This value will be embedded inside single quotes in an HTML attribute (onclick='...')
	return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function checkApp(appname, dgpu, filePath) {
	const fs = require('fs');

	const runWithoutDgpuPath = '/tmp/regataos-prime/config/run-without-dgpu.conf';
	const runWithDgpuPath = '/tmp/regataos-prime/config/run-with-dgpu.conf';

	const readFile = (path) => {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', (error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	};

	Promise.all([readFile(runWithoutDgpuPath), readFile(runWithDgpuPath)])
		.then(([runWithoutDgpu, runWithDgpu]) => {
			const statusOn = document.querySelector(`#${appname}-on`);
			const statusOff = document.querySelector(`#${appname}-off`);
			const labelSwitchOn = document.querySelector(`#switch-on-${appname}`);
			const labelSwitchOff = document.querySelector(`#switch-off-${appname}`);

			if (runWithDgpu.includes(appname) || runWithoutDgpu.includes(`${appname}=on`) ||
				filePath.includes("external-app") && !runWithoutDgpu.includes(`${appname}`)) {
				statusOn.classList.add('show-element');
				labelSwitchOn.classList.add('show-element');

				statusOff.classList.remove('show-element');
				labelSwitchOff.classList.remove('show-element');

			} else if (runWithoutDgpu.includes(appname) || dgpu.includes('deactivate')) {
				statusOn.classList.remove('show-element');
				labelSwitchOn.classList.remove('show-element');

				statusOff.classList.add('show-element');
				labelSwitchOff.classList.add('show-element');

			} else {
				statusOn.classList.add('show-element');
				labelSwitchOn.classList.add('show-element');

				statusOff.classList.remove('show-element');
				labelSwitchOff.classList.remove('show-element');
			}
		})
		.catch((error) => {
			console.error(error.message);
		});
}

// Dynamically create the list of apps on the screen.
function createAppList() {
	const fs = require("fs");
	const iconAddress = "/opt/regataos-prime/www/images/apps-icons";
	const getInstalledGames = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
	const jsonFileDirectories = ['/opt/regataos-store/apps-list', '/tmp/regataos-prime/config/external-app'];

	jsonFileDirectories.forEach((allAppsJsonFiles) => {
		try {
			fs.readdirSync(allAppsJsonFiles).forEach(jsonFile => {
				const filePath = `${allAppsJsonFiles}/${jsonFile}`;
				let listAppsOnScreen = document.querySelector("ul.apps-buttons");

				fs.readFile(filePath, "utf8", (err, data) => {
					if (err) {
						console.error(err);
						return;
					}

					const appData = JSON.parse(data);
					appData.forEach((getAppData) => {
						function createAppBlock(dgpu, name, nickname, icon, package, package_manager, executable) {
							if ((dgpu.includes("activate")) && (getInstalledGames.includes(nickname))
								|| (filePath.includes("external-app"))) {
								const appBlock = listAppsOnScreen.querySelector(`#${nickname}`);

								if (!appBlock) {
									let desktop = "";
									let closeButton = "";
									let scriptRunWithDgpu = "";

									if (filePath.includes("external-app")) {
										desktop = executable;
										closeButton = `<div title="" class="remove-app-buttom" onclick="remove_external_app('${nickname}', '${desktop}');"></div>`;
										scriptRunWithDgpu = "run-external-app-dgpu"
									} else {
										icon = fs.readFileSync(`${iconAddress}/${nickname}-icon.txt`, "utf8").trim();
										run = getRunTargetFromExecutable(executable);
									scriptRunWithDgpu = "run-app-dgpu"
									}

									const packageArg = normalizeToPipeArg(package);
									const runArg = getRunTargetFromExecutable(executable);
									const desktopArg = normalizeToPipeArg(desktop);
									const safePackage = escapeForSingleQuotedAttr(packageArg);
									const safeRun = escapeForSingleQuotedAttr(runArg);
									const safeDesktop = escapeForSingleQuotedAttr(desktopArg);
									const newAppBlock = document.createElement("li");
									newAppBlock.id = nickname;
									newAppBlock.innerHTML = `
										<div class="icon-app" style="background-image:url('${icon}');"></div>
										${closeButton}
										<div class="text-app app-name">${name}</div>
										<div class="switch__container">
											<input id="switch-shadow-${nickname}" class="switch switch--shadow-app" type="checkbox" onclick="actionApps('${scriptRunWithDgpu}', '${nickname}', '${safePackage}', '${package_manager}', '${dgpu}', '${safeRun}', '${safeDesktop}');">
											<label id="switch-on-${nickname}" for="switch-shadow-${nickname}"></label>

											<input id="switch-shadow2-${nickname}" class="switch switch--shadow2-app" type="checkbox" onclick="actionApps('${scriptRunWithDgpu}', '${nickname}', '${safePackage}', '${package_manager}', '${dgpu}', '${safeRun}', '${safeDesktop}');">
											<label id="switch-off-${nickname}" for="switch-shadow2-${nickname}"></label>
										</div>
										<span id="${nickname}-on" class="performance"></span>
										<span id="${nickname}-off" class="powersaving"></span>
										`;

									listAppsOnScreen.appendChild(newAppBlock);
									translation_app_status();
									checkApp(nickname, dgpu, filePath);
								}
							}
						}

						if (filePath.includes("external-app")) {
							const { app_name: name, app_nickname: nickname, app_icon: icon, desktop_app_file: executable } = getAppData;
							createAppBlock("", name, nickname, icon, "", "", executable);
						} else {
							const { dgpu, name, nickname, package, package_manager, executable } = getAppData;
							createAppBlock(dgpu, name, nickname, "", package, package_manager, executable);
						}
					});
				});
			});
		} catch (error) {
			console.error(`Error reading directory ${directory}:`, error);
		}
	});
}
createAppList();
