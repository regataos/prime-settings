// Add or remove apps from the list of apps that should or should not run with the dGPU
function actionApps(script, appname, package, packagemanager, dgpu, executable, desktopfile) {
	const fs = require('fs');

	let arguments = "";

	if (script.includes("run-external-app-dgpu")) {
		arguments = `${appname} ${desktopfile}`;
	} else {
		arguments = `${appname} ${package} ${packagemanager} ${executable} ${desktopfile}`;
	}

	const commandLine = `/opt/regataos-prime/scripts/prime-options -dgpu-app ${appname};
		sudo /opt/regataos-prime/scripts/${script} ${arguments};
		sed -i '/^=on/d' "/tmp/regataos-prime/config/run-without-dgpu.conf"`;

	const exec = require('child_process').exec;
	exec(commandLine, function (error, call, errlog) { });

	const runWithoutDgpuPath = '/tmp/regataos-prime/config/run-without-dgpu.conf';
	const runWithDgpuPath = '/tmp/regataos-prime/config/run-with-dgpu.conf';

	setTimeout(function () {
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

				if (runWithDgpu.includes(appname) || runWithoutDgpu.includes(`${appname}=on`)) {
					statusOn.classList.add('show-element');
					statusOff.classList.remove('show-element');

				} else if (runWithoutDgpu.includes(appname) || dgpu.includes('deactivate')) {
					statusOn.classList.remove('show-element');
					statusOff.classList.add('show-element');

				} else {
					statusOn.classList.add('show-element');
					statusOff.classList.remove('show-element');
				}
			})
			.catch((error) => {
				console.error(error.message);
			});
	}, 1000);
}

function switchAllApps(runAction) {
	const fs = require("fs");

	const getInstalledGames = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
	const jsonFileDirectories = ['/opt/regataos-store/apps-list', '/tmp/regataos-prime/config/external-app'];

	jsonFileDirectories.forEach((allAppsJsonFiles) => {
		try {
			fs.readdirSync(allAppsJsonFiles).forEach(jsonFile => {
				const filePath = `${allAppsJsonFiles}/${jsonFile}`;

				fs.readFile(filePath, "utf8", (err, data) => {
					if (err) {
						console.error(err);
						return;
					}

					const appData = JSON.parse(data);
					appData.forEach((getAppData) => {
						function createAppBlock(script, dgpu, nickname, package, package_manager, executable) {
							if (dgpu.includes("activate") && getInstalledGames.includes(nickname) ||
								dgpu.includes("deactivate") && getInstalledGames.includes(nickname) ||
								filePath.includes("external-app")) {
								let arguments = "";

								if (script.includes("run-external-app-dgpu")) {
									arguments = `${nickname} ${executable}`;
								} else {
									arguments = `${nickname} ${package} ${package_manager} ${executable}`;
								}

								const commandLine = `
									/opt/regataos-prime/scripts/prime-options ${runAction};
									sudo /opt/regataos-prime/scripts/${script} ${arguments}`;

								const exec = require('child_process').exec;
								exec(commandLine, function (error, call, errlog) { });
							}
						}

						if (filePath.includes("external-app")) {
							const { app_nickname: nickname, desktop_app_file: executable } = getAppData;
							createAppBlock("run-external-app-dgpu", "", nickname, "", "", executable);
						} else {
							const { dgpu, nickname, package, package_manager, executable } = getAppData;
							createAppBlock("run-app-dgpu", dgpu, nickname, package, package_manager, executable);
						}
					});
				});
			});

		} catch (error) {
			console.error(`Error reading directory ${directory}:`, error);
		}
	});
}

// Check whether running with dGPU is enabled or disabled for all applications
function checkGpuConfigForAllApps() {
	const fs = require('fs');
	const settingsFile = "/tmp/regataos-prime/config/regataos-prime.conf";

	if (fs.existsSync(settingsFile)) {
		const getSettings = fs.readFileSync(settingsFile, "utf8");
		const checkConfig = checkConfigFile(getSettings, "one-apps=");
		return checkConfig;
	} else {
		return "off";
	}
}

function buttonsAllApps() {
	const checkConfig = checkGpuConfigForAllApps();

	if (checkConfig.includes("on")) {
		document.querySelector(".enable-all").style.display = "none";
		document.querySelector(".disable-all").style.display = "block";
		//document.getElementById("switch-shadow2-all-apps").checked = false;
	} else if (checkConfig.includes("off")) {
		document.querySelector(".enable-all").style.display = "block";
		document.querySelector(".disable-all").style.display = "none";
	} else {
		document.querySelector(".enable-all").style.display = "block";
		document.querySelector(".disable-all").style.display = "none";
	}
}
buttonsAllApps();

function actionAllApps(checkbox) {
	const checkConfig = checkGpuConfigForAllApps();
	let runAction = "";

	if (checkConfig.includes("on")) {
		runAction = "-disable-run-dgpu";
	} else if (checkConfig.includes("off")) {
		runAction = "-enable-run-dgpu";
	} else {
		runAction = "-disable-run-dgpu";
	}

	switchAllApps(runAction);

	setTimeout(function () {
		const commandLine = `/opt/regataos-prime/scripts/notifications/notify ${runAction}`;
		const { exec } = require('child_process');

		exec(commandLine, function (error, call, errlog) {
			if (error) {
				console.error(error);
			}
		});

		location.reload();
	}, 2000);
}
