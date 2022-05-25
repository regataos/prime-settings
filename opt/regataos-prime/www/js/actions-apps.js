// Function to add or remove apps from the list of apps that should or should not run with the dGPU
function action_apps() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = `/opt/regataos-prime/scripts/prime-options -dgpu-app ${appname}; \
	sudo /opt/regataos-prime/scripts/run-app-dgpu ${appname} ${package} ${package_manager} ${executable}`;
	exec(command, function (error, call, errlog) {
	});

	setTimeout(function () {
		const without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

		if ((without_dgpu.indexOf(appname + "=on") > -1) == "1") {
			document.querySelector(`.${appname}-off`).style.display = "none";
			document.querySelector(`.${appname}-on`).style.display = "block";

		} else if ((without_dgpu.indexOf(appname) > -1) == "1") {
			document.querySelector(`.${appname}-off`).style.display = "block";
			document.querySelector(`.${appname}-on`).style.display = "none";

		} else {
			document.querySelector(`.${appname}-off`).style.display = "none";
			document.querySelector(`.${appname}-on`).style.display = "block";
		}
	}, 200);
}

function action_external_apps() {
	const fs = require('fs');
	const exec = require('child_process').exec;

	const command = `/opt/regataos-prime/scripts/prime-options -dgpu-app ${appname}; \
	sudo /opt/regataos-prime/scripts/run-external-app-dgpu ${appname} ${desktop}`;
	exec(command, function (error, call, errlog) {
	});

	setTimeout(function () {
		const without_dgpu = fs.readFileSync("/tmp/regataos-prime/config/run-without-dgpu.conf", "utf8");

		if ((without_dgpu.indexOf(appname + "=on") > -1) == "1") {
			document.querySelector(`.${appname}-off`).style.display = "none";
			document.querySelector(`.${appname}-on`).style.display = "block";

		} else if ((without_dgpu.indexOf(appname) > -1) == "1") {
			document.querySelector(`.${appname}-off`).style.display = "block";
			document.querySelector(`.${appname}-on`).style.display = "none";

		} else {
			document.querySelector(`.${appname}-off`).style.display = "none";
			document.querySelector(`.${appname}-on`).style.display = "block";
		}
	}, 200);
}
