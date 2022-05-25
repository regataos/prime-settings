// Check that the application is installed, as well as the current configuration to run with the dGPU
function check_apps() {
	const fs = require("fs");

	let files = [];

	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
		fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
			if (!err) {
				const apps = JSON.parse(data);

				// Make sure the app is running with the device's dGPU
				for (let i = 0; i < apps.length; i++) {
					const without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

					if ((without_dgpu.indexOf(apps[i].nickname + "=on") > -1) == "1") {
						document.querySelector(`.switch-off-${apps[i].nickname} label`).style.display = "none";
						document.querySelector(`.switch-on-${apps[i].nickname} label`).style.display = "block";
						document.querySelector(`.${apps[i].nickname}-off`).style.display = "none";
						document.querySelector(`.${apps[i].nickname}-on`).style.display = "block";

					} else if ((without_dgpu.indexOf(apps[i].nickname) > -1) == "1") {
						document.querySelector(`.switch-off-${apps[i].nickname} label`).style.display = "block";
						document.querySelector(`.switch-on-${apps[i].nickname} label`).style.display = "none";
						document.querySelector(`.${apps[i].nickname}-off`).style.display = "block";
						document.querySelector(`.${apps[i].nickname}-on`).style.display = "none";

					} else {
						document.querySelector(`.switch-off-${apps[i].nickname} label`).style.display = "none";
						document.querySelector(`.switch-on-${apps[i].nickname} label`).style.display = "block";
						document.querySelector(`.${apps[i].nickname}-off`).style.display = "none";
						document.querySelector(`.${apps[i].nickname}-on`).style.display = "block";
					}
				}
			}
			return;
		});
	});
}

check_apps();

function check_external_apps() {
	const fs = require("fs");

	let files = [];

	fs.readdirSync("/tmp/regataos-prime/config/external-app").forEach(files => {
		fs.readFile("/tmp/regataos-prime/config/external-app/" + files, "utf8", function (err, data) {
			if (!err) {
				const apps = JSON.parse(data);

				// Make sure the app is running with the device's dGPU
				for (let i = 0; i < apps.length; i++) {
					const without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

					if ((without_dgpu.indexOf(apps[i].app_nickname + "=on") > -1) == "1") {
						document.querySelector(`.switch-off-${apps[i].app_nickname} label`).style.display = "none";
						document.querySelector(`.switch-on-${apps[i].app_nickname} label`).style.display = "block";
						document.querySelector(`.${apps[i].app_nickname}-off`).style.display = "none";
						document.querySelector(`.${apps[i].app_nickname}-on`).style.display = "block";

					} else if ((without_dgpu.indexOf(apps[i].app_nickname) > -1) == "1") {
						document.querySelector(`.switch-off-${apps[i].app_nickname} label`).style.display = "block";
						document.querySelector(`.switch-on-${apps[i].app_nickname} label`).style.display = "none";
						document.querySelector(`.${apps[i].app_nickname}-off`).style.display = "block";
						document.querySelector(`.${apps[i].app_nickname}-on`).style.display = "none";

					} else {
						document.querySelector(`.switch-off-${apps[i].app_nickname} label`).style.display = "none";
						document.querySelector(`.switch-on-${apps[i].app_nickname} label`).style.display = "block";
						document.querySelector(`.${apps[i].app_nickname}-off`).style.display = "none";
						document.querySelector(`.${apps[i].app_nickname}-on`).style.display = "block";
					}
				}
			}
			return;
		});
	});
}

check_external_apps();
