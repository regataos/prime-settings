// Add or remove apps from the list of apps that should or should not run with the dGPU
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
										run = executable.replace(/snap\|run/g, "").trim();
										scriptRunWithDgpu = "run-app-dgpu"
									}

									const newAppBlock = document.createElement("li");
									newAppBlock.id = nickname;
									newAppBlock.innerHTML = `
										<div class="icon-app" style="background-image:url('${icon}');"></div>
										${closeButton}
										<div class="text-app app-name">${name}</div>
										<div class="switch__container">
											<input id="switch-shadow-${nickname}" class="switch switch--shadow-app" type="checkbox" onclick="actionApps('${scriptRunWithDgpu}', '${nickname}', '${package}', '${package_manager}', '${dgpu}', '${run}', '${desktop}');">
											<label id="switch-on-${nickname}" for="switch-shadow-${nickname}"></label>

											<input id="switch-shadow2-${nickname}" class="switch switch--shadow2-app" type="checkbox" onclick="actionApps('${scriptRunWithDgpu}', '${nickname}', '${package}', '${package_manager}', '${dgpu}', '${run}', '${desktop}');">
											<label id="switch-off-${nickname}" for="switch-shadow2-${nickname}"></label>
										</div>
										<span id="${nickname}-on" class="performance"></span>
										<span id="${nickname}-off" class="powersaving"></span>
										`;

									listAppsOnScreen.appendChild(newAppBlock);
									checkApp(nickname, dgpu, filePath);
									translation_app_status();
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
