// Enable or disable running with dGPU for all applications
function disable_all_external_apps() {
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

			fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
				fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						for (let i = 0; i < apps.length; i++) {
							const command = 'echo "' + apps[i].app_nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
							sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
							exec(command, function (error, call, errlog) {
							});
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

			fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
				fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						for (let i = 0; i < apps.length; i++) {
							const command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
							sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
							exec(command, function (error, call, errlog) {
							});
						}
					}
					return;
				});
			});
		}, 300);
	}
}

function enable_all_external_apps() {
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

			fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
				fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						for (let i = 0; i < apps.length; i++) {
							const command = 'echo "' + apps[i].app_nickname + '" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
							sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
							exec(command, function (error, call, errlog) {
							});
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

			fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
				fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
					if (!err) {
						const apps = JSON.parse(data);

						for (let i = 0; i < apps.length; i++) {
							const command = 'echo "" >> "/tmp/regataos-prime/config/run-without-dgpu.conf"; \
							sudo /opt/regataos-prime/scripts/run-external-app-dgpu ' + apps[i].app_nickname + ' ' + apps[i].desktop_app_file;
							exec(command, function (error, call, errlog) {
							});
						}
					}
					return;
				});
			});
		}, 300);
	}
}

// Check the list of apps running using the dGPU disabled
function check_external_apps_status() {
	const fs = require("fs");

	let files = [];

	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
		fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
			if (!err) {
				const apps = JSON.parse(data);

				for (let i = 0; i < apps.length; i++) {
					// Check if dGPU has been disabled for all apps
					const without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

					if ((without_dgpu.indexOf(apps[i].app_nickname + "=on") > -1) == "1") {
						document.getElementById("switch-shadow-" + apps[i].app_nickname).checked = false;
						document.getElementById("switch-shadow2-" + apps[i].app_nickname).checked = true;

						document.querySelector(`.switch-off-${apps[i].app_nickname} + label`).style.display = "none";
						document.querySelector(`.switch-on-${apps[i].app_nickname} + label`).style.display = "block";
						document.querySelector(`.${apps[i].app_nickname}-off`).style.display = "none";
						document.querySelector(`.${apps[i].app_nickname}-on`).style.display = "block";

					} else if ((without_dgpu.indexOf(apps[i].app_nickname) > -1) == "1") {
						document.getElementById("switch-shadow-" + apps[i].app_nickname).checked = true;
						document.getElementById("switch-shadow2-" + apps[i].app_nickname).checked = false;

						document.querySelector(`.switch-off-${apps[i].app_nickname} + label`).style.display = "block";
						document.querySelector(`.switch-on-${apps[i].app_nickname} + label`).style.display = "none";
						document.querySelector(`.${apps[i].app_nickname}-off`).style.display = "block";
						document.querySelector(`.${apps[i].app_nickname}-on`).style.display = "none";

					} else {
						document.getElementById("switch-shadow-" + apps[i].app_nickname).checked = false;
						document.getElementById("switch-shadow2-" + apps[i].app_nickname).checked = true;

						document.querySelector(`.switch-off-${apps[i].app_nickname} + label`).style.display = "none";
						document.querySelector(`.switch-on-${apps[i].app_nickname} + label`).style.display = "block";
						document.querySelector(`.${apps[i].app_nickname}-off`).style.display = "none";
						document.querySelector(`.${apps[i].app_nickname}-on`).style.display = "block";
					}
				}
			}
			return;
		});
	});
}
