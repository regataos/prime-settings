// Enable or disable running with dGPU for all applications
function disable_all_apps() {
	const exec = require('child_process').exec;
	const fs = require("fs");

	const checkbox1 = document.getElementById('switch-shadow-all-apps');

	if (checkbox1.checked) {
		const command = "/opt/regataos-prime/scripts/prime-options -disable-run-dgpu; \
		/opt/regataos-prime/scripts/notify -disable-run-dgpu";
		exec(command, function (error, call, errlog) {
		});

		setTimeout(function () {
			let files = [];

			fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
				fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						// Read the list of apps that should appear in each block
						for (let i = 0; i < apps.length; i++) {
							const installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
							const app_nickname = apps[i].nickname

							if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
								let executable = apps[i].executable;
								executable = executable.replace(/snap/g, '');
								executable = executable.replace(/run/g, '');
								executable = executable.trim()

								//Make sure the app uses dGPU by default
								const status_dgpu = apps[i].dgpu;
								if (((status_dgpu.indexOf("activate") > -1) == "1") ||
									((status_dgpu.indexOf("deactivate") > -1) == "1")) {
									const command = 'echo "' + apps[i].nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
									sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
									exec(command, function (error, call, errlog) {
									});
								}
							}
						}
					}
					return;
				});
			});
		}, 300);

	} else {
		const command = "/opt/regataos-prime/scripts/prime-options -enable-run-dgpu; \
		/opt/regataos-prime/scripts/notify -enable-run-dgpu";
		exec(command, function (error, call, errlog) {
		});

		setTimeout(function () {
			let files = [];

			fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
				fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						// Read the list of apps that should appear in each block
						for (let i = 0; i < apps.length; i++) {
							const installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
							const app_nickname = apps[i].nickname

							if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
								let executable = apps[i].executable;
								executable = executable.replace(/snap/g, '');
								executable = executable.replace(/run/g, '');
								executable = executable.trim()

								//Make sure the app uses dGPU by default
								const status_dgpu = apps[i].dgpu;
								if (((status_dgpu.indexOf("activate") > -1) == "1") ||
									((status_dgpu.indexOf("deactivate") > -1) == "1")) {
									const command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
									sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
									exec(command, function (error, call, errlog) {
									});
								}
							}
						}
					}
					return;
				});
			});
		}, 300);
	}
}

function enable_all_apps() {
	const exec = require('child_process').exec;
	const fs = require("fs");

	const checkbox2 = document.getElementById('switch-shadow2-all-apps');
	if (!checkbox2.checked) {
		const command = "/opt/regataos-prime/scripts/prime-options -disable-run-dgpu; \
		/opt/regataos-prime/scripts/notify -disable-run-dgpu";
		exec(command, function (error, call, errlog) {
		});

		setTimeout(function () {
			let files = [];

			fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
				fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						// Read the list of apps that should appear in each block
						for (let i = 0; i < apps.length; i++) {
							const installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
							const app_nickname = apps[i].nickname

							if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
								let executable = apps[i].executable;
								executable = executable.replace(/snap/g, '');
								executable = executable.replace(/run/g, '');
								executable = executable.trim()

								//Make sure the app uses dGPU by default
								const status_dgpu = apps[i].dgpu;
								if (((status_dgpu.indexOf("activate") > -1) == "1") ||
									((status_dgpu.indexOf("deactivate") > -1) == "1")) {
									const command = 'echo "' + apps[i].nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
									sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
									exec(command, function (error, call, errlog) {
									});
								}
							}
						}
					}
					return;
				});
			});
		}, 300);

	} else {
		const command = "/opt/regataos-prime/scripts/prime-options -enable-run-dgpu; \
		/opt/regataos-prime/scripts/notify -enable-run-dgpu";
		exec(command, function (error, call, errlog) {
		});

		setTimeout(function () {
			let files = [];

			fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
				fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						// Read the list of apps that should appear in each block
						for (let i = 0; i < apps.length; i++) {
							const installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
							const app_nickname = apps[i].nickname

							if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
								let executable = apps[i].executable;
								executable = executable.replace(/snap/g, '');
								executable = executable.replace(/run/g, '');
								executable = executable.trim()

								//Make sure the app uses dGPU by default
								const status_dgpu = apps[i].dgpu;
								if (((status_dgpu.indexOf("activate") > -1) == "1") || ((status_dgpu.indexOf("deactivate") > -1) == "1")) {
									const command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
									sudo /opt/regataos-prime/scripts/run-app-dgpu ' + apps[i].nickname + ' ' + apps[i].package + ' ' + apps[i].package_manager + ' ' + executable;
									exec(command, function (error, call, errlog) {
									});
								}
							}
						}
					}
					return;
				});
			});
		}, 300);
	}
}

// Check the list of apps running using the dGPU disabled
function check_apps_status() {
	const fs = require("fs");

	let files = [];

	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
		fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
			if (!err) {
				const apps = JSON.parse(data);

				// Read the list of apps that should appear in each block
				for (let i = 0; i < apps.length; i++) {
					const installed_apps = fs.readFileSync("/opt/regataos-store/installed-apps/installed-apps.txt", "utf8");
					const app_nickname = apps[i].nickname

					if ((installed_apps.indexOf(app_nickname) > -1) == "1") {
						//Make sure the app uses dGPU by default
						const status_dgpu = apps[i].dgpu;
						if (((status_dgpu.indexOf("activate") > -1) == "1") ||
							((status_dgpu.indexOf("deactivate") > -1) == "1")) {
							// Check if dGPU has been disabled for all apps
							const without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

							if ((without_dgpu.indexOf(apps[i].nickname + "=on") > -1) == "1") {
								document.getElementById("switch-shadow-" + apps[i].nickname).checked = false;
								document.getElementById("switch-shadow2-" + apps[i].nickname).checked = true;

								document.querySelector(`.switch-off-${apps[i].nickname} label`).style.display = "none";
								document.querySelector(`.switch-on-${apps[i].nickname} label`).style.display = "block";
								document.querySelector(`.${apps[i].nickname}-off`).style.display = "none";
								document.querySelector(`.${apps[i].nickname}-on`).style.display = "block";

							} else if ((without_dgpu.indexOf(apps[i].nickname) > -1) == "1") {
								document.getElementById("switch-shadow-" + apps[i].nickname).checked = true;
								document.getElementById("switch-shadow2-" + apps[i].nickname).checked = false;

								document.querySelector(`.switch-off-${apps[i].nickname} label`).style.display = "block";
								document.querySelector(`.switch-on-${apps[i].nickname} label`).style.display = "none";
								document.querySelector(`.${apps[i].nickname}-off`).style.display = "block";
								document.querySelector(`.${apps[i].nickname}-on`).style.display = "none";

							} else {
								document.getElementById("switch-shadow-" + apps[i].nickname).checked = false;
								document.getElementById("switch-shadow2-" + apps[i].nickname).checked = true;

								document.querySelector(`.switch-off-${apps[i].nickname} label`).style.display = "none";
								document.querySelector(`.switch-on-${apps[i].nickname} label`).style.display = "block";
								document.querySelector(`.${apps[i].nickname}-off`).style.display = "none";
								document.querySelector(`.${apps[i].nickname}-on`).style.display = "block";
							}
						}

					}
				}
			}
			return;
		});
	});
}
